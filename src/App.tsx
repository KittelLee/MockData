import { useState, useEffect } from "react";
import styled from "styled-components";

interface Camera {
  id: string;
  brand: string;
  title: string;
  price: string;
}

function App() {
  const [cameras, setCameras] = useState<Camera[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/camera");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setCameras(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAddCamera = async () => {
    const brand = prompt("카메라 브랜드를 입력하세요:");
    const title = prompt("카메라 모델명을 입력하세요:");
    const price = prompt("카메라 가격을 입력하세요:");

    if (brand && title && price) {
      try {
        const newCamera: Camera = {
          id: (cameras.length + 1).toString(),
          brand,
          title,
          price,
        };

        const response = await fetch("http://localhost:3000/camera", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCamera),
        });

        if (!response.ok) {
          throw new Error("Failed to add camera");
        }

        await fetchData();
      } catch (error) {
        console.error("Error adding camera:", error);
      }
    }
  };

  const handleUpdateCamera = async (id: string) => {
    const brand = prompt("새로운 카메라 브랜드를 입력하세요:");
    const title = prompt("새로운 카메라 모델명을 입력하세요:");
    const price = prompt("새로운 카메라 가격을 입력하세요:");

    if (brand && title && price) {
      try {
        const updatedCamera: Camera = {
          id,
          brand,
          title,
          price,
        };

        const response = await fetch(`http://localhost:3000/camera/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedCamera),
        });

        if (!response.ok) {
          throw new Error("Failed to update camera");
        }

        await fetchData();
      } catch (error) {
        console.error("Error updating camera:", error);
      }
    }
  };

  const handleDeleteCamera = async (id: string) => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      try {
        const response = await fetch(`http://localhost:3000/camera/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete camera");
        }

        await fetchData();
      } catch (error) {
        console.error("Error deleting camera:", error);
      }
    }
  };

  return (
    <Container>
      {cameras.map((camera) => (
        <Card key={camera.id}>
          <Brand>{camera.brand}</Brand>
          <Title>{camera.title}</Title>
          <Price>{camera.price}</Price>
          <br />
          <BtnWrap>
            <Btn onClick={() => handleUpdateCamera(camera.id)}>수정하기</Btn>
            <Btn onClick={() => handleDeleteCamera(camera.id)}>삭제하기</Btn>
          </BtnWrap>
        </Card>
      ))}
      <BtnWrap>
        <Btn onClick={handleAddCamera}>추가하기</Btn>
      </BtnWrap>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 16px;
`;

const Card = styled.div`
  position: relative;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin: 16px;
  width: 200px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Brand = styled.h3`
  margin: 0;
  font-size: 1.2em;
  color: #333;
`;

const Title = styled.h4`
  margin: 8px 0;
  font-size: 1em;
  color: #666;
`;

const Price = styled.p`
  margin: 8px 0;
  font-size: 0.9em;
  color: #999;
`;

const BtnWrap = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
`;

const Btn = styled.button`
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  margin-top: 4px;
  &:first-child {
    background-color: skyblue;
    color: white;
  }
  &:last-child {
    background-color: salmon;
    color: white;
  }
`;

export default App;

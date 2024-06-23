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

    fetchData();
  }, []);

  return (
    <Container>
      {cameras.map((camera) => (
        <Card key={camera.id}>
          <Brand>{camera.brand}</Brand>
          <Title>{camera.title}</Title>
          <Price>{camera.price}</Price>
        </Card>
      ))}
      <BtnWrap>
        <Btn>추가하기</Btn>
        <Btn>수정하기</Btn>
        <Btn>삭제하기</Btn>
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
  bottom: 50%;
  right: 10px;
`;

const Btn = styled.button`
  border: none;
  border-radius: 4px;
  padding: 10px 12px;
  margin-right: 4px;
  &:first-child {
    background-color: skyblue;
    color: white;
  }
  &:nth-child(2) {
    background-color: lightgreen;
    color: white;
  }
  &:last-child {
    background-color: salmon;
    color: white;
  }
`;

export default App;

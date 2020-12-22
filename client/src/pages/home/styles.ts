import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  input {
    margin: 20px 0;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #d2d2d2
  }

  button {
    border: 0;
    border-radius: 5px;
    padding: 15px 30px;
    background: blue;
    color: white;
    margin-bottom: 20px;
    font-size: 20px;
    cursor: pointer;
  }
`;
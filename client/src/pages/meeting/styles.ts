import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  display: flex;
`;

export const VideoContainer = styled.div`
  flex: 4;
  display: flex;

  video {
    border: 1px solid black;
  }

  video:nth-child(1) {
    width: 300px;
    height: 300px;
  }

  video:nth-child(2) {
    width: 100%;
    height: 99%;
  }
`;

export const Infos = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const Chat = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
  flex: 1;

  h1 {
    width: 100%;
    text-align: center;
  }
`;

export const MessagesContainer = styled.div`
  width: 100%;
  overflow-y: scroll;
  max-height: 453px;
  height: 100%;
  display: flex;
    align-items: flex-end;
`;

export const Message = styled.div`
  width: 100%;
  margin: 10px 0;
`;

export const InputContainer = styled.div`
  width: 100%;
`;

export const Transcribe = styled.div`
  flex: 1;
`;
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { MeetingSessionContextProvider } from '../../context/MeetingSessionContext';
import MeetingInfo from '../../components/MeetingInfo';
import MeetingSessionManager from "../../components/MeetingSessionManager";
import VideoInputDevice from '../../components/VideosInputDevice';
import AudioInputDevice from '../../components/AudioInputDevice';
import AudioSpeaker from "../../components/AudioSpearker";
import VideoFeeds from "../../components/VideoFeeds";

import Messaging from '../../components/Messaging';

import { 
  Container, 
  VideoContainer, 
  Infos, 
  Chat, 
  Message, 
  MessagesContainer,
  InputContainer,
  Transcribe
} from './styles';

const MeetingScreen: React.FC  = () => {
  const { state } = useLocation();
  const [sessionInfo] = useState<{meeting: any}>(state as any);

  return sessionInfo ? (
    <MeetingSessionContextProvider meeting={sessionInfo.meeting}>
      <MeetingSessionManager />

      <h1>
        Meeting Screen
      </h1>

      <AudioInputDevice />
      <AudioSpeaker />

      <VideoInputDevice />
      <VideoFeeds />

      <Messaging />

      <MeetingInfo sessionInfo={sessionInfo} />
    </MeetingSessionContextProvider>
  ) : (
    <></>
  )

  // return (
  //   <Container>
  //     <VideoContainer>
  //       <video />
  //       <video />
  //     </VideoContainer>
  //     <Infos>
  //       <Transcribe>
  //       <MessagesContainer>
  //         </MessagesContainer>
  //       </Transcribe>
  //       <Chat>
  //         <h1>Chat</h1>
  //         <MessagesContainer>
  //           <Message>
  //             <span>Nome</span>
  //             <p>Message message de message</p>
  //           </Message>
  //         </MessagesContainer>
  //         <InputContainer>
  //           <input />
  //           <button>enviar</button>
  //         </InputContainer>
  //       </Chat>
  //     </Infos>
  //   </Container>
  // )
}

export default MeetingScreen;
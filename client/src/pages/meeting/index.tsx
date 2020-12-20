import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { MeetingSessionContextProvider } from '../../context/MeetingSessionContext';
import MeetingInfo from '../../components/MeetingInfo';
import MeetingSessionManager from "../../components/MeetingSessionManager";
import AudioInputDevice from '../../components/AudioInputDevice';
import AudioSpeaker from "../../components/AudioSpearker";

const MeetingScreen: React.FC  = () => {
  const { state } = useLocation();
  const [sessionInfo] = useState<{meeting: any}>(state as any);

  useEffect(() => {
    console.log(sessionInfo);
  }, [sessionInfo])

  return sessionInfo ? (
    <MeetingSessionContextProvider meeting={sessionInfo.meeting}>
      <MeetingSessionManager />

      <h1>
        Meeting Screen
      </h1>

      <AudioInputDevice />
      <AudioSpeaker />

      <MeetingInfo sessionInfo={sessionInfo} />
    </MeetingSessionContextProvider>
  ) : (
    <></>
  )
}

export default MeetingScreen;
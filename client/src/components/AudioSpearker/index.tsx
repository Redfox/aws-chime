import { useContext, useEffect, useRef } from "react";

import { MeetingSessionContext } from '../../context/MeetingSessionContext';

const AudioSpeaker: React.FC = () => {
  const session = useContext(MeetingSessionContext);
  const audioElementRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if(!session) return;

    const audioElement = audioElementRef.current;

    if(audioElement) {
      session.audioVideo.bindAudioElement(audioElement);
    }

    return () => {
      session.audioVideo.unbindAudioElement();
    }

  }, [session])

  return <audio ref={audioElementRef} ></audio>
}

export default AudioSpeaker;
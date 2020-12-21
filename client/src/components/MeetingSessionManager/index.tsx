
import { useContext, useEffect } from 'react';
import { MeetingSessionContext } from '../../context/MeetingSessionContext';

const MeetingSessionManager: React.FC = () => {
  const session = useContext(MeetingSessionContext);

  useEffect(() => {
    if (!session) return;

    try {
      console.warn('Starting audio/video conference.', session.audioVideo)
      session.audioVideo.start();

    } catch (err) {
      console.log(err)
    }

    return () => {
      session.audioVideo.stop();
    }
  }, [session]);

  return (
    <>

    </>
  )  
}

export default MeetingSessionManager;
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Transcribe from '../../components/Transcribe';
import { createMeeting, getMeeting } from '../../services';

const HomePage: React.FC  = () => {
  const navigate = useNavigate();
  const [sessionName, setSessionName] = useState('');

  const handleHost = useCallback(async () => {
    const meetingInfo = await createMeeting(sessionName);
    
    if(!meetingInfo) return;

    const { meeting, meetingToken } = meetingInfo;

    navigate('/meeting', {
      state: {
        meeting,
        sessionName: meetingToken,
      }
    })
    
  }, [sessionName, navigate]);

  const joinHost = useCallback(async () => {
    const meeting = await getMeeting(sessionName);

    if(meeting) {
      navigate('/meeting', {
        state: { meeting, sessionName },
      });
    }
  }, [sessionName, navigate])

  return (
    <>
      <h1>CreateSession</h1>
      <input value={sessionName} onChange={(e) => setSessionName(e.target.value)} />

      <button onClick={handleHost}>
        host
      </button>
      <button onClick={joinHost}>
        Join
      </button>
      <Transcribe />
    </>
  )
}

export default HomePage;
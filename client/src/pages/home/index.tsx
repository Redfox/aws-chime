import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { createMeeting, getMeeting } from '../../services';

const HomePage: React.FC  = () => {
  const navigate = useNavigate();
  const [sessionName, setSessionName] = useState('');
  const [joinCode, setJoinCode] = useState('');

  const handleHost = useCallback(async () => {
    const meetingInfo = await createMeeting(sessionName);
    
    if(!meetingInfo) return;

    console.log()

    const { meeting, meetingToken, joinCode } = meetingInfo;

    navigate('/meeting', {
      state: {
        meeting,
        joinCode,
        sessionName: meetingToken,
      }
    })
    
  }, [sessionName, navigate]);

  const joinHost = useCallback(async () => {
    const meeting = await getMeeting(sessionName, joinCode);

    if(meeting) {
      navigate('/meeting', {
        state: { meeting, sessionName, joinCode },
      });
    }
  }, [sessionName, joinCode, navigate])

  return (
    <>
      <h1>CreateSession</h1>
      <input value={sessionName} onChange={(e) => setSessionName(e.target.value)} />
      <input value={joinCode} onChange={(e) => setJoinCode(e.target.value)} />

      <button onClick={handleHost}>
        host
      </button>
      <button onClick={joinHost}>
        Join
      </button>
    </>
  )
}

export default HomePage;
import { DefaultMeetingSession } from 'amazon-chime-sdk-js';
import { createContext, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { getParticipantJoinTicker, connectToSession } from '../services';

export const MeetingSessionContext = createContext<DefaultMeetingSession | null>(null);

export const MeetingSessionContextProvider: React.FC<{ meeting: any }> = ({ meeting, children }) => {
  const [userid] = useState(uuid())
  const [session, setSession] = useState<null | DefaultMeetingSession>(null);

  useEffect(() => {
    getParticipantJoinTicker(meeting.MeetingId, userid)
      .then((ticket) => connectToSession(meeting, ticket))
      .then((session) => {
        setSession(session);
        session.audioVideo.addObserver({
          audioVideoDidStop: (status) => {
            console.debug('Session stopped with status:', status)
            setSession(null);
          },
          audioVideoDidStart: () => {
            console.log('status:');
          }
        })
      })
      .catch(() => {
        console.error('context error')
      })
  }, [meeting, userid]);

  return (
    <MeetingSessionContext.Provider value={session}>
      {children}
    </MeetingSessionContext.Provider>
  )
}

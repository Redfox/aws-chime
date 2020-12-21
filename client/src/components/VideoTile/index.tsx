import { useRef, useEffect, useContext, useCallback, useState } from 'react';

import { MeetingSessionContext } from '../../context/MeetingSessionContext';

const VideoTile: React.FC<{ id: number }> = ({ id }) => {
  const [muted, setMuted] = useState(false);
  const session = useContext(MeetingSessionContext);
  const videoElementRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if(!session) return;

    const videoElement = videoElementRef.current;
    if(videoElement) {
      console.debug(`Attaching video playback for tile ${id}:`, videoElement)
      session.audioVideo.bindVideoElement(id, videoElement);
    }

    return () => {
      session.audioVideo.unbindVideoElement(id);
    }
  }, [session, id]);

  const handleMuteCam = useCallback(() => {
    if(!session) return ;

    if(muted) {
      console.log('start')
      session.audioVideo.realtimeUnmuteLocalAudio()
      setMuted(false);
    } else {
      console.log('stop')
      session.audioVideo.realtimeMuteLocalAudio()
      setMuted(true);
    }
  }, [session, muted, setMuted])

  return (
    <div style={{ flex: 1 }}>
      <video style={{ width: '100%' }}
        ref={videoElementRef}
      ></video>
      <button type="button" onClick={handleMuteCam}>mute cam</button>
    </div>
  )
}

export default VideoTile;
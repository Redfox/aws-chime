import { useRef, useEffect, useContext } from 'react';

import { MeetingSessionContext } from '../../context/MeetingSessionContext';

const VideoTile: React.FC<{ id: number }> = ({ id }) => {
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

  return (
    <div>
      <video
        ref={videoElementRef}
      ></video>
    </div>
  )
}

export default VideoTile;
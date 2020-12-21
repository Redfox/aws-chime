import { useContext, useEffect, useState, useCallback } from 'react';
import { AudioVideoObserver } from 'amazon-chime-sdk-js';

import { MeetingSessionContext } from '../../context/MeetingSessionContext';

import VideoTile from '../../components/VideoTile';

const VideoFeeds: React.FC = () => {
  const session = useContext(MeetingSessionContext);
  const [videoTiles, setVideoTiles] = useState<number[]>([]);

  useEffect(() => {
    if(!session) return;

    const observer: AudioVideoObserver = {
      videoTileDidUpdate: (tileState) => {
        console.debug('tile received:', tileState)
        if (!tileState.boundAttendeeId || tileState.isContent) return

        setVideoTiles((tiles) => {
          if(!tileState.tileId || tiles.some((id) => id === tileState.tileId)) return tiles;

          if(tileState.localTile) return [tileState.tileId, ...tiles]
          else return [...tiles, tileState.tileId];
        })
      },

      videoTileWasRemoved: (tileId) => {
        setVideoTiles((tiles) => {
          return tiles.filter((id) => id !== tileId)
        })
      }
    };

    session.audioVideo.addObserver(observer);

    return () => {
      session.audioVideo.removeObserver(observer);
    }
  }, [session]);

  const handleSharingScreen = useCallback(async () => {
    if(!session) return;

    await session.audioVideo.startContentShareFromScreenCapture();

  }, [session])

  return (
    <div style={{ display: 'flex' }}>
      <button type="button" onClick={handleSharingScreen}>Share</button>
      {videoTiles.map(id => (
        <VideoTile id={id} />
      ))}
    </div>
  )
}

export default VideoFeeds;
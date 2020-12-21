
import { useContext, useEffect } from 'react';
import { MeetingSessionContext } from '../../context/MeetingSessionContext';

const VideoInputDevice: React.FC = () => {
  const session = useContext(MeetingSessionContext);

  useEffect(() => {
    if(!session) return;

    session.audioVideo
      .listVideoInputDevices()
      .then((devices) => {
        if (devices.length === 0) {
          console.warn('No video input devices detected.')
          return
        }

        console.log(
          'Registering video input device:',
          devices[devices.length - 1]
        )
        const { deviceId } = devices[devices.length - 1];
        console.log('audio', session.audioVideo)
        return session.audioVideo.chooseVideoInputDevice(deviceId);
      })
      .then(() => session.audioVideo.startLocalVideoTile())
      .catch((err) => console.log('error', err))

    return () => {
      session.audioVideo.stopLocalVideoTile()
    }
  }, [session]);

  return null;
}

export default VideoInputDevice;
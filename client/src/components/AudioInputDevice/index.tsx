import { useContext, useEffect } from 'react';

import { MeetingSessionContext } from '../../context/MeetingSessionContext';

const AudioInputDevice: React.FC = () => {
  const session = useContext(MeetingSessionContext);

  useEffect(() => {
    if(!session) {
      console.log('session null');
      return;
    }

    // console.log('session', session);

    session.audioVideo
      .listAudioInputDevices()
      .then(async (devices) => {
        if(devices.length === 0) {
          console.warn('No audio input devices detected.')
          return
        }

        // console.log('Registering audio input device:', devices[devices.length - 1])
        console.log('device', devices);
        const { deviceId } = devices[devices.length - 1];
        return session.audioVideo.chooseAudioInputDevice(deviceId);
      })
      .catch((err) => {
        console.error(
          'Error occurred attempting to list audio/video devices.',
          err
        );
      });

  }, [session]);

  return null;
}

export default AudioInputDevice;
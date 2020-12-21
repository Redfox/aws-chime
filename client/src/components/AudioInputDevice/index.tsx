import { useContext, useEffect } from 'react';
import Mic from 'microphone-stream';

import { MeetingSessionContext } from '../../context/MeetingSessionContext';
import { convertAudioToBinaryMessage, createPresignedUrl, handleNewMessage } from '../../util';

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

        const micStream = new Mic();
        let inputSampleRate: number = 0;

        micStream.on('format', (data) => {
          inputSampleRate = data.sampleRate;
        });

        navigator.mediaDevices.getUserMedia({ video: false, audio: true })
            .then(function(stream) {
              console.log(stream);
              micStream.setStream(stream);

              let url = createPresignedUrl(inputSampleRate);

              const socket = new WebSocket(url);
              socket.binaryType = "arraybuffer";

              socket.onopen = () => {
                micStream.on('data', (rawAudioChunk) => {
                  const binary = convertAudioToBinaryMessage(rawAudioChunk, inputSampleRate, 44100);
                  if (socket.readyState === socket.OPEN && binary)
                    socket.send(binary);
                })
              }

              socket.onmessage = function (message) {
                const msg = handleNewMessage(message);
                if(!msg) {
                    // transcribeException = true;
                    // showError(messageBody.Message);
                    // toggleStartStop();
                }
              };

              socket.onclose = function (closeEvent) {
                micStream.stop();
                
                console.error('closeEvent', closeEvent)
            } ;

              return;
            }).catch(function(error) {
              console.error('err  ', error);
            });

          // It also emits a format event with various details (frequency, channels, etc)
          micStream.on('format', function(format) {
            console.log('format', format);
          });

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
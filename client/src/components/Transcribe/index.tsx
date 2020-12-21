import { useEffect } from "react";
import Mic from 'microphone-stream';

import { convertAudioToBinaryMessage, createPresignedUrl, handleNewMessage } from '../../util';

const Transcribe: React.FC = () => {

  useEffect(() => {
    const micStream = new Mic();
    let inputSampleRate: number = 0;

    micStream.on('format', (data) => {
      inputSampleRate = data.sampleRate;
    });

    navigator.mediaDevices.enumerateDevices()
      .then((devices) => {
        console.log(devices)
      })
      navigator.mediaDevices.getUserMedia({
        audio: {
          deviceId: 'default'
        },
        video: false
      })
      .then(function(stream) {
        console.log(stream);
        micStream.setStream(stream);

        let url = createPresignedUrl(inputSampleRate);

        const socket = new WebSocket(url);
        socket.binaryType = "arraybuffer";

        socket.onopen = () => {
          micStream.on('data', (rawAudioChunk) => {
            const binary = convertAudioToBinaryMessage(rawAudioChunk, inputSampleRate, 44100);  
            if (socket.readyState === socket.OPEN && binary) {
              socket.send(binary);
            }
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
  }, [])

  return null;
}

export default Transcribe;
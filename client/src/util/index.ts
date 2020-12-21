import { createPresignedURL } from '../util/aws-signature-v4';
import crypto from 'crypto';
import Mic from 'microphone-stream';
import { downsampleBuffer, pcmEncode, getAudioEventMessage  } from '../util/audioUtils';
import * as marshaller from "@aws-sdk/eventstream-marshaller";
import * as util_utf8_node from "@aws-sdk/util-utf8-node";

const eventStreamMarshaller = new marshaller.EventStreamMarshaller(util_utf8_node.toUtf8, util_utf8_node.fromUtf8);


export function createPresignedUrl(sampleRate: number) {
  let endpoint = "transcribestreaming.us-east-1.amazonaws.com:8443";
  const accessId = 'ACCESSID';
  const secretKey = 'SECRETKEY';

  return createPresignedURL(
    'GET',
    endpoint,
    '/stream-transcription-websocket',
    'transcribe',
    crypto.createHash('sha256').update('', 'utf8').digest('hex'), {
        'key': accessId,
        'secret': secretKey,
        'sessionToken': "",
        'protocol': 'wss',
        'expires': 15,
        'region': 'us-east-1',
        'query': "language-code=pt-BR&media-encoding=pcm&sample-rate=8000"
    }
  )
}

export function convertAudioToBinaryMessage(audioChunk: any, inputSampleRate: any, sampleRate: any) {
  let raw = Mic.toRaw(audioChunk);

  if (raw == null)
    return;

  let downsampledBuffer = downsampleBuffer(raw, inputSampleRate, sampleRate);
  let pcmEncodedBuffer = pcmEncode(downsampledBuffer);
  
  let audioEventMessage = getAudioEventMessage(Buffer.from(pcmEncodedBuffer));

  let binary = eventStreamMarshaller.marshall(audioEventMessage);

  return binary;
}

export function handleNewMessage(message: any) {
  let messageWrapper = eventStreamMarshaller.unmarshall(new Buffer(message.data));
  let messageBody = JSON.parse(String.fromCharCode.apply(String, messageWrapper.body));
  console.log(JSON.stringify(messageBody));
  if (messageWrapper.headers[":message-type"].value === "event") {
    handleEventStreamMessage(messageBody);
    return messageBody;
  }

  console.error('erro new message');

  return null;
}

let handleEventStreamMessage = function (messageJson: any) {
  let results = messageJson.Transcript.Results;

  if (results.length > 0) {
      if (results[0].Alternatives.length > 0) {
          let transcript = results[0].Alternatives[0].Transcript;

          // fix encoding for accented characters
          transcript = decodeURIComponent(escape(transcript));

          console.log(transcript)
      }
  }
}
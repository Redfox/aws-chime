import { DataMessage } from 'amazon-chime-sdk-js';
import { useCallback, useContext, useEffect, useState } from 'react';

import { MeetingSessionContext } from '../../context/MeetingSessionContext';

const Messaging: React.FC = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{
    name: string,
    text: string
  }[]>([])
  const session = useContext(MeetingSessionContext);

  const handleSendMessage = useCallback(() => {
    if(!session) return;

    session.audioVideo.realtimeSendDataMessage('chat', message, 300000);
  }, [session, message]);

  const dataMessageHandler = useCallback((dataMessage: DataMessage) => {
    if(dataMessage.throttled) {
      console.log('Message is throttled. Please resend');
      return;
    }
    const name = dataMessage.senderExternalUserId.split('#').slice(-1)[0];
    const text = dataMessage.text();

    setMessages([...messages, {
      name, text
    }])
  }, [messages]);

  useEffect(() => {
    if(!session) return;

    session.audioVideo.realtimeSubscribeToReceiveDataMessage('chat', (dataMessage: DataMessage) => {
      dataMessageHandler(dataMessage);
    });
  }, [session, dataMessageHandler]);

  return (
    <>
      <input name={message} onChange={(e) => setMessage(e.target.value)} />
      <button type='button' onClick={handleSendMessage}>Enviar</button>

      <div id="teste">
        {messages.map(message => (
          <p><span>name: {message.name} </span> {message.text}</p>
        ))}
      </div>
    </>
  );
}

export default Messaging;
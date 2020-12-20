import axios from 'axios';
import { 
  ConsoleLogger, 
  DefaultDeviceController,   
  DefaultMeetingSession,
  LogLevel,
  MeetingSessionConfiguration
} from 'amazon-chime-sdk-js';

const api = axios.create({
  baseURL: 'http://localhost:3333'
});

const CHIME_LOGGER = new ConsoleLogger('Chime Logs', LogLevel.OFF)
const CHIME_DEVICE_CONTROLLER = new DefaultDeviceController(CHIME_LOGGER)

export async function createMeeting(meetingToken: string, meetingRegion = 'us-east-1') {
  const body = {
    meetingToken,
    meetingRegion
  }

  try {
    const response = await api.post('/meetings', body);
    return response.data;
  } catch (err){
    console.error(err);
    return null;
  }
}

export async function getParticipantJoinTicker(meetingid: string, userid: string) {
  try {
    const body = { meetingid, userid }
    const response = await api.post('/sessions/join', body);
    
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function connectToSession(meeting: any, ticket: string) {
  const meetingConfiguration = new MeetingSessionConfiguration(meeting, ticket);
  const meetingSession = new DefaultMeetingSession(
    meetingConfiguration,
    CHIME_LOGGER,
    CHIME_DEVICE_CONTROLLER
  );

  return meetingSession;
}

export async function getMeeting(token: string, hash: string) {
  try { 
    const response = await api.get(`/meetings/${token}/${hash}`)
    return response.data;
  } catch (error) { 
    console.error('Error encountered while retrieving meeting:', error)
    return null
  }
}
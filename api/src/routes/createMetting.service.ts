import { v4 as uuid } from 'uuid';
import { Chime, Endpoint, MetadataService } from 'aws-sdk';
import { saveMeeting } from '../repositories/dynamodb.repository';

interface Props {
  meetingToken: string;
  meetingRegion: string; 
}

class CreateMettingService {
  async exec({ meetingRegion, meetingToken }: Props) {
    const ClientRequestToken = uuid();

    const request = {
      ClientRequestToken,
      MediaRegion: meetingRegion,
      NotificationsConfiguration: {},
    } 

    const chimeClient = new Chime({ region: 'us-east-1' });
    chimeClient.endpoint = new Endpoint('https://service.chime.aws.amazon.com');
    const { Meeting } = await chimeClient.createMeeting(request).promise();
    const hash = ClientRequestToken.slice(0, 6).toUpperCase();

    await saveMeeting(Meeting, meetingToken);
    
    return {
      meeting: Meeting,
      meetingToken,
      joinCode: hash
    }
  }
}


export default new CreateMettingService();
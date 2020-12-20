import { Chime, Endpoint } from 'aws-sdk';

interface Props {
  meetingid: string;
  userid: string;
}

class JoinMettingService {
  async exec({ meetingid, userid }: Props) {
    const params = {
      MeetingId: meetingid,
      ExternalUserId: userid,
    }

    const chimeClient = new Chime({ region: 'us-east-1' });
    chimeClient.endpoint = new Endpoint('https://service.chime.aws.amazon.com');
   
    const ticket = await chimeClient.createAttendee(params).promise();

    return ticket;
  }
}


export default new JoinMettingService();
import { getMeeting } from '../repositories/dynamodb.repository';

interface Props {
  token: string;
  hash: string;
}

class GetMettingService {
  async exec({ token, hash }: Props) {
    const data = await getMeeting(token);

    if (!data.Items || data.Items?.length === 0) throw new Error('Meeting not found.')

    return data.Items[0].meeting;
  }
}


export default new GetMettingService();
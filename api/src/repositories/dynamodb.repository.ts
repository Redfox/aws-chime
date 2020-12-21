import { DynamoDB } from 'aws-sdk';

const ddbClient = new DynamoDB.DocumentClient({
  region: 'localhost',
  endpoint: 'http://localhost:8000',
});

const DDB_CHIMEMEETINGS = 'chimeapi-dev-meetings';

export const getMeeting = (token: string, hash: string) => {
  const params = {
    TableName: DDB_CHIMEMEETINGS,
    KeyConditionExpression:
      'meetingid = :meetingid',
    ExpressionAttributeValues: {
      ':meetingid': token,
    },
  }

  return ddbClient.query(params).promise()
}

export const saveMeeting = (meeting: any, token: string) => {
  const ttl = ~~(+Date.now() / 1000) + 60 * 60 * 24 // :: 24h
  const params = {
    TableName: DDB_CHIMEMEETINGS,
    Item: {
      meetingid: token,
      meetinghash: 'hash',
      meeting,
      TTL: `${ttl}`,
    },
  }

  // console.log(
  //   'Saving Chime meeting details',
  //   JSON.stringify({ meeting, token })
  // )
  return ddbClient.put(params).promise()
}
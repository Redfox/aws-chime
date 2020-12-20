import { Router } from 'express';
import CreateMettingService from './createMetting.service';
import GetMettingService from './getMetting.service';
import JoinMettingService from './joinMetting.service';

const routes = Router();

routes.get('/', (_, res) => {
  return res.json({
    ok: true
  })
});

routes.post('/meetings', async (req, res) => {
  const { meetingToken, meetingRegion } = req.body;

  const mettingResponse = await CreateMettingService.exec({ meetingToken, meetingRegion });

  return res.status(200).json(mettingResponse)
});

routes.get('/meetings/:token/:hash', async (req, res) => {
  const { token, hash } = req.params;
 
  const mettingResponse = await GetMettingService.exec({ token, hash });

  return res.status(200).json(mettingResponse)
});

routes.post('/sessions/join', async (req, res) => {
  const { meetingid, userid } = req.body;
 
  const ticket = await JoinMettingService.exec({ meetingid, userid });

  return res.status(200).json(ticket)
});


export default routes;
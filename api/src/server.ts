import express, { Express } from 'express';
import cors from 'cors';
import { createServer } from 'http';

import routes from './routes';

class Server {
  private app: Express;

  constructor() {
    this.app = express();
    
    this.middlewares();
    this.routes();
  }

  private middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  private routes() {
    this.app.use(routes);
  }

  start() {
    const http = createServer(this.app);

    http.listen(3333);
  }
}

export default Server;
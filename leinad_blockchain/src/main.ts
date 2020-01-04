import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import cors from 'cors';

// Routers imports
import BlockRouter from './routes/block_router';

const app = express();
require('dotenv').config();

// CORS
app.use(cors());

app.use(bodyParser.json());

// Routers - will be all protected
app.use('/block', BlockRouter);

// Default Routes
app.get('/', (req: Request, res: Response): object => {
  return res.json({ status: 'success', message: 'Welcome to API Service' });
});

let appPort: any = !!process.env.PORT ? process.env.PORT : 7000;
app.listen(appPort, '0.0.0.0', () =>
  console.log(`App started at port: ${appPort}`)
);

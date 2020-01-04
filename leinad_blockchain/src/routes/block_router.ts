import express from 'express';
const BlockRouter = express.Router();
import { testBlockainV1 } from '../controllers/block_controller';

BlockRouter.post('/test1', testBlockainV1);

export default BlockRouter;

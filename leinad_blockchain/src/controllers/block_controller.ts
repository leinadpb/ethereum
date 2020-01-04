import { IServerRequest, IServerResponse } from '../common/interfaces';
import BlockService from '../services/BlockService';

let blockService: BlockService = new BlockService();

export const testBlockainV1 = async (
  req: IServerRequest,
  res: IServerResponse
) => {
  let result = await blockService.testBlockainV1();
  res.status(200).json({ data: result });
};

import { Request, Response } from 'express';

export interface IServerRequest extends Request {
  user?: any;
}

export interface IServerResponse extends Response {}

export interface IActionResult {
  data: any;
  success: Boolean;
}

export interface IEntity {
  mapObject: (object: any) => any;
  mapObjects: (object: any) => any;
}

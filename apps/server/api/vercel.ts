import { getInitializedApp } from '../src';  // Adjust the path accordingly
import { Request, Response } from 'express';

module.exports = async (req: Request, res: Response) => {
  const app = await getInitializedApp();
  return app(req, res);
};

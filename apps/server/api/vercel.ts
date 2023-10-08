import { getInitializedApp } from '../src';  // Adjust the path accordingly
import express, { Request, Response } from 'express';
import { VercelRequest, VercelResponse } from '@vercel/node';

module.exports = async (req: VercelRequest, res: VercelResponse) => {
  const app: express.Express = await getInitializedApp();
  app(req, res);
};

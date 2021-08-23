import { Request, Response } from 'express';
import { store, remove } from './parking-slot.service';

export const park = async (req: Request, res: Response) => {
  const body = req.body;
  const response = await store(body);

  res.json(response);
};

export const leave = async (req: Request, res: Response) => {
  const body = req.body;
  const respone = await remove(body);

  res.json(respone);
};

import { Request, Response } from 'express';
import { store, remove } from './parking-slot.service';

export const park = async (req: Request, res: Response) => {
  const body = req.body;
  const response = await store(body);

  res.json(response);
};

export const leave = (req: Request, res: Response) => {
  const levelAndSlot = req.params.slot.split('-'); // ex: [b1, 1] or [b2, 8]
  const customerSlot = {
    level: levelAndSlot[0],
    slot: Number(levelAndSlot[1]),
  };

  const respone = remove(customerSlot);
  res.json(respone);
};

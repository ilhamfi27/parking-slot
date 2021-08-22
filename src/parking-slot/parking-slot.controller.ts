import { Request, Response } from 'express';
import ParkingSlotService from './parking-slot.service';

const parkingSLot = new ParkingSlotService();

export const park = (req: Request, res: Response) => {
  const response = parkingSLot.store();

  res.json(response);
};

export const leave = (req: Request, res: Response) => {
  const levelAndSlot = req.params.slot.split('-'); // ex: [b1, 1] or [b2, 8]
  const customerSlot = {
    level: levelAndSlot[0],
    slot: Number(levelAndSlot[1]),
  };

  const respone = parkingSLot.delete(customerSlot);
  res.json(respone);
};

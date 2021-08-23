import { Request, Response } from 'express';
import { InputParkingSlotDto } from './dto/input.dto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const store = async (body: InputParkingSlotDto) => {
  // select all parking level
  const parkingLevel = await prisma.parkingLevel.findMany({});

  // iterate parking level to check availability
  for (let i = 0; i < parkingLevel.length; i++) {
    const level = parkingLevel[i];

    // get level slot count
    const levelSlotCount = await prisma.parkingSlot.aggregate({
      where: { parkingLevelId: level.id },
      _count: {
        parkingLevelId: true,
      },
    });

    /**
     * if the level slot available count is above maximum level slot
     * then insert the new customer to the slot
     */
    if (levelSlotCount._count.parkingLevelId < level.max_slot) {
      // get parking slot
      const existingParkingSlot = await prisma.parkingSlot.findMany({
        where: { parkingLevelId: level.id },
      });

      // get one empty slot on current level
      const emptySlot = getOneEmptySlot(existingParkingSlot, level.max_slot);

      // insert the data
      await prisma.parkingSlot.create({
        data: {
          ...body,
          slot: emptySlot,
          parkingLevelId: level.id,
        },
      });
      return { level: level.id, slot: emptySlot };
    }
  }
  return { message: 'slots are full' };
};

export const remove = ({ level, slot }: { level: string; slot: number }) => {};

const getOneEmptySlot = (existing: any, maxSlot: number) => {
  // create array from 1 to maximum level slot
  const availableSlot = Array.from({ length: maxSlot }, (_, i) => i + 1);
  const existingSlot = existing.map((el: any) => el.slot);

  // filter the slot number where the number not in existing slot
  return availableSlot.filter((el) => !existingSlot.includes(el))[0];
};

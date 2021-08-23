import { Request, Response } from 'express';
import { InputParkingSlotDto } from './dto/input.dto';
import { PrismaClient, Prisma } from '@prisma/client';

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

      try {
        // insert the data
        await prisma.parkingSlot.create({
          data: {
            ...body,
            slot: emptySlot,
            parkingLevelId: level.id,
          },
        });
        return { level: level.id, slot: emptySlot };
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          // duplicate unique constraint error
          if (e.code === 'P2002') {
            return { message: 'the car number already exist in parking slot' };
          }
        }
      }
    }
  }
  return { message: 'slots are full' };
};

export const remove = async (body: InputParkingSlotDto) => {
  try {
    await prisma.parkingSlot.delete({
      where: {
        ...body,
      },
    });
    return { message: 'slot emptied' };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // no data error code
      if (e.code === 'P2025') {
        return {
          message: 'the car number does not exists in this parking slot',
        };
      }
    }
  }
};

const getOneEmptySlot = (existing: any, maxSlot: number) => {
  // create array from 1 to maximum level slot
  const availableSlot = Array.from({ length: maxSlot }, (_, i) => i + 1);
  const existingSlot = existing.map((el: any) => el.slot);

  // filter the slot number where the number not in existing slot
  return availableSlot.filter((el) => !existingSlot.includes(el))[0];
};

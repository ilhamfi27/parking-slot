import { ParkingSlot } from './parking-slot.model';

class ParkingSlotService {
  constructor() {}

  store() {
    for (const level in ParkingSlot) {
      // get level slot array
      const levelSlot = ParkingSlot[level];

      // get index in level slot if the slot is false or empty
      const idx = levelSlot.indexOf(false);

      if (idx > -1) {
        // if idx return more than -1 or its data was found
        // then set true for selected slot
        levelSlot[idx] = true;
        ParkingSlot[level] = levelSlot;

        return { level: level, slot: idx + 1 };
      }
    }

    return { message: 'slots are full' };
  }

  delete({ level, slot }: { level: string; slot: number }) {
    // get level slot aray
    const levelSlot = ParkingSlot[level];

    // check if slot number or level of slot is out of bounds
    if (levelSlot === undefined || levelSlot[slot - 1] === undefined) {
      return { message: `no slot for level ${level} and slot number ${slot}` };
    }

    // just for checking if the slot is already empty
    if (levelSlot[slot - 1] === false) {
      return { message: 'slot already empty' };
    }

    // set empty
    levelSlot[slot - 1] = false;
    ParkingSlot[level] = levelSlot;

    return { message: 'slot emptied' };
  }
}
export default ParkingSlotService;

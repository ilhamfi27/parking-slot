class ParkingSlotModel {
  private _parkingSlot: any = {
    b1: new Array<boolean>(10),
    b2: new Array<boolean>(12),
    b3: new Array<boolean>(14),
    b4: new Array<boolean>(16),
  };

  constructor() {
    this._initSlotValue();
  }

  store() {
    for (const level in this._parkingSlot) {
      // get level slot array
      const levelSlot = this._parkingSlot[level];

      // get index in level slot if the slot is false or empty
      const idx = levelSlot.indexOf(false);

      if (idx > -1) {
        // if idx return more than -1 or its data was found
        // then set true for selected slot
        levelSlot[idx] = true;
        this._parkingSlot[level] = levelSlot;

        return { level: level, slot: idx + 1 };
      }
    }

    return { message: 'slots are full' };
  }

  delete({ level, slot }: { level: string; slot: number }) {
    // get level slot aray
    const levelSlot = this._parkingSlot[level];

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
    this._parkingSlot[level] = levelSlot;

    return { message: 'slot emptied' };
  }

  setEmpty() {
    this._initSlotValue();
  }

  private _initSlotValue(): void {
    /**
     * initiating all slot value as false or it means empty
     */
    for (const key in this._parkingSlot) {
      const levelSlot = this._parkingSlot[key];

      for (let i = 0; i < levelSlot.length; i++) {
        levelSlot[i] = false;
      }

      this._parkingSlot[key] = levelSlot;
    }
  }
}
export default ParkingSlotModel;

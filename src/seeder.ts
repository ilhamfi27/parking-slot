import mongoose from 'mongoose';
import ParkingLevel from './parking-level/parking-level.model';

// connect to mongoDB
mongoose.connect('mongodb://localhost:27017/parking_management', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// parking level seed data
const parkingLevels = [
  { name: 'b1', maxSlot: 10 },
  { name: 'b2', maxSlot: 12 },
  { name: 'b3', maxSlot: 14 },
  { name: 'b4', maxSlot: 16 },
];

// Import into DB
const importData = async () => {
  try {
    await ParkingLevel.create(parkingLevels);
    console.log('Data Imported...');
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await ParkingLevel.deleteMany();
    console.log('Data Destroyed...');
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}

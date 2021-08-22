import express from 'express';
import mongoose from 'mongoose';
import { Request, Response } from 'express';
import parkingSlotRoute from './api/parking-slot/parking-slot.routes';

const app = express();

// connect to mongoDB
mongoose.connect('mongodb://localhost:27017/parking_management', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Database Connected'));

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'OK' });
});
app.use('/parking-slot', parkingSlotRoute);

app.listen(3000, () => {
  console.log('Application started on port 3000!');
});

export default app;

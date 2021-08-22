import express from 'express';
import { Request, Response } from 'express';
import parkingSlotRoute from './src/parking-slot/parking-slot.routes';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'OK' });
});
app.use('/parking-slot', parkingSlotRoute);

app.listen(3000, () => {
  console.log('Application started on port 3000!');
});

export default app;

import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import parkingSlotRoute from './src/parking-slot/parking-slot.routes';
import * as dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'OK' });
});
app.use('/parking-slot', parkingSlotRoute);

app.listen(port, () => {
  console.log(`Application started on port ${port}!`);
});

export default app;

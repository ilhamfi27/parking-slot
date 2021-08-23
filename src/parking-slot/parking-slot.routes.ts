import express from 'express';
import { park, leave } from './parking-slot.controller';

const router = express.Router();

router.post('/park', park);
router.delete('/park/:slot', leave);

export default router;

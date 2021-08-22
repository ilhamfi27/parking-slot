import express from 'express';
import { park, leave } from './parking-slot.controller';

const router = express.Router();

router.get('/park', park);
router.get('/park/:slot', leave);

export default router;

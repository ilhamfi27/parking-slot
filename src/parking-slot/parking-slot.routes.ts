import express from 'express';
import { park, leave } from './parking-slot.controller';

const router = express.Router();

router.post('/park', park);
router.post('/leave', leave);

export default router;

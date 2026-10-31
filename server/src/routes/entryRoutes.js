import express from 'express';
import {
  createEntry,
  getEntries,
  getEntry,
  deleteEntry
} from '../controllers/entryController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .post(createEntry)
  .get(getEntries);

router.route('/:id')
  .get(getEntry)
  .delete(deleteEntry);

export default router;


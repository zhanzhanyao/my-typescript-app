import express from 'express';
import { createStatus, getStatus, activateStatus } from '../controllers/status.controller.js';

const router = express.Router();

router.post('/', createStatus);
router.get('/:Id', getStatus);
router.patch('/:id/activate', activateStatus);

export default router;

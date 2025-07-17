import express from 'express';
import { StatusController } from '../controllers/status.controller';
import { StatusService } from '../services/status.service';

const statusService = new StatusService();
// 创建 StatusController 实例，注入 service
const statusController = new StatusController(statusService);

const router = express.Router();

router.post('/', statusController.createStatus);
router.get('/:Id', statusController.getStatus);
router.patch('/:id/activate', statusController.activateStatus);

export default router;

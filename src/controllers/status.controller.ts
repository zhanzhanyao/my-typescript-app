import { Request, Response } from 'express';
import { StatusService } from '../services/status.service.js';
import { Status } from '../models/status.model.js';

const statusService = new StatusService();

export const createStatus = (req: Request, res: Response): void => {
  const { id, currentStatus } = req.body;
  const newStatus: Status = { id, currentStatus };
  statusService.createStatus(newStatus);
  res.status(201).json({ message: 'Status created successfully' });
};

export const getStatus = (req: Request, res: Response): void => {
  const id: string = req.body.id;
  const result = statusService.getStatus(id);

  if (!result) {
    res.status(404).json({ error: 'Status not found' });
    return;
  }

  res.json(result);
};

export const activateStatus = (req: Request, res: Response): void => {
  const id: string = req.body.id;
  try {
    const updatedStatus = statusService.activateStatus(id);
    res.json(updatedStatus);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

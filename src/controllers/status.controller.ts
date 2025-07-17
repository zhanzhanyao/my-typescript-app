// src/controllers/status.controller.ts
import { Request, Response } from 'express';
import { StatusService } from '../services/status.service';
import { Status } from '../models/status.model';

export class StatusController {
  constructor(private statusService: StatusService) {}

  createStatus = (req: Request, res: Response): void => {
    const { id, currentStatus } = req.body;
    const newStatus: Status = { id, currentStatus };
    this.statusService.createStatus(newStatus);
    res.status(201).json({ message: 'Status created successfully' });
  };

  getStatus = (req: Request, res: Response): void => {
    const id: string = req.body.id;
    const result = this.statusService.getStatus(id);
    if (!result) {
      res.status(404).json({ error: 'Status not found' });
      return;
    }
    res.json(result);
  };

  activateStatus = (req: Request, res: Response): void => {
    const id: string = req.body.id;
    try {
      const updatedStatus = this.statusService.activateStatus(id);
      res.json(updatedStatus);
    } catch (err) {
      res.status(400).json({ error: (err as Error).message });
    }
  };
}

// src/app.ts
import express from 'express';
import statusRoute from './routes/status.route';

const app = express();
app.use(express.json());
app.use('/status', statusRoute);

export default app;

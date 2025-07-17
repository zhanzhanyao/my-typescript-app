import 'dotenv/config';
import statusRoute from './routes/status.route';
import express from 'express';
import { logInfo } from './utils/logger';

const app = express();
app.use(express.json());
app.use('/status', statusRoute);

const PORT = Number(process.env.PORT ?? 3000);
app.listen(PORT, () => {
  logInfo(`🚀 Server is running on port ${PORT}`);
});

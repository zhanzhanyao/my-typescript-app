import 'dotenv/config';
import app from './app';
import { logInfo } from './utils/logger';

const PORT = Number(process.env.PORT ?? 3000);
app.listen(PORT, () => {
  logInfo(`🚀 Server is running on port ${PORT}`);
});

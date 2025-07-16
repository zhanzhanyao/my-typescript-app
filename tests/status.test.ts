import request from 'supertest';
import express from 'express';
import router from "../src/routes/status.route";

describe('Status Update Endpoint', () => {
  it('should receive a valid request and return 200', async () => {
    const app = express();
    app.use(express.json());
    app.use('/status', router);

    const res = await request(app)
      .post('/status/update')
      .send({ id: 'abc123', status: 'activated' });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Status received');
  });
});

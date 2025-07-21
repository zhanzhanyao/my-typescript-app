const request = require('supertest');
const app = require('../../src/app').default;

describe('Status Router', () => {
  it('POST /status - should create a new status', async () => {
    const res = await request(app).post('/status').send({
      id: '123',
      currentStatus: 'draft',
    });

    expect(res.status).toBe(201);
    expect(res.body).toEqual({ message: 'Status created successfully' });
  });

  it('Get /status/:id - should get 404 when not found', async () => {
    const res = await request(app).get('/status/456');
    expect(res.status).toBe(404);
    expect(res.body).toMatchObject({ error: 'Status not found' });
  });

  it('Patch /status/:id/activate - should active status', async () => {
    // 创建
    await request(app).post('/status').send({ id: 'act123', currentStatus: 'draft' });

    // 激活
    const response = await request(app).patch('/status/act123/activate');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: 'act123', currentStatus: 'activated' });
  });
});

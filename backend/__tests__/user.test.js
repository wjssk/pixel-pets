const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app');
const { User } = require('../models/user');

describe('User Controller Tests', () => {
  let mongoServer;

  beforeEach(async () => {
    const testUser = new User({
      username: 'Noob',
      email: 'testuser@gmail.com',
      password: 'Test@1234',
      level: 1,
      xp: 0,
      coins: 100,
      hasPet: false,
    });
    await testUser.save();

    const testUser2 = new User({
      username: 'Paulina',
      email: 'p@gmail.com',
      password: 'Test@1234',
      level: 10,
      xp: 100,
      coins: 1000,
      hasPet: true,
    });
    await testUser2.save();

    const testUser3 = new User({
      username: 'Ewa',
      email: 'ewa@opera.pl',
      password: 'Test@1234',
      level: 5,
      xp: 50,
      coins: 500,
      hasPet: true,
    });
    await testUser3.save();
  });

  afterEach(async () => {
    await User.deleteMany();
  });

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri(), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  // UPDATE HAS PET

  test('should update hasPet successfully', async () => {
    const user = await User.findOne({ username: 'Noob' });
    const res = await request(app)
      .put(`/api/user/${user._id}/update-has-pet`)
      .send({ hasPet: true });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('user');
    expect(res.body.user).toHaveProperty('hasPet', true);
  });

  test('should return 404 for non-existent user', async () => {
    const nonExistentUserId = new mongoose.Types.ObjectId();
    const res = await request(app)
      .put(`/api/user/${nonExistentUserId}/update-has-pet`)
      .send({ hasPet: true });

    expect(res.statusCode).toEqual(404);
  });

  test('should handle MongoDB error', async () => {
    const res = await request(app)
      .put('/api/user/$invalidId/update-has-pet')
      .send({ hasPet: true });

    expect(res.statusCode).toEqual(500);
  });
});

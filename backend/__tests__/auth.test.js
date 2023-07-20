require('dotenv').config();
const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');

describe('Auth Tests', () => {
  let mongoServer;

  beforeEach(async () => {
    const testUser = new User({
      username: 'testuser',
      email: 'testuser@gmail.com',
      password: 'Test@1234',
    });
    await testUser.save();

    const testUser2 = new User({
      username: 'Paulina',
      email: 'p@gmail.com',
      password: 'Test@1234',
    });
    await testUser2.save();

    const testUser3 = new User({
      username: 'Ewa',
      email: 'ewa@opera.pl',
      password: 'Test@1234',
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

  // ALL REGISTRATION TESTS

  // Correct Registration
  test('should register a new user successfully', async () => {
    const res = await request(app).post('/api/register').send({
      username: 'newUser',
      email: 'newuser@gmail.com',
      password: 'Test@1234',
      confirmPassword: 'Test@1234',
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('user');
    expect(res.body.user).toHaveProperty('username', 'newUser');
    expect(res.body.user).toHaveProperty('email', 'newuser@gmail.com');
  });

  // Incorrect Registration - username already exists
  test('should not register a new user with existing username', async () => {
    const res = await request(app).post('/api/register').send({
      username: 'testuser',
      email: 'newmail@gmail.com',
      password: 'Test123',
      confirmPassword: 'Test123',
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('errors');
    expect(res.body.errors).toHaveProperty('username');
    expect(res.body.errors.username).toEqual('Username already exists');
  });

  // Incorrect Registration - email already exists
  test('should not register a new user with existing email', async () => {
    const res = await request(app).post('/api/register').send({
      username: 'Kuba',
      email: 'p@gmail.com',
      password: 'Test123',
      confirmPassword: 'Test123',
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('errors');
    expect(res.body.errors).toHaveProperty('email');
    expect(res.body.errors.email).toEqual('Email already exists');
  });

  // Incorrect Registration - username is empty
  test('should not register a new user with empty username', async () => {
    const res = await request(app).post('/api/register').send({
      username: '',
      email: 'mail@mail.com',
      password: 'Test123',
      confirmPassword: 'Test123',
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('errors');
    expect(res.body.errors).toHaveProperty('username');
    expect(res.body.errors.username).toEqual("Username can't be empty");
  });

  // Incorrect Registration - email is empty
  test('should not register a new user with empty email', async () => {
    const res = await request(app).post('/api/register').send({
      username: 'Marysia',
      email: '',
      password: 'Test123',
      confirmPassword: 'Test123',
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('errors');
    expect(res.body.errors).toHaveProperty('email');
    expect(res.body.errors.email).toEqual('Invalid email');
  });

  // Incorrect Registration - password is empty
  test('should not register a new user with empty password', async () => {
    const res = await request(app).post('/api/register').send({
      username: 'Marysia',
      email: 'marysia@gmail.com',
      password: '',
      confirmPassword: 'Test123',
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('errors');
    expect(res.body.errors).toHaveProperty('password');
    expect(res.body.errors.password).toEqual(
      'Password has to have at least: 5 characters, 1 lower- and uppercase letter and 1 digit.',
    );
  });

  // Incorrect Registration - password is too short
  test('should not register a new user with too short password', async () => {
    const res = await request(app).post('/api/register').send({
      username: 'Marysia',
      email: 'marysia@gmail.com',
      password: 'Ts@1',
      confirmPassword: 'Ts@1',
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('errors');
    expect(res.body.errors).toHaveProperty('password');
    expect(res.body.errors.password).toEqual(
      'Password has to have at least: 5 characters, 1 lower- and uppercase letter and 1 digit.',
    );
  });

  // Incorrect Registration - password needs one uppercase letter
  test('should not register a new user with password without uppercase letter', async () => {
    const res = await request(app).post('/api/register').send({
      username: 'Marysia',
      email: 'marysia@gmail.com',
      password: 'test123',
      confirmPassword: 'test123',
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('errors');
    expect(res.body.errors).toHaveProperty('password');
    expect(res.body.errors.password).toEqual(
      'Password has to have at least: 5 characters, 1 lower- and uppercase letter and 1 digit.',
    );
  });

  // Incorrect Registration - password needs one lowercase letter
  test('should not register a new user with password without lowercase letter', async () => {
    const res = await request(app).post('/api/register').send({
      username: 'Marysia',
      email: 'm@gmail.com',
      password: 'TEST123',
      confirmPassword: 'TEST123',
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('errors');
    expect(res.body.errors).toHaveProperty('password');
    expect(res.body.errors.password).toEqual(
      'Password has to have at least: 5 characters, 1 lower- and uppercase letter and 1 digit.',
    );
  });

  // Incorrect Registration - password needs one digit
  test('should not register a new user with password without digit', async () => {
    const res = await request(app).post('/api/register').send({
      username: 'Marysia',
      email: 'm@gmail.com',
      password: 'Testtest',
      confirmPassword: 'Testtest',
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('errors');
    expect(res.body.errors).toHaveProperty('password');
    expect(res.body.errors.password).toEqual(
      'Password has to have at least: 5 characters, 1 lower- and uppercase letter and 1 digit.',
    );
  });

  // Incorrect Registration - passwords do not match
  test('should not register a new user with passwords that do not match', async () => {
    const res = await request(app).post('/api/register').send({
      username: 'Marysia',
      email: 'm@gmail.com',
      password: 'Test@123',
      confirmPassword: 'Test@1234',
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('errors');
    expect(res.body.errors).toHaveProperty('password');
    expect(res.body.errors.password).toEqual('Passwords do not match');
  });

  // Incorrect Registration - email is invalid
  test('should not register a new user with invalid email', async () => {
    const res = await request(app).post('/api/register').send({
      username: 'Marysia',
      email: 'marysia',
      password: 'Test@123',
      confirmPassword: 'Test@123',
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('errors');
    expect(res.body.errors).toHaveProperty('email');
    expect(res.body.errors.email).toEqual('Invalid email');
  });

  // ALL LOGIN TESTS

  // Correct Login
  test('should login the existing user successfully', async () => {
    const res = await request(app).post('/api/login').send({
      username: 'testuser',
      password: 'Test@1234',
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('user');
    expect(res.body.user).toHaveProperty('username', 'testuser');
    expect(res.body.user).toHaveProperty('email', 'testuser@gmail.com');
  });

  // Incorrect Login - bad credentials
  test('should not login non-existing user', async () => {
    const res = await request(app).post('/api/login').send({
      username: 'nonexistent',
      password: 'Test@1234',
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('errors');
    expect(res.body.errors).toHaveProperty('login');
  });

  // Incorrect Login - empty credentials
  test('should not login with empty credentials', async () => {
    const res = await request(app).post('/api/login').send({
      username: '',
      password: '',
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('errors');
    expect(res.body.errors).toHaveProperty('login');
  });

  // Incorrect Login - correct username, incorrect password
  test('should not login with incorrect password', async () => {
    const res = await request(app).post('/api/login').send({
      username: 'Paulina',
      password: 'test@1234',
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('errors');
    expect(res.body.errors).toHaveProperty('login');
  });

  // Incorrect Login - correct password, incorrect username
  test('should not login with incorrect username', async () => {
    const res = await request(app).post('/api/login').send({
      username: 'paulina',
      password: 'Test@1234',
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('errors');
    expect(res.body.errors).toHaveProperty('login');
  });

  // ALL LOGOUT TESTS

  // Correct Logout
  test('should logout the existing user successfully', async () => {
    const loginRes = await request(app).post('/api/login').send({
      username: 'testuser',
      password: 'Test@1234',
    });

    const jwtCookie = loginRes.headers['set-cookie'][0];

    const res = await request(app).get('/api/logout').set('Cookie', jwtCookie);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('logout', true);
    expect(res.headers['set-cookie'][0]).toMatch(/^jwt=;/);
  });

  // ALL IS AUTHENTICATED TESTS

  // Correct isAuthenticated
  test('should return isAuthenticated true for logged in user', async () => {
    const loginRes = await request(app).post('/api/login').send({
      username: 'testuser',
      password: 'Test@1234',
    });

    const jwtCookie = loginRes.headers['set-cookie'][0];

    const res = await request(app)
      .get('/api/check-auth')
      .set('Cookie', jwtCookie);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('isAuthenticated', true);
    expect(res.body).toHaveProperty('user');
    expect(res.body.user).toHaveProperty('username', 'testuser');
  });

  // Incorrect isAuthenticated
  test('should return isAuthenticated false for not logged in user', async () => {
    const res = await request(app).get('/api/check-auth');
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('isAuthenticated', false);
  });

  // Incorrect isAuthenticated - malformed JWT
  test('should return isAuthenticated false for malformed JWT', async () => {
    const res = await request(app)
      .get('/api/check-auth')
      .set('Cookie', 'jwt=malformedToken');

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('isAuthenticated', false);
  });

  // Incorrect isAuthenticated - valid JWT, user not found
  test('should return isAuthenticated false for non-existent user', async () => {
    const nonExistentUserId = new mongoose.Types.ObjectId();
    const fakeToken = jwt.sign({ id: nonExistentUserId }, process.env.secret, {
      expiresIn: '1h',
    });
    const res = await request(app)
      .get('/api/check-auth')
      .set('Cookie', `jwt=${fakeToken}`);

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('isAuthenticated', false);
  });
});

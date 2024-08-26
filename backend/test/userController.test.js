const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const User = require('../models/User');
chai.use(chaiHttp);
const { expect } = chai;

describe('User API', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  it('should register a new user', async () => {
    const res = await chai.request(server).post('/api/users/register').send({
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'password123',
    });
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('token');
  });

  it('should login a user', async () => {
    const user = new User({
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'password123',
    });
    await user.save();

    const res = await chai.request(server).post('/api/users/login').send({
      email: 'testuser@example.com',
      password: 'password123',
    });
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('token');
  });
});

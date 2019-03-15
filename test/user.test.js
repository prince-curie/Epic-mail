/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import database from '../api/database/database';

chai.should();
chai.use(chaiHttp);
const { users } = database;
describe('GET users', () => {
  it('it should get all users', (done) => {
    chai.request(app)
      .get('/api/v1/users')
      .end((err, res) => {
        res.should.have.status(200);
        done(err);
      });
  });
  it('it should return an array', (done) => {
    chai.request(app)
      .get('/api/v1/users')
      .end((err, res) => {
        res.body.data.should.be.an('array');
        done(err);
      });
  });
  it('The array should have a length of three', (done) => {
    chai.request(app)
      .get('/api/v1/users')
      .end((err, res) => {
        res.body.data.should.have.lengthOf(3);
        done(err);
      });
  });
});

const request = {
  email: 'an@d.c',
  firstName: 'e go',
  lastName: 'be',
  password: 'see baby',
};

describe('Create user', () => {
  it('The request should return an object', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(request)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.an('object');
        done(err);
      });
  });
  it('The request should have data', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(request)
      .end((err, res) => {
        res.body.should.have.property('data');
        res.body.data.should.be.an('array');
        done(err);
      });
  });
  it('The request should return a array', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(request)
      .end((err, res) => {
        res.body.data.should.be.a('array');
        done(err);
      });
  });
});

const testValidity = {
  email: '',
  firstName: 'e go',
  lastName: 'be',
  password: 'see baby',
};

describe('testValidity', () => {
  it('The request should return an error if a field is missing', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(testValidity)
      .end((err, res) => {
        res.should.have.status(401);
        res.should.be.an('object');
        done(err);
      });
  });
});

const testDuplicate = {
  email: 'a@g.com',
  firstName: 'no',
  lastName: 'lele',
  password: 'abc123',
};

describe('testDuplicate', () => {
  it('The request should return an error if email exist', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(testDuplicate)
      .end((err, res) => {
        res.should.have.status(401);
        res.should.be.an('object');
        res.body.should.have.property('data');
        done(err);
      });
  });
});

const enter = {
  email: 'ba@g.com',
  password: 'abc123',
};
const dontEnter1 = {
  email: 'ba@g.com',
  password: '',
};
const dontEnter2 = {
  email: 'b@g.com',
  password: '',
};

describe('Signin', () => {
  it('should return an object with status 200', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(enter)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.have.property('data');
        done(err);
      });
  });
  it('should not process an empty string', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(dontEnter1)
      .end((err, res) => {
        res.should.have.status(401);
        done(err);
      });
  });
  it('should not process an unregistered user', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(dontEnter2)
      .end((err, res) => {
        res.should.have.status(401);
        done(err);
      });
  });
});

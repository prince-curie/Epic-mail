/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.should();
chai.use(chaiHttp);


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
  email: 'ah@d.c',
  firstName: 'e go',
  lastName: 'be',
  password: 'see baby',
};

describe('Create user', () => {
  it('The request should return an object', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send(request)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.an('object');
        res.body.should.have.property('data');
        res.body.data.should.be.a('string');
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
      .post('/api/v1/users/signup')
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
      .post('/api/v1/users/signup')
      .send(testDuplicate)
      .end((err, res) => {
        res.should.have.status(401);
        res.should.be.an('object');
        res.body.should.have.property('data').equal('request not authorized');
        done(err);
      });
  });
});

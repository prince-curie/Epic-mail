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

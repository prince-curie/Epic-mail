/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiDateTime from 'chai-datetime';
import app from '../index';

chai.should();
chai.use(chaiHttp);
chai.use(chaiDateTime);

const timeNow = new Date.Now();

const message = {
  subject: 'hello',
  message: 'lorem ipsum i dont know the rest',
};

describe('/POST create message', () => {
  it('should return 200', (done) => {
    chai.request(app)
      .get('/api/v1/messages')
      .send(message)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.data.should.be.an('array');
        res.body.should.have.property('status').equal(200);
        res.body.data[0].should.be.an('object');
        res.body.data[0].should.have.property('id').be.a('string');
        res.body.data[0].created0n.should.equalDate(timeNow);
        res.body.data[0].subject.should.be.a('string');
        res.body.data[0].message.should.be.a('string');
        res.body.data[0].parentMessageId.should.be.a('integer');
        res.body.data[0].status.should.equal('sent');
        done(err);
      });
  });
});

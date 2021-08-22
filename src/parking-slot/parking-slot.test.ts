import app from '../../server';
import chai from 'chai';
import chaiHttp from 'chai-http';

const should = chai.should();
chai.use(chaiHttp);

describe('Parking Slot', () => {
  describe('/GET parking-slot/park', () => {
    it('should set the parking slot for customer', (done) => {
      chai
        .request(app)
        .get('/parking-slot/park')
        .end((err: any, res: any) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});

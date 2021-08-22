import app from '../../server';
import { ParkingSlot } from './parking-slot.model';
import chai from 'chai';
import chaiHttp from 'chai-http';

const should = chai.should();
chai.use(chaiHttp);

describe('Parking Slot', () => {
  beforeEach((done) => {
    setEmpty();
    done();
  });

  describe('/GET parking-slot/park', () => {
    it('should set the parking slot for customer', (done) => {
      chai
        .request(app)
        .get('/parking-slot/park')
        .end((err: any, res: any) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('level');
          res.body.should.have.property('slot');
          done();
        });
    });

    it('should not give the parking slot if slots are full', (done) => {
      setFull();
      chai
        .request(app)
        .get('/parking-slot/park')
        .end((err: any, res: any) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('slots are full');
          done();
        });
    });
  });

  describe('/GET parking-slot/park/:slot', () => {
    it('should tell if the slot already empty if the slot is empty', (done) => {
      chai
        .request(app)
        .get('/parking-slot/park/b1-1')
        .end((err: any, res: any) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('slot already empty');
          done();
        });
    });

    it('should empty the requested slot and tell its emptied', (done) => {
      ParkingSlot.b1[0] = true;

      chai
        .request(app)
        .get('/parking-slot/park/b1-1')
        .end((err: any, res: any) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('slot emptied');
          done();
        });
    });

    it("should tell if there's no level 10 and slot 100", (done) => {
      chai
        .request(app)
        .get('/parking-slot/park/b10-100')
        .end((err: any, res: any) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have
            .property('message')
            .eql('no slot for level b10 and slot number 100');
          done();
        });
    });
  });
});

const setEmpty = () => {
  for (const level in ParkingSlot) {
    const levelSlot = ParkingSlot[level].fill(false);
    ParkingSlot[level] = levelSlot;
  }
};

const setFull = () => {
  for (const level in ParkingSlot) {
    const levelSlot = ParkingSlot[level].fill(true);
    ParkingSlot[level] = levelSlot;
  }
};

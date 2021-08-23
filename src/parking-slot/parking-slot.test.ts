import app from '../../server';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const should = chai.should();
chai.use(chaiHttp);

describe('Parking Slot', () => {
  beforeEach((done) => {
    setEmpty().then(() => {
      done();
    });
  });

  describe('/POST parking-slot/park', () => {
    it('should set the parking slot for customer', (done) => {
      chai
        .request(app)
        .post('/parking-slot/park')
        .send({ car_number: 'd 1234 ab' })
        .end((err: any, res: any) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('data');
          res.body.data.should.have.property('slot');
          res.body.data.should.have.property('level');
          done();
        });
    });

    it('should not give the parking slot if slots are full', (done) => {
      setFull().then(() => {
        chai
          .request(app)
          .post('/parking-slot/park')
          .send({ car_number: 'd 9999 ab' })
          .end((err: any, res: any) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('slots are full');
            done();
          });
      });
    });
  });

  describe('/POST parking-slot/leave/', () => {
    it('should empty the requested slot and tell its emptied', (done) => {
      setFull().then(() => {
        chai
          .request(app)
          .post('/parking-slot/leave')
          .send({ car_number: 'D 1251 TST' })
          .end((err: any, res: any) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('slot emptied');
            done();
          });
      });
    });
    it('should tell if the car is not exists in any slot', (done) => {
      chai
        .request(app)
        .post('/parking-slot/leave')
        .send({ car_number: 'D 1251 TST' })
        .end((err: any, res: any) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have
            .property('message')
            .eql('the car number does not exists in this parking slot');
          done();
        });
    });
  });
});

const setEmpty = async () => {
  await prisma.parkingSlot.deleteMany({ where: {} });
};

const setFull = async () => {
  const parkingLevel = await prisma.parkingLevel.findMany({});
  parkingLevel.forEach(async (level) => {
    const slots = Array.from({ length: level.max_slot }, (_, i) => i + 1);
    const result = await prisma.parkingSlot.createMany({
      data: slots.map((slot) => ({
        car_number: `D 12${level.id}${slot} TST`,
        slot: slot,
        parkingLevelId: level.id,
      })),
    });
  });
};

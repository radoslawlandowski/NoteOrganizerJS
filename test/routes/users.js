//add 2 tests

var mongoose = require("mongoose");
var User = require('../../models/User.js');

//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../bin/www');
var should = chai.should();

chai.use(chaiHttp);

describe('/GET users', () => {
      it('it should GET all the users', (done) => {
        chai.request(server)
            .get('/users')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.length(5);
                res.body.should.be.a('array');
                res.body.length.should.be.not.eql(0);
              done();
            });
      });
  });

var mongoose = require("mongoose");
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
chai.use(chaiHttp);
var server = require('../../../bin/www');

var User = require('../../../models/User.js');
var TestHelper = require('../../TestHelper');
var TestUsers = require('../../../data/TestUsers');

var firstUser;
var mail;

describe('Integration tests', () => {

  before(function() {
    firstUser = TestUsers.completeUser;
    mail = firstUser.mail;

    TestHelper.clearCollection();
    TestHelper.populateCollection();
  });

  describe('Users',() => {

    it('When getting tabs the data should be valid', (done) => {
      var requestUrl = '/api/users/' + mail + '/tabs';
      var expectedData = [firstUser.tabs[0], firstUser.tabs[1]];

      chai.request(server)
          .get(requestUrl)
          .end((err, res) => {
              res.should.have.status(200);
              res.should.be.json;
              res.body.should.be.an('array');
              res.body.should.deep.equal(expectedData);
              done();
          });
    });

    it('When getting notes the data should be valid', (done) => {
      var firstNote = firstUser.notes[0];
      var requestUrl = '/api/users/' + mail + '/notes';

      chai.request(server)
          .get(requestUrl)
          .end((err, res) => {
              res.body.should.be.a('array');
              res.body.should.have.length(3);

              var noteProperties = ['title', 'content', '_id', 'date', 'tab'];
              noteProperties.forEach(function(property) {
                res.body[0].should.have.property(property);
              });

              res.body[0].title.should.equal(firstNote.title);
              res.body[0].content.should.equal(firstNote.content);
              res.body[0].tab.should.equal(firstNote.tab);

            done();
          });
    });

    it('When posting tab already inside database it should return proper info', (done) => {
      var tab = firstUser.tabs[0];
      var requestUrl = '/api/users/' + mail + '/tabs';
      var expectedResponse = {};
      chai.request(server)
          .post(requestUrl)
          .send({name: tab})
          .end((err, res) => {
            console.log(res.body);
              res.body.should.deep.equal(expectedResponse);
              done();
      });
    });

  });
});

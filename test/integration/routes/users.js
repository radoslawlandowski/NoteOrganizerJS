var mongoose = require("mongoose");
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
chai.use(chaiHttp);
var server = require('../../../bin/www');

var User = require('../../../models/User.js');
var TestHelper = require('../../TestHelper');
var TestUsers = require('../../../data/TestUsers');

var config = require("../../../NoteOrganizer.config.json");

var firstUser;
var noTabsAndNotesUser;
var mail;

var maximumTabsNumber = config.Settings.General.maximumTabsNumber;

describe('Integration tests:', () => {

  before(function() {
    firstUser = TestUsers.completeUser;
    mail = firstUser.mail;

    noTabsAndNotesUser = TestUsers.noTabsAndNotesUser;

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

    it('When posting tab already inside database it should return 409 status code', (done) => {
      var tab = firstUser.tabs[0];
      var requestUrl = '/api/users/' + mail + '/tabs';

      chai.request(server)
          .post(requestUrl)
          .send({name: tab})
          .end((err, res) => {
              res.status.should.equal(409);
              done();
      });

    });

    it('When posting valid tab it should return this tab', (done) => {
      var tab = firstUser.tabs[0] + "UNIQUE";
      var requestUrl = '/api/users/' + mail + '/tabs';

      chai.request(server)
          .post(requestUrl)
          .send({name: tab})
          .end((err, res) => {
              res.status.should.equal(200);
              res.body.should.equal(tab);
              done();
            });
    });


    it('When posting valid note it should return this note with _id', (done) => {
      var requestUrl = '/api/users/' + mail + '/notes';
      var validNote = TestHelper.getValidNote();

      chai.request(server)
          .post(requestUrl)
          .send(validNote)
          .end((err, res) => {
              res.status.should.equal(200);
              res.body.should.have.property("_id");
              res.body.title.should.equal(validNote.title);
              res.body.content.should.equal(validNote.content);
              res.body.tab.should.equal(validNote.tab);
              done();
            });
    });
  });
});

var mongoose = require("mongoose");
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../bin/www');
var should = chai.should();
chai.use(chaiHttp);

var User = require('../../models/User.js');
var TestHelper = require('../TestHelper');
var TestUsers = require('../../data/TestUsers');

var firstUser;
var mail;

describe('routes/user.js', () => {

  before(function() {
    firstUser = TestUsers.completeUser;
    mail = firstUser.mail;

    TestHelper.clearCollection();
    TestHelper.populateCollection();
  });

  describe('When GET request',() => {

    it('without parameters it should get all the users', (done) => {
      chai.request(server)
          .get('/api/users')
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.length(3);
              res.body.should.be.a('array');
              res.body.length.should.be.not.eql(0);
            done();
          });
    });

    it('with :id as parameter user\'s notes should be correct', (done) => {
      var requestUrl = '/api/users/' + mail;

      chai.request(server)
          .get(requestUrl)
          .end((err, res) => {
              res.should.have.status(200);
              res.should.be.json;
              res.body.should.be.a('object');

              var bodyProperties = ['_id', 'mail', 'password', 'notes', 'tabs'];
              bodyProperties.forEach(function(property) {
                res.body.should.have.property(property);
              });

            done();
          });
    });

    it('with :id as parameter user\'s notes should be correct', (done) => {
      var firstNote = firstUser.notes[0];
      var requestUrl = '/api/users/' + mail + '/notes';

      chai.request(server)
          .get(requestUrl)
          .end((err, res) => {
              res.body.should.be.a('array');
              res.body.should.have.length(3);

              var noteProperties = ['title', 'content', 'tab', '_id', 'date'];
              noteProperties.forEach(function(property) {
                res.body[0].should.have.property(property);
              });

              res.body[0].title.should.equal(firstNote.title);
              res.body[0].content.should.equal(firstNote.content);
              res.body[0].tab.should.equal(firstNote.tab);
            done();
          });
    });

    it('with :id as parameter user\'s tabs should be correct', (done) => {
      var tabs = firstUser.tabs;
      var requestUrl = '/api/users/' + mail + '/tabs';

      chai.request(server)
          .get(requestUrl)
          .end((err, res) => {
              res.body.should.have.length(3);

      var index = 0;
      tabs.forEach(function(tab) {
        res.body[index].name.should.equal(tab.name);
        index++;
      });
      done();
      });
    });
  });
});

//add 2 tests

var mongoose = require("mongoose");
var User = require('../../models/User.js');

//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../bin/www');
var should = chai.should();

var usersData = require('../../data/initialUsers.json');

chai.use(chaiHttp);

var firstUser;
var userId;

describe('routes/user.js', () => {
  describe('When GET request',() => {
    before(function() {
      firstUser = usersData.users[0];
      userId = "585d599abdc2ba36bcd48dd6";
    })

    it('without parameters it should get all the users', (done) => {
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

    it('with :id as parameter user data should be correct', (done) => {
      var requestUrl = '/users/' + userId;

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

              res.body._id.should.equal(userId);
              res.body.mail.should.equal(firstUser.mail);
              res.body.password.should.equal(firstUser.password);
            done();
          });
    });

    it('with :id as parameter user\'s notes should be correct', (done) => {
      var firstNote = firstUser.notes[0];
      var requestUrl = '/users/' + userId;

      chai.request(server)
          .get(requestUrl)
          .end((err, res) => {
              res.body.notes.should.be.a('array');
              res.body.notes.should.have.length(2);

              var noteProperties = ['title', 'content', 'tab', '_id', 'updated_at'];
              noteProperties.forEach(function(property) {
                res.body.notes[0].should.have.property(property);
              });

              res.body.notes[0].title.should.equal(firstNote.title);
              res.body.notes[0].content.should.equal(firstNote.content);
              res.body.notes[0].tab.should.equal(firstNote.tab);
              res.body.notes[0]._id.should.equal('585d599abdc2ba36bcd48dd8');
            done();
          });
    });

    it('with :id as parameter user\'s tabs should be correct', (done) => {
      var tabs = firstUser.tabs;
      var requestUrl = '/users/' + userId;

      chai.request(server)
          .get(requestUrl)
          .end((err, res) => {
              res.body.tabs.should.have.length(3);

      var index = 0;
      tabs.forEach(function(tab) {
        res.body.tabs[index].should.equal(tab);
        index++;
      });
      done();
      });
    });
  });
});

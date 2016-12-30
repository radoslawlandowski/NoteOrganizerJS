var User = require('../models/User');
var Note = require('../models/Note');
var Tab = require('../models/Tab');

var noteOne = new Note({
  title: "noteTitleOne",
  content: "noteContentOne",
  tab: "one"
});

var noteTwo = new Note({
  title: "noteTitleTwo",
  content: "noteContentTwo",
  tab: "one"
});

var noteThree = new Note({
  title: "noteTitleThree",
  content: "noteContentThree",
  tab: "one"
});

var completeUser = new User({
  mail: "userMailOne",
  password: "userPasswordOne",
  tabs: ["one", "two"],
  notes: [noteOne, noteTwo, noteThree]
});

var noNotesUser = new User({
  mail: "userMailTwo",
  password: "userPasswordTwo",
  tabs: ["one", "two", "three"],
  notes: []
});

var noTabsAndNotesUser = new User({
  mail: "userMailThree",
  password: "userPasswordThree",
  tabs: [],
  notes: []
});

module.exports.completeUser = completeUser;
module.exports.noNotesUser = noNotesUser;
module.exports.noTabsAndNotesUser = noTabsAndNotesUser;

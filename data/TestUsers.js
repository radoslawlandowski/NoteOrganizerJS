var User = require('../models/User');
var Note = require('../models/Note');
var Tab = require('../models/Tab');

var tabOne = new Tab({name: "tabOne"});
var tabTwo = new Tab({name: "tabTwo"});
var tabThree = new Tab({name: "tabThree"});

var noteOne = new Note({
  title: "noteTitleOne",
  content: "noteContentOne",
  tab: "noteTabOne"
});

var noteTwo = new Note({
  title: "noteTitleTwo",
  content: "noteContentTwo",
  tab: "noteTabTwo"
});

var noteThree = new Note({
  title: "noteTitleThree",
  content: "noteContentThree",
  tab: "noteTabThree"
});

var completeUser = new User({
  mail: "userMailOne",
  password: "userPasswordOne",
  tabs: [tabOne, tabTwo, tabThree],
  notes: [noteOne, noteTwo, noteThree]
});

var noNotesUser = new User({
  mail: "userMailTwo",
  password: "userPasswordTwo",
  tabs: [tabOne, tabTwo, tabThree],
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

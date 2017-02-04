'use strict';

function Note() {
  var titleInputId = "titleInput";
  var tabInputId = "tabInput";
  var contentInputId = "contentInput";
  var editNoteButtonId = "editNoteButton";
  var deleteNoteButtonId = "deleteNoteButton";
  var discardNoteButtonId = "discardNoteButton";
  var confirmNoteButtonId = "confirmNoteButton";
  var noteIdPattern = "note-{tab}-{title}";
  var newNoteId = "newNoteId";

  this.getNote = function(tab, title) {
    return _getNote(tab, title);
  };

  this.getNotes = function(tab) {
  };

  this.getNewNote = function(tab) {
    return element(by.id(newNoteId));
  };

  this.getTitle = function(note) {
    return _getNoteInputText(note, titleInputId);
  };

  this.getContent = function(note) {
    return _getNoteInputText(note, contentInputId);
  }

  this.getTab = function(note) {
    return _getNoteInputText(note, tabInputId);
  };

  this.deleteNote = function(note) {
    return _clickButton(note, deleteNoteButtonId);
  };

  this.editNote = function(note) {
    return _clickButton(note, editNoteButtonId);
  };

  this.confirmNote = function(note) {
    return _clickButton(note, confirmNoteButtonId);
  };

  this.discardNote = function(note) {
    return _clickButton(note, discardNoteButtonId);
  };

  this.enterTitle = function(note, title) {
    _fillInput(note, titleInputId, title);
  };

  this.enterContent = function(note, content) {
    _fillInput(note, contentInputId, content);
  };

  this.enterTab = function(note, tab) {
    _fillInput(note, tabInputId, tab);
  };

  function _getNote(tab, title) {
    return element(by.id(_prepareNoteId(tab, title)));
  };

  function _getNoteInput(note, input) {
    return note.element(by.id(input));
  };

  function _getNoteInputText(note, input) {
    return _getNoteInput(note, input).getAttribute("value").then(function(r) {
      return r;
    });
  };

  function _clickButton(note, button) {
    note.element(by.id(button)).click();
  };

  function _fillInput(note, input, content) {
    _getNoteInput(note, input).sendKeys(content);
  };

  function _prepareNoteId(tab, title) {
    return noteIdPattern.replace("{tab}", tab).replace("{title}", title);
  };
};

module.exports = Note;

// define(['angular', 'angularMocks', 'application/services/NoteService', 'application/constants/UrlPaths', 'application/factories/NoteFactory'], function(angular) {
//
//     describe('NoteService', function() {
//         beforeEach(angular.mock.module('NoteOrganizerModule'));
//
//         var noteService, urlPaths, $httpBackend, noteFactory, iShouldNeverBeInvoked;
//         beforeEach(inject(function(_NoteService_, _UrlPaths_, _$httpBackend_, _NoteFactory_) {
//             noteService = _NoteService_;
//             urlPaths = _UrlPaths_;
//             $httpBackend = _$httpBackend_;
//             noteFactory = _NoteFactory_;
//
//             iShouldNeverBeInvoked = jasmine.createSpy('iShouldNeverBeInvoked');
//
//         }));
//
//         afterEach(function() {
//           $httpBackend.verifyNoOutstandingExpectation();
//           $httpBackend.verifyNoOutstandingRequest();
//         });
//
//         var expectedResponse = [
//              {"id": 5, "title": "title", "content": "content", "date": 1451606400000, "tab": "tab"},
//              {"id": 6, "title": "title", "content": "content", "date": 1451606400000, "tab": "tab"},
//              {"id": 7, "title": "title", "content": "content", "date": 1451606400000, "tab": "tab"}
//          ];
//
//         describe('When getting notes for owner', function() {
//             it('it should return an array of notes', function() {
//                 $httpBackend.expectGET(urlPaths.note.all).respond(200, expectedResponse);
//
//                 var notes = [];
//                 noteService.notes().then(function(response) {
//                     notes = response;
//                 }, function() {
//                     iShouldNeverBeInvoked();
//                 });
//
//                 $httpBackend.flush();
//
//                 expect(notes).toEqual(expectedResponse);
//                 expect(iShouldNeverBeInvoked.calls.count()).toEqual(0);
//
//             });
//
//             it('it should return a note with matching id', function() {
//                 var noteId = 5;
//                 $httpBackend.expectGET(urlPaths.note.byId,
//                     {"Accept":"application/json, text/plain, */*"},
//                     {id: noteId})
//                     .respond(200, expectedResponse[0]);
//
//                 var note;
//                 noteService.byId(noteId).then(function(response) {
//                     note = response;
//                 }, function() {
//                     iShouldNeverBeInvoked();
//                 });
//
//                 $httpBackend.flush();
//
//                 expect(note).toEqual(expectedResponse[0]);
//                 expect(iShouldNeverBeInvoked.calls.count()).toEqual(0);
//             });
//
//             it('it should return a message with http status', function() {
//                 var noteId = 5;
//                 var errorStatusCode = 400;
//
//                 $httpBackend.expectGET(urlPaths.note.byId,
//                     {"Accept":"application/json, text/plain, */*"},
//                     {id: noteId})
//                     .respond(400, '');
//
//                 var messageExpected = "Could not get note by id. Status: " + errorStatusCode;
//                 var messageAchieved;
//
//                 noteService.byId(noteId).then(function(response) {
//                     iShouldNeverBeInvoked();
//                 }, function(failure) {
//                     messageAchieved = failure;
//                 });
//
//                 $httpBackend.flush();
//
//                 expect(messageAchieved).toEqual(messageExpected);
//                 expect(iShouldNeverBeInvoked.calls.count()).toEqual(0);
//             });
//         });
//
//         describe('When creating a note', function() {
//             it('it should return the created note', function() {
//                 var note = noteFactory.createNote();
//                 note.title = "Test title",
//                 note.content = "Test content",
//                 note.tab = "Test tab",
//
//                 $httpBackend.expectPUT(urlPaths.note.create, note).respond(200, note);
//
//                 var createdNote;
//                 noteService.create(note).then(function(response) {
//                     createdNote = response;
//                 }, function() {
//                     iShouldNeverBeInvoked();
//                 });
//
//                 $httpBackend.flush();
//
//                 expect(createdNote).toEqual(note);
//                 expect(iShouldNeverBeInvoked.calls.count()).toEqual(0);
//
//             });
//         });
//
//     });
// });

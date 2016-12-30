 define(['angular', 'angularMocks', 'application/services/NoteService', 'application/constants/NotificationMessages', 'application/constants/UrlPaths'], function(angular) {

     describe('NoteService', function() {
         beforeEach(angular.mock.module('NoteOrganizerModule'));

         var noteService, UrlPaths, $httpBackend, iShouldNeverBeInvoked, NotificationMessages, $rootScope;
         beforeEach(inject(function(_NoteService_, _UrlPaths_, _$httpBackend_, _NotificationMessages_, _$rootScope_) {
             noteService = _NoteService_;
             UrlPaths = _UrlPaths_;
             $httpBackend = _$httpBackend_;
             NotificationMessages = _NotificationMessages_;
             $rootScope = _$rootScope_;

             iShouldNeverBeInvoked = jasmine.createSpy('iShouldNeverBeInvoked');
         }));

         afterEach(function() {
           $httpBackend.verifyNoOutstandingExpectation();
           $httpBackend.verifyNoOutstandingRequest();

           expect(iShouldNeverBeInvoked.calls.any()).toEqual(false);
         });

         var expectedResponse = [
            {
              "_id": "5866bc733212b134deac0406",
              "content": "noteContentOne",
              "title": "noteTitleOne",
              "tab": "one",
              "date": "2016-12-30T19:58:43.352Z"
            },
            {
              "_id": "5866bc733212b134deac0407",
              "content": "noteContentTwo",
              "title": "noteTitleTwo",
              "tab": "one",
              "date": "2016-12-30T19:58:43.355Z"
            },
            {
              "_id": "5866bc733212b134deac0408",
              "content": "noteContentThree",
              "title": "noteTitleThree",
              "tab": "one",
              "date": "2016-12-30T19:58:43.355Z"
            }
          ];

         describe('When getting notes', function() {
             it('it should return an array of notes', function() {
                 $httpBackend.expectGET(UrlPaths.notes).respond(200, expectedResponse);

                 var notes = [];
                 noteService.all().then(function(response) {
                     notes = response;
                 }, function() {
                     iShouldNeverBeInvoked();
                 });

                 $httpBackend.flush();

                 expect(notes).toEqual(expectedResponse);
             });
         });

         describe('When sending a new and valid note', function() {
             it('it should call POST request and return the created note', function() {
                 var note = {
                   title: "Test title",
                   content: "Test content",
                   tab: "Test tab"
                 };

                 $httpBackend.expectPOST(UrlPaths.notes, note).respond(200, note);

                 var createdNote;
                 var notification;
                 noteService.send(note).then(function(response) {
                     createdNote = response.note;
                     notification = response.message;
                 }, function() {
                     iShouldNeverBeInvoked();
                 });

                 $httpBackend.flush();

                 expect(createdNote).toEqual(note);
                 expect(notification).toEqual(NotificationMessages.NOTE_CREATED);
             });
         });

         describe('When sending an edited and valid note', function() {
             it('it should call PUT request and return the created note', function() {
                 var note = {
                   _id: "anyId",
                   title: "Test title",
                   content: "Test content",
                   tab: "Test tab"
                 };

                 $httpBackend.expectPUT(UrlPaths.notes, note).respond(200, note);

                 var createdNote;
                 var notification;
                 noteService.send(note).then(function(response) {
                     createdNote = response.note;
                     notification = response.message;
                 }, function() {
                     iShouldNeverBeInvoked();
                 });

                 $httpBackend.flush();

                 expect(createdNote).toEqual(note);
                 expect(notification).toEqual(NotificationMessages.NOTE_EDITED);
             });
         });

         describe('When sending a new and invalid note', function() {
             it('it should reject the promise with a proper notification', function() {
                 var invalidNote = {
                   tab: "Test tab"
                 };

                 var createdNote;
                 var notification;
                 noteService.send(invalidNote).then(function() {
                    iShouldNeverBeInvoked();
                 }, function(failure) {
                   notification = failure;
                 });

                 $rootScope.$apply();

                 expect(notification).toEqual(NotificationMessages.NOTE_TITLE_UNDEFINED);
             });
         });

     });
 });

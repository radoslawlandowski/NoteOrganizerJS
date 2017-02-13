 define(['angular', 
    'angularMocks', 
    'application/controllers/TabsetController', 
    'application/services/NoteService', 
    'application/services/DialogService', 
    'application/services/TabService'], 
 function(angular) {

        var notes = [
             {"_id":5,"title":"title","content":"content","date":1451606400000,"owner":null,"tab":"tab"},
             {"_id":6,"title":"title","content":"content","date":1451606400000,"owner":null,"tab":"tab"},
             {"_id":7,"title":"title","content":"content","date":1451606400000,"owner":null,"tab":"tab"},
             {"_id":8,"title":"title","content":"content","date":1451606400000,"owner":null,"tab":"tab"},
             {"_id":9,"title":"title","content":"content","date":1451606400000,"owner":null,"tab":"tab"},
             {"_id":11,"title":"title","content":"content","date":null,"owner":null,"tab":"tab"},
             {"_id":12,"title":"title","content":"content","date":null,"owner":null,"tab":"tab"},
             {"_id":13,"title":"title","content":"content","date":null,"owner":null,"tab":"tab"},
             {"_id":14,"title":"title","content":"content","date":null,"owner":null,"tab":"tab"},
             {"_id":15,"title":"title","content":"content","date":null,"owner":null,"tab":"tab"},
             {"_id":16,"title":"title","content":"content","date":null,"owner":null,"tab":"tab"},
             {"_id":20,"title":"title","content":"content","date":null,"owner":null,"tab":"tab"},
             {"_id":22,"title":"title","content":"content","date":1472053797234,"owner":null,"tab":"tab"},
             {"_id":21,"title":"EDITED","content":"EDITED","date":1472054423925,"owner":null,"tab":null},
             {"_id":23,"title":"EDITED","content":"EDITED","date":1472054432354,"owner":null,"tab":null},
             {"_id":25,"title":"EDITED","content":"EDITED","date":1472054586105,"owner":null,"tab":"main"},
             {"_id":26,"title":"EDITED","content":"EDITED","date":null,"owner":null,"tab":"main"},
             {"_id":27,"title":"EDITED","content":"EDITED","date":null,"owner":null,"tab":"main"},
             {"_id":28,"title":"EDITED","content":"EDITED","date":null,"owner":null,"tab":"main"},
             {"_id":29,"title":"EDITED","content":"EDITED","date":null,"owner":null,"tab":"main"},
             {"_id":30,"title":"ToSchool","content":"ToSchool","date":null,"owner":null,"tab":"School"}
          ];

          var noteToBeSent = notes[0];

          var tabs = [
             {"_id": 1, "name": "First"},
             {"_id": 2, "name": "Second"},
             {"_id": 3, "name": "Third"},
             {"_id": 4, "name": "Fourth"}
          ];

     describe('TabsetController:', function() {
         beforeEach(angular.mock.module('NoteOrganizerModule'));

         var $controller, $state, $scope, noteService, q, tabsetController, deferred, tabService, dialogService;
         beforeEach(inject(function(_$controller_, _$state_, _NoteService_, _TabService_, $q, _$rootScope_, _DialogService_){
             $controller = _$controller_;
             $state = _$state_;
             noteService = _NoteService_;
             dialogService = _DialogService_;
             q = $q;
             $scope = _$rootScope_.$new();
             tabService = _TabService_;

             deferred = q.defer();
             deferredTabService = q.defer();
             deferredDialogService = q.defer();

             spyOn(noteService, 'all').and.returnValue(deferred.promise);
             spyOn(noteService, 'send').and.returnValue(deferred.promise);
             spyOn(noteService, 'delete').and.returnValue(deferred.promise);

             spyOn(tabService, 'all').and.returnValue(deferredTabService.promise);

             spyOn(dialogService, 'getDeleteNoteDialog').and.returnValue(deferredDialogService.promise);

             spyOn($state, 'go').and.stub();

             tabsetController = $controller('TabsetController', {NoteService: noteService, DialogService: dialogService, $state: $state, $scope: $scope, notes: notes, tabs: tabs});
         }));

         describe('1. when controller has just been created', function() {
             it('1.0. it have notes and tabs already initialized', function() {

                 deferred.resolve(notes);
                 deferredTabService.resolve(tabs);
                 $scope.$apply();

                 expect($scope.notes).toEqual(notes);
                 expect($scope.tabs).toEqual(tabs);
             });

         });

         describe('2. when sendNote has been called:', function() {
             it('2.0. it should call NoteService.create(note) and call $state.go()', function() {
                 tabsetController.sendNote(noteToBeSent);
                 expect(noteService.send).toHaveBeenCalledWith(noteToBeSent);

                 var response = {
                     'note': noteToBeSent,
                     'message': 'asd'
                 };

                 deferred.resolve(response);
                 $scope.$apply();
             });
         });

         describe('3. when deleteNote has been called:', function() {
             it('3.0. it should call NoteService.deleteNote(note) and call $state.go()', function() {
                 tabsetController.deleteNote(noteToBeSent);
                 expect(dialogService.getDeleteNoteDialog).toHaveBeenCalled();
                 
                 deferredDialogService.resolve();
                 $scope.$apply();

                 var noteCount = $scope.notes.length;

                 expect(noteService.delete).toHaveBeenCalledWith(noteToBeSent);
                 var response = {
                     noteId: noteToBeSent._id
                 };

                 deferred.resolve(response);
                 $scope.$apply();

                 var noteCountAfter = $scope.notes.length;

                 expect(noteCount - noteCountAfter).toEqual(1);
                 expect($state.go).toHaveBeenCalledWith('tdp.notes');
             });
         });

     });
 });

// define(['angular', 'angularMocks', 'application/controllers/TabsetController', 'application/services/NoteService', 'application/services/TabService'], function(angular) {
//
//     describe('TabsetController:', function() {
//         beforeEach(angular.mock.module('tdpInvestModule'));
//
//         var $controller, $state, noteService, q, tabsetController, deferred, tabService;
//         beforeEach(inject(function(_$controller_, _$state_, _NoteService_, _TabService_, _DefaultTabs_, $q, _$rootScope_){
//             $controller = _$controller_;
//             $state = _$state_;
//             noteService = _NoteService_;
//             q = $q;
//             $scope = _$rootScope_.$new();
//             tabService = _TabService_;
//
//             deferred = q.defer();
//             deferredTabService = q.defer();
//
//             spyOn(noteService, 'notes').and.returnValue(deferred.promise);
//             spyOn(noteService, 'create').and.returnValue(deferred.promise);
//             spyOn(noteService, 'delete').and.returnValue(deferred.promise);
//
//             spyOn(tabService, 'all').and.returnValue(deferredTabService.promise);
//
//             spyOn($state, 'reload');
//
//             tabsetController = $controller('TabsetController', {NoteService: noteService});
//         }));
//
//         var notes = [
//             {"id":5,"title":"title","content":"content","date":1451606400000,"owner":null,"tab":"tab"},
//             {"id":6,"title":"title","content":"content","date":1451606400000,"owner":null,"tab":"tab"},
//             {"id":7,"title":"title","content":"content","date":1451606400000,"owner":null,"tab":"tab"},
//             {"id":8,"title":"title","content":"content","date":1451606400000,"owner":null,"tab":"tab"},
//             {"id":9,"title":"title","content":"content","date":1451606400000,"owner":null,"tab":"tab"},
//             {"id":11,"title":"title","content":"content","date":null,"owner":null,"tab":"tab"},
//             {"id":12,"title":"title","content":"content","date":null,"owner":null,"tab":"tab"},
//             {"id":13,"title":"title","content":"content","date":null,"owner":null,"tab":"tab"},
//             {"id":14,"title":"title","content":"content","date":null,"owner":null,"tab":"tab"},
//             {"id":15,"title":"title","content":"content","date":null,"owner":null,"tab":"tab"},
//             {"id":16,"title":"title","content":"content","date":null,"owner":null,"tab":"tab"},
//             {"id":20,"title":"title","content":"content","date":null,"owner":null,"tab":"tab"},
//             {"id":22,"title":"title","content":"content","date":1472053797234,"owner":null,"tab":"tab"},
//             {"id":21,"title":"EDITED","content":"EDITED","date":1472054423925,"owner":null,"tab":null},
//             {"id":23,"title":"EDITED","content":"EDITED","date":1472054432354,"owner":null,"tab":null},
//             {"id":25,"title":"EDITED","content":"EDITED","date":1472054586105,"owner":null,"tab":"main"},
//             {"id":26,"title":"EDITED","content":"EDITED","date":null,"owner":null,"tab":"main"},
//             {"id":27,"title":"EDITED","content":"EDITED","date":null,"owner":null,"tab":"main"},
//             {"id":28,"title":"EDITED","content":"EDITED","date":null,"owner":null,"tab":"main"},
//             {"id":29,"title":"EDITED","content":"EDITED","date":null,"owner":null,"tab":"main"},
//             {"id":30,"title":"ToSchool","content":"ToSchool","date":null,"owner":null,"tab":"School"}
//          ];
//
//          var noteToBeSent = notes[0];
//
//          var tabs = [
//             {"id": 1, "name": "First"},
//             {"id": 2, "name": "Second"},
//             {"id": 3, "name": "Third"},
//             {"id": 4, "name": "Fourth"}
//          ];
//
//
//         describe('1. when controller has just been created', function() {
//             it('1.0. it should call "NoteService.getNotesForOwner()" to initialize "notes" and "TabService.all()" to initialize "tabs"', function() {
//
//                 deferred.resolve(notes);
//                 deferredTabService.resolve(tabs);
//                 $scope.$apply();
//
//                 expect(tabsetController.notes).toEqual(notes);
//                 expect(tabsetController.tabs).toEqual(tabs);
//             });
//
//         });
//
//         describe('2. when sendNote has been called:', function() {
//             it('2.0. it should call NoteService.create(note) and call $state.reload()', function() {
//                 tabsetController.sendNote(noteToBeSent);
//                 expect(noteService.create).toHaveBeenCalledWith(noteToBeSent);
//
//                 deferred.resolve(noteToBeSent);
//                 $scope.$apply();
//
//                 expect($state.reload).toHaveBeenCalled();
//             });
//         });
//
//         describe('3. when deleteNote has been called:', function() {
//             it('3.0. it should call NoteService.deleteNote(note) and call $state.reload()', function() {
//                 tabsetController.deleteNote(noteToBeSent);
//                 expect(noteService.delete).toHaveBeenCalledWith(noteToBeSent);
//
//                 deferred.resolve(noteToBeSent);
//                 $scope.$apply();
//
//                 expect($state.reload).toHaveBeenCalled();
//             });
//         });
//
//     });
// });

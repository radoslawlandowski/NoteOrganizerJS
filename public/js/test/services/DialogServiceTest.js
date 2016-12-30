define(['angular', 'angularMocks', 'application/services/DialogService', 'application/constants/DialogMessages'], function (angular) {

    describe('DialogService:', function () {
        beforeEach(angular.mock.module('NoteOrganizerModule'));

        beforeEach(function() {
          module(function($provide){
            $provide.service('ngDialog', function(){
              this.openConfirm = jasmine.createSpy('openConfirm');
            });
          });
        });

        var DialogService;
        var DialogMessages;
        var mockNgDialog;
        var $scope;
        var expected;
        var dialogMethods;

        beforeEach(inject(function (_$rootScope_, _DialogService_, _DialogMessages_, ngDialog) {
            DialogService = _DialogService_;
            DialogMessages = _DialogMessages_;
            mockNgDialog = ngDialog;
            $scope = _$rootScope_.$new();
            
            expected  = {
                template: 'html/partials/parametrizedDialog.html',
                className: 'ngdialog-theme-default',
                scope: $scope
            },

            dialogMethods = [
              { method: DialogService.getDeleteDialog, message: DialogMessages.TAB_DELETION},
              { method: DialogService.getDeleteNoteDialog, message: DialogMessages.NOTE_DELETION},
              { method: DialogService.getNewTabDialog, message: DialogMessages.TAB_CREATION},
              { method: DialogService.getNoTabsDialog, message: DialogMessages.NO_TABS_AVAILABLE}
            ];

        }));

        describe('When getting various dialogs', function () {
            it('it should call ngDialog methods with proper arguments', function () {
                for(var i = 0 ; i < dialogMethods.length ; i++) {
                  dialogMethods[i].method();

                  var actual = mockNgDialog.openConfirm.calls.mostRecent().args[0];
                  expected.scope.content =  dialogMethods[i].message;

                  expect(mockNgDialog.openConfirm).toHaveBeenCalled();
                  expect(actual.template).toEqual(expected.template);
                  expect(actual.className).toEqual(expected.className);
                  expect(actual.scope.content).toEqual(expected.scope.content);
                }
            });
        });
    });
});

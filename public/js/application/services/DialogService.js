define(['angular', 'application/NoteOrganizerModule', 'application/constants/HttpCodes'], function(angular, NoteOrganizerModule) {
    NoteOrganizerModule.service("DialogService", function($rootScope, DialogMessages, ngDialog) {

        function getDialog(content) {

            var $scope = $rootScope.$new(false);
            $scope.content = content;

            var dialog = ngDialog.openConfirm({
                template: 'html/partials/parametrizedDialog.html',
                className: 'ngdialog-theme-default',
                scope: $scope
            });

            return dialog;
        };

        this.getDeleteDialog = function() {
            return getDialog(DialogMessages.TAB_DELETION);
        };

        this.getDeleteNoteDialog = function() {
            return getDialog(DialogMessages.NOTE_DELETION);
        };

        this.getNewTabDialog = function() {
            return getDialog(DialogMessages.TAB_CREATION);
        };

        this.getNoTabsDialog = function () {
            return getDialog(DialogMessages.NO_TABS_AVAILABLE);
        };

    });
});

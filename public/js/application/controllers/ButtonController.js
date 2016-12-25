define(['angular', 'application/NoteOrganizerModule'], function(angular, NoteOrganizerModule) {
    NoteOrganizerModule.controller("ButtonController", function($state) {

        var vm = this;

        vm.goToNewNoteState = function() {
            $state.go('tdp.newNote');
        };

        vm.goToNotesState = function() {
            $state.go('tdp.notes');
        };

        vm.goToSettingsState = function() {
            $state.go('tdp.settings');
        };

        vm.goToAboutState = function() {
            $state.go('tdp.about');
        };

    });
});

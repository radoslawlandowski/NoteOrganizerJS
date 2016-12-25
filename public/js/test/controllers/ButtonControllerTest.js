define(['angular', 'angularMocks', 'application/controllers/ButtonController'], function(angular) {

    describe('ButtonController:', function() {
        beforeEach(angular.mock.module('tdpInvestModule'));

        var $controller, $state, buttonController;
        beforeEach(inject(function(_$controller_, _$state_){
            $controller = _$controller_;
            $state = _$state_;

            buttonController = $controller('ButtonController');
            spyOn($state, 'go');

        }));

        describe('when invoking function "goToNewNoteState"', function() {
            it('it should call "$state.go" with "tdp.newNote"', function() {
                buttonController.goToNewNoteState();
                expect($state.go).toHaveBeenCalledWith('tdp.newNote');
            });
        });

        describe('when invoking function "goToNotesState"', function() {
            it('it should call "$state.go" with "tdp.notes"', function() {
                buttonController.goToNotesState();
                expect($state.go).toHaveBeenCalledWith('tdp.notes');
            });
        });

        describe('when invoking function "goToSettingsState"', function() {
            it('it should call "$state.go" with "tdp.settings"', function() {
                buttonController.goToSettingsState();
                expect($state.go).toHaveBeenCalledWith('tdp.settings');
            });
        });

        describe('when invoking function "goToAboutState"', function() {
            it('it should call "$state.go" with "tdp.about"', function() {
                buttonController.goToAboutState();
                expect($state.go).toHaveBeenCalledWith('tdp.about');
            });
        });
    });
});

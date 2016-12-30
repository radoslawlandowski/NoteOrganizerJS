define(['angular', 'angularMocks', 'application/constants/UrlPaths'], function(angular) {

    describe('UrlPaths', function() {
        beforeEach(angular.mock.module('NoteOrganizerModule'));

        var urlPaths;
        beforeEach(inject(function(_UrlPaths_){
            urlPaths = _UrlPaths_;
        }));

        describe('When calling a field it should return proper strings for', function() {
            it('notes', function() {
                var expectedNote = '/api/users/userMailOne/notes';
                expect(urlPaths.notes).toEqual(expectedNote);
            });

            it('tabs', function() {
                var expectedTab = "/api/users/userMailOne/tabs";
                expect(urlPaths.tabs).toEqual(expectedTab);
            });
        });

    });
});

define(['angular', 'angularMocks', 'application/constants/UrlPaths'], function(angular) {

    describe('UrlPaths', function() {
        beforeEach(angular.mock.module('tdpInvestModule'));

        var urlPaths;
        beforeEach(inject(function(_UrlPaths_){
            urlPaths = _UrlPaths_;
        }));

        describe('When calling a field it should return proper strings for', function() {
            it('notes', function() {
                var expectedNote = {
                    all:  "/api/notes/all",
                    byId: "/api/notes/id",
                    create: "/api/notes/create",
                    delete: "/api/notes/delete"
                };

                expect(urlPaths.notes).toEqual(expectedNote);
            });

            it('tabs', function() {
                var expectedTab = {
                    all:  "/api/tabs/all",
                    byId: "/api/tabs/id",
                    create: "/api/tabs/create",
                    delete: "/api/tabs/delete"
                };

                expect(urlPaths.tabs).toEqual(expectedTab);
            });
        });

    });
});

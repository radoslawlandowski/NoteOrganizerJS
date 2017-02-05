define(['angular', 'angularMocks', 'application/services/TabService', 'application/constants/UrlPaths', 'application/constants/HttpCodes', 'application/constants/NotificationMessages'], function (angular) {

    describe('TabService:', function () {
        beforeEach(angular.mock.module('NoteOrganizerModule'));

        var $httpBackend, $rootScope;
        var TabService;
        var UrlPaths, HttpCodes, NotificationMessages;

        beforeEach(inject(function (_$httpBackend_, _$rootScope_, _TabService_, _UrlPaths_, _HttpCodes_, _NotificationMessages_) {
            $httpBackend = _$httpBackend_;
            $rootScope = _$rootScope_;

            TabService = _TabService_;

            UrlPaths = _UrlPaths_;
            HttpCodes = _HttpCodes_;
            NotificationMessages = _NotificationMessages_;

            iShouldNeverBeInvoked = jasmine.createSpy('iShouldNeverBeInvoked');
        }));

        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();

            expect(iShouldNeverBeInvoked.calls.any()).toEqual(false);
        });

        var tabs = ["First", "Second", "Third", "Fourth"];

        describe('When getting all notes and returning', function () {
            it('200 from backend and valid data, it should return an array of tabs', function () {
                var expectedTabs = tabs;

                $httpBackend.expectGET(UrlPaths.tabs).respond(HttpCodes.OK.code, expectedTabs);

                var achievedTabs = [];
                TabService.all().then(function (response) {
                    achievedTabs = response;
                }, function () {
                    iShouldNeverBeInvoked();
                });

                $httpBackend.flush();

                expect(achievedTabs).toEqual(expectedTabs);
            });

            it('200 from backend and one-element data it should return a one-element array', function () {
                var expectedTabs = [tabs[0]];

                $httpBackend.expectGET(UrlPaths.tabs).respond(HttpCodes.OK.code, expectedTabs);

                var achievedTabs = [];
                TabService.all().then(function (response) {
                    achievedTabs = response;
                }, function () {
                    iShouldNeverBeInvoked();
                });

                $httpBackend.flush();

                expect(achievedTabs).toEqual(expectedTabs);
            });

            it('500 from backend it should return a message', function () {
                var expectedMessage = NotificationMessages.ANY_OTHER_FAILURE;

                $httpBackend.expectGET(UrlPaths.tabs).respond(HttpCodes.INTERNAL_SERVER_ERROR.code);

                var achievedMessage = "";
                TabService.all().then(function () {
                    iShouldNeverBeInvoked();
                }, function (message) {
                    achievedMessage = message;
                });

                $httpBackend.flush();

                expect(achievedMessage).toEqual(expectedMessage);
            });
        });

        describe('When trying to create an already existing tab"', function () {
            it('it should reject the promise with a proper message', function () {
                var newTabName = tabs[0];

                var expectedMessage = NotificationMessages.TAB_ALREADY_EXISTS;

                var accuiredMessage = "";

                TabService.create(tabs, newTabName).then(function () {
                    iShouldNeverBeInvoked();
                }, function (failure) {
                    accuiredMessage = failure;
                });

                $rootScope.$apply();

                expect(accuiredMessage).toEqual(expectedMessage);
            });
        });

        describe('When trying to create a tab with an undefined title', function () {
            it('it should reject the promise with a proper message', function () {
                var expectedMessage = NotificationMessages.TAB_TITLE_UNDEFINED;
                var accuiredMessage = "";

                TabService.create(tabs, undefined).then(function () {
                    iShouldNeverBeInvoked();
                }, function (failure) {
                    accuiredMessage = failure;
                });

                $rootScope.$apply();

                expect(accuiredMessage).toEqual(expectedMessage);
            });
        });

        describe('When trying to create a correct tab', function () {
            it('it should return this tab with a message', function () {

                var tabTitle = "UniqueAndNonExistantTitle";

                var preparedTab = {
                    "name": tabTitle
                };

                var expectedTab = tabTitle;

                var expectedMessage = NotificationMessages.TAB_CREATED;

                var expectedObject = {tab: expectedTab, message: expectedMessage};
                var accuiredObject = {};

                $httpBackend.expectPOST(UrlPaths.tabs, preparedTab).respond(HttpCodes.CREATED.code, expectedTab);

                TabService.create(tabs, tabTitle).then(function (response) {
                    accuiredObject = response;
                }, function () {
                    iShouldNeverBeInvoked();
                });

                $httpBackend.flush();

                expect(accuiredObject).toEqual(expectedObject);
            });
        });

        describe('When trying to create a tab with some problems on server', function () {
            it('it should return a proper message with a status code from server', function () {
                var otherStatusFailureCodes = [400, 404, 500];
                var anyName = "anyUniqueAndDefinedName";
                var preparedTab = {
                    "name": anyName
                };

                angular.forEach(otherStatusFailureCodes, function (code) {
                    $httpBackend.expectPOST(UrlPaths.tabs, preparedTab).respond(code);

                    var achievedMessage = "";
                    TabService.create(tabs, anyName).then(function () {
                        iShouldNeverBeInvoked();
                    }, function (failure) {
                        achievedMessage = failure;
                    });

                    $httpBackend.flush();

                    expect(achievedMessage).toEqual(NotificationMessages.ANY_OTHER_FAILURE);
                });
            });
        });
    });
});

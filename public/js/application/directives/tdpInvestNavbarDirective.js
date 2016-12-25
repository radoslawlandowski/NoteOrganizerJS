define(['angular', 'application/NoteOrganizerModule'], function (angular, NoteOrganizerModule) {
    NoteOrganizerModule.directive("tdpInvestNavbarDirective", function () {
        return {
            restrict: "E",
            templateUrl: 'html/partials/tdp-invest-navbar.html'
        };
    });
    return NoteOrganizerModule;
});

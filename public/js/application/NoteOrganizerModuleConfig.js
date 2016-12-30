define(['angular'
    , 'application/NoteOrganizerModule'
    , 'application/directives/Note'
    , 'application/directives/FilterBarDirective'
    , 'application/filters/NoteByTabFilter'
    , 'application/controllers/TabsetController'
    , 'application/controllers/NewNoteController'
    , 'application/constants/UrlPaths'
    , 'application/constants/HttpCodes'
    , 'application/services/NoteService'
    , 'application/services/TabService'
    , 'application/constants/DialogMessages'
], function (angular, NoteOrganizerModule) {
    NoteOrganizerModule.config(function ($stateProvider, $locationProvider) {
        $stateProvider
            .state("tdp", {
                abstract: true,
                views: {
                    "@": {
                        templateUrl: "html/partials/tdp-invest-main.html"
                    }
                },
                resolve: {
                }
            }).state("tdp.notes", {
            url: "/main",
            views: {
                "changeable@tdp": {
                    templateUrl: "html/partials/tabset.html",
                    controller: "TabsetController",
                    controllerAs: "tsc"
                }
            },
            resolve: {
                tabs: function(TabService) {
                    return TabService.all();
                },
                notes: function(NoteService) {
                    return NoteService.all();
                },
                buttonTitle: function() {
                    return 'New';
                }
            }
        }).state("tdp.notes.newNote", {
            url:"/newNote",
            views: {
                "newNote@tdp.notes": {
                    templateUrl: "html/partials/newNote.html",
                    controller: "NewNoteController",
                    controllerAs: "nnc"
                }
            },
            resolve: {
                buttonTitle: function() {
                    return 'Hide';
                }
            }
        });
    });



    return NoteOrganizerModule;
});

define(['application/NoteOrganizerModule', 
        'application/controllers/TabsetController', 
        'application/services/NoteService', 
        'application/services/TabService'], 
    function (NoteOrganizerModule) {
        NoteOrganizerModule.config(function ($stateProvider, $locationProvider) {
            $stateProvider
                .state("tdp", {
                    abstract: true,
                    views: {
                        "@": {
                            templateUrl: "html/partials/NoteOrganizerMain.html"
                        }
                    },
                    resolve: {
                    }
                })
                .state("tdp.notes", {
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
                        templateUrl: "html/partials/newNote.html"
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
    }   
);

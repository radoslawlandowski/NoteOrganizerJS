define(['angular', 'application/NoteOrganizerModule', 'application/services/TabService', 'application/services/NoteService', 'application/services/DialogService', 'application/constants/NotificationMessages'], function (angular, NoteOrganizerModule) {
    NoteOrganizerModule.controller("TabsetController", function ($state, $filter, $scope, notes, tabs, NoteService, TabService, DialogService) {

        var vm = this;

        init();

        vm.sendNote = function (note) {
            NoteService.send(note).then(function (response) {
                $scope.notes = $filter('filter')($scope.notes, function (value) {
                    return value._id !== response.note._id;
                });
                $scope.notes.push(response.note);
                $state.go("tdp.notes");
                notify(response.message);
            }, function (failure) {
                notify(failure);
            });
        };

        vm.deleteNote = function (note) {
            DialogService.getDeleteNoteDialog().then(function () {
                NoteService.delete(note).then(function (response) {
                    $scope.notes = $filter('filter')($scope.notes, function (value) {
                        return value._id !== response.noteId;
                    });
                    $state.go("tdp.notes");
                    notify(response.message);
                }, function (failure) {
                    notify(failure);
                });
            });
        };

        vm.newTab = function () {
            DialogService.getNewTabDialog().then(function (tabTitle) {
                TabService.create($scope.tabs, tabTitle).then(function (response) {
                    $scope.tabs.push(response.tab);
                    notify(response.message);
                }, function (failure) {
                    notify(failure);
                });
            });
        };

        vm.deleteTab = function (tab) {
            DialogService.getDeleteDialog().then(function () {
                TabService.delete(tab).then(function (response) {
                    $scope.tabs = $filter('filter')($scope.tabs, function (value) {
                        return value !== tab;
                    });
                    vm.activeTab = vm.defaultActiveTab;
                    notify(response);
                    $state.go("tdp.notes");
                });
            });
        };

        vm.setActiveTab = function (index) {
            vm.activeTab = index;
        };

        vm.isTabActive = function (index) {
            return vm.activeTab === index ? true : false;
        };

        vm.isEmpty = function (notes) {
            if(angular.isUndefined(notes)) {
                return true;
            } else if (notes.length === 0) {
                return true;
            } else {
                return false;
            }
        };

        vm.toggleNote = function () {
            if ($state.$current.name === "tdp.notes.newNote") {
                $state.go('tdp.notes');
            } else {
                $state.go('tdp.notes.newNote');
            }
        };

        vm.tabsFull = function (tabs) {
            return tabs.length > 5 ? true : false;
        };

        $scope.$on('$stateChangeSuccess', function (event, toState) {
            vm.buttonTitle = toState.resolve.buttonTitle();
        });

        function notify(notification) {
            vm.notifications.push(notification);
        };

        function init() {
            vm.property = 'date';
            vm.order = false;
            $scope.tabs = tabs;
            if($scope.tabs.length === 0) {
                DialogService.getNoTabsDialog();
            };
            $scope.notes = notes;
            vm.notifications = [];
            vm.defaultActiveTab = 1;
            vm.noteProperties = ['date', 'title', 'content'];
        };
    })
});

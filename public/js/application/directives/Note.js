define(['angular', 'application/NoteOrganizerModule'], function (angular, NoteOrganizerModule) {
    NoteOrganizerModule.directive('note', function ($window) {
        return {
            restrict: 'E',
            scope: {
                note: "=?",
                tab: "@?",
                viewMode: "=",
                onConfirm: "&",
                onCancel: "&"
            },
            link: function (scope) {
                init();

                scope.editNote = function () {
                    scope.viewMode = !scope.viewMode;
                    if (scope.viewMode === true) {
                        scope.discard();
                    }
                };

                scope.discard = function () {
                    scope.current = angular.copy(scope.note);
                    scope.viewMode = true;
                };

                scope.cancel = function () {
                    if (angular.isDefined(scope.note)) {
                        scope.onCancel(scope.note);
                    } else {
                        scope.current = undefined;
                    }
                };

                scope.isNotePresent = function () {
                    return angular.isDefined(scope.note) ? true : false;
                };

                function init() {
                    if (angular.isUndefined(scope.viewMode)) {
                        scope.viewMode = true;
                    }

                    var element = $window.document.getElementById("titleInput");
                    element.focus();

                    if (!angular.isDefined(scope.note)) {
                        scope.$evalAsync(function () {
                            scope.current = {
                                "tab": scope.tab
                            };
                        });
                    } else {
                        scope.current = angular.copy(scope.note); // make a deep copy for the temporal editing
                    }
                }

            },
            templateUrl: 'js/application/directives/note.html'
        };
    })
});

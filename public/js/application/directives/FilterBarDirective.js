define(['application/NoteOrganizerModule'], function (NoteOrganizerModule) {
    NoteOrganizerModule.directive('filterBarDirective', function () {
        return {
            restrict: 'E',
            scope: {
                properties: "=",
                selected: "=",
                ascending: "="
            },
            link: function (scope) {
                scope.ascending = true;

                scope.inverseOrder = function() {
                    scope.ascending = !scope.ascending;
                };

                scope.setProperty = function(property) {
                    scope.selected = property;
                };

                scope.isActive = function(property) {
                    return property === scope.selected;
                };
            },
            templateUrl: 'js/application/directives/FilterBar.html'
        };
    })
});

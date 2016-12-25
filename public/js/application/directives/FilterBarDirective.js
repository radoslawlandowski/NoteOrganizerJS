define(['angular', 'application/NoteOrganizerModule'], function (angular, NoteOrganizerModule) {
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

                scope.changeOrder = function() {
                    scope.ascending = !scope.ascending;
                    if(scope.ascending) {
                        scope.icon = 'glyphicon-sort-by-attributes';
                    } else {
                        scope.icon = 'glyphicon-sort-by-attributes-alt';
                    }
                };

                scope.changeProperty = function(property) {
                    scope.selected = property;
                };

                scope.isActive = function(property) {
                    return property === scope.selected ? true : false;
                };
            },
            templateUrl: 'js/application/directives/FilterBar.html'
        };
    })
});

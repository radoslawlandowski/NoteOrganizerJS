/*define(['angular', 'angularMocks', 'htmlTemplates', 'application/directives/FilterBarDirective'], function(angular) {

    describe('FilterBarDirective:', function() {
        beforeEach(angular.mock.module('NoteOrganizerModule'));

        beforeEach(module('htmlTemplates'));
        beforeEach(module('filterBarDirective'));

        var $compile, $rootScope, $templateCache, scope;
        var element;

        beforeEach(inject(function(_$templateCache_, _$compile_, _$rootScope_, _FilterBarDirective_) {

            $compile = _$compile_;
            $rootScope = _$rootScope_;
            $templateCache = _$templateCache_;

            element = angular.element('<filter-bar-directive class="info-top-margin pull-right" properties="tsc.noteProperties" selected="tsc.property" ascending="tsc.order"></filter-bar-directive>');

            scope = $rootScope.$new();


        }));

        describe('when getting html"', function() {
            it('it should print it in the console', function() {

                scope.tsc = {
                    noteProperties: ['a', 'b', 'c'],
                    property: 'a',
                    order: true
                };

                var htmlElement = $compile(element)(scope);

                scope.$digest();
                console.log(htmlElement.html());
                expect(htmlElement.find('tsc.noteProperties')).toContain('a');
            });
        });

    });
});
*/

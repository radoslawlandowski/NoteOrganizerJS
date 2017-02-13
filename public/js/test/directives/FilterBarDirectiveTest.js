define(['angular', 'angularMocks', 'htmlTemplates', 'application/directives/FilterBarDirective'], function(angular) {

    describe('FilterBarDirective:', function() {
        beforeEach(angular.mock.module('NoteOrganizerModule'));
        beforeEach(module('htmlTemplates'));

        var $compile, $rootScope, $templateCache, scope;
        var element, htmlElement;

        beforeEach(inject(function(_$templateCache_, _$compile_, _$rootScope_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            $templateCache = _$templateCache_;

            element = angular.element('<filter-bar-directive class="info-top-margin pull-right" properties="tsc.noteProperties" selected="tsc.property" ascending="tsc.order"></filter-bar-directive>');
            scope = $rootScope.$new();

            scope.tsc = {
                noteProperties: ['a', 'b', 'c'],
                property: 'a',
                order: true
            };
            
            htmlElement = $compile(element)(scope);
            $rootScope.$digest();
        }));

        describe('When creating directive', function() {
          it('it should contain proper amount of spans', function() {
              angular.element(htmlElement);
              expect(htmlElement.find('span').length).toEqual(8);
          });
        }); 

    });
});


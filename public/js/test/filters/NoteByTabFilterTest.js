define(['angular', 'angularMocks', 'application/filters/NoteByTabFilter'], function(angular) {

    describe('NoteByTabFilter', function() {
        beforeEach(angular.mock.module('tdpInvestModule'));

        var $filter;
        beforeEach(inject(function(_$filter_){
            $filter = _$filter_;
        }));

        var input = [
            {"id":5,"title":"title","content":"content","date":1451606400000,"owner":null,"tab":"tab"},
            {"id":6,"title":"title","content":"content","date":1451606400000,"owner":null,"tab":"tab"},
            {"id":7,"title":"title","content":"content","date":1451606400000,"owner":null,"tab":"tab"},
            {"id":8,"title":"title","content":"content","date":1451606400000,"owner":null,"tab":"tab"},
            {"id":9,"title":"title","content":"content","date":1451606400000,"owner":null,"tab":"tab"},
            {"id":11,"title":"title","content":"content","date":null,"owner":null,"tab":"tab"},
            {"id":12,"title":"title","content":"content","date":null,"owner":null,"tab":"tab"},
            {"id":13,"title":"title","content":"content","date":null,"owner":null,"tab":"tab"},
            {"id":14,"title":"title","content":"content","date":null,"owner":null,"tab":"tab"},
            {"id":15,"title":"title","content":"content","date":null,"owner":null,"tab":"tab"},
            {"id":16,"title":"title","content":"content","date":null,"owner":null,"tab":"tab"},
            {"id":20,"title":"title","content":"content","date":null,"owner":null,"tab":"tab"},
            {"id":22,"title":"title","content":"content","date":1472053797234,"owner":null,"tab":"tab"},
            {"id":21,"title":"EDITED","content":"EDITED","date":1472054423925,"owner":null,"tab":null},
            {"id":23,"title":"EDITED","content":"EDITED","date":1472054432354,"owner":null,"tab":null},
            {"id":25,"title":"EDITED","content":"EDITED","date":1472054586105,"owner":null,"tab":"main"},
            {"id":26,"title":"EDITED","content":"EDITED","date":null,"owner":null,"tab":"main"},
            {"id":27,"title":"EDITED","content":"EDITED","date":null,"owner":null,"tab":"main"},
            {"id":28,"title":"EDITED","content":"EDITED","date":null,"owner":null,"tab":"main"},
            {"id":29,"title":"EDITED","content":"EDITED","date":null,"owner":null,"tab":"main"},
            {"id":30,"title":"ToSchool","content":"ToSchool","date":null,"owner":null,"tab":"School"}
         ];

         var mainTab = {
             name: 'main', countOfNotes: 5
         };

         var tabTab = {
             name: 'tab', countOfNotes: 13
         };

         var schoolTab = {
             name: 'School', countOfNotes: 1
         };

         var nullTab = {
             name: null, countOfNotes: 2
         };

         var tabs = [mainTab, tabTab, schoolTab, nullTab];

        describe('When given tabName and correct input it should return', function() {
            it('a proper array', function() {
                angular.forEach(tabs, function(tab) {
                    var output = $filter('NoteByTabFilter')(input, tab.name);
                    expect(output).toBeDefined();
                    expect(output.length).toEqual(tab.countOfNotes);
                    angular.forEach(output, function(note) {
                       expect(note.tab).toBeDefined();
                       expect(note.tab).toEqual(tab.name);
                    });
                });
            });

            it('an empty array', function() {
                var tabNames = ['unknownTab', 'unknownTabTwo'];
                angular.forEach(tabs, function(tab) {
                    var output = $filter('NoteByTabFilter')(input, tab.name);
                    expect(output).toBeDefined();
                    expect(output).not.toBeNull();
                    expect(output.length).toEqual(tab.countOfNotes);
                });
            });

            it('an array being 2 in length', function() {
                var output = $filter('NoteByTabFilter')(input, nullTab.name);
                expect(output).toBeDefined();
                expect(output).not.toBeNull();
                expect(output.length).toEqual(nullTab.countOfNotes);
            });
        });

        describe('When given tabName and empty array as input it should return', function() {
            it('an empty array', function() {
                var emptyInput = [];
                angular.forEach(tabs, function(tab) {
                    var output = $filter('NoteByTabFilter')(emptyInput, tab.name);
                    expect(output).toBeDefined();
                    expect(output).not.toBeNull();
                    expect(output.length).toEqual(emptyInput.length);
                });
            });
        });
    });
});

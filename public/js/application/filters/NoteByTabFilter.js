define(['angular', 'application/NoteOrganizerModule'], function (angular, NoteOrganizerModule) {
    NoteOrganizerModule.filter('NoteByTabFilter', function () {
        return function (notes, tab) {
            var out = [];
            angular.forEach(notes, function (note) {
                if (note.tab === tab) {
                    out.push(note);
                }
            });
            return out;
        };
    });
});

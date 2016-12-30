define(['angular', 'application/NoteOrganizerModule'], function (angular, NoteOrganizerModule) {
    NoteOrganizerModule.constant("UrlPaths", {
        notes: "/api/users/userMailOne/notes", //hardcoded the user for the sake of testing
        tabs: "/api/users/userMailOne/tabs"
    });
    return NoteOrganizerModule;
});

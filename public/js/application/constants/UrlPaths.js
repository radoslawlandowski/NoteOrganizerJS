define(['angular', 'application/NoteOrganizerModule'], function (angular, NoteOrganizerModule) {
    NoteOrganizerModule.constant("UrlPaths", {
        notes: {
            all:  "/api/users/userMailOne/notes",
            create: "/api/users/userMailOne/notes",
            delete: "/api/users/userMailOne/notes",
            edit: "/api/users/userMailOne/notes",
        },
        tabs: {
            all:  "/api/users/userMailOne/tabs",
            create: "/api/users/userMailOne/tabs",
            delete: "/api/users/userMailOne/tabs"
        }
    });
    return NoteOrganizerModule;
});

define(['angular', 'application/NoteOrganizerModule'], function (angular, NoteOrganizerModule) {
    NoteOrganizerModule.constant("HttpCodes", {
        CREATED: {
            code: 201
        },
        CONFLICT: {
            code: 409
        },
        NO_CONTENT: {
            code: 204
        },
        OK: {
            code: 200
        },
        DELETE: {
            code: 200
        },
        INTERNAL_SERVER_ERROR: {
            code: 500
        }
    });
    return NoteOrganizerModule;
});

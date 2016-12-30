define(['angular', 'application/NoteOrganizerModule'], function (angular, NoteOrganizerModule) {
    NoteOrganizerModule.constant("NotificationMessages", {
        TAB_CREATED: {
            content: "The tab has been created",
            type: "notificationSuccess"
        },
        TAB_DELETED: {
            content: "The tab has been deleted",
            type: "notificationSuccess"
        },
        TAB_CREATION_FAILED: {
            content: "The tab cannot be created!",
            type: "notificationError"
        },
        TAB_DELETION_FAILED: {
            content: "The deletion could not be performed!",
            type: "notificationError"
        },
        TAB_TITLE_UNDEFINED: {
            content: "The tab's title cannot be empty!",
            type: "notificationWarning"
        },
        NOTE_TITLE_UNDEFINED: {
            content: "The note's title cannot be empty!",
            type: "notificationWarning"
        },
        TAB_ALREADY_EXISTS: {
            content: "The tab of this name already exists, pick another name!",
            type: "notificationWarning"
        },
        NO_TABS_AVAILABLE: {
            content: "There are no tabs available",
            type: "notificationInfo"
        },
        NOTE_CREATED: {
            content: "The note has been created",
            type: "notificationSuccess"
        },
        NOTE_DELETED: {
            content: "The note has been deleted",
            type: "notificationSuccess"
        },
        NOTE_EDITED: {
            content: "The note has been edited",
            type: "notificationSuccess"
        },
        NO_NOTES_AVAILABLE: {
            content: "There are no notes available for this tab",
            type: "notificationInfo"
        },
        ANY_OTHER_FAILURE: {
            content: "There was an error that was never expected by us :( HttpCode:  ",
            type: "notificationError"
        }
    });
    return NoteOrganizerModule;
});

define(['application/NoteOrganizerModule'], function (NoteOrganizerModule) {
    NoteOrganizerModule.constant("DialogMessages", {
        TAB_DELETION: {
            title: "Delete tab!",
            firstHeader: "Are you sure you want to delete this tab?",
            secondHeader: "The notes associated with it will also be deleted!",
            showInput: false
        },
        NOTE_DELETION: {
            title: "Delete note!",
            firstHeader: "Are you sure you want to delete this note?",
            secondHeader: "This operation cannot be undone!",
            showInput: false
        },
        WELCOME: {
            title: "Welcome to Note Organizer!",
            firstHeader: "Create, store, view and edit your notes in here!",
            secondHeader: "Happy noting!",
            showInput: false
        },
        UNSAVED_CHANGES: {
            title: "You've got unsaved changes!",
            firstHeader: "You have edited or created a new note without saving it.",
            secondHeader: "Discard the changes or save them!",
            showInput: false
        },
        TAB_CREATION: {
            title: "New tab",
            firstHeader: "Enter the title of your new tab",
            secondHeader: "",
            showInput: true,
            inputPlaceholder: "Your title..."
        },
        TAB_EDIT: {
            title: "Edit tab",
            firstHeader: "Edit the title of your tab",
            secondHeader: "",
            showInput: true
        },
        ERROR: {
            title: "Error!",
            firstHeader: "There was a problem with your application!",
            secondHeader: "Go away and cry in loneliness",
            showInput: false
        },
        NO_TABS_AVAILABLE: {
            title: "You have no tabs!!",
            firstHeader: "Probably it is your first visit here, add a new tab with the golden 'Plus' sign on the right!",
            secondHeader: "Happpy noting!",
            showInput: false
        }
    });
});

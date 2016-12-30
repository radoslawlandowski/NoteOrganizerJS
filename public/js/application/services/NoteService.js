define(['angular', 'application/NoteOrganizerModule', 'application/constants/HttpCodes'], function(angular, NoteOrganizerModule) {
    NoteOrganizerModule.service("NoteService", function($http, $q, UrlPaths, HttpCodes, NotificationMessages) {

        var service = this;

        service.all = function() {
            return $http.get(UrlPaths.notes.all).then(function(response) {
                return response.data;
            }, function(failure) {
                return generalError(failure.status);
            });
        };

        service.create = function(note) {
            if(angular.isUndefined(note.title)) {
                return $q.reject(NotificationMessages.NOTE_TITLE_UNDEFINED);
            }
            setDate(note);

            return $http.post(UrlPaths.notes.create, note).then(function(response) {
                 if(angular.isUndefined(note._id)) {
                     return {note: response.data, message: NotificationMessages.NOTE_CREATED};
                 } else {
                     return {note: response.data, message: NotificationMessages.NOTE_EDITED};
                 };
            }, function(failure) {
                return generalError(failure.status);
            });
        };

        service.delete = function(note) {
             return $http.delete(UrlPaths.notes.delete + "/" + note._id).then(function() {
                 return {noteId: note._id, message: NotificationMessages.NOTE_DELETED};
            }, function(failure) {
                return generalError(failure.status);
            });
        };

        function setDate(note) {
            note.date = new Date();
        };

        function generalError(statusCode) {
            return $q.reject(NotificationMessages.ANY_OTHER_FAILURE + "HttpCode: " + statusCode);
        };
    });
});

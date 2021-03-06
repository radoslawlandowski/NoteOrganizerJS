define(['angular', 
        'application/NoteOrganizerModule', 
        'application/constants/NotificationMessages',
        'application/constants/UrlPaths'], 
    function(angular, NoteOrganizerModule, NotificationMessages, UrlPaths) {
        NoteOrganizerModule.service("NoteService", function($http, $q, NotificationMessages, UrlPaths) {

            var service = this;

            service.all = function() {
                return $http.get(UrlPaths.notes).then(function(response) {
                    return response.data;
                }, function(failure) {
                    return generalError(failure.status);
                });
            };

            service.send = function(note) {
                return angular.isDefined(note._id) ? this.edit(note) : this.create(note);
            };

            service.edit = function(note) {
                if(!isTitleDefined(note)) {
                    return $q.reject(NotificationMessages.NOTE_TITLE_UNDEFINED);
                };
                return $http.put(UrlPaths.notes, note).then(function(response) {
                    return {note: response.data, message: NotificationMessages.NOTE_EDITED};
                }, function(failure) {
                    return generalError(failure.status);
                });
            };

            service.create = function(note) {
                if(!isTitleDefined(note)) {
                    return $q.reject(NotificationMessages.NOTE_TITLE_UNDEFINED);
                };

                return $http.post(UrlPaths.notes, note).then(function(response) {
                    return {note: response.data, message: NotificationMessages.NOTE_CREATED};
                }, function(failure) {
                    return generalError(failure.status);
                });
            };

            service.delete = function(note) {
                return $http.delete(UrlPaths.notes + "/" + note._id).then(function() {
                    return {noteId: note._id, message: NotificationMessages.NOTE_DELETED};
                }, function(failure) {
                    return generalError(failure.status);
                });
            };

            function isTitleDefined(note) {
                return angular.isDefined(note.title);
            };

            function generalError(statusCode) {
                return $q.reject(NotificationMessages.ANY_OTHER_FAILURE);
            };
        });
    }
);

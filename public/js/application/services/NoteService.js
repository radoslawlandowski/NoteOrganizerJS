define(['angular', 'application/NoteOrganizerModule', 'application/constants/HttpCodes'], function(angular, NoteOrganizerModule) {
    NoteOrganizerModule.service("NoteService", function($http, $q, UrlPaths, HttpCodes, NotificationMessages) {

        var service = this;

        service.all = function() {
            return $http.get(UrlPaths.notes).then(function(response) {
                return response.data;
            }, function(failure) {
                return generalError(failure.status);
            });
        };

        service.send = function(note) {
          if(angular.isDefined(note._id)) {
            return this.edit(note);
          } else {
            return this.create(note);
          };
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
          return !angular.isUndefined(note.title);
        };

        function setDate(note) {
            note.date = new Date();
        };

        function generalError(statusCode) {
            return $q.reject(NotificationMessages.ANY_OTHER_FAILURE + "HttpCode: " + statusCode);
        };
    });
});

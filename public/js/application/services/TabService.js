define(['angular', 'application/NoteOrganizerModule'], function(angular, NoteOrganizerModule) {
    NoteOrganizerModule.service("TabService", function($http, $q, UrlPaths, HttpCodes, NotificationMessages) {

        var service = this;

        service.all = function() {
            return $http.get(UrlPaths.tabs).then(function(response) {
                return response.data;
            }, function(failure) {
                return generalError(failure.status);
            });
        };

        service.create = function(tabs, tabTitle) {
            if (isTitleUndefined(tabTitle)) {
                return $q.reject(NotificationMessages.TAB_TITLE_UNDEFINED);
            } else if (doesTabExist(tabs, tabTitle)) {
                return $q.reject(NotificationMessages.TAB_ALREADY_EXISTS);
            } else {
                var tab = prepareTab(tabTitle);
                return $http.post(UrlPaths.tabs, tab).then(function (response) {
                    return {tab: response.data, message: NotificationMessages.TAB_CREATED};
                }, function (failure) {
                    if (failure.status === HttpCodes.CONFLICT.code) {
                        return $q.reject(NotificationMessages.TAB_ALREADY_EXISTS);
                    } else {
                        return generalError(failure.status);
                    };
                });
            };
        };

        service.delete = function(tab) {
            return $http.delete(UrlPaths.tabs + "/" + tab).then(function() {
                return NotificationMessages.TAB_DELETED;
            }, function(failure) {
                return generalError(failure.status);
            });
        };

        function isTitleUndefined(tabTitle) {
            return angular.isUndefined(tabTitle);
        };

        function doesTabExist(tabs, tabTitle) {
            var result = false;
            angular.forEach(tabs, function(tab) {
                if(tab.name === tabTitle) {
                    result = true;
                    return;
                };
            });
            return result;
        };

        function prepareTab(name) {
            var tab = {
                "name": name
            };
            return tab;
        };

        function generalError(statusCode) {
            return $q.reject(NotificationMessages.ANY_OTHER_FAILURE + statusCode);
        };
    })
});

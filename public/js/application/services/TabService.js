define(['angular', 
        'application/NoteOrganizerModule', 
        'application/constants/NotificationMessages',
        'application/constants/HttpCodes',
        'application/constants/UrlPaths'], 
    function(angular, NoteOrganizerModule, NotificationMessages, HttpCodes, UrlPaths) {
        NoteOrganizerModule.service("TabService", function($http, $q, NotificationMessages, HttpCodes, UrlPaths) {

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
                    return $http.post(UrlPaths.tabs, prepareTab(tabTitle)).then(function (response) {
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
                    if(failure.status === HttpCodes.CONFLICT) {
                        return $q.reject(NotificationMessages.TAB_DELETION_FAILED);
                    } else {
                        return generalError(failure.status);
                    };
                });
            };

            function isTitleUndefined(tabTitle) {
                return angular.isUndefined(tabTitle);
            };

            function doesTabExist(tabs, tabTitle) {
                var result = false;
                angular.forEach(tabs, function(tab) {
                    if(tab === tabTitle) {
                        result = true;
                        return;
                    };
                });
                return result;
            };

            function prepareTab(name) {
                return tab = {
                    "name": name
                };
            };

            function generalError(statusCode) {
                return $q.reject(NotificationMessages.ANY_OTHER_FAILURE);
            };
        })
    }
);

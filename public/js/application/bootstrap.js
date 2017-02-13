define([
    'angular',
    'application/NoteOrganizerModule',
    'application/NoteOrganizerModuleConfig'
], function (angular) {
    'use strict';
    angular.element().ready(function () {
        angular.bootstrap(document, ['NoteOrganizerModule']);
    });
});

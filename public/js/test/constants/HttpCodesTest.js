 define(['angular', 'angularMocks'], function(angular) {

     describe('HttpCodes:', function() {
         beforeEach(angular.mock.module('NoteOrganizerModule'));

         var HttpCodes;
         beforeEach(inject(function(_HttpCodes_){
             HttpCodes = _HttpCodes_;
         }));

         var expectedHttpCodes = {
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
         };

         describe('When calling a field', function() {
             it('it should contain a proper value', function() {
                 expect(HttpCodes).toEqual(expectedHttpCodes);
             });
         });

     });
 });

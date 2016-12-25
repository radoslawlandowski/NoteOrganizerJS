// define(['angular', 'angularMocks'], function(angular) {
//
//     describe('HttpCodes:', function() {
//         beforeEach(angular.mock.module('tdpInvestModule'));
//
//         var HttpCodes;
//         beforeEach(inject(function(_HttpCodes_){
//             HttpCodes = _HttpCodes_;
//         }));
//
//         var expectedHttpCodes = {
//             CREATED: {
//                 code: 201,
//                 noteMessage: "The note has been successfully created!",
//                 tabMessage: "The tab has been successfully created!"
//             },
//             CONFLICT: {
//                 code: 409,
//                 noteMessage: "UNSPECIFIED MESSAGE",
//                 tabMessage: "The tab of this name already exists. Pick a different name!"
//             },
//             NO_CONTENT: {
//                 code: 204,
//                 noteMessage: "There are no notes for the specified criteria",
//                 tabMessage: "There are no tabs assigned for you!"
//             },
//             OK: {
//                 code: 200,
//                 noteMessage: "UNSPECIFIED MESSAGE",
//                 tabMessage: "UNSPECIFIED MESSAGE"
//             },
//             ANY_OTHER_HTTP_FAILURE: {
//                 message: "There was an unexpected error! Status code: " //append your unexpected status code
//             }
//         };
//
//         describe('when calling a field', function() {
//             it('it should contain a proper value for tab name', function() {
//                 expect(HttpCodes).toEqual(expectedHttpCodes);
//             });
//         });
//
//     });
// });

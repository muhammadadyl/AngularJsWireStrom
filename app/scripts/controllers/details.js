'use strict';

/**
 * @ngdoc function
 * @name angularJsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularJsApp
 */
angular.module('angularJsApp')
  .controller('DetailsCtrl',['$scope', '$routeParams', 'datacontext', '$location', function ($scope, $routeParams, datacontext, $location) {
      
      var id = $routeParams.id;
        datacontext.product(id).then(function (data) {
            $scope.product = data;
        }, function (status) {  });
        
        var Comment = function() {
          return {
            name: '',
            text: ''
          };
        };
        $scope.comment = new Comment();
        $scope.schema = [
            { label: 'Name', property: 'name', type: 'text', placeholder: 'User name...', attr: { required: true } },
            { property: 'text', type: 'textarea', rows: 5, placeholder: 'Write you comments here...', attr: { required: true } }
        ];
        $scope.CreateComment = function(){
          datacontext.saveComment(id, angular.copy($scope.comment)).then(function(){
            $location.path('/');
          }, function(errorData){
          });
        };
  }]);

'use strict';

/**
 * @ngdoc function
 * @name angularJsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularJsApp
 */
angular.module('angularJsApp')
  .controller('MainCtrl',['$scope', 'datacontext', function ($scope, datacontext) {
   
    var loadInfo = function () {
      datacontext.products().then(function(data){
        $scope.products = data;
      }, function(data){
        
      });
    };
    
    loadInfo();
     
  }]);

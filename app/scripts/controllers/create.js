'use strict';

/**
 * @ngdoc function
 * @name angularJsApp.controller:MainCtrl
 * @description
 * Controller of the angularJsApp
 */
angular.module('angularJsApp')
  .controller('CreateCtrl',['$scope', 'datacontext', '$location', function ($scope, datacontext, $location) {
    var Product = function() {
        return {
            name: '',
            description: '',
            price: 0.0
        };
    };
    $scope.product = new Product();
   $scope.create = function(){
	   datacontext.saveProduct(angular.copy($scope.product)).then(function(){
            $location.path('/');
       }, function(errorData){  });
   };
   $scope.schema = [
		{ label: 'Product Name', property: 'name', type: 'text', attr: { required: true } },
		{ property: 'description', type: 'text', attr: { required: true } },
		{ property: 'price', label: 'Product Price', type: 'number', attr: { required: true } }
	];
     
  }]);


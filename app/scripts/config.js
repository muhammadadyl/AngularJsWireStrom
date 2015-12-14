(function(){
	'use strict'
	
	var app = angular.module('angularJsApp');
	
	  app.config(function ($routeProvider) {
			$routeProvider
			.when('/', {
				templateUrl: 'views/main.html'
			})
			.when('/ProductDetails/:id', {
				templateUrl: 'views/details.html'
			})
			.when('/ProductCreate/', {
				templateUrl: 'views/create.html'
			})
			.otherwise({
				redirectTo: '/'
			});
	});
})();
'use strict';

/**
 * @ngdoc overview
 * @name angularJsApp
 * @description
 * # angularJsApp
 *
 * Main module of the application.
 */
var app = angular.module('angularJsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'autoFields',
    'datacontext'
  ]);
  
  // Handle routing errors and success events
    app.run(['$rootScope', 'datacontext', '$route', function ($rootScope, datacontext, $route) {
        // Include $route to kick start the router.
        $rootScope.app = {
            params: null,
            loading: true
        };
        $rootScope.datacontext = datacontext;

        $rootScope.$on('$locationChangeStart', function (event) {
            $rootScope.app.loading = true;
        });
        $rootScope.$on('$locationChangeSuccess', function (event) {
            $rootScope.app.params = angular.copy($route.current.params);
            $rootScope.app.loading = false;
        });
    }]);
 

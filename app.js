// create the module and name it myApp
var myApp = angular.module('myApp', [
  'ngResource',
  'ngRoute',
  'ui.bootstrap'
]);

// clear the templatecache
myApp.run(['$templateCache', function ( $templateCache ) {$templateCache.removeAll(); }]);

// routing
myApp.config(function($routeProvider, $locationProvider) {  

  $routeProvider.when('/', {
    templateUrl : 'partials/home.html'
  })
  
  .when('/user', {
    templateUrl : 'partials/users.html',
    controller: 'user'
  })
  
  .when('/user/:id', {
    templateUrl : 'partials/edit.html',
    controller: 'user'
  })  

  // route for the contact page
  .when('/contact', {
    templateUrl : 'partials/contact.html'
  });
  
  $locationProvider.html5Mode(true);
  
});

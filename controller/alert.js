
myApp.controller('alert', ['$scope', '$attrs', '$timeout', function($scope, $attrs, $timeout) {
  $scope.closeable = !!$attrs.close;

  function addTimeout () {
    if (!isNaN(parseInt($scope.dismissOnTimeout, 10))) {
      var dt = $timeout(function() {
        $scope.close();
      }, parseInt($scope.dismissOnTimeout, 10));
      return dt;
    }
  }
  
  if (angular.isDefined($attrs.dismissOnTimeout)) {
    var dt = addTimeout();
    $scope.$watch('dismissOnTimeout', function (newVal, oldVal) {
      if (newVal !== oldVal) {
        $timeout.cancel(dt);
        dt = addTimeout();
      }
    });
  }
}])

myApp.directive('uibAlert', function() {
  return {
    controller: 'alert',
    controllerAs: 'alert',
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'alert.html';
    },
    transclude: true,
    replace: true,
    scope: {
      type: '@',
      close: '&',
      dismissOnTimeout: '@'
    }
  };
});
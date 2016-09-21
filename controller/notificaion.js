myApp.controller('notification', function ($scope, $timeout) {
  $scope.alerts = [];
  
  $scope.$on('notify', function(szName,oMsg) { 
    $scope.addAlert(oMsg.type,oMsg.message,oMsg.timeout);
  });
  
  $scope.addAlert = function(type,message,timeout) {
    $scope.alerts.push({type:type, msg: message, dt: timeout});
  };

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };
});
myApp.controller('NavigationCtrl', NavigationCtrl);

NavigationCtrl.$inject = [];
  
function NavigationCtrl() {
  var vm = this;
  vm.isCollapsed = true;
  vm.toggleCollapse = toggleCollapse;

  function toggleCollapse() {
      vm.isCollapsed = !vm.isCollapsed;
  }
}
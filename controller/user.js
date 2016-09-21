myApp.controller('user', function ($scope, $q, userFactory, $routeParams, $location, $http, filterFilter) {
    $scope.people = [];
    $scope.addMode = false;
    $scope.password = {};
    $scope.originalPersonForm = false;
    $scope.spinner = false;
    $scope.spinnerMsg = "";
    $scope.addPersonCalled = false;
    $scope.previousPage = '';

    $scope.currentId = $routeParams.id;
    $scope.addPerson = {};
    
    $scope.sortType     = ''; 
    $scope.sortReverse  = false;     
    
    $scope.resetAddMode = function(){    
      $scope.addPerson = {
        fname:'',
        lname:'',
        date:'',
        desc:'',
        username:'',
        password:'',
        dept:'',
        role:'',
        street:'',
        city:'',
        postal:'',
        province:'',
        country:'',        
      }

      if($scope.personForm){
        $scope.personForm.$setPristine();
        $scope.personForm.$setUntouched();
      }   
    }
    
    $scope.toggleAddMode = function () {
      $scope.addMode = !$scope.addMode;
      $scope.resetAddMode();
    };
    
    $scope.toggleEditMode = function (person) {
      person.editMode = !person.editMode;
    };

    var successCallback = function (e, cb) {
        $scope.$broadcast('notify', {type:'success', message:'Success!', timeout:2000});      
        $scope.getPeople(cb);
    };
    
    var successCallbackUpdate = function (e, cb) {
      $scope.setPage($scope.previousPage);
      $scope.$broadcast('notify', {type:'success', message:'Success!', timeout:2000});   
      $scope.go('/user');      
    }

    var successPostCallback = function (e) {
      successCallback(e, function () {

          if($scope.personForm){
            $scope.toggleAddMode();
            $scope.person = {};            
            $scope.personForm.$setUntouched();
            $scope.personForm.$setPristine();  
          }
          
          if($scope.editPersonForm){          
            $scope.editPersonForm.$setUntouched();
            $scope.editPersonForm.$setPristine();            
          }
                    
          $scope.getPeople(function(){
            // if added go to the last page. 
            if($scope.addPersonCalled){
              $scope.setPage($scope.totalPages);
              $scope.addPersonCalled = false;
            } 
            
            if($scope.deleteCalled){
              $scope.setPage($scope.previousPage);
              
            }
            
          });
          
      });
    };
    
    
    var successDelete = function (e) {
      successCallback(e, function () {
          $scope.setPage($scope.previousPage); 
        });          
    };
    
    
    
    var errorCallback = function (e) { 
      $scope.$broadcast('notify', {type:'danger', message:'Something went wrong :(', timeout:2000});     
    };

    $scope.addPersonSave = function () {
      userFactory.add.save($scope.addPerson, successPostCallback, errorCallback);
      $scope.addPersonCalled = true;
    };

    $scope.deletePerson = function (person) {
      $scope.previousPage = $scope.currentPage;
      userFactory.delete.save({ id: person.id }, successDelete, errorCallback);
    };

    $scope.updatePerson = function (person) {
      $scope.previousPage = $scope.currentPage;
      userFactory.update.save({ id: person.id }, person, successCallbackUpdate, errorCallback);
      person.editMode = !person.editMode;
    };

    $scope.getPeople = function (cb) {
      userFactory.getAll.get(function (data) {
          $scope.people = data.data;
          $scope.viewby = 10;
          $scope.totalItems = $scope.people.length;
          $scope.currentPage = 1;
          $scope.itemsPerPage = $scope.viewby;
          $scope.totalPages = Math.ceil($scope.totalItems / $scope.viewby);

          if (cb) cb();
      });
    };

    $scope.setPage = function (pageNo) {
      $scope.currentPage = pageNo;
    };

    $scope.pageChanged = function() {

    };    

    $scope.checkAddPerson = function(event){
      if(event.keyCode == 13){
        $scope.addPerson();        
      }      
    }
    
    $scope.checkEditPerson = function(event,person){
      if(event.keyCode == 13){
        $scope.updatePerson(person);        
      }
    }
    
    $scope.go = function ( path ) {
      $location.path( path );
    };    
    
    $scope.validatePassword = function (person) {
      var iValue = 0;
      if(person && person.password){
      
        $scope.password.passwordScore;
        
        var szPassword = person.password;
        
        $scope.password = {};
        $scope.password.passwordMax = 100;
        
        if (szPassword.match(/^(?=.*[A-Z])/)) {
            $scope.password.oneCap = true;
            iValue = iValue + 25;
        } else {
            $scope.password.oneCap = false;
        }
        if (szPassword.match(/^(?=.*\d)/)) {
            $scope.password.oneNum = true;
            iValue = iValue + 25;
        } else {
            $scope.password.oneNum = false;
        }
        
        if (szPassword.match(/\W+/)){
            $scope.password.oneSymbol = true;
            iValue = iValue + 25;              
        } else {
            $scope.password.oneSymbol = false;
        }
        
        if (szPassword.match(/^[A-Za-z\d$@$!$#$^$($)$_$+%*?&]{8,}$/)) {
            $scope.password.eightChars = true;
            iValue = iValue + 25;
        } else {
            $scope.password.eightChars = false;
        }

        $scope.password.validated = $scope.password.oneCap && $scope.password.oneNum && $scope.password.eightChars && $scope.password.oneSymbol;        
        
        if(!$scope.password.validated){
          iValue = iValue - 15;
        }
        else
        {
          iValue = 100; 
        }
        
        $scope.password.passwordScore = Math.ceil(iValue) ;   
        
        if ($scope.password.passwordScore < 25) {
          $scope.password.passwordType = 'danger';
          $scope.password.passwordLabel = "Weak";
        } else if ($scope.password.passwordScore < 50) {
          $scope.password.passwordType = 'warning';
          $scope.password.passwordLabel = "Slightly Better";
        } else if ($scope.password.passwordScore < 75) {
          $scope.password.passwordType = 'info';
          $scope.password.passwordLabel = "Pretty Good";
        } else if ($scope.password.passwordScore > 75) {
          $scope.password.passwordType = 'success';
          $scope.password.passwordLabel = "Perfection!";
        }                

      }

    };    

  // create empty search model (object) to trigger $watch on update
  $scope.search = {};

  $scope.resetSearch = function () {
    // needs to be a function or it won't trigger a $watch
    $scope.search = {};
  };

  // $watch search to update pagination
  $scope.$watch('search', function (newVal, oldVal) {
    
    if(newVal.string !== ''){
      $scope.filtered = filterFilter($scope.people, newVal);

      $scope.totalItems = $scope.filtered.length;
      $scope.totalPages = Math.ceil($scope.totalItems / $scope.itemsPerPage);
      $scope.currentPage = 1;           
    }
    else
    {
      $scope.search = {};
    }
    
    }, true);         
    
    
  // load the grid. 
  $scope.getPeople();
  
  // reset / init
  $scope.resetAddMode();
  
  $scope.rebuildTestData = function(){
    $scope.spinner = true;
    $scope.spinnerMsg = "Rebuilding Data - Please wait :)";
    $http.get("/api/?rebuild=1").then(function(response) {     
      $scope.getPeople();      
      $scope.spinner = false;
    });
    
  }
  
  // fetch provinces / countries  
  $http.get('json/prov.json').then(function(res){
    $scope.states = res.data;                
  });  
        
  $http.get('json/country.json').then(function(res){    
    $scope.countries = [];
    for(var i = 0; i < res.data.length;i++){
      $scope.countries.push(res.data[i].name);    
    }            
  });          
});
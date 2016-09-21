myApp.factory('userFactory', ['$resource',
 function($resource) {
  return {
    getById: $resource('/api/?id=:id', {id: '@id'},{
      method: 'GET',
        transformResponse: function(data, headers){
          var oTmp = {};
          oTmp = angular.fromJson(data);
          data = oTmp.data;
          return data;
        }      
    }),
    getAll: $resource('/api', {},{
      method: 'GET',
      transformResponse: function(data, headers){
        var oTmp = {};
        oTmp = angular.fromJson(data);
        data = oTmp.data;
        return data;
      }   
    }),
    update:  $resource('/api/?action=update&id=:id', {id: '@id'},{
      method: 'GET',
          transformResponse: function(data, headers){
            var oTmp = {};
            oTmp = angular.fromJson(data);
            data = oTmp.data;
            return data;
          }         
    }),
    delete:  $resource('/api/?action=delete&id=:id', {id: '@id'},{
      method: 'POST',
      transformResponse: function(data, headers){
        var oTmp = {};
        oTmp = angular.fromJson(data);
        data = oTmp.data;
        return data;
      }         
    }),
      add:  $resource('/api/?action=add', {},{
      method: 'POST',
      transformResponse: function(data, headers){
        var oTmp = {};
        oTmp = angular.fromJson(data);
        data = oTmp.data;
        return data;
      }         
    })
  };
}]);
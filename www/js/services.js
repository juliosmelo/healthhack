var hospitalsAddress = angular.module('hospitalsAddress', ['ngResource']);

hospitalsAddress.factory('Hospital', ['$resource',
  function($resource){
      return $resource('/jsons/hospital.json', {}, {
        query: {}
      });
  }]);

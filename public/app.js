var app = angular.module('nodesql',[]);

//Initializing controller
app.controller('MainCtrl',['$scope','$http',function($scope,$http){

  	//Angular gets data from DB
  	var dataUrl = "http://localhost:8080/api/sql/requete1"
  	$http.get(dataUrl).then(function(success,error){
      if (error) {
        console.error(error)
      }
      $scope.clients = success.data;

  	});

}]);

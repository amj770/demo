var app = angular.module("rest",[]);

app.controller("restCtrl",function($scope, $http) {
	console.log("inside controller")

	$scope.send = function(){
		var data = {'name':$scope.name,'age':$scope.age,'desig':$scope.desig}
		$http({'method':'post','url':'/api/users','data':data}).success(function(res){
			console.log(res);
		})
	}

	$scope.get = function(){
		$http({'method':'get','url':'/api/users'}).success(function(res){
			console.log(res);
		})
	}
});
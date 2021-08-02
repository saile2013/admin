angular.module("sop").controller("errorLoginCtrl", function($scope, $state, $cookies, servicosAPI){
	
	$scope.botao = true;

	servicosAPI.getIPs().then(function(result){
		console.log(result);
	});
	
});
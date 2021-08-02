angular.module("sop").controller("homeCtrl", function($scope, $cookies, $state, servicosAPI){
	
	if($cookies.get('token')){
		$scope.nome = $cookies.get('nome');
	}

	servicosAPI.validaLogin($cookies.get('token')).then(function (result) {
		console.log('Logado'+result);
	}).catch(function(err, status){
		if(err.status == '401'){
			$state.go('inicio');
		}
	});

	servicosAPI.getEmails(1).then(function(result){
		console.log(result.data);
	});

	$scope.sair = function(){
		$cookies.remove('token');
		$state.go('inicio');
	}
	
});
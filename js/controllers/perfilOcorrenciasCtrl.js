angular.module("sop").controller("perfilOcorrenciasCtrl", function($scope, $stateParams, $cookies, $state, servicosAPI){
	
	if($cookies.get('token')){
		$scope.nome = $cookies.get('nome');
	}

	servicosAPI.validaLogin($cookies.get('token')).then(function (result) {
		console.log('Logado');
	}).catch(function(err, status){
		if(err.status == '401'){
			$state.go('inicio');
		}
	});
	
	$scope.idOcor = $stateParams.id;
	$scope.abrir = 0;
	$scope.inval = 0;
	
	$scope.sair = function(){
		$cookies.remove('token');
		$state.go('inicio');
	}
	
});
angular.module("sop").controller("seguidoresEstatisticasCtrl", function($scope, $state, $cookies, $state, $stateParams, servicosAPI){
	
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

	$scope.id = $stateParams.id;
	$scope.loader = true;
	$scope.mensagens = '';
	
	servicosAPI.dtlTiendas($scope.id).then(function (result) {
		$scope.name = result.data.data.name;
		$scope.profile_picture = result.data.data.profile_picture;
	});
	
	servicosAPI.getSeguidores($scope.id).then(function(result){
		$scope.followers = result.data.data.followers;
		$scope.mensagens = '';
		$scope.loader = false;
	}).catch(function(err, status){
		if(err.status == '400'){
			$scope.mensagens = '¡No hay resultados!';
			$scope.loader = false;
		}
	});
	
	$scope.sair = function(){
		$cookies.remove('token');
		$state.go('inicio');
	}
	
});
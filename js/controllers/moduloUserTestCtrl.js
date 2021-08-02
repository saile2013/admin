angular.module("sop").controller("moduloUserTestCtrl", function($scope, $state,  $stateParams, $window, $cookies, $state, servicosAPI){
	
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
	$scope.pag = 1;
	$scope.apa = true;
	var modulos = [];
	var modulos2 = [];

	servicosAPI.getSystemModulos($scope.pag).then(function(result){
		$scope.modulos = result.data.data;
	});
	
	servicosAPI.getModulosUsers($scope.id).then(function(result2){
		$scope.modulos2 = result2.data.modules;
	});

	$scope.ativaModulo = function(id){
		var dados = {
			"user_id": $scope.id,
			"module_id": id
		}
		servicosAPI.postModulosUsers(dados).then(function(){
			servicosAPI.getModulosUsers($scope.id).then(function(result2){
				$scope.modulos2 = result2.data.modules;
			});
		});
	}

	$scope.voltar = function(){
		$window.history.back();
	}
	
	$scope.sair = function(){
		$cookies.remove('token');
		$state.go('inicio');
	}
	
});
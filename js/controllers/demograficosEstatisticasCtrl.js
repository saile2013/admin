angular.module("sop").controller("demograficosEstatisticasCtrl", function($scope, $state, $cookies, $state, $stateParams, servicosAPI){
	
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
		$scope.profile_picture = result.data.data.profile_picture;
		$scope.name = result.data.data.name;
	});

	servicosAPI.getDemograficosTin($scope.id).then(function(resulT1){
		$scope.ages = resulT1.data.data.ages;
		$scope.genders = resulT1.data.data.genders;
		$scope.mensagens = '';
		$scope.loader = false;
	}).catch(function(err, status){
		if(err.status == '400'){
			$scope.mensagens = '¡No hay resultados!';
			$scope.loader = false;
		}
	});

	servicosAPI.getDemograficosPro($scope.id).then(function(resulT2){
		console.log(resulT2.data.data);
		$scope.ages2 = resulT2.data.data.ages;
		$scope.genders2 = resulT2.data.data.genders;
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
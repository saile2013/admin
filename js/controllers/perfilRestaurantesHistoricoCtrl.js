angular.module("sop").controller("perfilRestaurantesHistoricoCtrl", function($scope, $state, $stateParams, $cookies, servicosAPI){
	
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
	
	$scope.idPed = $stateParams.idPed;
	$scope.order_id = $stateParams.order_id;
	$scope.loader = false;

	servicosAPI.dtlRestaurantesOrdenes($scope.order_id).then(function(result){
		console.log(JSON.parse(result.data.data[0].history));
		JSON.parse(result.data.data[0].history, function (key, value) {
			console.log(key);
		})
		$scope.transaciones = JSON.parse(result.data.data[0].history);
		$scope.loader = true;
	});

	$scope.back = function(){
		window.history.back();
	}
	
	$scope.sair = function(){
		$cookies.remove('token');
		$state.go('inicio');
	}
	
});
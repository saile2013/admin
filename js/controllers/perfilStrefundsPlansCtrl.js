angular.module("sop").controller("perfilStrefundsPlansCtrl", function($scope, $state, $stateParams, $cookies, servicosAPI){
	
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
	$scope.loader = false;

	servicosAPI.dtlPedidos($scope.idPed).then(function(result){
		console.log(result.data.data.refund_history);
		$scope.idPedidos = result.data.data.id;
		$scope.date_refund = result.data.data.date_refund;
		$scope.refund_observation = result.data.data.refund_observation;
		$scope.historys = result.data.data.refund_history;

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
angular.module("sop").controller("historicoPedidosPlansCtrl", function($scope, $state, $stateParams, $cookies, servicosAPI){
	
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

	servicosAPI.historicoPedidosPlans($scope.idPed).then(function(result){
		$scope.amount = result.data.data.transaction.amount;
		$scope.authorization_code = result.data.data.transaction.authorization_code;
		$scope.carrier_code = result.data.data.transaction.carrier_code;
		$scope.dev_reference = result.data.data.transaction.dev_reference;
		$scope.id = result.data.data.transaction.id;
		$scope.installments = result.data.data.transaction.installments;
		$scope.message = result.data.data.transaction.message;
		$scope.payment_date = result.data.data.transaction.payment_date;
		$scope.status = result.data.data.transaction.status;
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
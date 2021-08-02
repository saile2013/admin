angular.module("sop").controller("searchPaymentsPedidosCtrl", function($scope, $state, $stateParams, $cookies, servicosAPI){
	
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
	$scope.text = $stateParams.text;
	$scope.status = $stateParams.status;
	$scope.begin = $stateParams.begin;
	$scope.end = $stateParams.end;
	$scope.loader = false;

	servicosAPI.payPedidos($scope.idPed).then(function(result){
		$scope.payments = result.data.message;
		$scope.loader = true;
	});

	$scope.back = function(){
		$state.go('search-pedidos', {text:$scope.text, status:$scope.status, begin:$scope.begin, end:$scope.end});
	}
	
	$scope.sair = function(){
		$cookies.remove('token');
		$state.go('inicio');
	}
	
});
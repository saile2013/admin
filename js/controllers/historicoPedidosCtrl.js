angular.module("sop").controller("historicoPedidosCtrl", function($scope, $state, $stateParams, $cookies, servicosAPI){
	
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

	servicosAPI.historicoPedidos($scope.idPed).then(function(result){
		console.log(result.data);
		if(result.data.data.transaction){
			$scope.amount = result.data.data.transaction.amount;
			$scope.bank_url = result.data.data.transaction.bank_url;
			$scope.carrier_code = result.data.data.transaction.carrier_code;
			$scope.authorization_code = result.data.data.transaction.authorization_code;

			$scope.country = result.data.data.transaction.country;
			$scope.dev_reference = result.data.data.transaction.dev_reference;
			$scope.id = result.data.data.transaction.id;
			$scope.currency = result.data.data.transaction.currency;
			$scope.descriptions = result.data.data.transaction.description;

			$scope.installments = result.data.data.transaction.installments;
			$scope.message = result.data.data.transaction.message;
			
			$scope.paid_date = result.data.data.transaction.payment_date;
			$scope.status = result.data.data.transaction.status;
			$scope.status_bank = result.data.data.transaction.status_bank;
			$scope.ticket_id = result.data.data.transaction.ticket_id;
			$scope.trazability_code = result.data.data.transaction.trazability_code;
		}else{
			$scope.amount = '';
			$scope.bank_url = '';
			$scope.carrier_code = '';
			$scope.authorization_code = '';

			$scope.country = '';
			$scope.dev_reference = '';
			$scope.id = '';
			$scope.currency = '';
			$scope.descriptions = '';

			$scope.installments = '';
			$scope.message = '';
			
			$scope.paid_date = '';
			$scope.status = '';
			$scope.status_bank = '';
			$scope.ticket_id = '';
			$scope.trazability_code = '';
		}
		

		

		$scope.date_refund = result.data.date_refund;
		$scope.status_order = result.data.status_order;
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
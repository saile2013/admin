angular.module("sop").controller("perfilPedidosPlansCtrl", function($scope, $state, $stateParams, $cookies, servicosAPI){
	
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
	var produtos = [];

	servicosAPI.dtlPedidosPlans($scope.idPed).then(function(result){

		console.log(result);

		$scope.idPedidos = result.data.data.id;
		$scope.city = result.data.data.city;
		$scope.c_state = result.data.data.c_state;
		$scope.street_one = result.data.data.street_one;
		$scope.street_two = result.data.data.street_two;
		
		$scope.created_at = result.data.data.created_at;
		$scope.transaction_date = result.data.data.transaction_date;

		$scope.subtotal = result.data.data.subtotal;
		$scope.shipping = result.data.data.shipping;
		$scope.discount = result.data.data.discount;
		$scope.tax = result.data.data.tax;
		$scope.total = result.data.data.total;

		$scope.name = result.data.data.user.name;
		$scope.last_name = result.data.data.user.last_name;
		$scope.email = result.data.data.user.email;
		$scope.phone = result.data.data.user.phone;
		$scope.dni_number = result.data.data.user.dni_number;
		$scope.dni_type = result.data.data.user.dni_type;


		for(var a=0; a<result.data.data.plans_order_items.length; a++){
			produtos.push(result.data.data.plans_order_items[a].plan);
			$scope.loader = true;
		}

		$scope.produtos = produtos;
	});

	$scope.back = function(){
		window.history.back();
	}
	
	$scope.sair = function(){
		$cookies.remove('token');
		$state.go('inicio');
	}
	
});
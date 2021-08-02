angular.module("sop").controller("perfilRestaurantesOrdenesCtrl", function($scope, $state, $stateParams, $cookies, servicosAPI){
	
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
	$scope.novDados = false;
	$scope.loader = false;
	var produtos = [];

	servicosAPI.dtlRestaurantesOrdenes($scope.idPed).then(function(result){

		console.log(result.data.data[0]);

		$scope.idPedidos = result.data.data[0].restaurant_order_id;
		$scope.city = result.data.data[0].address_city;
		$scope.c_state = result.data.data[0].address_state;
		$scope.street_one = result.data.data[0].address_line1;
		$scope.street_two = result.data.data[0].address_line2;
		
		$scope.created_at = result.data.data[0].created_at;
		$scope.transaction_date = result.data.data[0].transaction_date;

		$scope.tax = result.data.data[0].tax;
		$scope.total = result.data.data[0].total_amount;

		$scope.name = result.data.data[0].buyer_name;
		$scope.email = result.data.data[0].buyer_email;
		$scope.phone = result.data.data[0].buyer_phone;
		$scope.fiscal_number = result.data.data[0].buyer_fiscal_number;

		$scope.confirmation_code = result.data.data[0].confirmation_code;
		$scope.credit_card_id = result.data.data[0].credit_card_id;

		$scope.date_placed = result.data.data[0].date_placed;
		$scope.date_started = result.data.data[0].date_started;
		$scope.delivery_date = result.data.data[0].delivery_date;
		$scope.delivery_instructions = result.data.data[0].delivery_instructions;
		$scope.delivery_price = result.data.data[0].delivery_price;
		$scope.order_app_reference = result.data.data[0].order_app_reference;

		$scope.payment_type = result.data.data[0].payment_type;
		$scope.reserve_code = result.data.data[0].reserve_code;
		$scope.restaurant_id = result.data.data[0].restaurant_id;
		$scope.sended_at = result.data.data[0].sended_at;
		$scope.state = result.data.data[0].state;
		$scope.status_description = result.data.data[0].status_description;

		$scope.transaction_id = result.data.data[0].transaction_id;
		$scope.updated_at = result.data.data[0].updated_at;
		$scope.user_id = result.data.data[0].user_id;
		$scope.user_reference = result.data.data[0].user_reference;

		for(var a=0; a<result.data.data[0].order_items.length; a++){
			produtos.push(result.data.data[0].order_items[a]);
			$scope.loader = true;
		}

		$scope.produtos = produtos;
	});

	$scope.abrirDados = function(){
		$scope.novDados = !$scope.novDados;
	}

	$scope.NvDados = function(){
		servicosAPI.putNovosDados($scope.idPed, $scope.nameNv, $scope.last_nameNv, $scope.phone_numberNv)
		.then(function(result){
			document.getElementById('status').innerHTML = "¡Guardado con exito!";
		});
	}

	$scope.back = function(){
		window.history.back();
	}
	
	$scope.sair = function(){
		$cookies.remove('token');
		$state.go('inicio');
	}
	
});
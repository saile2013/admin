angular.module("sop").controller("perfilPedidosCtrl", function($scope, $state, $stateParams, $cookies, servicosAPI){
	
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
	var prValues = [];
	var tiendas = [];

	servicosAPI.dtlPedidos($scope.idPed).then(function(result){

		$scope.idPedidos = result.data.data.order_id;
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

		$scope.nameNv = result.data.data.name;
		$scope.last_nameNv = result.data.data.last_name;
		$scope.phone_numberNv = result.data.data.phone_number;
		$scope.payment_gateway = result.data.data.payment_gateway;


		for(var a=0; a<result.data.data.product_items.length; a++){
			produtos.push({produtos: result.data.data.product_items[a], prValues: result.data.data.product_items[a].property_value});
			$scope.loader = true;
		}

		$scope.produtos = produtos;
	});

	$scope.seleGroup = function(idStore, nameStore, idProd){
		servicosAPI.putMudaTiendas(idStore, idProd).then(function(result){
			console.log(result.data.data);
			if(result.data.data.id){
				document.getElementById('mudou'+idProd).innerHTML = nameStore;
				document.getElementById('muda'+idProd).innerHTML = '¡actualizado con exito!';
			}else{
				document.getElementById('muda'+idProd).innerHTML = result.data.message;
			}
		});
	}

	$scope.abrirSelect = function(idStore, idProd){
		$scope.idProd = idProd;
		if(document.getElementById('loja').style.display == 'block'){
			document.getElementById('fundo').style.display = 'none';
			document.getElementById('loja').style.display = 'none';
		}else{
			document.getElementById('fundo').style.display = 'block';
			document.getElementById('loja').style.display = 'block';
		}
		servicosAPI.getTiendasGroup(idStore).then(function(resultB){
			$scope.groups = resultB.data.data;
		});		
	}

	$scope.tiraFundo = function(){
		if(document.getElementById('loja').style.display == 'block'){
			document.getElementById('fundo').style.display = 'none';
			document.getElementById('loja').style.display = 'none';
		}else{
			document.getElementById('fundo').style.display = 'block';
			document.getElementById('loja').style.display = 'block';
		}

		$scope.groups = "";
	}

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
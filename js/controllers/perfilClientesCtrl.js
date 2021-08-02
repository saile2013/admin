angular.module("sop").controller("perfilClientesCtrl", function($scope, $state, $cookies, $state, $stateParams, servicosAPI){
	
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
	$scope.loader = false;
	$scope.abreProds = false;
	$scope.ficha = true;
	$scope.noCarrega = false;
	$scope.siCarrega = false;
	var pedidos = [];
	var tiendas = [];

	servicosAPI.getProductos().then(function(result){
		angular.forEach(result.data.filters.stores, function(value, key) {
			tiendas.push({key: key, value: value});
		});
		$scope.tiendas = tiendas;
	});

	$scope.statos = [
		{value:'', aparence:'Seleccione uno estado'},
		{value:'canceled', aparence:'Cancelada'},
		{value:'incomplete', aparence:'Incompleta'},
		{value:'opened', aparence:'Pagada'},
		{value:'payment_pending', aparence:'Pendiente de Pago'},
	]

	$scope.estatu = $scope.statos[0];
	
	servicosAPI.dtlClientes($scope.id, $scope.pag).then(function(result){

		console.log(result.data.data);

		if(result.data.data[0]){

			$scope.user_id = result.data.data[0].user_id;
			$scope.full_name = result.data.data[0].full_name;
			$scope.email = result.data.data[0].email;
			$scope.phone = result.data.data[0].phone;
			$scope.street_one = result.data.data[0].street_one;
			$scope.street_two = result.data.data[0].street_two;
			$scope.city = result.data.data[0].city;
			$scope.c_state = result.data.data[0].c_state;

			for(var i=0; i<result.data.data.length; i++){
				pedidos.push(result.data.data[i]);
			}

			$scope.maisPag = function(){
				$scope.apa = false;
				$scope.pag += 1;
				servicosAPI.dtlClientes($scope.id, $scope.pag).then(function(result){
					for(var i=0; i<result.data.data.length; i++){
						pedidos.push(result.data.data[i]);
						$scope.apa = true;
					}
					
					if($scope.pag == result.data.last_page){
						$scope.parou = true;
					};
				});
			};

			$scope.pedidos = pedidos;
			$scope.siCarrega = true;

		}else{

			$scope.noCarrega = true;
		}
	});

	$scope.abreFicha = function(){
		$scope.ficha = !$scope.ficha;
	};

	$scope.payments = function(order_id){
		document.getElementById('estatusL'+order_id).style.display = 'block';
		servicosAPI.payPedidos(order_id).then(function(result){
			console.log(result.data.data.state);
			if(result.data.data.state == 'canceled'){
				var states = 'Cancelada';
			}else if(result.data.data.state == 'incomplete'){
				var states = 'Incompleta';
			}else if(result.data.data.state == 'opened'){
				var states = 'Pagada';
			}else if(result.data.data.state == 'payment_pending'){
				var states = 'Pendiente de Pago';
			}
			document.getElementById('estatus2'+order_id).style.display = 'none';
			document.getElementById('estatusL'+order_id).style.display = 'none';
			document.getElementById('estatus'+order_id).innerHTML = states;
		});
	};

	$scope.seleStatus = function(){
		$state.go('search-perfil-clientes', {id:$scope.id, tienda:null, status:$scope.estatu.value, text:null});
	};

	$scope.seleTienda = function(){
		$state.go('search-perfil-clientes', {id:$scope.id, tienda:$scope.tienda, status:null, text:null});
	};

	$scope.enter = function(event){
		if(window.event.keyCode == 13){
			console.log('enter');
			$scope.buscar();
		}
	};
	
	$scope.buscar = function(){
		if($scope.buscando){
			$state.go('search-perfil-clientes', {id:$scope.id, tienda:null, status:null, text:$scope.buscando});
		}
	};
	
	$scope.back = function(){
		window.history.back();
	};

	$scope.back2 = function(){
		$scope.loader = false;
		$scope.abreProds = false;
	};

	$scope.sair = function(){
		$cookies.remove('token');
		$state.go('inicio');
	}
	
});
angular.module("sop").controller("searchPerfilClientesCtrl", function($scope, $state, $cookies, $state, $stateParams, servicosAPI){
	
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

	if($stateParams.tienda){
		$scope.tienda = $stateParams.tienda;
	}else{
		$scope.tienda = null;
	}

	if($stateParams.status){
		$scope.estatu = $stateParams.status;
	}else{
		$scope.estatu = null;
	}

	if($stateParams.text){
		$scope.text = $stateParams.text;
	}else{
		$scope.text = null;
	}

	$scope.pag = 1;
	$scope.apa = true;
	$scope.loader = false;
	$scope.abreProds = false;
	$scope.ficha = true;
	var pedidos = [];
	var produtos = [];
	var tiendas = [];

	servicosAPI.getProductos().then(function(result){
		angular.forEach(result.data.filters.stores, function(value, key) {
			if(value == $stateParams.tienda){
				tiendas.push({key: key, value: value});
			}else{
				tiendas.push({key: key, value: value});
			}
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

	if($stateParams.status == 'canceled'){
		$scope.estatu = $scope.statos[1];
	}else if($stateParams.status == 'incomplete'){
		$scope.estatu = $scope.statos[2];
	}else if($stateParams.status == 'opened'){
		$scope.estatu = $scope.statos[3];
	}else if($stateParams.status == 'payment_pending'){
		$scope.estatu = $scope.statos[4];
	}else{
		$scope.estatu = $scope.statos[0];
	}	

	servicosAPI.searchPerfilClientes($scope.id, $stateParams.tienda, $stateParams.status, $stateParams.text, $scope.pag).then(function(result){

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
				servicosAPI.searchPerfilClientes($scope.id, $stateParams.tienda, $stateParams.status, $stateParams.text, $scope.pag).then(function(result){
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
angular.module("sop").controller("searchRestaurantesCategoriasCtrl", function($scope, $state, $cookies, $state, $stateParams, servicosAPI){
	
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
	
	$scope.text = $stateParams.text;
	$scope.pag = 1;
	$scope.apa = true;
	var pedidos = [];
	
	$scope.statos = [
		{value:'', aparence:'Seleccione uno estado'},
		{value:'canceled', aparence:'Cancelada'},
		{value:'incomplete', aparence:'Incompleta'},
		{value:'opened', aparence:'Pagada'},
		{value:'payment_pending', aparence:'Pendiente de Pago'},
		{value:'delivered', aparence:'Entregado'},
	]

	$scope.estatu = $scope.statos[0];
	
	servicosAPI.searchRestaurantesCategorias($scope.text, $scope.pag).then(function(result){
		console.log(result.data);
		for(var i=0; i<result.data.data.length; i++){
			pedidos.push(result.data.data[i]);
		}
		
		$scope.maisPag = function(){
			$scope.apa = false;
			$scope.pag += 1;
			servicosAPI.searchRestaurantesCategorias($scope.text, $scope.pag).then(function(result){
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
	});

	$scope.enter = function(event){
		if(window.event.keyCode == 13){
			console.log('enter');
			$scope.buscar();
		}
	};

	$scope.buscar = function(){
		if($scope.buscando){
			$state.go('search-restaurantes-categorias', {text:$scope.buscando});
		}
	}
	
	$scope.sair = function(){
		$cookies.remove('token');
		$state.go('inicio');
	}
	
});
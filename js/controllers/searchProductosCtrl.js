angular.module("sop").controller("searchProductosCtrl", function($scope, $cookies, $stateParams, $state, servicosAPI){
	
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
	
	if($stateParams.tienda){
		$scope.tienda = $stateParams.tienda;
	}else{
		$scope.tienda = null;
	}
	$scope.text = $stateParams.text;
	$scope.buscando = $stateParams.text;
	$scope.status = $stateParams.status;

	$scope.pag = 1;
	$scope.apa = true;
	var produtos = [];
	var tiendas = [];

	$scope.estatos = [
		{value:'', aparence:'Selecciona una opción'},
		{value:1, aparence:'Activas'},
		{value:2, aparence:'Inactivas'},
	]
	
	$scope.estato = $scope.estatos[0];

	if($stateParams.status == 1){
		$scope.estato = $scope.estatos[1];
	}else if($stateParams.status == 2){
		$scope.estato = $scope.estatos[2];
	}else{
		$scope.estato = $scope.estatos[0];
	}
	
	servicosAPI.searchProductos($scope.text, $scope.tienda, $scope.pag).then(function(result){
		angular.forEach(result.data.filters.stores, function(value, key) {
			tiendas.push({key: key, value: value});
		});
		
		$scope.tiendas = tiendas;

		for(var i=0; i<result.data.data.length; i++){
			produtos.push(result.data.data[i]);
		}

		$scope.maisPag = function(){
			$scope.apa = false;
			$scope.pag += 1;
			servicosAPI.searchProductos($scope.text, $scope.tienda, $scope.pag).then(function(result){
				for(var i=0; i<result.data.data.length; i++){
					produtos.push(result.data.data[i]);
					$scope.apa = true;
				}
				
				if($scope.pag == result.data.last_page){
					$scope.parou = true;
				};
			});
		};

		$scope.produtos = produtos;
	});

	$scope.enter = function(event){
		if(window.event.keyCode == 13){
			console.log('enter');
			$scope.buscar();
		}
	};

	$scope.seleEstato = function(){
		$state.go('search-productos', {text:$scope.buscando, tienda:$scope.tienda, status:$scope.estato.value});
	};

	$scope.busTienda = function() {
		$state.go('search-productos', {text:$scope.buscando, tienda:$scope.tienda, status:$scope.status});
	};

	$scope.buscar = function(){
		if($scope.buscando){
			$state.go('search-productos', {text:$scope.buscando, tienda:$scope.tienda, status:$scope.status});
		}
	}

	$scope.editarProdutos = function(id){
		$state.go('editar-productos', {id:id, tp:'productos'});
	}
	
	$scope.sair = function(){
		$cookies.remove('token');
		$state.go('inicio');
	}
	
});
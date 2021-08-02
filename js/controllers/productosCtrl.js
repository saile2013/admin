angular.module("sop").controller("productosCtrl", function($scope, $cookies, $state, servicosAPI){
	
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

	servicosAPI.getProductos($scope.pag).then(function(result){
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
			servicosAPI.getProductos($scope.pag).then(function(result){
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

		console.log(produtos);
	});

	$scope.enter = function(event){
		if(window.event.keyCode == 13){
			console.log('enter');
			$scope.buscar();
		}
	};

	$scope.seleEstato = function(){
		$state.go('search-productos', {text:null, tienda:null, status:$scope.estato.value});
	};

	$scope.busTienda = function() {
		$state.go('search-productos', {text:null, tienda:$scope.tienda, status:null});
	};

	$scope.buscar = function(){
		if($scope.buscando){
			$state.go('search-productos', {text:$scope.buscando, tienda:null, status:null});
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
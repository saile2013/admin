angular.module("sop").controller("searchShoppersCtrl", function($scope, $state, $cookies, $state, $stateParams, servicosAPI){
	
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

	if($stateParams.tienda){
		$scope.tienda = $stateParams.tienda;
	}else{
		$scope.tienda = null;
	}
	$scope.text = $stateParams.text;
	$scope.buscando = $stateParams.text;

	servicosAPI.getShoStores().then(function(result){
		console.log(result.data.data);
		$scope.tiendas = result.data.data;
	});

	servicosAPI.getSearchShoProdutos($scope.text, $scope.tienda, $scope.pag).then(function(result){
		console.log(result.data.data);
		for(var i=0; i<result.data.data.length; i++){
			produtos.push(result.data.data[i]);
		}
		
		$scope.maisPag = function(){
			$scope.apa = false;
			$scope.pag += 1;
			servicosAPI.getSearchShoProdutos($scope.pag).then(function(result){
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

	$scope.busTienda = function() {
		$state.go('search-shoppers', {text:$scope.buscando, tienda:$scope.tienda});
	};

	$scope.buscar = function(){
		if($scope.buscando){
			$state.go('search-shoppers', {text:$scope.buscando, tienda:$scope.tienda});
		}
	}

	$scope.editarProdutos = function(id){
		$state.go('editar-productos', {id:id, tp:'shoppers'});
	}
	
	$scope.sair = function(){
		$cookies.remove('token');
		$state.go('inicio');
	}
	
});
angular.module("sop").controller("precosIncriveisCtrl", function($scope, $cookies, $state, servicosAPI){
	
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

	$scope.estatos = [
		{value:'', aparence:'Selecciona una opción'},
		{value:1, aparence:'Activas'},
		{value:2, aparence:'Inactivas'},
	]
	
	$scope.estato = $scope.estatos[0];

	$scope.productos = () => {

		$scope.produtos = false;
		produtos.splice(0);

		servicosAPI.getAmazing($scope.pag).then(function(result){
			console.log(result.data.data.data);
			for(var i=0; i<result.data.data.data.length; i++){
				produtos.push(result.data.data.data[i]);
			}

			$scope.maisPag = function(){
				$scope.apa = false;
				$scope.pag += 1;
				servicosAPI.getAmazing($scope.pag).then(function(result){
					for(var i=0; i<result.data.data.data.length; i++){
						produtos.push(result.data.data.data[i]);
						$scope.apa = true;
					}
					
					if(result.data.data.data.length == 0){
						$scope.parou = true;
					}
				});
			};

			$scope.produtos = produtos;
		});
	}

	$scope.productos();

	$scope.rmvProdutos = (id) => {
		servicosAPI.deleteAmazing(id).then(function(result){
			$scope.productos();
		});
	}

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
			$state.go('search-incriveis', {text:$scope.buscando, tienda:null, status:null});
		}
	}
	
	$scope.sair = function(){
		$cookies.remove('token');
		$state.go('inicio');
	}
	
});
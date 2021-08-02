angular.module("sop").controller("searchPasillosCtrl", function($scope, $cookies, $stateParams, $state, servicosAPI){
	
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
	$scope.id = $stateParams.store_id;
	$scope.pag = 1;
	$scope.apa = true;
	var tiendas = [];

	servicosAPI.dtlTiendas($scope.id).then(function (result) {
		$scope.nameTienda = result.data.data.name;
	});
	
	servicosAPI.searchPasillos($scope.text, $scope.id, $scope.pag).then(function(result){
		for(var i=0; i<result.data.data.length; i++){
			tiendas.push(result.data.data[i]);
		}

		$scope.maisPag = function(){
			$scope.apa = false;
			$scope.pag += 1;
			servicosAPI.searchPasillos($scope.text, $scope.id, $scope.pag).then(function(result){
				if(result.data.data[0]){
					for(var i=0; i<result.data.data.length; i++){
						tiendas.push(result.data.data[i]);
						$scope.apa = true;
					}				
				}else{
					$scope.parou = true;
				};
			});
		};

		$scope.tiendas = tiendas;
	});

	$scope.buscar = function(){
		if(!$scope.buscando){
			$scope.buscando = null;
		}
		if(!$scope.id){
			$scope.id = null;
		}
		$state.go('search-pasillos', {text:$scope.buscando, store_id:$scope.id});
	}
	
	$scope.sair = function(){
		$cookies.remove('token');
		$state.go('inicio');
	}
	
});
angular.module("sop").controller("perfilTiendasTematicasCtrl", function($scope, $cookies, $stateParams, $state, servicosAPI){
	
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
	$scope.pag = 20;
	$scope.apa = true;
	
	servicosAPI.dtlTiendas($scope.id).then(function (result) {
		$scope.nameTienda = result.data.data.name;
	});

	servicosAPI.getPasillos($scope.id).then(function(result){
		console.log(result.data.data);
		$scope.tiendas = result.data.data;

		$scope.maisPag = function(){
			$scope.pag += 20;
			if($scope.pag >= result.data.data.length){
				$scope.apa = false;
			}
		};
	});

	$scope.buscar = function(){
		$state.go('search-pasillos', {text:$scope.buscando, store_id:$scope.id});
	}
	
	$scope.sair = function(){
		$cookies.remove('token');
		$state.go('inicio');
	}
	
});
angular.module("sop").controller("tiendasTematicasCtrl", function($scope, $cookies, $state, servicosAPI){
	
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
	
	$scope.pag = 20;
	$scope.apa = true;
	
	servicosAPI.getTiendas().then(function(result){
		$scope.tiendas = result.data.data;

		$scope.maisPag = function(){
			$scope.pag += 20;
			if($scope.pag >= result.data.data.length){
				$scope.apa = false;
			}
		};
	});

	$scope.buscar = function(){
		$state.go('search-tiendas', {text:$scope.buscando});
	}
	
	$scope.sair = function(){
		$cookies.remove('token');
		$state.go('inicio');
	}
	
});
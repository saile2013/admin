angular.module("sop").controller("perfilTiendasCtrl", function($scope, $cookies, $stateParams, $state, servicosAPI){
	
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
	var tiendas = [];
	
	servicosAPI.dtlTiendas($scope.id).then(function (result) {
		$scope.nameTienda = result.data.data.name;
	});

	servicosAPI.getPasillos($scope.id, $scope.pag).then(function(result){		
		for(var i=0; i<result.data.data.length; i++){
			tiendas.push(result.data.data[i]);
		}

		$scope.maisPag = function(){
			$scope.apa = false;
			$scope.pag += 1;
			servicosAPI.getPasillos($scope.id, $scope.pag).then(function(result){
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

		if(result.data.data.length > 0){
			$scope.tiendas = tiendas;
		}else{
			$scope.semresult = true;
			$scope.tiendas = true;
		}
	});

	$scope.enter = function(event){
		if(window.event.keyCode == 13){
			console.log('enter');
			$scope.buscar();
		}
	};

	$scope.buscar = function(){
		if($scope.buscando){
			if(!$scope.id){
				$scope.id = null;
			}
			$state.go('search-pasillos', {text:$scope.buscando, store_id:$scope.id});
		}
	}
	
	$scope.sair = function(){
		$cookies.remove('token');
		$state.go('inicio');
	}
	
});
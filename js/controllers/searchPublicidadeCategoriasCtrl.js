angular.module("sop").controller("searchPublicidadeCategoriasCtrl", function($scope, $cookies, $stateParams, $state, servicosAPI){
	
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
	$scope.status = $stateParams.status;
	$scope.pag = 1;
	$scope.apa = true;
	var categorias = [];

	$scope.estatos = [
		{value:'', aparence:'Selecciona una opción'},
		{value:1, aparence:'Activas'},
		{value:2, aparence:'Inactivas'},
	]

	if($stateParams.status == 1){
		$scope.estato = $scope.estatos[1];
	}else if($stateParams.status == 2){
		$scope.estato = $scope.estatos[2];
	}else{
		$scope.estato = $scope.estatos[0];
	}
	
	servicosAPI.searchCategorias($scope.text, $scope.status, $scope.pag).then(function(result) {
		console.log(result.data.data);
		for(var i=0; i<result.data.data.length; i++){
			categorias.push(result.data.data[i]);
		}


		$scope.maisPag = function(){
			$scope.apa = false;
			$scope.pag += 1;
			servicosAPI.searchCategorias($scope.text, $scope.status, $scope.pag).then(function(result){
				for(var i=0; i<result.data.data.length; i++){
					categorias.push(result.data.data[i]);
					$scope.apa = true;
				}
				
				if($scope.pag == result.data.last_page){
					$scope.parou = true;
				};
			});
		};

		$scope.categorias = categorias;
	});

	$scope.enter = function(event){
		if(window.event.keyCode == 13){
			console.log('enter');
			$scope.buscar();
		}
	};

	$scope.seleEstato = function(){
		$state.go('search-publicidade-categorias', {text:$scope.text, status:$scope.estato.value});
	};

	$scope.buscar = function(){
		if($scope.buscando){
			$state.go('search-publicidade-categorias-', {text:$scope.buscando, status:$scope.status});
		}
	}
	
	$scope.sair = function(){
		$cookies.remove('token');
		$state.go('inicio');
	}
	
});
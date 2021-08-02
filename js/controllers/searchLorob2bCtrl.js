angular.module("sop").controller("searchLorob2bCtrl", function($scope, $cookies, $state, $stateParams, servicosAPI){
	
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
	$scope.buscando = $stateParams.text;
	$scope.pag = 1;
	$scope.apa = true;
	var tiendas = [];

	servicosAPI.searchCompaniesB2B($scope.text, $scope.pag, $cookies.get('token')).then(function(result){
		console.log(result.data);
		
		for(var i=0; i<result.data.data.length; i++){
			tiendas.push(result.data.data[i]);
		}
		
		$scope.maisPag = function(){
			$scope.apa = false;
			$scope.pag += 1;
			servicosAPI.searchCompaniesB2B($scope.text, $scope.pag,  $cookies.get('token')).then(function(result){
				for(var i=0; i<result.data.data.length; i++){
					tiendas.push(result.data.data[i]);
					$scope.apa = true;
				}
				
				if($scope.pag == result.data.last_page){
					$scope.parou = true;
				};
			});
		};

		$scope.tiendas = tiendas;
	});

	$scope.enter = function(event){
		if(window.event.keyCode == 13){
			console.log('enter');
			$scope.buscar();
		}
	};

	$scope.buscar = function(){
		if($scope.buscando){
			$state.go('search-lorob2b', {text:$scope.buscando});
		}
	}

	$scope.sair = function(){
		$cookies.remove('token');
		$state.go('inicio');
	}
	
});
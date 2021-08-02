angular.module("sop").controller("perfilLorob2bCtrl", function($scope, $cookies, $state, $stateParams, servicosAPI){
	
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
	$scope.dados = {};
	$scope.active = 1;
	$scope.botao = true;
	$scope.pag = 1;
	$scope.apa = true;
	var tiendas = [];

	$scope.is_active = function(){
		$scope.active = 1;
	}

	$scope.no_active = function(){
		$scope.active = 0;
	}

	servicosAPI.perfilCompaniesB2B($scope.id, $cookies.get('token')).then(function(result){

		console.log(result.data);

		$scope.registered_users = result.data.data.registered_users;
		$scope.active_users = result.data.data.active_users;
		$scope.redemption = result.data.data.redemption;
		$scope.total_charge_charged = result.data.data.total_charge_charged;
		$scope.available_charge = result.data.data.available_charge;
				
		
		$scope.name = result.data.data.name;
		$scope.legal_name = result.data.data.legal_name;
		$scope.nit = result.data.data.nit;
		$scope.active = result.data.data.status;

	});

	$scope.salvar = function(){

		$scope.botao = false;
		
		if($scope.active == 1){
			$scope.is_active = true;
		}else{
			$scope.is_active = false;	
		}

		var dados = {
			name: $scope.name,
			legal_name: $scope.legal_name,
			nit: $scope.nit,
			status: $scope.active,
		}

		if(!$scope.name){
			$scope.botao = true;
			document.getElementById('status').innerHTML = "¡Complete el campo NOMBRE!";
		}else if(!$scope.legal_name){
			$scope.botao = true;
			document.getElementById('status').innerHTML = "¡Complete el campo NOMBRE LEGAL!";
		}else if(!$scope.nit){
			$scope.botao = true;
			document.getElementById('status').innerHTML = "¡Complete el campo NIT!";
		}else{
			servicosAPI.putCompaniesB2B(dados, $scope.id, $cookies.get('token')).then(function (result) {
				$scope.botao = true;
				document.getElementById('status').innerHTML = "¡Salvo con éxito!";
			});
		}
	};

	$scope.users = function(){
		servicosAPI.getCompaniesB2Busers($scope.id, $scope.pag, $cookies.get('token')).then(function(result){
			console.log(result.data);
			
			for(var i=0; i<result.data.data.length; i++){
				tiendas.push(result.data.data[i]);
			}
			
			$scope.maisPag = function(){
				$scope.apa = false;
				$scope.pag += 1;
				servicosAPI.getCompaniesB2Busers($scope.id, $scope.pag, $cookies.get('token')).then(function(result){
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
	}

	$scope.users();


	$scope.expoUser = function(){
		servicosAPI.expCompaniesB2Busers($scope.id, $cookies.get('token')).then(function(result){
			console.log(result.data);
			window.location.href=result.data.data;
		});
	}
	

	$scope.buscar = function(){
		if($scope.buscando == ''){
			$scope.users();
			return true;
		}
		
		tiendas.splice(0);
		servicosAPI.searchCompaniesB2Busers($scope.id, $scope.buscando, $scope.pag, $cookies.get('token')).then(function(result){
			$scope.tiendas = result.data.data;
			
			$scope.maisPag = function(){
				$scope.apa = false;
				$scope.pag += 1;
				servicosAPI.searchCompaniesB2Busers($scope.id, $scope.buscando, $scope.pag, $cookies.get('token')).then(function(result){
					$scope.tiendas = result.data.data;
					$scope.apa = true;
					
					if($scope.pag == result.data.last_page){
						$scope.parou = true;
					};
				});
			};
		});
	};

	$scope.metricas = function(){
		servicosAPI.getMetricasB2B($scope.id, $cookies.get('token')).then(function(result){
			console.log(result.data.data);
			$scope.metricas = result.data.data;
		});
	}

	$scope.metricas();


	/*$scope.buscar = function(){
		if($scope.buscando){
			$state.go('search-lorob2b', {text:$scope.buscando});
		}
	}*/

	$scope.sair = function(){
		$cookies.remove('token');
		$state.go('inicio');
	}
	
});
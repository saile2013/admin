angular.module("sop").controller("adicionarBlacklistCtrl", function($scope, $cookies, $state, servicosAPI){
	
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
	
	$scope.dados = {};
	$scope.active = 1;
	$scope.botao = true;

	$scope.opciones = [
		{value:'', aparence:'Selecciona un opción'},
		{value:1, aparence:'Número Dani'},
		{value:2, aparence:'Teléfono'},
		{value:3, aparence:'Direcciones'},
	]

	$scope.opcione = $scope.opciones[0];
	
	$scope.salvar = function(dados){

		$scope.botao = false;
		
		if(!$scope.phone && !$scope.dni_number && !$scope.address){
			
			$scope.botao = true;
			document.getElementById('status').innerHTML = "¡Complete una OPCIÓN!";

		}else if($scope.phone){

			var dados = {
				phone: $scope.phone,
			}

			servicosAPI.postBlacklist(dados, 'phone').then(function (result) {
				$scope.botao = true;
				document.getElementById('status').innerHTML = "¡Salvo con éxito!";
			});

		}else if($scope.dni_number){

			var dados = {
				dni_number: $scope.dni_number,
			}

			servicosAPI.postBlacklist(dados, 'dni_number').then(function (result) {
				$scope.botao = true;
				document.getElementById('status').innerHTML = "¡Salvo con éxito!";
			});

		}else if($scope.address){

			var dados = {
				address: $scope.address
			}

			servicosAPI.postBlacklist(dados, 'address').then(function (result) {
				$scope.botao = true;
				document.getElementById('status').innerHTML = "¡Salvo con éxito!";
			});
		}
		
	};
	
	$scope.sair = function(){
		$cookies.remove('token');
		$state.go('inicio');
	}
	
});
angular.module("sop").controller("adicionarRiesgoCtrl", function($scope, $state, $cookies, $state, servicosAPI){
	
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
	
	$scope.botao = true;
	
	$scope.buscar = function(){

		$scope.botao = false;

		if(!$scope.latitude){
			$scope.botao = true;
			document.getElementById('status').innerHTML = "Completar el campo LATITUDE!";
		}else if(!$scope.longitude){
			$scope.botao = true;
			document.getElementById('status').innerHTML = "Completar el campo LONGITUDE!";
		}else if(!$scope.radio){
			$scope.botao = true;
			document.getElementById('status').innerHTML = "Completar el campo RADIO!";
		}else{

			servicosAPI.postRiesgo($scope.latitude, $scope.longitude, $scope.radio).then(function (result) {
				$scope.botao = true;
				$scope.latitude = ""; 
				$scope.longitude = ""; 
				$scope.radio = "";
				document.getElementById('status').innerHTML = "¡Salvo con éxito!";
			});
		}
	};
	
	$scope.sair = function(){
		$cookies.remove('token');
		$state.go('inicio');
	}
	
});
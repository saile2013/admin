angular.module("sop").controller("pushCsvCtrl", function($scope, $state, $cookies, $state, servicosAPI){
	
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

		if(!$scope.nombre){
			$scope.botao = true;
			document.getElementById('status').innerHTML = "Selecciona el campo NOMBRE!";
		}else if(!$scope.email){
			$scope.botao = true;
			document.getElementById('status').innerHTML = "Selecciona el campo E-MAIL!";
		}else{

			var dados = {
				name_user: $scope.nombre,
				email: $scope.email,
				phone: $scope.telefono,
				mensaje: $scope.mensaje,
				file : $scope.yourMode1.base64,
			}

			servicosAPI.postPushUsers(dados).then(function (result) {
				$scope.botao = true;
				document.getElementById('status').innerHTML = '¡Salvo con éxito!';
			});
		}
	};
	
	$scope.sair = function(){
		$cookies.remove('token');
		$state.go('inicio');
	}
	
});
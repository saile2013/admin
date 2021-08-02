angular.module("sop").controller("cargueTiendaCidadCtrl", function($scope, $cookies, $state, servicosAPI){
	
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

	$scope.carregou = true;

	$scope.carrega1 = function(){
		var type = $scope.yourModel1.filename.substr(-3);
		if(type !== 'csv'){
			document.getElementById('status').innerHTML = "¡el archivo no es un CSV!";
		}
	}
	

	$scope.irSearch = function(){

		$scope.carregou = false;

		var dados = {
			"file": $scope.yourModel1.base64
		}

		servicosAPI.postCargue(dados).then(function (result) {
			$scope.carregou = true;
			$scope.yourModel1 = '';
			document.getElementById('status').innerHTML = "¡Salvo con éxito!";
		});
	};
	
	$scope.sair = function(){
		$cookies.remove('token');
		$state.go('inicio');
	}
	
});
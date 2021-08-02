angular.module("sop").controller("adicionarKitCtrl", function($scope, $cookies, $location, servicosAPI){
	
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
	
	$scope.is_active = function(){
		$scope.active = 1;
	}

	$scope.no_active = function(){
		$scope.active = 0;
	}
	
	$scope.salvar = function(dados){
		
		if($scope.active == 1){
			$scope.is_active = true;
		}else{
			$scope.is_active = false;	
		}

		if($scope.yourModel){
			$scope.file1 = 'data:'+$scope.yourModel.filetype+';base64,'+$scope.yourModel.base64;
		}

		var dados = {
			name: $scope.name,
			description: $scope.description,
			banner: $scope.file1,
			is_active: $scope.is_active,			
		}

		if(!$scope.name){
			document.getElementById('status').innerHTML = "¡Complete el campo NOMBRE!";
		}else{
			servicosAPI.postTiendas(dados).then(function (result) {
				document.getElementById('status').innerHTML = "¡Salvo con éxito!";
			});			
		}
	};
	
	$scope.sair = function(){
		$cookies.remove('token');
		$state.go('inicio');
	}
	
});
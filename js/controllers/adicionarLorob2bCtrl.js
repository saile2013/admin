angular.module("sop").controller("adicionarLorob2bCtrl", function($scope, $cookies, $state, servicosAPI){
	
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
	
	$scope.is_active = function(){
		$scope.active = 1;
	}

	$scope.no_active = function(){
		$scope.active = 0;
	}

	$scope.salvar = function(dados){

		$scope.botao = false;
		
		if($scope.active == 1){
			$scope.is_active = true;
		}else{
			$scope.is_active = false;	
		}

		var dados = {
			name: $scope.name,
			legal_name: $scope.name_legal,
			nit: $scope.nit,
		}

		if(!$scope.name){
			$scope.botao = true;
			document.getElementById('status').innerHTML = "¡Complete el campo NOMBRE!";
		}else if(!$scope.name_legal){
			$scope.botao = true;
			document.getElementById('status').innerHTML = "¡Complete el campo NOMBRE LEGAL!";
		}else if(!$scope.nit){
			$scope.botao = true;
			document.getElementById('status').innerHTML = "¡Complete el campo NIT!";
		}else{
			servicosAPI.postCompaniesB2B(dados, $cookies.get('token')).then(function (result) {
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
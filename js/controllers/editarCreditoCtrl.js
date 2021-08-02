angular.module("sop").controller("editarCreditoCtrl", function($scope, $cookies, $state, $stateParams, servicosAPI){
	
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
	$scope.idCharge = $stateParams.idCharge;
	$scope.dados = {};
	$scope.active = 1;
	$scope.botao = true;
	$scope.pag = 1;
	$scope.apa = true;

	servicosAPI.getMetricasB2Bperfil($scope.id, $scope.idCharge, $cookies.get('token')).then(function(result){
		console.log(result.data.data);
		$scope.precos = result.data.data.loaded_balance;

	});

	$scope.formatarMoeda = function () {
		
        var elemento = document.getElementById('preco');
        var valor = elemento.value;

        valor = valor.replace(/\D/g, "");
		if (valor.length > 2) {
			valor = valor.replace(/(\d+)(\d{2})/, "$1.$2");
		}
		
		if (valor.length > 5) {
			valor = valor.replace(/(\d+)(\d{3}).(\d{2})/, "$1.$2.$3");
		}

		elemento.value = valor;
        if(valor == 'NaN') elemento.value = '';
    }


	$scope.salvar = function(){

		$scope.botao = false;
		
		var dados = {
			loaded_balance: document.getElementById('preco').value.replace(/[^\d]+/g,''),
		}

		if(!document.getElementById('preco').value){
			$scope.botao = true;
			document.getElementById('status2').innerHTML = "¡Complete el campo VALOR!";
		}else{
			servicosAPI.putSubirCreditoB2B(dados, $scope.id, $scope.idCharge, $cookies.get('token')).then(function (result) {
				$scope.botao = true;
				document.getElementById('status2').innerHTML = "¡Salvo con éxito!";
				setTimeout(function(){ $state.go('perfil-lorob2b', {id:$scope.id}, {reload: true}); }, 1000);
			}).catch(function(error){
				if(error){
					$scope.botao = true;
					document.getElementById('status2').innerHTML = error.data.error;
				}
			});
		}
	};

	$scope.back = function(){
		$state.go('perfil-lorob2b', {id:$scope.id});
	}

	$scope.sair = function(){
		$cookies.remove('token');
		$state.go('inicio');
	}
	
});
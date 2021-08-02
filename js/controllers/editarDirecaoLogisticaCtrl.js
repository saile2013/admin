angular.module("sop").controller("editarDirecaoLogisticaCtrl", function($scope, $cookies, $state, $stateParams, servicosAPI){
	
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
	$scope.active = false;
	$scope.botao = true;
	
	servicosAPI.getEnderecoCotacao($scope.id).then(function (result) {
		console.log(result.data.data);
		if(result.data.data){
			$scope.name = result.data.data.contact_name;
			$scope.email = result.data.data.email_address;
			$scope.phone = result.data.data.phone_number;

			$scope.indicacoes = result.data.data.additional_info;
			$scope.endereco = result.data.data.address;
			$scope.cidade = result.data.data.city;
			$scope.dane = result.data.data.dane_code;
			$scope.estado = result.data.data.deparment;
		}
	});

	$scope.abreCida = function(){		
		if($scope.cidade.length > 0){
			$scope.active = true;
			servicosAPI.getCidade($scope.cidade).then(function (result) {
				console.log(result.data.retorno);
				$scope.cidas = result.data.retorno;
			});
		}else{
			$scope.active = false;
			$scope.cidas = "";
		}
	};

	$scope.fechaCida = function(){
		$scope.active = false;
		$scope.cidas = "";
	};

	$scope.seleCida = function(cidade, deparmento, codigo_dane){
			$scope.cidade = cidade;
			$scope.estado = deparmento;
			$scope.dane = codigo_dane;
			$scope.active = false;
			$scope.cidas = "";
	};

	$scope.salvar = function(){

		$scope.botao = false;

		var pincode = document.getElementById('pincode').value;
		var pincode = pincode.length;

		var pincode2 = document.getElementById('pincode2').value;
		var pincode2 = pincode2.length;
		  
		if(!$scope.name){
			$scope.botao = true;
			document.getElementById('status').innerHTML = "¡Complete el campo Nombre!";
		}else if(!$scope.email){
			$scope.botao = true;
			document.getElementById('status').innerHTML = "¡Complete el campo E-mail!";
		}else if(!$scope.phone){
			$scope.botao = true;
			document.getElementById('status').innerHTML = "¡Complete el campo Teléfono!";
		}else if(!$scope.indicacoes){
			$scope.botao = true;
			document.getElementById('status').innerHTML = "¡Complete el campo Indicaciones!";
		}else if(!$scope.cidade){
			$scope.botao = true;
			document.getElementById('status').innerHTML = "¡Complete el campo City!";
		}else if(!$scope.estado){
			$scope.botao = true;
			document.getElementById('status').innerHTML = "¡Complete el campo Deparment!";
		}else if(!$scope.dane){
			$scope.botao = true;
			document.getElementById('status').innerHTML = "¡Complete el campo Código Dane!";
		}else if(pincode > 24){
			$scope.botao = true;
			document.getElementById('status').innerHTML = "¡El límite de caracteres excede en Dirección!";
		}else if(pincode2 > 24){
			$scope.botao = true;
			document.getElementById('status').innerHTML = "¡El límite de caracteres excede en Indicaciones!";
		}else{

			var dados = {
				contact_name: $scope.name,
				email_address: $scope.email,
				phone_number: $scope.phone,
	
				city: $scope.cidade,
				deparment: $scope.estado,
				address: $scope.endereco,
				additional_info: $scope.indicacoes,
				dane_code: $scope.dane,
				store_id: $scope.id
			}
	
			console.log(dados);

			servicosAPI.postEnderecoTiendas(dados).then(function (result) {
				if(result.data.code == 400){
					$scope.botao = true;
					document.getElementById('status').innerHTML = 
					'¡Salvo con éxito! <br/><br/> Por favor, para esa dirección hay que entrar en contacto con backend para que agreguen la dirección directamente en Geo.Loro Gracias';
				}else{
					$scope.botao = true;
					document.getElementById('status').innerHTML = "¡Salvo con éxito!";
				}
			}).catch((erro) => {
				console.log(erro);
			});
		}
	};
	
	$scope.sair = function(){
		$cookies.remove('token');
		$state.go('inicio');
	}
	
});
angular.module("sop").controller("searchPerfilShoProdutosCtrl", function($scope, $state, $cookies, $state, $stateParams, servicosAPI){
	
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
	$scope.status = $stateParams.status;
	$scope.geneross = $stateParams.genero;
	$scope.text = $stateParams.text;
	$scope.buscando = $stateParams.text;

	$scope.pag = 1;
	$scope.apa = true;
	$scope.mostra = true;
	$scope.statusss = 0;
	var clientes = [];

	$scope.generos = [
		{value:'', aparence:'Selecciona un genero'},
		{value:'f', aparence:'Femenino'},
		{value:'m', aparence:'Masculino'},
		{value:'other', aparence:'Femenino y Masculino'},
	]

	if($stateParams.genero == 'f'){
		$scope.genero = $scope.generos[1];
	}else if($stateParams.genero == 'm'){
		$scope.genero = $scope.generos[2];
	}else if($stateParams.genero == 'other'){
		$scope.genero = $scope.generos[3];
	}else{
		$scope.genero = $scope.generos[0];
	}

	$scope.estatos = [
		{value:'', aparence:'Selecciona un estado'},
		{value:1, aparence:'Activo'},
		{value:0, aparence:'Inactivo'},
	]

	if(!$stateParams.status){
		$scope.estato = $scope.estatos[0];
	}else{
		if($stateParams.status == 0){
			$scope.estato = $scope.estatos[2];
			
		}else if($stateParams.status == 1){
			$scope.estato = $scope.estatos[1];
		}
	}
	
	servicosAPI.searchClientes($scope.status, $scope.geneross, $scope.text, $scope.pag)
	.then(function(result){

		console.log(result.data.data);
		for(var i=0; i<result.data.data.length; i++){
			clientes.push(result.data.data[i]);
		}
		
		$scope.maisPag = function(){
			$scope.apa = false;
			$scope.pag += 1;
			servicosAPI.searchClientes($scope.status, $scope.geneross, $scope.text, $scope.pag)
			.then(function(result){
				for(var i=0; i<result.data.data.length; i++){
					clientes.push(result.data.data[i]);
					$scope.apa = true;
				}
				
				if($scope.pag == result.data.last_page){
					$scope.parou = true;
				};
			});
		};

		$scope.clientes = clientes;
	});

	$scope.atvStatus3 = function(id, status){

		if(status==1){
			var sTatus = true;
		}else{
			var sTatus = false;
		}

		var dados = {
			"user_id": id,
		}

		servicosAPI.putClientes2($scope.id, dados).then(function(result){
			if(status==1){
				document.getElementById('bloqueoDt'+id).style.display = 'none';
				document.getElementById('bloqueoAt'+id).style.display = 'block';
			}
			if(status==0){
				document.getElementById('bloqueoAt'+id).style.display = 'none';
				document.getElementById('bloqueoDt'+id).style.display = 'block';
			}
			setTimeout(function(){
				$state.go('shoppers');
			}, 500);
		}).catch(function(result){
			document.getElementById('status'+id).innerHTML = result.data.error;
		});
	};

	$scope.enter = function(event){
		if(window.event.keyCode == 13){
			console.log('enter');
			$scope.buscar();
		}
	};

	$scope.seleGender = function(){
		$state.go('search-perfil-shoProdutos', {id:$scope.id, status:$scope.status, genero:$scope.genero.value, text:$scope.text});
	};

	$scope.seleEstato = function(){
		$state.go('search-perfil-shoProdutos', {id:$scope.id, status:$scope.estato.value, genero:$scope.geneross, text:$scope.text});
	};

	$scope.buscar = function(){
		if($scope.buscando){
			$state.go('search-perfil-shoProdutos', {id:$scope.id, status:$scope.status, genero:$scope.geneross, text:$scope.buscando});
		}
	};
	
	$scope.sair = function(){
		$cookies.remove('token');
		$state.go('inicio');
	}
	
});
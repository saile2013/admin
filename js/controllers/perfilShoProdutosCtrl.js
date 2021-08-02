angular.module("sop").controller("perfilShoProdutosCtrl", function($scope, $state, $cookies, $state, $stateParams, servicosAPI){
	
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
	$scope.pag = 1;
	$scope.apa = true;
	$scope.mostra = true;
	var clientes = [];

	$scope.generos = [
		{value:'', aparence:'Selecciona un genero'},
		{value:'f', aparence:'Femenino'},
		{value:'m', aparence:'Masculino'},
		{value:'other', aparence:'Femenino y Masculino'},
	]

	$scope.genero = $scope.generos[0];

	$scope.estatos = [
		{value:'', aparence:'Selecciona un estado'},
		{value:1, aparence:'Activo'},
		{value:0, aparence:'Inactivo'},
	]

	$scope.estato = $scope.estatos[0];
	
	servicosAPI.getClientes($scope.pag).then(function(result){
		console.log(result.data.data);
		for(var i=0; i<result.data.data.length; i++){
			clientes.push(result.data.data[i]);
		}
		
		$scope.maisPag = function(){
			$scope.apa = false;
			$scope.pag += 1;
			servicosAPI.getClientes($scope.pag).then(function(result){
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
		$state.go('search-perfil-shoProdutos', {id:$scope.id, status:null, genero:$scope.genero.value, text:null});
	};

	$scope.seleEstato = function(){
		$state.go('search-perfil-shoProdutos', {id:$scope.id, status:$scope.estato.value, genero:null, text:null});
	};

	$scope.buscar = function(){
		if($scope.buscando){
			$state.go('search-perfil-shoProdutos', {id:$scope.id, status:null, genero:null, text:$scope.buscando});
		}
	};
	
	$scope.sair = function(){
		$cookies.remove('token');
		$state.go('inicio');
	}
	
});
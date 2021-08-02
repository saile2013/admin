angular.module("sop").controller("searchChavesUsuariosCtrl", function($scope, $cookies, $state, $stateParams, servicosAPI){
	
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
	$scope.text = $stateParams.text;
	$scope.buscando = $stateParams.text;
	$scope.pag = 1;
	$scope.apa = true;
	$scope.ordernar = false;
	$scope.ordenn = false;
	var usuarios = [];

	$scope.estatos = [
		{value:1, aparence:'ID'},
		{value:2, aparence:'Nombre'},
		{value:3, aparence:'Email'},
		{value:4, aparence:'número dni'},
		{value:5, aparence:'Creado en'},
	]
	
	$scope.estato = $scope.estatos[0];

	servicosAPI.getPerfilKey($scope.pag, $scope.id).then(function(result){
		$scope.nmTienda = result.data.data[0].search;
	});

	servicosAPI.searchKeyUsers($scope.pag, $scope.id, $scope.text).then(function(result){
		console.log(result.data);
		for(var i=0; i<result.data.data.length; i++){
			usuarios.push(result.data.data[i]);
		}
		
		$scope.maisPag = function(){
			$scope.apa = false;
			$scope.pag += 1;
			servicosAPI.searchKeyUsers($scope.pag, $scope.id, $scope.text).then(function(result){
				for(var i=0; i<result.data.data.length; i++){
					usuarios.push(result.data.data[i]);
					$scope.apa = true;
				}
				
				if($scope.pag == result.data.data.last_page){
					$scope.parou = true;
				};
			});
		};

		$scope.usuarios = usuarios;
	});

	$scope.orden = function(){
		$scope.ordenn = !$scope.ordenn;
	}

	$scope.ordernarr = function(){
		$scope.ordernar = !$scope.ordernar;
	}

	$scope.ordernarrr = function(value, aparence){
		$scope.ordenn = true;
		$scope.namePence1 = aparence;
		$scope.nameValue1 = value;
		
		if(value == 1){
			$scope.estato2s = [
				{value:1, aparence:'Menor a mayor'},
				{value:2, aparence:'Mayor a menor'},
			]
			
			$scope.estato2 = $scope.estato2s[0];

		}else if(value == 2){
			$scope.estato2s = [
				{value:3, aparence:'De la A a la Z'},
				{value:4, aparence:'De la Z a la A'},
			]
			
			$scope.estato2 = $scope.estato2s[0];

		}else if(value == 3){
			$scope.estato2s = [
				{value:5, aparence:'De la A a la Z'},
				{value:6, aparence:'De la Z a la A'},
			]
			
			$scope.estato2 = $scope.estato2s[0];

		}else if(value == 4){
			$scope.estato2s = [
				{value:7, aparence:'Menor a mayor'},
				{value:8, aparence:'Mayor a menor'},
			]
			
			$scope.estato2 = $scope.estato2s[0];

		}else if(value == 5){
			$scope.estato2s = [
				{value:9, aparence:'Menor a mayor'},
				{value:10, aparence:'Mayor a menor'},
			]
			
			$scope.estato2 = $scope.estato2s[0];
		}
	};

	$scope.ordernnn = function(value, aparence){
		$scope.ordenn = !$scope.ordenn;
		$scope.namePence2 = aparence;
		$scope.abriOrde = value;

		if(value == 1 || value==2){
			servicosAPI.getOrdUserId($scope.id, 'id', value, $scope.buscando, $scope.pag).then(function(result){
				usuarios.splice(0);
				$scope.pag = 1;

				for(var i=0; i<result.data.data.length; i++){
					usuarios.push(result.data.data[i]);
				}
		
				$scope.maisPag = function(){
					$scope.apa = false;
					$scope.pag += 1;
					servicosAPI.getOrdUserId($scope.id, 'id', value, $scope.buscando, $scope.pag).then(function(result){
						for(var i=0; i<result.data.data.length; i++){
							usuarios.push(result.data.data[i]);
							$scope.apa = true;
						}
					});
				};
		
				$scope.usuarios = usuarios;
			});

		}else if(value == 3 || value == 4){

			servicosAPI.getOrdUserNombre($scope.id, 'name', value, $scope.pag).then(function(result){
				usuarios.splice(0);
				$scope.pag = 1;

				for(var i=0; i<result.data.data.length; i++){
					usuarios.push(result.data.data[i]);
				}
		
				$scope.maisPag = function(){
					$scope.apa = false;
					$scope.pag += 1;
					servicosAPI.getOrdUserNombre($scope.id, 'name', value, $scope.pag).then(function(result){
						for(var i=0; i<result.data.data.length; i++){
							usuarios.push(result.data.data[i]);
							$scope.apa = true;
						}
					});
				};
		
				$scope.usuarios = usuarios;
			});

		}else if(value == 5 || value == 6){

			servicosAPI.getOrdUserEmail($scope.id, 'email', value, $scope.pag).then(function(result){
				usuarios.splice(0);
				$scope.pag = 1;

				console.log(result.data.data);

				for(var i=0; i<result.data.data.length; i++){
					usuarios.push(result.data.data[i]);
				}
		
				$scope.maisPag = function(){
					$scope.apa = false;
					$scope.pag += 1;
					servicosAPI.getOrdUserEmail($scope.id, 'email', value, $scope.pag).then(function(result){
						for(var i=0; i<result.data.data.length; i++){
							usuarios.push(result.data.data[i]);
							$scope.apa = true;
						}
					});
				};
		
				$scope.usuarios = usuarios;
			});

		}else if(value == 7 || value == 8){

			servicosAPI.getOrdUserDni($scope.id, 'dni_number', value, $scope.pag).then(function(result){
				usuarios.splice(0);
				$scope.pag = 1;

				for(var i=0; i<result.data.data.length; i++){
					usuarios.push(result.data.data[i]);
				}
		
				$scope.maisPag = function(){
					$scope.apa = false;
					$scope.pag += 1;
					servicosAPI.getOrdUserDni($scope.id, 'dni_number', value, $scope.pag).then(function(result){
						console.log(result);
						for(var i=0; i<result.data.data.length; i++){
							usuarios.push(result.data.data[i]);
							$scope.apa = true;
						}
					});
				};
		
				$scope.usuarios = usuarios;
			});

		}else if(value == 9 || value == 10){

			servicosAPI.getOrdUserCreado($scope.id, 'created_at', value, $scope.pag).then(function(result){
				usuarios.splice(0);
				$scope.pag = 1;

				console.log(result.data.data);

				for(var i=0; i<result.data.data.length; i++){
					usuarios.push(result.data.data[i]);
				}
		
				$scope.maisPag = function(){
					$scope.apa = false;
					$scope.pag += 1;
					servicosAPI.getOrdUserCreado($scope.id, 'created_at', value, $scope.pag).then(function(result){
						for(var i=0; i<result.data.data.length; i++){
							usuarios.push(result.data.data[i]);
							$scope.apa = true;
						}
					});
				};
		
				$scope.usuarios = usuarios;
			});

		}
	};

	$scope.abrirExp = function(){
		$scope.exports = !$scope.exports;
	};

	$scope.expTodos = function(){
		servicosAPI.getExpTodos2($scope.id).then(function(result){
			console.log(result.data.data);
			location.href=result.data.data;
		});
	};

	$scope.expBusca = function(){
		servicosAPI.getExpBuscas2($scope.id, $scope.nameValue1, $scope.abriOrde, $scope.buscando).then(function(result){
			console.log(result.data.data);
			location.href=result.data.data;
		});
	};

	$scope.abreFicha = function(){
		$scope.ficha = !$scope.ficha;
	}

	$scope.enter = function(event){
		if(window.event.keyCode == 13){
			console.log('enter');
			$scope.buscar();
		}
	};

	$scope.buscar = function(){
		if($scope.buscando){
			$state.go('search-chaves-usuarios', {id:$scope.id, text:$scope.buscando});
		}
	}
	
	$scope.sair = function(){
		$cookies.remove('token');
		$state.go('inicio');
	}
	
});
angular.module("sop").controller("searchChallengesCtrl", function($scope, $state, $cookies, $state, $stateParams, servicosAPI){
	
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
	
	$scope.text = $stateParams.text;
	$scope.pag = 1;
	$scope.apa = true;
	var pedidos = [];
	var cores = '#F4F4F4';
	
	$scope.statos = [
		{value:'', aparence:'Seleccione un estado'},
		{value:'pending', aparence:'Creado'},
		{value:'available', aparence:'En curso'},
		{value:'finished', aparence:'Cerrado'},
		{value:'available', aparence:'Creado pero no publicado'},
	]

	$scope.estatu = $scope.statos[0];
	
	servicosAPI.searchChallenges($scope.pag, $cookies.get('token'), $scope.text).then(function(result){
		console.log(result);
		for(var i=0; i<result.data.data.length; i++){
			if(cores === '#F4F4F4'){
				var cores = '#FFFFFF';
			}else{
				var cores = '#F4F4F4';
			}
			pedidos.push({pedidos: result.data.data[i], cores: cores});
		}
		
		$scope.maisPag = function(){
			$scope.apa = false;
			$scope.pag += 1;
			servicosAPI.searchChallenges($scope.pag, $cookies.get('token'), $scope.text).then(function(result){
				for(var i=0; i<result.data.data.length; i++){
					if(cores === '#F4F4F4'){
						var cores = '#FFFFFF';
					}else{
						var cores = '#F4F4F4';
					}
					pedidos.push({pedidos: result.data.data[i], cores: cores});
					$scope.apa = true;
				}
				
				if($scope.pag == result.data.last_page){
					$scope.parou = true;
				};
			});
		};

		$scope.pedidos = pedidos;
	});

	$scope.enter = function(event){
		if(window.event.keyCode == 13){
			console.log('enter');
			$scope.buscar();
		}
	};

	$scope.seleStatus = function(){
		//$state.go('search-pedidos', {text:null, status:$scope.estatu.value, begin:null, end:null});
	};

	$scope.buscar = function(){
		if($scope.buscando){
			$state.go('search-challenges', {text:$scope.buscando});
		}
	}
	
	$scope.sair = function(){
		$cookies.remove('token');
		$state.go('inicio');
	}
	
});
angular.module("sop").controller("challengesCtrl", function($scope, $state, $cookies, $state, servicosAPI){
	
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
	
	servicosAPI.getChallenges($scope.pag, $cookies.get('token')).then(function(result){
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
			servicosAPI.getChallenges($scope.pag, $cookies.get('token')).then(function(result){
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

	$scope.abrirLink = function(alias, description, name){
		console.log(alias, description, name);
		servicosAPI.postLinkCha(alias, description, name, $cookies.get('token')).then(function(result){
			console.log(result.data.shortLink);
			//window.open(result.data.shortLink, '_blank');
			navigator.clipboard.writeText(result.data.shortLink);
			document.getElementById('copy'+alias).innerHTML = 'copiado';
		});
	};

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
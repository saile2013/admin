angular.module("sop").controller("searchDesativarCidadesCtrl", function($scope, $state, $cookies, $state, $stateParams, servicosAPI){
	
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
	var produtos = [];

	servicosAPI.getShoStores().then(function(result){
		$scope.tiendas = result.data.data;
	});
	
	servicosAPI.searchShoCidades($scope.text, $scope.pag).then(function(result){
		console.log(result.data.data);
		for(var i=0; i<result.data.data.length; i++){
			produtos.push(result.data.data[i]);
		}
		
		$scope.maisPag = function(){
			$scope.apa = false;
			$scope.pag += 1;
			servicosAPI.searchShoCidades($scope.pag).then(function(result){
				for(var i=0; i<result.data.data.length; i++){
					produtos.push(result.data.data[i]);
					$scope.apa = true;
				}
				
				if($scope.pag == result.data.last_page){
					$scope.parou = true;
				};
			});
		};

		$scope.produtos = produtos;
	});

	$scope.enter = function(event){
		if(window.event.keyCode == 13){
			console.log('enter');
			$scope.buscar();
		}
	};

	$scope.buscar = function(){
		if($scope.buscando){
			$state.go('search-desativar-cidades', {text:$scope.buscando});
		}
	}

	$scope.buscar = function(){
		if($scope.buscando){
			$state.go('search-desativar-cidades', {text:$scope.buscando});
		}
	}

	$scope.ativar = function(id, vl){
		var dados = {
			shopper_service: vl
		}
		servicosAPI.putShopCidades(id, dados).then(function(result){
			console.log(result.data.shopper_service);
			if(result.data.shopper_service == true){
				document.getElementById('atv'+id).style.display = "block";
				document.getElementById('dtv'+id).style.display = "none";
			}else{
				document.getElementById('dtv'+id).style.display = "block";
				document.getElementById('atv'+id).style.display = "none";
			}
		});
	}
	
	$scope.sair = function(){
		$cookies.remove('token');
		$state.go('inicio');
	}
	
});
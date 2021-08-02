angular.module("sop").controller("searchCategoriasCtrl", function($scope, $cookies, $stateParams, $state, servicosAPI){
	
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
	$scope.status = $stateParams.status;
	$scope.pag = 1;
	$scope.apa = true;
	var categorias = [];

	$scope.estatos = [
		{value:'', aparence:'Selecciona una opción'},
		{value:1, aparence:'Activas'},
		{value:2, aparence:'Inactivas'},
	]

	if($stateParams.status == 1){
		$scope.estato = $scope.estatos[1];
	}else if($stateParams.status == 2){
		$scope.estato = $scope.estatos[2];
	}else{
		$scope.estato = $scope.estatos[0];
	}
	
	servicosAPI.searchCategorias($scope.text, $scope.status, $scope.pag).then(function(result) {
		console.log(result.data.data);
		for(var i=0; i<result.data.data.length; i++){
			categorias.push(result.data.data[i]);
		}


		$scope.maisPag = function(){
			$scope.apa = false;
			$scope.pag += 1;
			servicosAPI.searchCategorias($scope.text, $scope.status, $scope.pag).then(function(result){
				for(var i=0; i<result.data.data.length; i++){
					categorias.push(result.data.data[i]);
					$scope.apa = true;
				}
				
				if($scope.pag == result.data.last_page){
					$scope.parou = true;
				};
			});
		};

		$scope.categorias = categorias;
	});

	$scope.abrirLink = function(alias){

		const urlBase = 'https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=AIzaSyAnbBGIiaX08lbi8hl_Vy_O3nGFuyDK70E';
    	const urlAndroid = 'https://play.google.com/store/apps/details?id=co.com.loro';
    	const urlIOS = 'https://apps.apple.com/co/app/loro-comprando-juntos/id1472657486';

		const jsonSendChall = {
			longDynamicLink: `https://loro.page.link/?link=https://loro.com.co/category/${alias}&apn=co.com.loro&afl=${urlAndroid}&hl=es&ofl=https://loro.com.co/category/${alias}&ibi=co.com.loro&ifl=${urlIOS}&st=Mira%20esta%20Categoria%20en%20LORO&sd=${alias}`,
			suffix: {
				option: 'SHORT',
			},
		};

		servicosAPI.postDeepLinks(urlBase, jsonSendChall, $cookies.get('token')).then(function(result){
			navigator.clipboard.writeText(result.data.shortLink);
			document.getElementById('copy'+alias).innerHTML = 'copiado';
		});
	}

	$scope.enter = function(event){
		if(window.event.keyCode == 13){
			console.log('enter');
			$scope.buscar();
		}
	};

	$scope.seleEstato = function(){
		$state.go('search-categorias', {text:$scope.text, status:$scope.estato.value});
	};

	$scope.buscar = function(){
		if($scope.buscando){
			$state.go('search-categorias', {text:$scope.buscando, status:$scope.status});
		}
	}
	
	$scope.sair = function(){
		$cookies.remove('token');
		$state.go('inicio');
	}
	
});
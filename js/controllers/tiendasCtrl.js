angular.module("sop").controller("tiendasCtrl", function($scope, $cookies, $state, servicosAPI){
	
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
	var tiendas = [];

	$scope.estatos = [
		{value:'', aparence:'Selecciona una opción'},
		{value:1, aparence:'Activas'},
		{value:2, aparence:'Inactivas'},
	]
	
	$scope.estato = $scope.estatos[0];
	
	servicosAPI.getTiendas($scope.pag).then(function(result){
		console.log(result.data.data);
		for(var i=0; i<result.data.data.length; i++){
			tiendas.push(result.data.data[i]);
		}

		$scope.maisPag = function(){
			$scope.apa = false;
			$scope.pag += 1;
			servicosAPI.getTiendas($scope.pag).then(function(result){
				for(var i=0; i<result.data.data.length; i++){
					tiendas.push(result.data.data[i]);
					$scope.apa = true;
				}
				
				if($scope.pag == result.data.last_page){
					$scope.parou = true;
				};
			});
		};

		$scope.tiendas = tiendas;
	});

	$scope.abrirLink = function(alias){

		const urlBase = 'https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=AIzaSyAnbBGIiaX08lbi8hl_Vy_O3nGFuyDK70E';
    	const urlAndroid = 'https://play.google.com/store/apps/details?id=co.com.loro';
    	const urlIOS = 'https://apps.apple.com/co/app/loro-comprando-juntos/id1472657486';

		const jsonSendChall = {
			longDynamicLink: `https://loro.page.link/?link=https://loro.com.co/store/${alias}&apn=co.com.loro&afl=${urlAndroid}&hl=es&ofl=https://loro.com.co/store/${alias}&ibi=co.com.loro&ifl=${urlIOS}&st=Mira%20esta%20Tienda%20en%20LORO&sd=${alias}`,
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
		$state.go('search-tiendas', {text:null, status:$scope.estato.value});
	};

	$scope.buscar = function(){
		if($scope.buscando){
			$state.go('search-tiendas', {text:$scope.buscando, status:null});
		}
	}
	
	$scope.sair = function(){
		$cookies.remove('token');
		$state.go('inicio');
	}
	
});
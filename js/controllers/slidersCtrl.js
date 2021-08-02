angular.module("sop").controller("slidersCtrl", function($scope, $cookies, $state, servicosAPI){
	
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
	var sliders = [];
	
	servicosAPI.getSliders($scope.pag).then(function(result){
		console.log(result.data.data);
		
		function makeid() {
			var text = "";
			var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";			
			for (var i = 0; i < 5; i++)
				text += possible.charAt(Math.floor(Math.random() * possible.length));			
			return text;
		}

		$scope.chave = makeid();

		for(var i=0; i<result.data.data.length; i++){
			sliders.push(result.data.data[i]);
		}

		$scope.maisPag = function(){
			$scope.apa = false;
			$scope.pag += 1;
			servicosAPI.getSliders($scope.pag).then(function(result){
				for(var i=0; i<result.data.data.length; i++){
					sliders.push(result.data.data[i]);
					$scope.apa = true;
				}
				
				if($scope.pag == result.data.last_page){
					$scope.parou = true;
				};
			});
		};

		$scope.sliders = sliders;
	});

	$scope.enter = function(event){
		if(window.event.keyCode == 13){
			console.log('enter');
			$scope.buscar();
		}
	};

	$scope.buscar = function(){
		if($scope.buscando){
			$state.go('search-sliders', {text:$scope.buscando});
		}
	}
	
	$scope.sair = function(){
		$cookies.remove('token');
		$state.go('inicio');
	}
	
});
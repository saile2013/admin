angular.module("sop").controller("tallasCtrl", function($scope, $state, $cookies, $state, servicosAPI){
	
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
		
	servicosAPI.getTallas($scope.pag).then(function(result){
		console.log(result.data.data);
		for(var i=0; i<result.data.data.length; i++){
			pedidos.push(result.data.data[i]);
		}
		
		$scope.maisPag = function(){
			$scope.apa = false;
			$scope.pag += 1;
			servicosAPI.getTallas($scope.pag).then(function(result){
				for(var i=0; i<result.data.data.length; i++){
					pedidos.push(result.data.data[i]);
					$scope.apa = true;
				}
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

	$scope.editaRiesgo = function(id){
		console.log(id);
		if(document.getElementById('ediEnd'+id).style.display == 'none'){
			document.getElementById('ediEnd'+id).style.display = "block";
		}else{
			document.getElementById('ediEnd'+id).style.display = "none";
		}
	}

	$scope.putEnde = function(id){
		var radio = document.getElementById('radio'+id).value;
		var lat = document.getElementById('lat'+id).value;
		var lng = document.getElementById('lng'+id).value;

		console.log(radio, lat, lng);

		servicosAPI.putRiesgo(id, lat, lng, radio).then(function(result){
			document.getElementById('status'+id).innerHTML = '¡Enviado con éxito!';
		});
		
	}

	$scope.sair = function(){
		$cookies.remove('token');
		$state.go('inicio');
	}
	
});
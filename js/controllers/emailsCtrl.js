angular.module("sop").controller("emailsCtrl", function($scope, $cookies, $state, servicosAPI){
	
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

	$scope.botao = true;
	$scope.active = false;
	var tiendas = [];
	var store_id = [];
	var name;
	var city_id;

	servicosAPI.getProductos().then(function(result){
		angular.forEach(result.data.filters.stores, function(value, key) {
			tiendas.push({key: key, value: value});
		});		
		$scope.tiendas = tiendas;
	});

	$scope.verre = function(tienda){
		store_id.splice(0);

		servicosAPI.getEmails(tienda).then((result) => {
			console.log(result.data.emails);
			$scope.citys = result.data.emails;
		});

		var nmTienda = $scope.tiendas.find((item) => {
			return item.key == tienda;
		});

		store_id.push(nmTienda.key);

		console.log(store_id[0]);
	}

	$scope.salvar = function(){
		$scope.botao = false;

		var daDos = {
			store_id: store_id[0],
			emails: $scope.email,
		}

		servicosAPI.postEmails(daDos).then(function(result){	
			document.getElementById('status').innerHTML = '¡Salvo con éxito!';
			$scope.botao = true;		
			servicosAPI.getEmails(store_id[0]).then((result) => {
				$scope.citys = result.data.emails;
			});
		});
	};

	$scope.remCity = function(id, email){
		var dados2 = {
			emails: email
		}

		console.log(dados2);
		servicosAPI.rmvEmails(id, dados2).then(function(result){
			servicosAPI.getEmails(id).then((result) => {
				$scope.citys = result.data.emails;
			});
		});
	};

	$scope.sair = function(){
		$cookies.remove('token');
		$state.go('inicio');
	}
	
});
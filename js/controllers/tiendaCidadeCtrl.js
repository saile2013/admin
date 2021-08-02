angular.module("sop").controller("tiendaCidadeCtrl", function($scope, $cookies, $state, $stateParams, servicosAPI){
	
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
	$scope.botao = true;
	$scope.active = false;
	$scope.page = 1;
	var tiendas = [];
	var cidades = [];
	var name;
	var city_id;

	servicosAPI.getProductos().then(function(result){
		angular.forEach(result.data.filters.stores, function(value, key) {
			tiendas.push({key: key, value: value});
		});		
		$scope.tiendas = tiendas;
	});

	$scope.verre = function(tienda){
		$state.go("tienda-cidade", {"id": tienda});
	}

	if($scope.id != 0){
		$scope.tienda = $scope.id;
		servicosAPI.dtlTiendas($scope.id).then(function (result) {
			console.log(result.data.data);

			$scope.not_attend_days = result.data.data.not_attend_days;			
			$scope.monday_start_hour = result.data.data.monday_start_hour;
			$scope.monday_limit_hour = result.data.data.monday_limit_hour;
			$scope.monday_before_limit_hour = result.data.data.monday_before_limit_hour;
			$scope.monday_after_limit_hour = result.data.data.monday_after_limit_hour;

			$scope.tuesday_start_hour = result.data.data.tuesday_start_hour;
			$scope.tuesday_limit_hour = result.data.data.tuesday_limit_hour;
			$scope.tuesday_before_limit_hour = result.data.data.tuesday_before_limit_hour;
			$scope.tuesday_after_limit_hour = result.data.data.tuesday_after_limit_hour;
			
			$scope.wednesday_start_hour = result.data.data.wednesday_start_hour;
			$scope.wednesday_limit_hour = result.data.data.wednesday_limit_hour;
			$scope.wednesday_before_limit_hour = result.data.data.wednesday_before_limit_hour;
			$scope.wednesday_after_limit_hour = result.data.data.wednesday_after_limit_hour;
			
			$scope.thursday_start_hour = result.data.data.thursday_start_hour;
			$scope.thursday_limit_hour = result.data.data.thursday_limit_hour;
			$scope.thursday_before_limit_hour = result.data.data.thursday_before_limit_hour;
			$scope.thursday_after_limit_hour = result.data.data.thursday_after_limit_hour;
			
			$scope.friday_start_hour = result.data.data.friday_start_hour;
			$scope.friday_limit_hour = result.data.data.friday_limit_hour;
			$scope.friday_before_limit_hour = result.data.data.friday_before_limit_hour;
			$scope.friday_after_limit_hour = result.data.data.friday_after_limit_hour;
			
			$scope.saturday_start_hour = result.data.data.saturday_start_hour;
			$scope.saturday_limit_hour = result.data.data.saturday_limit_hour;
			$scope.saturday_before_limit_hour = result.data.data.saturday_before_limit_hour;
			$scope.saturday_after_limit_hour = result.data.data.saturday_after_limit_hour;
			
			$scope.sunday_start_hour = result.data.data.sunday_start_hour;
			$scope.sunday_limit_hour = result.data.data.sunday_limit_hour;
			$scope.sunday_before_limit_hour = result.data.data.sunday_before_limit_hour;
			$scope.sunday_after_limit_hour = result.data.data.sunday_after_limit_hour;

			if(result.data.data.attend){
				$scope.sele = {
					radio: 'radio1'
				};
			}else{
				$scope.sele = {
					radio: 'radio2'
				};
			}
			$scope.radio1_1 = result.data.data.radio;
			$scope.costo1 = result.data.data.shipping_cost;
			$scope.tiempo1 = result.data.data.shipping_time;
		});

		servicosAPI.getStoreCity($scope.id, $scope.page).then((result) => {
			for(var i=0; i<result.data.data.length; i++){
				cidades.push(result.data.data[i]);
			}	

			$scope.maisCliente = function(){
				$scope.apa = false;
				$scope.page += 1;
				servicosAPI.getStoreCity($scope.id, $scope.page).then(function(result){
					for(var i=0; i<result.data.data.length; i++){
						cidades.push(result.data.data[i]);
						$scope.apa = true;
					}
					
					if($scope.page == result.data.last_page){
						$scope.parou = true;
					};
				});
			};

			$scope.citys = cidades;
		});
	}

	$scope.abreCida = function(){
		if($scope.cidade.length){
			if($scope.cidade.length > 0){
				$scope.active = true;
				servicosAPI.getCidade($scope.cidade).then(function (result) {
					$scope.cidas = result.data.retorno;
				});
			}else{
				$scope.active = false;
				$scope.cidas = "";
			}
		}
	};

	$scope.fechaCida = function(){
		$scope.active = false;
		$scope.cidas = "";
	};

	$scope.seleCida = function(cidade, deparmento){
		servicosAPI.getDane(cidade, deparmento).then(function (result) {
			$scope.cidade = result.data.retorno.ciudad + ', '+ result.data.retorno.departamento + ',' + result.data.retorno.codigo_dane;
			$scope.active = false;
			$scope.cidas = "";

			//
			city_id = result.data.retorno.codigo_dane;
			name = result.data.retorno.ciudad+', '+result.data.retorno.departamento;
		});		
	};

	$scope.salvar1 = function(){
		$scope.botao = false;

		var dados = {
			store_id: $scope.id,
			radio: $scope.radio1_1,
			//shipping_time: $scope.tiempo1,
			shipping_cost: $scope.costo1,
			attend: true,
			not_attend_days: $scope.not_attend_days,
			
			monday_start_hour: $scope.monday_start_hour,
			monday_limit_hour: $scope.monday_limit_hour,
			monday_before_limit_hour: $scope.monday_before_limit_hour,
			monday_after_limit_hour: $scope.monday_after_limit_hour,

			tuesday_start_hour: $scope.tuesday_start_hour,
			tuesday_limit_hour: $scope.tuesday_limit_hour,
			tuesday_before_limit_hour: $scope.tuesday_before_limit_hour,
			tuesday_after_limit_hour: $scope.tuesday_after_limit_hour,
			
			wednesday_start_hour: $scope.wednesday_start_hour,
			wednesday_limit_hour: $scope.wednesday_limit_hour,
			wednesday_before_limit_hour: $scope.wednesday_before_limit_hour,
			wednesday_after_limit_hour: $scope.wednesday_after_limit_hour,
			
			thursday_start_hour: $scope.thursday_start_hour,
			thursday_limit_hour: $scope.thursday_limit_hour,
			thursday_before_limit_hour: $scope.thursday_before_limit_hour,
			thursday_after_limit_hour: $scope.thursday_after_limit_hour,
			
			friday_start_hour: $scope.friday_start_hour,
			friday_limit_hour: $scope.friday_limit_hour,
			friday_before_limit_hour: $scope.friday_before_limit_hour,
			friday_after_limit_hour: $scope.friday_after_limit_hour,
			
			saturday_start_hour: $scope.saturday_start_hour,
			saturday_limit_hour: $scope.saturday_limit_hour,
			saturday_before_limit_hour: $scope.saturday_before_limit_hour,
			saturday_after_limit_hour: $scope.saturday_after_limit_hour,
			
			sunday_start_hour: $scope.sunday_start_hour,
			sunday_limit_hour: $scope.sunday_limit_hour,
			sunday_before_limit_hour: $scope.sunday_before_limit_hour,
			sunday_after_limit_hour: $scope.sunday_after_limit_hour,
		}

		servicosAPI.putStoreCity($scope.id, dados).then(function(result){
			document.getElementById('status').innerHTML = '¡Salvo con éxito!';
			$scope.botao = true;
		});
	};

	$scope.abreCity = function(id){
		if(document.getElementById('ediEnd'+id).style.display == 'none'){
			document.getElementById('ediEnd'+id).style.display = "block";
		}else{
			document.getElementById('ediEnd'+id).style.display = "none";
		}
	}

	$scope.putEnde = function(id) {
		var dados = {
			name_city: document.getElementById('ciudad'+id).value,
			shipping_time: document.getElementById('tiempo'+id).value,
			shipping_cost:  document.getElementById('costo'+id).value,
		}

		servicosAPI.putTiendaCity(id, dados).then(function(result) {
			document.getElementById('status'+id).innerHTML = '¡Enviado con éxito!';
		});
	};

	$scope.salvar = function(){
		$scope.botao = false;

		var daDos = {
			store_id: $scope.id,
			dane_city: city_id,
			name_city: name,
			shipping_time: $scope.tiempo2,
			shipping_cost: $scope.costo2,
			is_active: 1
		}

		servicosAPI.postStoreCity(daDos).then(function(result){
			
			servicosAPI.getStoreCity($scope.id, $scope.page).then((result) => {
				$scope.citys = result.data.data;
				$scope.cidade = "";
				$scope.tiempo2 = "";
				$scope.costo2 = "";
			});

			$scope.botao = true;
		});
	};

	$scope.salvar2 = function(){
		$scope.botao = false;

		var daDos = {
			shipping_time: $scope.tiempo22,
			shipping_cost: $scope.costo22,
		}

		servicosAPI.putStoreMass($scope.id, daDos).then(function(result){
			
			servicosAPI.getStoreCity($scope.id, $scope.page).then((result) => {
				$scope.citys = result.data.data;
				$scope.tiempo22 = "";
				$scope.costo22 = "";
				document.getElementById('status2').innerHTML = '¡Salvo con éxito!';
			});

			$scope.botao = true;
		});
	};

	$scope.remCity = function(id){
		servicosAPI.rmStoreCity(id).then(function(result){
			servicosAPI.getStoreCity($scope.id, $scope.page).then((result) => {
				for(var i=0; i<result.data.data.length; i++){
					cidades.push(result.data.data[i]);
				}	
				$scope.citys = cidades;
			});
		});
	};

	$scope.sair = function(){
		$cookies.remove('token');
		$state.go('inicio');
	}
	
});
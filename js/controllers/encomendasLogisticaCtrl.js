angular.module("sop").controller("encomendasLogisticaCtrl", function($scope, $cookies, $state, servicosAPI){
	
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
	$scope.botao = true;
	$scope.contar = 0;
	var logisticas = [];
	var LogisTICAS = [];
	var produtos = [];
	var tiendas = [];
	var messages1 = [];
	var messages2 = [];
	var messages3 = [];
	var messages4 = [];
	
	servicosAPI.getProductos().then(function(result){
		angular.forEach(result.data.filters.stores, function(value, key) {
			tiendas.push({key: key, value: value});
		});		
		$scope.tiendas = tiendas;
	});

	$scope.transportadoras = [
		{id:'', value:'Seleccione'},
		{id:'vueltap', value:'vueltap'},
		{id:'envio_click', value:'envio_click'}
	]

	$scope.verre = function() {
		$state.go('search-encomendas-logistica', {tienda:$scope.tienda, transportadora:null, text:null, begin:null, end:null, hra1:null, hra2:null});
	};

	$scope.trans = function(){
		$state.go('search-encomendas-logistica', {tienda:null, transportadora:$scope.transportadora, text:null, begin:null, end:null, hra1:null, hra2:null});
	};

	$scope.verDatas = function() {

		if($scope.data2){

			if(document.getElementById('hra1').value){
				var hra1 = document.getElementById('hra1').value;
			}else{
				var hra1 = null;
			}
			
			if(document.getElementById('hra2').value){
				var hra2 = document.getElementById('hra2').value;
			}else{
				var hra2 = null;
			}

			var data1=new Date($scope.data1);
			var dia1=data1.getDate();
			var mes1=data1.getMonth();
			var ano1=data1.getFullYear();		
			if(dia1 <= 9){ dia1 = '0'+dia1; }else if(dia1){ dia1 = dia1; }
			mes1 = (mes1+1);
			if(mes1 <= 9){ mes1 = '0'+mes1; }else if(mes1){ mes1 = mes1; }
			data1 = ano1 + '-' + mes1 + '-' + dia1;
			//

			var data2=new Date($scope.data2);
			var dia2=data2.getDate();
			var mes2=data2.getMonth();
			var ano2=data2.getFullYear();		
			if(dia2 <= 9){ dia2 = '0'+dia2; }else if(dia2){ dia2 = dia2; }
			mes2 = (mes2+1);
			if(mes2 <= 9){ mes2 = '0'+mes2; }else if(mes2){ mes2 = mes2; }
			data2 = ano2 + '-' + mes2 + '-' + dia2;

			$state.go('search-encomendas-logistica', {tienda:null, transportadora:null, text:null, begin:data1, end:data2, hra1:hra1, hra2:hra2});
		}
	};

	$scope.viewGet = function() {
		servicosAPI.encomendasLogistica($scope.pag).then(function(result) {
			for(var i=0; i<result.data.data.length; i++){
				LogisTICAS.push(result.data.data[i]);				
			}

			$scope.maisPag = function(){
				$scope.apa = false;
				$scope.pag += 1;
				servicosAPI.encomendasLogistica($scope.pag).then(function(result){
					if(result.data.data[0]){
						for(var i=0; i<result.data.data.length; i++){
							LogisTICAS.push(result.data.data[i]);
							$scope.apa = true;
						}
						
						if($scope.pag == result.data.last_page){
							$scope.parou = true;
						};

						if($scope.selectedAll){
							$scope.selectedAll = true;							
							angular.forEach(result.data.data, function(logistica) {
								logistica.Selected = true;
								if(logistica.Selected == true){
									$scope.contar++;
									logisticas.push({store_id:logistica.store_id, order_id:logistica.id});
								}
							});
						}
					}else{
						$scope.parou = true;
					}
				});
			};

			$scope.abrePerfil = function(id, order_id){
				$scope.id = order_id;
				produtos.splice(0);
				$scope.loader = false;
				for(a=0; a<LogisTICAS.length; a++){
					for(b=0; b<LogisTICAS[a].new_order_items.length; b++){
						if(LogisTICAS[a].new_order_items[b].new_order_id == id){
							produtos.push(LogisTICAS[a].new_order_items[b]);
						}
					}
				}
				$scope.loader = true;
				$scope.abreProds = true;
				$scope.produtos = produtos;
			}

			$scope.botao = true;
			$scope.logisticas = LogisTICAS;

			$scope.selectedAll = true;
			angular.forEach($scope.logisticas, function(logistica) {
				logistica.Selected = true;
				if(logistica.Selected == true){
					$scope.contar++;
					logisticas.push({store_id:logistica.store_id, order_id:logistica.id});
				}
			});

			$scope.selectAll = function() {
				logisticas.splice(0);
				$scope.contar = 0;
				angular.forEach($scope.logisticas, function(logistica) {
					logistica.Selected = $scope.selectedAll;
					if(logistica.Selected == true){
						$scope.contar++;
						logisticas.push({store_id:logistica.store_id, order_id:logistica.id});
					}
				});
			};

			$scope.checkboxClick = function(event, logistica) {
				console.log(logistica.order_id);
				$scope.selectedAll = false;
				if(logistica.Selected == true){
					$scope.contar++;
					logisticas.push({store_id:logistica.store_id, order_id:logistica.id});
					console.log(logisticas);
				}else{
					$scope.contar--;
					logisticas.splice(logisticas.indexOf(logistica), 1);
					console.log(logisticas);
				}
			};
		});
	};

	$scope.viewGet();

	$scope.enviar = function() {
		
		console.log(logisticas);

		$scope.botao = false;

		var dados = {
			'orders': logisticas
		};

		servicosAPI.postEncomendasLogistica(dados).then(function(result) {

			for(var b=0; b<result.data.data.length; b++){
				console.log(result.data.data[b]);
				if(result.data.data[b].code == 42){
					messages1.push({msg:result.data.data[b].message, erros:result.data.data[b].data});
				}else if(result.data.data[b].code == 40){
					messages2.push({msg:result.data.data[b].message, erros:result.data.data[b].data});
				}else if(result.data.data[b].code == 43){
					messages3.push({msg:result.data.data[b].message, erros:result.data.data[b].data.response});
				}else if(result.data.data[b].code == 51){
					messages4.push({msg:result.data.data[b].message, erros:result.data.data[b].data});
				}else if(result.data.data[b].code == 200){
					document.getElementById('status').innerHTML = '¡Enviado con éxito!';
				}
			}

			$scope.messages1 = messages1;
			$scope.messages2 = messages2;
			$scope.messages3 = messages3;
			$scope.messages4 = messages4;
			$scope.botao = true;
			$scope.mess = true;
		});
	};

	$scope.enter = function(event){
		if(window.event.keyCode == 13){
			console.log('enter');
			$scope.buscar();
		}
	};

	$scope.buscar = function(){
		if($scope.buscando){
			$state.go('search-encomendas-logistica', {tienda:null, transportadora:null, text:$scope.buscando, begin:null, end:null, hra1:null, hra2:null});
		}
	};
	
	$scope.back2 = function(){
		$scope.loader = false;
		$scope.abreProds = false;
	};

	$scope.sair = function(){
		$cookies.remove('token');
		$state.go('inicio');
	}
	
});
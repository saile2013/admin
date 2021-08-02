angular.module("sop").controller("searchCotacaoLogisticaCtrl", function($scope, $cookies, $state, $stateParams, servicosAPI){
	
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

	console.log($stateParams.tienda);
	
	if($stateParams.tienda){
		$scope.tienda = $stateParams.tienda;
	}else{
		$scope.tienda = null;
	}
	$scope.text = $stateParams.text;
	$scope.transportadora = $stateParams.transportadora;
	$scope.begin = $stateParams.begin;
	$scope.end = $stateParams.end;
	$scope.hra1 = $stateParams.hra1;
	$scope.hra2 = $stateParams.hra2;

	$scope.buscando = $stateParams.text;
	document.getElementById('hra1').value = $stateParams.hra1;
	document.getElementById('hra2').value = $stateParams.hra2;

	$scope.pag = 1;
	$scope.apa = true;
	$scope.botao = true;
	$scope.limpa = false;
	$scope.contar = 0;
	var logisticas = [];
	var logisTicas = [];
	var LogisTICAS = [];
	var produtos = [];
	var tiendas = [];
	var messages1 = [];
	var messages2 = [];
	var messages3 = [];
	var messages4 = [];

	var dta1=new Date($scope.begin);
	var dia1=dta1.getDate()+1;
	var mes1=dta1.getMonth();
	var ano1=dta1.getFullYear();		
	if(dia1 <= 9){ dia1 = '0'+dia1; }else if(dia1){ dia1 = dia1; }
	mes1 = (mes1+1);
	if(mes1 <= 9){ mes1 = '0'+mes1; }else if(mes1){ mes1 = mes1; }
	dta1 = mes1 + '/' + dia1 + '/' + ano1;
	//

	var dta2=new Date($scope.end);
	var dia2=dta2.getDate()+1;
	var mes2=dta2.getMonth();
	var ano2=dta2.getFullYear();
	if(dia2 <= 9){ dia2 = '0'+dia2; }else if(dia2){ dia2 = dia2; }
	mes2 = (mes2+1);
	if(mes2 <= 9){ mes2 = '0'+mes2; }else if(mes2){ mes2 = mes2; }
	dta2 = mes2 + '/' + dia2 + '/' + ano2;

	$scope.data1 = new Date(dta1);
	$scope.data2 = new Date(dta2);

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
		$state.go('search-cotacao-logistica', {tienda:$scope.tienda, transportadora:$scope.transportadora, text:$scope.text, begin:$scope.begin, end:$scope.end, hra1:$scope.hra1, hra2:$scope.hra2});
	};

	$scope.trans = function() {
		$state.go('search-cotacao-logistica', {tienda:$scope.tienda, transportadora:$scope.transportadora, text:$scope.text, begin:$scope.begin, end:$scope.end, hra1:$scope.hra1, hra2:$scope.hra2});
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

			$state.go('search-cotacao-logistica', {tienda:$scope.tienda, transportadora:$scope.transportadora, text:$scope.text, begin:data1, end:data2, hra1:hra1, hra2:hra2});
		}
	};

	$scope.viewGet = function(){
		
		servicosAPI.search2Logistica($scope.tienda, $scope.transportadora, $scope.begin, $scope.end, $scope.hra1, $scope.hra2, $scope.text, $scope.pag).then(function(result) {
			console.log(result.data.data);
			for(var i=0; i<result.data.data.length; i++){
				LogisTICAS.push(result.data.data[i]);
			}

			$scope.maisPag = function(){
				$scope.apa = false;
				$scope.pag += 1;
				servicosAPI.search2Logistica($scope.tienda, $scope.transportadora, $scope.begin, $scope.end, $scope.hra1, $scope.hra2, $scope.text, $scope.pag).then(function(result){
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

			$scope.logisticas = LogisTICAS;

			logisticas.splice(0);
			$scope.botao = true;
			$scope.limpa = false;

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
				$scope.selectedAll = false;
				if(logistica.Selected == true){
					$scope.contar++;
					logisticas.push({store_id:logistica.store_id, order_id:logistica.id});
				}else{
					for(var i=0; i<logisticas.length; i++){
						if(logistica.id == logisticas[i].order_id){
							$scope.contar--;
							logisticas.splice(i, 1);
						}
					}
				}

				console.log(logisticas);
			};
		});
	};

	$scope.viewGet();

	$scope.editaEnde = function(order_id) {
		if(document.getElementById('ediEnd'+order_id).style.display == 'none'){
			document.getElementById('ediEnd'+order_id).style.display = "block";
		}else{
			document.getElementById('ediEnd'+order_id).style.display = "none";
		}
	};

	$scope.putEnde = function(id) {
		var dados = {
			street_one:document.getElementById('one'+id).value,
			street_two:document.getElementById('two'+id).value,
			city:document.getElementById('cid'+id).value,
			deparment:document.getElementById('dep'+id).value,
			dane_code:document.getElementById('dan'+id).value,
		}
		servicosAPI.putEnderecoCotacao(id, dados).then(function(result) {
			document.getElementById('status'+id).innerHTML = '¡Enviado con éxito!';
		});
	};

	$scope.contador1 = function(id) {
		document.getElementById('btn'+id).style.display = 'block';
		var valor = document.getElementById('one'+id).value;
		document.getElementById('msg'+id).innerHTML = 'Máximo 24 caracteres requeridos. caracteres: ('+valor.length+')';
	}

	$scope.contador2 = function(id) {
		document.getElementById('btn'+id).style.display = 'block';
		var valor = document.getElementById('two'+id).value;
		document.getElementById('dtl'+id).innerHTML = 'Máximo 24 caracteres requeridos. caracteres: ('+valor.length+')';
	}

	$scope.cidade = function(id) {
		var cidade = document.getElementById('cid'+id).value;
		if(cidade.length > 0){
			document.getElementById('hasCida'+id).style.display = "block";
			document.getElementById('funCida'+id).style.display = "block";
			servicosAPI.getCidade(cidade).then(function (result) {
				console.log(result.data.retorno);
				$scope.cidas = result.data.retorno;
			});
		}else{
			document.getElementById('hasCida'+id).style.display = "none";
			document.getElementById('funCida'+id).style.display = "none";
		}
	};

	$scope.seleCida = function(ciudad, departamento, codigo_dane, id) {
		document.getElementById('cid'+id).value = ciudad;
		document.getElementById('dep'+id).value = departamento;
		document.getElementById('dan'+id).value = codigo_dane;

		document.getElementById('hasCida'+id).style.display = "none";
		document.getElementById('funCida'+id).style.display = "none";
		document.getElementById('btn'+id).style.display = 'block';
	};

	$scope.fechaCida = function(id) {
		document.getElementById('hasCida'+id).style.display = "none";
		document.getElementById('funCida'+id).style.display = "none";
	};

	$scope.cotizar = function() {

		$scope.logisticas = false;
		$scope.botao = false;
		
		var dados = {
			'orders': logisticas
		};

		console.log(dados);

		servicosAPI.postLogistica(dados).then(function(result) {
			console.log(result.data.data);
			for(var b=0; b<result.data.data.length; b++){
				if(result.data.data[b].code == 42){
					messages1.push({msg:result.data.data[b].message, erros:result.data.data[b].data});
				}else if(result.data.data[b].code == 40){
					messages2.push({msg:result.data.data[b].message, erros:result.data.data[b].data});
				}else if(result.data.data[b].code == 43){
					messages3.push({msg:result.data.data[b].message, erros:result.data.data[b].data.response});
				}else if(result.data.data[b].code == 51){
					messages4.push({msg:result.data.data[b].message, erros:result.data.data[b].data});
				}else if(result.data.data[b].code == 200){
					for(var a=0; a<result.data.data[b].data['orders-sended'].length; a++){
						logisTicas.push(result.data.data[b].data['orders-sended'][a]);
					}
				}
			}

			$scope.botao = true;
			$scope.limpa = true;
			$scope.logisticas = logisTicas;
			$scope.messages1 = messages1;
			$scope.messages2 = messages2;
			$scope.messages3 = messages3;
			$scope.messages4 = messages4;
		});
	};

	$scope.mTodos = function() {
		$scope.logisticas = false;
		$scope.messages1 = messages1;
		$scope.messages2 = messages2;
		$scope.messages3 = messages3;
		$scope.messages4 = messages4;
		$scope.botao = false;
		LogisTICAS.splice(0);
		$scope.viewGet();
	};

	$scope.enter = function(event){
		if(window.event.keyCode == 13){
			console.log('enter');
			$scope.buscar();
		}
	};

	$scope.buscar = function(){
		if($scope.buscando){
			$state.go('search-cotacao-logistica', {tienda:$scope.tienda, transportadora:$scope.transportadora, text:$scope.buscando, begin:$scope.begin, end:$scope.end, hra1:$scope.hra1, hra2:$scope.hra2});
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
angular.module("sop").controller("clientesCtrl", function($scope, $state, $cookies, $state, servicosAPI){
	
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
	var clientes = [];

	$scope.generos = [
		{value:'', aparence:'Selecciona un genero'},
		{value:'f', aparence:'Femenino'},
		{value:'m', aparence:'Masculino'},
		{value:'other', aparence:'Femenino y Masculino'},
	]

	$scope.genero = $scope.generos[0];

	$scope.estatos = [
		{value:'', aparence:'Selecciona un estado'},
		{value:1, aparence:'Activo'},
		{value:0, aparence:'Inactivo'},
	]

	$scope.estato = $scope.estatos[0];
	
	servicosAPI.getClientes($scope.pag).then(function(result){
		console.log(result.data.data);
		for(var i=0; i<result.data.data.length; i++){
			clientes.push(result.data.data[i]);
		}
		
		$scope.maisPag = function(){
			$scope.apa = false;
			$scope.pag += 1;
			servicosAPI.getClientes($scope.pag).then(function(result){
				for(var i=0; i<result.data.data.length; i++){
					clientes.push(result.data.data[i]);
					$scope.apa = true;
				}
				
				if($scope.pag == result.data.last_page){
					$scope.parou = true;
				};
			});
		};

		$scope.clientes = clientes;
	});

	$scope.atvStatus4 = function(id, status, is_vip){

		var dados = {
			"user_id": id,
			"module_id": status,
			"is_vip": 0
		}

		servicosAPI.putClientesPruebas(dados)
		.catch(function(error){
			alert('usuario ya agregado a la lista de prueba');
		})
		.then(function(result){
			console.log(result);
			if(status==1){
				document.getElementById('pruebaDt'+id).style.display = 'none';
				document.getElementById('pruebaAt'+id).style.display = 'block';
			}
			if(status==0){
				document.getElementById('pruebaAt'+id).style.display = 'none';
				document.getElementById('pruebaDt'+id).style.display = 'block';
			}
		});
	};

	$scope.atvStatus1 = function(id, status, has_alert, is_locked, is_vip){

		if(status==1){
			var sTatus = true;
		}else{
			var sTatus = false;
		}

		var dados = {
			"id": id,
			"is_locked": sTatus,
			"has_alert": has_alert,
			"is_unlocked": is_locked,
			"is_vip": 0
		}

		servicosAPI.putClientes(id, dados).then(function(result){
			if(status==1){
				document.getElementById('whiteDt'+id).style.display = 'none';
				document.getElementById('whiteAt'+id).style.display = 'block';
			}
			if(status==0){
				document.getElementById('whiteAt'+id).style.display = 'none';
				document.getElementById('whiteDt'+id).style.display = 'block';
			}
		});
	};

	$scope.atvStatus2 = function(id, status, is_unlocked, is_locked, is_vip){

		if(status==1){
			var sTatus = true;
		}else{
			var sTatus = false;
		}

		var dados = {
			"id": id,
			"is_locked": is_locked,
			"has_alert": sTatus,
			"is_unlocked": is_unlocked,
			"is_vip": 0
		}

		servicosAPI.putClientes(id, dados).then(function(result){
			if(status==1){
				document.getElementById('alertDt'+id).style.display = 'none';
				document.getElementById('alertAt'+id).style.display = 'block';
			}
			if(status==0){
				document.getElementById('alertAt'+id).style.display = 'none';
				document.getElementById('alertDt'+id).style.display = 'block';
			}
		});
	};

	$scope.atvStatus3 = function(id, status, is_unlocked, has_alert, is_vip){

		if(status==1){
			var sTatus = true;
		}else{
			var sTatus = false;
		}

		var dados = {
			"id": id,
			"is_locked": sTatus,
			"has_alert": sTatus,
			"is_unlocked": is_unlocked,
			"is_vip": 0
		}

		servicosAPI.putClientes(id, dados).then(function(result){
			if(status==1){
				document.getElementById('bloqueoDt'+id).style.display = 'none';
				document.getElementById('bloqueoAt'+id).style.display = 'block';

				document.getElementById('alertDt'+id).style.display = 'none';
				document.getElementById('alertAt'+id).style.display = 'block';
			}
			if(status==0){
				document.getElementById('bloqueoAt'+id).style.display = 'none';
				document.getElementById('bloqueoDt'+id).style.display = 'block';

				document.getElementById('alertAt'+id).style.display = 'none';
				document.getElementById('alertDt'+id).style.display = 'block';
			}
		});
	};

	
	$scope.seleData = function(){
		var data1=new Date($scope.de);
		var dia1=data1.getDate();
		var mes1=data1.getMonth();
		var ano1=data1.getFullYear();		
		if(dia1 <= 9){ dia1 = '0'+dia1; }else if(dia1){ dia1 = dia1; }
		mes1 = (mes1+1);
		if(mes1 <= 9){ mes1 = '0'+mes1; }else if(mes1){ mes1 = mes1; }
		data1 = ano1 + '-' + mes1 + '-' + dia1;
		//

		var data2=new Date($scope.ate);
		var dia2=data2.getDate();
		var mes2=data2.getMonth();
		var ano2=data2.getFullYear();		
		if(dia2 <= 9){ dia2 = '0'+dia2; }else if(dia2){ dia2 = dia2; }
		mes2 = (mes2+1);
		if(mes2 <= 9){ mes2 = '0'+mes2; }else if(mes2){ mes2 = mes2; }
		data2 = ano2 + '-' + mes2 + '-' + dia2;

		$state.go('search-pedidos', {text:null, status:null, begin:data1, end:data2});
	}

	$scope.payments = function(order_id){
		document.getElementById('estatusL'+order_id).style.display = 'block';
		servicosAPI.payPedidos(order_id).then(function(result){
			console.log(result.data.data.state);
			if(result.data.data.state == 'canceled'){
				var states = 'Cancelada';
			}else if(result.data.data.state == 'incomplete'){
				var states = 'Incompleta';
			}else if(result.data.data.state == 'opened'){
				var states = 'Pagada';
			}else if(result.data.data.state == 'payment_pending'){
				var states = 'Pendiente de Pago';
			}
			document.getElementById('estatus2'+order_id).style.display = 'none';
			document.getElementById('estatusL'+order_id).style.display = 'none';
			document.getElementById('estatus'+order_id).innerHTML = states;
		});
	};
	
	$scope.enter = function(event){
		if(window.event.keyCode == 13){
			console.log('enter');
			$scope.buscar();
		}
	};

	$scope.seleGender = function(){
		$state.go('search-clientes', {status:null, genero:$scope.genero.value, text:null});
	};

	$scope.seleEstato = function(){
		$state.go('search-clientes', {status:$scope.estato.value, genero:null, text:null});
	};

	$scope.buscar = function(){
		if($scope.buscando){
			$state.go('search-clientes', {status:null, genero:null, text:$scope.buscando});
		}
	};
	
	$scope.sair = function(){
		$cookies.remove('token');
		$state.go('inicio');
	}
	
});
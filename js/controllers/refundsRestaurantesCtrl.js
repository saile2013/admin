angular.module("sop").controller("refundsRestaurantesCtrl", function($scope, $state, $cookies, $state, servicosAPI){
	
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
	
	servicosAPI.getRefundsRestaurantes($scope.pag).then(function(result){
		console.log(result.data);
		for(var i=0; i<result.data.data.length; i++){
			pedidos.push(result.data.data[i]);
		}
		
		$scope.maisPag = function(){
			$scope.apa = false;
			$scope.pag += 1;
			servicosAPI.getRefundsRestaurantes($scope.pag).then(function(result){
				for(var i=0; i<result.data.data.length; i++){
					pedidos.push(result.data.data[i]);
					$scope.apa = true;
				}
				
				if($scope.pag == result.data.last_page){
					$scope.parou = true;
				};
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

		$state.go('search-refunds-restaurantes', {text:null, begin:data1, end:data2});
	}

	$scope.payments = function(order_id){
		document.getElementById('estatusL'+order_id).style.display = 'block';
		servicosAPI.payRestaurantes(order_id).then(function(result){
			console.log(result.data.data);
			if(result.data.data[0].state == 'canceled'){
				var states = 'Cancelada';
			}else if(result.data.data[0].state == 'incomplete'){
				var states = 'Incompleta';
			}else if(result.data.data[0].state == 'opened'){
				var states = 'Pagada';
			}else if(result.data.data[0].state == 'payment_pending'){
				var states = 'Pendiente de Pago';
			}else if(result.data.data[0].state == 'delivered'){
				var states = 'Entregado';
			}else if(result.data.data[0].state == 'verify'){
				var states = 'Verificar';
			}
			document.getElementById('estatus2'+order_id).style.display = 'none';
			document.getElementById('estatusL'+order_id).style.display = 'none';
			document.getElementById('estatus'+order_id).innerHTML = states;
		});
	}
	
	$scope.buscar = function(){
		if($scope.buscando){
			$state.go('search-refunds-restaurantes', {text:$scope.buscando, begin:null, end:null});
		}
	}
	
	$scope.sair = function(){
		$cookies.remove('token');
		$state.go('inicio');
	}
	
});
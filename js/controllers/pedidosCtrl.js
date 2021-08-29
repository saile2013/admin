angular.module("sop").controller("pedidosCtrl", function($scope, $state, $cookies, $state, servicosAPI){
	
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
	
	$scope.statos = [
		{value:'', aparence:'Seleccione uno estado'},
		{value:'canceled', aparence:'Cancelada'},
		{value:'incomplete', aparence:'Incompleta'},
		{value:'opened', aparence:'Pagada'},
		{value:'payment_pending', aparence:'Pendiente de Pago'},
		{value:'delivered', aparence:'Entregado'},
	]

	$scope.estatu = $scope.statos[0];

	$scope.estados = [
		{value:'delivered', aparence:'Entregado'},
		{value:'canceled', aparence:'Cancelada'},
		{value:'refunded', aparence:'Reembolsado'},		
	]
	
	servicosAPI.getPedidos($scope.pag).then(function(result){
		for(var i=0; i<result.data.data.length; i++){
			pedidos.push(result.data.data[i]);
		}
		
		$scope.maisPag = function(){
			$scope.apa = false;
			$scope.pag += 1;
			servicosAPI.getPedidos($scope.pag).then(function(result){
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

	$scope.selEstado = function(){
		if(document.getElementById('loja2').style.display == 'block'){
			document.getElementById('fundo2').style.display = 'none';
			document.getElementById('loja2').style.display = 'none';
		}else{
			document.getElementById('fundo2').style.display = 'block';
			document.getElementById('loja2').style.display = 'block';
		}

		$scope.groups = [
			{id: 'delivered', name: 'Entregado'},
			{id: 'canceled', name: 'Cancelado'},
			{id: 'refund', name: 'Reembolsado'}
		];
	};

	$scope.seleGroup = function(id, estado){
		servicosAPI.putEstadosOrdens(id, {"state": estado}).then(function(result){
			document.getElementById('succState'+id).style.display = "block";
			document.getElementById('sele'+id).innerHTML = estado;
		});
	}

	$scope.tiraFundo2 = function(){
		if(document.getElementById('loja2').style.display == 'block'){
			document.getElementById('fundo2').style.display = 'none';
			document.getElementById('loja2').style.display = 'none';
		}else{
			document.getElementById('fundo2').style.display = 'block';
			document.getElementById('loja2').style.display = 'block';
		}
		$scope.groups = "";
	}

	$scope.enter = function(event){
		if(window.event.keyCode == 13){
			console.log('enter');
			$scope.buscar();
		}
	};

	$scope.seleStatus = function(){
		$state.go('search-pedidos', {text:null, status:$scope.estatu.value, begin:null, end:null});
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
			console.log(result.data.data);
			if(result.data.data.state == 'canceled'){
				var states = 'Cancelada';
			}else if(result.data.data.state == 'incomplete'){
				var states = 'Incompleta';
			}else if(result.data.data.state == 'opened'){
				var states = 'Pagada';
			}else if(result.data.data.state == 'payment_pending'){
				var states = 'Pendiente de Pago';
			}else if(result.data.data.state == 'delivered'){
				var states = 'Entregado';
			}
			document.getElementById('estatus2'+order_id).style.display = 'none';
			document.getElementById('estatusL'+order_id).style.display = 'none';
			document.getElementById('estatus'+order_id).innerHTML = states;
		});
	}
	
	$scope.buscar = function(){
		if($scope.buscando){
			$state.go('search-pedidos', {text:$scope.buscando, status:null, begin:null, end:null});
		}
	}
	
	$scope.sair = function(){
		$cookies.remove('token');
		$state.go('inicio');
	}
	
});
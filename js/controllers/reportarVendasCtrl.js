angular.module("sop").controller("reportarVendasCtrl", function($scope, $cookies, $state, $stateParams, servicosAPI){
	
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
	$scope.pag = 1;
	$scope.apa = true;
	var tiendas = [];

	if($scope.id == 1){
		$scope.url = 'cotacao-logistica';
		$scope.tags = 'hacer cotizaciones';
	}else if($scope.id == 2){
		$scope.url = 'encomendas-logistica';
		$scope.tags = 'enviar ordenes';
	}else if($scope.id == 3){
		$scope.url = 'status-logistica';
		$scope.tags = 'status de las ordenes';
	}else if($scope.id == 4){
		$scope.url = 'direcao-logistica';
		$scope.tags = 'editar dirección de tiendas';
	}
	
	servicosAPI.getProductos($scope.pag).then(function(result){
		angular.forEach(result.data.filters.stores, function(value, key) {
			tiendas.push({key: key, value: value});
		});
		$scope.tiendas = tiendas;
	});

	$scope.buscar = function(){

		var data1=new Date($scope.data);
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

		//--//
		var data1_3 = $scope.data;
		data1_3.setDate(data1_3.getDate() + 5);

		var dia1_3=data1_3.getDate();
		var mes1_3=data1_3.getMonth();
		var ano1_3=data1_3.getFullYear();
		if(dia1_3 <= 9){ dia1_3 = '0'+dia1_3; }else if(dia1_3){ dia1_3 = dia1_3; }
		mes1_3 = (mes1_3+1);
		if(mes1_3 <= 9){ mes1_3 = '0'+mes1_3; }else if(mes1_3){ mes1_3 = mes1_3; }

		data1_3 = `${ano1_3}-${mes1_3}-${dia1_3}`;

		//
		var data2_3 = $scope.data2;
		data2_3.getDate();

		var dia2_3=data2_3.getDate();
		var mes2_3=data2_3.getMonth();
		var ano2_3=data2_3.getFullYear();
		if(dia2_3 <= 9){ dia2_3 = '0'+dia2_3; }else if(dia2_3){ dia2_3 = dia2_3; }
		mes2_3 = (mes2_3+1);
		if(mes2_3 <= 9){ mes2_3 = '0'+mes2_3; }else if(mes2_3){ mes2_3 = mes2_3; }

		data2_3 = `${ano2_3}-${mes2_3}-${dia2_3}`;

		console.log(data2_3, data1_3);

		if(data2_3 > data1_3){

			data1_3 = $scope.data;
			data1_3.setDate(data1_3.getDate() - 5);

			console.log('mais que 5 dias');
			document.getElementById('status').innerHTML = 'El plazo no puede ser superior a 5 días.';
		}else{

			data1_3 = $scope.data;
			data1_3.setDate(data1_3.getDate() - 5);

			if(!$scope.data && !$scope.tienda){
				window.open("https://loro.efamaa.com/endpoint/corte/","_blank");	
			}

			if(!$scope.data && $scope.tienda){
				window.open("https://loro.efamaa.com/endpoint/corte/"+$scope.tienda+"","_blank");	
			}

			if($scope.data && $scope.tienda){
				window.open("https://loro.efamaa.com/endpoint/corte/"+$scope.tienda+"/"+data1+"/"+data2+"","_blank");
			}

			if($scope.data && !$scope.tienda){
				window.open("https://loro.efamaa.com/endpoint/corte/todo/"+data1+"/"+data2+"","_blank");
			}
		}
	}
	
	$scope.sair = function(){
		$cookies.remove('token');
		$state.go('inicio');
	}
	
});
angular.module("sop").controller("searchRefundsCtrl", function($scope, $cookies, $state, $stateParams, servicosAPI){
	
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
	
	$scope.text = $stateParams.text;
	$scope.status = $stateParams.status;
	$scope.begin = $stateParams.begin;
	$scope.end = $stateParams.end;
	$scope.buscando = $stateParams.text;
	$scope.pag = 1;
	$scope.apa = true;
	var pedidos = [];

	var dta1=new Date($scope.begin);
	var dia1=dta1.getDate() + 1;
	var mes1=dta1.getMonth();
	var ano1=dta1.getFullYear();		
	if(dia1 <= 9){ dia1 = '0'+dia1; }else if(dia1){ dia1 = dia1; }
	mes1 = (mes1+1);
	if(mes1 <= 9){ mes1 = '0'+mes1; }else if(mes1){ mes1 = mes1; }
	dta1 = mes1 + '/' + dia1 + '/' + ano1;
	//

	var dta2=new Date($scope.end);
	var dia2=dta2.getDate() + 1;
	var mes2=dta2.getMonth();
	var ano2=dta2.getFullYear();
	if(dia2 <= 9){ dia2 = '0'+dia2; }else if(dia2){ dia2 = dia2; }
	mes2 = (mes2+1);
	if(mes2 <= 9){ mes2 = '0'+mes2; }else if(mes2){ mes2 = mes2; }
	dta2 = mes2 + '/' + dia2 + '/' + ano2;

	$scope.de = new Date(dta1);
	$scope.ate = new Date(dta2);
	
	servicosAPI.searchRefunds($scope.text, $scope.begin, $scope.end, $scope.pag).then(function(result){
		for(var i=0; i<result.data.data.length; i++){
			if(result.data.data[i].payment_type != 'PSE' && result.data.data[i].payment_type != 'PSE-web'){
				pedidos.push(result.data.data[i]);
			}
		}

		$scope.maisPag = function(){
			$scope.apa = false;
			$scope.pag += 1;
			servicosAPI.searchRefunds($scope.text, $scope.begin, $scope.end, $scope.pag).then(function(result){
				for(var i=0; i<result.data.data.length; i++){
					if(result.data.data[i].payment_type != 'PSE' && result.data.data[i].payment_type != 'PSE-web'){
						pedidos.push(result.data.data[i]);
						$scope.apa = true;
					}
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

	$scope.busData = function(){
		if($scope.de && $scope.ate){
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
			
			$state.go('search-refunds', {text:$scope.text, begin:data1, end:data2});
		}
	};

	$scope.buscar = function(){		
		if($scope.buscando){
			$state.go('search-refunds', {text:$scope.buscando, begin:$scope.begin, end:$scope.end});
		}
	};
	
	$scope.sair = function(){
		$cookies.remove('token');
		$state.go('inicio');
	}
	
});
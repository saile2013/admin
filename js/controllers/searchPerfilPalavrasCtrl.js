angular.module("sop").controller("searchPerfilPalavrasCtrl", function($scope, $cookies, $state, $stateParams, servicosAPI){
	
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
	$scope.text = $stateParams.text;
	$scope.buscando = $stateParams.text;
	$scope.begin = $stateParams.begin;
	$scope.end = $stateParams.end;
	$scope.pag = 1;
	$scope.apa = true;
	$scope.ordernar = false;
	$scope.ordenn = false;
	var tiendas = [];

	$scope.estatos = [
		{value:1, aparence:'ID'},
		{value:2, aparence:'Origen'},
		{value:3, aparence:'Sesión'},
		{value:4, aparence:'Resultado'},
		{value:5, aparence:'Creado en'},
	]
	
	$scope.estato = $scope.estatos[0];

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

	servicosAPI.searchPerfilKey($scope.pag, $scope.id, $scope.text, $scope.begin, $scope.end).then(function(result){
		console.log(result.data.data);
		$scope.nmTienda = result.data.data[0].search;
		
		for(var i=0; i<result.data.data.length; i++){
			tiendas.push(result.data.data[i]);
		}
		
		$scope.maisPag = function(){
			$scope.apa = false;
			$scope.pag += 1;
			servicosAPI.searchPerfilKey($scope.pag, $scope.id, $scope.text, $scope.begin, $scope.end).then(function(result){
				for(var i=0; i<result.data.data.length; i++){
					tiendas.push(result.data.data[i]);
					$scope.apa = true;
				}
				
				if($scope.pag == result.data.last_page){
					$scope.parou = true;
				};
			});
		};

		$scope.tiendas = tiendas;
	});

	$scope.orden = function(){
		$scope.ordenn = !$scope.ordenn;
	}

	$scope.ordernarr = function(){
		$scope.ordernar = !$scope.ordernar;
	}

	$scope.ordernarrr = function(value, aparence){
		$scope.ordenn = true;
		$scope.namePence1 = aparence;
		$scope.nameValue1 = value;
		
		if(value == 1){
			$scope.estato2s = [
				{value:1, aparence:'Menor a mayor'},
				{value:2, aparence:'Mayor a menor'},
			]
			
			$scope.estato2 = $scope.estato2s[0];

		}else if(value == 2){
			$scope.estato2s = [
				{value:3, aparence:'De la A a la Z'},
				{value:4, aparence:'De la Z a la A'},
			]
			
			$scope.estato2 = $scope.estato2s[0];

		}else if(value == 3){
			$scope.estato2s = [
				{value:5, aparence:'De la A a la Z'},
				{value:6, aparence:'De la Z a la A'},
			]
			
			$scope.estato2 = $scope.estato2s[0];

		}else if(value == 4){
			$scope.estato2s = [
				{value:7, aparence:'De la A a la Z'},
				{value:8, aparence:'De la Z a la A'},
			]
			
			$scope.estato2 = $scope.estato2s[0];

		}else if(value == 5){
			$scope.estato2s = [
				{value:9, aparence:'Menor a mayor'},
				{value:10, aparence:'Mayor a menor'},
			]
			
			$scope.estato2 = $scope.estato2s[0];
		}
	}

	$scope.ordernnn = function(value, aparence){
		$scope.ordenn = !$scope.ordenn;
		$scope.namePence2 = aparence;
		$scope.abriOrde = value;

		if(value == 1 || value==2){
			servicosAPI.getOrdDtlSearch($scope.id, 'id', value, $scope.buscando, $scope.begin, $scope.end, $scope.pag).then(function(result){
				tiendas.splice(0);
				$scope.pag = 1;

				console.log(result.data.data);

				for(var i=0; i<result.data.data.length; i++){
					tiendas.push(result.data.data[i]);
				}
		
				$scope.maisPag = function(){
					$scope.apa = false;
					$scope.pag += 1;
					servicosAPI.getOrdDtlSearch($scope.id, 'id', value, $scope.buscando, $scope.begin, $scope.end, $scope.pag).then(function(result){
						console.log(result);
						for(var i=0; i<result.data.data.length; i++){
							tiendas.push(result.data.data[i]);
							$scope.apa = true;
						}
					});
				};
		
				$scope.tiendas = tiendas;
			});

		}else if(value == 3 || value == 4){

			servicosAPI.getOrdDtlOrigin($scope.id, 'origin', value, $scope.buscando, $scope.begin, $scope.end, $scope.pag).then(function(result){
				tiendas.splice(0);
				$scope.pag = 1;

				console.log(result.data.data);

				for(var i=0; i<result.data.data.length; i++){
					tiendas.push(result.data.data[i]);
				}
		
				$scope.maisPag = function(){
					$scope.apa = false;
					$scope.pag += 1;
					servicosAPI.getOrdDtlOrigin($scope.id, 'origin', value, $scope.buscando, $scope.begin, $scope.end, $scope.pag).then(function(result){
						console.log(result);
						for(var i=0; i<result.data.data.length; i++){
							tiendas.push(result.data.data[i]);
							$scope.apa = true;
						}
					});
				};
		
				$scope.tiendas = tiendas;
			});

		}else if(value == 5 || value == 6){

			servicosAPI.getOrdDtlType($scope.id, 'type', value, $scope.buscando, $scope.begin, $scope.end, $scope.pag).then(function(result){
				tiendas.splice(0);
				$scope.pag = 1;

				console.log(result.data.data);

				for(var i=0; i<result.data.data.length; i++){
					tiendas.push(result.data.data[i]);
				}
		
				$scope.maisPag = function(){
					$scope.apa = false;
					$scope.pag += 1;
					servicosAPI.getOrdDtlType($scope.id, 'type', value, $scope.buscando, $scope.begin, $scope.end, $scope.pag).then(function(result){
						console.log(result);
						for(var i=0; i<result.data.data.length; i++){
							tiendas.push(result.data.data[i]);
							$scope.apa = true;
						}
					});
				};
		
				$scope.tiendas = tiendas;
			});

		}else if(value == 7 || value == 8){

			servicosAPI.getOrdDtlResult($scope.id, 'result', value, $scope.buscando, $scope.begin, $scope.end, $scope.pag).then(function(result){
				tiendas.splice(0);
				$scope.pag = 1;

				console.log(result.data.data);

				for(var i=0; i<result.data.data.length; i++){
					tiendas.push(result.data.data[i]);
				}
		
				$scope.maisPag = function(){
					$scope.apa = false;
					$scope.pag += 1;
					servicosAPI.getOrdDtlResult($scope.id, 'result', value, $scope.buscando, $scope.begin, $scope.end, $scope.pag).then(function(result){
						console.log(result);
						for(var i=0; i<result.data.data.length; i++){
							tiendas.push(result.data.data[i]);
							$scope.apa = true;
						}
					});
				};
		
				$scope.tiendas = tiendas;
			});

		}else if(value == 9 || value == 10){

			servicosAPI.getOrdDtlCreado($scope.id, 'created_at', value, $scope.buscando, $scope.begin, $scope.end, $scope.pag).then(function(result){
				tiendas.splice(0);
				$scope.pag = 1;

				console.log(result.data.data);

				for(var i=0; i<result.data.data.length; i++){
					tiendas.push(result.data.data[i]);
				}
		
				$scope.maisPag = function(){
					$scope.apa = false;
					$scope.pag += 1;
					servicosAPI.getOrdDtlCreado($scope.id, 'created_at', value, $scope.buscando, $scope.begin, $scope.end, $scope.pag).then(function(result){
						console.log(result);
						for(var i=0; i<result.data.data.length; i++){
							tiendas.push(result.data.data[i]);
							$scope.apa = true;
						}
					});
				};
		
				$scope.tiendas = tiendas;
			});
		}
	};

	$scope.abrirExp = function(){
		$scope.exports = !$scope.exports;
	};

	$scope.expTodos = function(){
		servicosAPI.getExpTodos3($scope.id, $scope.buscando).then(function(result){
			console.log(result.data.data);
			location.href=result.data.data;
		});
	};

	$scope.expFechas = function(){
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

		servicosAPI.getExpFechas3($scope.id, data1, data2, $scope.buscando).then(function(result){
			console.log(result.data.data);
			location.href=result.data.data;
		});
	};

	$scope.expBusca = function(){
		servicosAPI.getExpBuscas3($scope.id, $scope.nameValue1, $scope.abriOrde, $scope.buscando).then(function(result){
			console.log(result.data.data);
			location.href=result.data.data;
		});
	};

	$scope.abreFicha = function(){
		$scope.ficha = !$scope.ficha;
	}

	$scope.enter = function(event){
		if(window.event.keyCode == 13){
			console.log('enter');
			$scope.buscar();
		}
	};

	$scope.buscar = function(){
		if($scope.buscando){
			$state.go('search-perfil-palavras', {id:$scope.id, text:$scope.buscando, begin:$scope.begin, end:$scope.end});
		}
	}

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

		$state.go('search-perfil-palavras', {id:$scope.id, text:$scope.buscando, begin:data1, end:data2});
	}
	
	$scope.sair = function(){
		$cookies.remove('token');
		$state.go('inicio');
	}
	
});
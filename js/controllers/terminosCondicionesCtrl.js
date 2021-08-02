angular.module("sop").controller("terminosCondicionesCtrl", function($scope, $state, $cookies, $state, servicosAPI){
	
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
		
	servicosAPI.getTerminosCod($scope.pag).then(function(result){
		console.log(result.data.data);
		for(var i=0; i<result.data.data.term_conditions.length; i++){
			pedidos.push(result.data.data.term_conditions[i]);
		}
		
		$scope.maisPag = function(){
			$scope.apa = false;
			$scope.pag += 1;
			servicosAPI.getTerminosCod($scope.pag).then(function(result){
				for(var i=0; i<result.data.data.term_conditions.length; i++){
					pedidos.push(result.data.data.term_conditions[i]);
					$scope.apa = true;
				}				
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

	seleData = function(){

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

		var data1=new Date($scope.de);
		var dia1=data1.getDate();
		var mes1=data1.getMonth();
		var ano1=data1.getFullYear();		
		if(dia1 <= 9){ dia1 = '0'+dia1; }else if(dia1){ dia1 = dia1; }
		mes1 = (mes1+1);
		if(mes1 <= 9){ mes1 = '0'+mes1; }else if(mes1){ mes1 = mes1; }
		data1 = ano1 + '-' + mes1 + '-' + dia1 + ' ' + hra1 + ':00';
		//

		var data2=new Date($scope.ate);
		var dia2=data2.getDate();
		var mes2=data2.getMonth();
		var ano2=data2.getFullYear();		
		if(dia2 <= 9){ dia2 = '0'+dia2; }else if(dia2){ dia2 = dia2; }
		mes2 = (mes2+1);
		if(mes2 <= 9){ mes2 = '0'+mes2; }else if(mes2){ mes2 = mes2; }
		data2 = ano2 + '-' + mes2 + '-' + dia2 + ' ' + hra2 + ':00';

		$state.go('search-terminos-condiciones', {start_at:data1, finish_at:data2});
	}

	$scope.sair = function(){
		$cookies.remove('token');
		$state.go('inicio');
	}
	
});
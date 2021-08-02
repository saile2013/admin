angular.module("sop").controller("manutencaoCtrl", function($scope, $cookies, $state, servicosAPI){
	
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

	servicosAPI.getManutencao().then(function(result){
		console.log(result);
		$scope.active = result.data.data[0].is_active;
		$scope.descricao = result.data.data[0].message;
		
		var data1 = result.data.data[0].init_date;
		data1.substring(0, 10);
		data1=new Date(data1);
		var hra1 = result.data.data[0].init_date;

		var data2 = result.data.data[0].finishid_date;
		data2.substring(0, 10);
		data2=new Date(data2);
		var hra2 = result.data.data[0].finishid_date;

		$scope.data1 = data1;
		document.getElementById('hra1').value = hra1.substring(11, 16);

		$scope.data2 = data2;
		document.getElementById('hra2').value = hra2.substring(11, 16);
	});

	$scope.botao = true;
	
	$scope.is_active = function(){
		$scope.active = 1;
	}

	$scope.no_active = function(){
		$scope.active = 0;
	}

		
	$scope.salvar = function(){

		$scope.botao = false;

		if($scope.active == 1){
			$scope.is_active = true;
		}else{
			$scope.is_active = false;	
		}

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
		data1 = ano1 + '-' + mes1 + '-' + dia1 + ' ' + hra1;
		//

		var data2=new Date($scope.data2);
		var dia2=data2.getDate();
		var mes2=data2.getMonth();
		var ano2=data2.getFullYear();		
		if(dia2 <= 9){ dia2 = '0'+dia2; }else if(dia2){ dia2 = dia2; }
		mes2 = (mes2+1);
		if(mes2 <= 9){ mes2 = '0'+mes2; }else if(mes2){ mes2 = mes2; }
		data2 = ano2 + '-' + mes2 + '-' + dia2 + ' ' + hra2;

		var dados = {
			message: $scope.descricao,
			init_date: data1,
			finishid_date: data2,
			is_active: $scope.is_active,
		}

		servicosAPI.putManutencao(dados).then(function(result){
			document.getElementById('status').innerHTML = '¡Salvo con éxito!';
			$scope.botao = true;
		});
	};

	$scope.sair = function(){
		$cookies.remove('token');
		$state.go('inicio');
	}
	
});
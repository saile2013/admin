angular.module("sop").controller("perfilRefundsCtrl", function($scope, $state, $stateParams, $cookies, servicosAPI){
	
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
	
	$scope.idRef = $stateParams.idRef;
	$scope.idOrd = $stateParams.idOrd;
	$scope.loader = false;
	$scope.botao = true;
	
	var produtos = [];
	
	var data1= new Date();
	var dia1=data1.getDate();
	var mes1=data1.getMonth();
	var ano1=data1.getFullYear();		
	if(dia1 <= 9){ dia1 = '0'+dia1; }else if(dia1){ dia1 = dia1; }
	mes1 = (mes1+1);
	if(mes1 <= 9){ mes1 = '0'+mes1; }else if(mes1){ mes1 = mes1; }
	data1 = dia1 +'/' + mes1 + '/' + ano1;

	$scope.data = data1;

	$scope.enviar = function(){

		$scope.botao = false;

		var dados = {
			refund_observation: $scope.txtpin,
		}

		servicosAPI.postRefunds($scope.idRef, dados).then(function(result){
			console.log(result);
			$scope.botao = true;
			document.getElementById('status').innerHTML = "¡Salvo con éxito!";
		}).catch(function(err, status){
			if(err.data.status_code == 422){
				console.log(err.data);
				$scope.botao = true;
				document.getElementById('status').innerHTML = err.data.message;
			}
		});
	}

	$scope.back = function(){
		window.history.back();
	}
	
	$scope.sair = function(){
		$cookies.remove('token');
		$state.go('inicio');
	}
	
});
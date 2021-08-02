angular.module("sop").controller("adicionarPasillosCtrl", function($scope, $stateParams, $state, $cookies, servicosAPI){
	
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
	
	$scope.idTien = $stateParams.idTien;
	$scope.botao = true;
	$scope.dados = {};

	servicosAPI.dtlTiendas($scope.idTien).then(function (result) {
		console.log(result.data.data);
		$scope.nameTienda = result.data.data.name;
	});

	$scope.carrega1 = function(){
		$scope.imgVie1 = document.getElementById('bannerW1');
		$scope.imgVie1.src = 'data:'+$scope.yourModel.filetype+';base64,'+$scope.yourModel.base64;
		setTimeout(function(){
			if((parseInt($scope.imgVie1.naturalWidth) != 1024) || (parseInt($scope.imgVie1.naturalHeight) != 1024)){
				document.getElementById('status').innerHTML = "¡Las dimensiones están mal en Banner!";
			}else{
				document.getElementById('status').innerHTML = "";
			}
		}, 1000);
	}

	$scope.salvar = function(){

		$scope.botao = false;

		if($scope.yourModel){
			$scope.file1 = 'data:'+$scope.yourModel.filetype+';base64,'+$scope.yourModel.base64;
		}

		var dados = {
			name: $scope.name,
			is_active: 1,
			sort: 1,
			store_id: $scope.idTien,
			banner: $scope.file1,
		}

		console.log(dados);

		if(!$scope.name){
			$scope.botao = true;
			document.getElementById('status').innerHTML = "¡Complete el campo NOMBRE!";
		}else if(!$scope.yourModel){
			$scope.botao = true;
			document.getElementById('status').innerHTML = "selecciona una IMAGEN!";
		}else{
			servicosAPI.postPasillos(dados).then(function (result) {
				$scope.botao = true;
				document.getElementById('status').innerHTML = "¡Salvo con éxito!";
			});			
		}
	};	

	$scope.sair = function(){
		$cookies.remove('token');
		$state.go('inicio');
	}
	
});
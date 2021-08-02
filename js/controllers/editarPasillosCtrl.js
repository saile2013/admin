angular.module("sop").controller("editarPasillosCtrl", function($scope, $stateParams, $cookies, $state, servicosAPI){
	
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
	$scope.store_id = $stateParams.store_id;
	$scope.botao = true;
	$scope.dados = {};

	$scope.viewPasillos = function(){
		servicosAPI.dtlPasillos($scope.id).then(function (result) {
			console.log(result.data.data);
			$scope.name = result.data.data.name;
			$scope.banner = result.data.data.banner;
			$scope.idStore = result.data.data.store_id;

			servicosAPI.dtlTiendas(result.data.data.store_id).then(function (result) {
				$scope.nameTienda = result.data.data.name;
			});
		});
	}

	$scope.viewPasillos();

	$scope.getTags = function(){
		servicosAPI.getTags($scope.id, $scope.store_id).then(function (result) {
			console.log(result.data.data.data);
			$scope.tages = result.data.data.data;
		});
	};

	$scope.getTags();

	$scope.posTags = function(){
		if($scope.tags){
			var dados = {
				store_id: $scope.store_id,
				hall_id: $scope.id,
				word: $scope.tags,
			}

			servicosAPI.postTags(dados).then(function (result) {
				console.log(result);
				$scope.getTags();
			});
		}
	}

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
			id: $scope.id,
			banner: $scope.file1,
			store_id: $scope.idStore,
		}

		console.log(dados);

		if(!$scope.name){
			$scope.botao = true;
			document.getElementById('status').innerHTML = "¡Complete el campo NOMBRE!";
		}else{
			servicosAPI.putPasillos($scope.id, dados).then(function (result) {
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
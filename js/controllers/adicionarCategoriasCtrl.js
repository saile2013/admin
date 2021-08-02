angular.module("sop").controller("adicionarCategoriasCtrl", function($scope, $stateParams, $cookies, $state, servicosAPI){
	
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
	
	$scope.idOcor = $stateParams.id;
	$scope.dados = {};
	$scope.active = 1;
	$scope.botao = true;
	
	$scope.is_active = function(){
		$scope.active = 1;
	}

	$scope.no_active = function(){
		$scope.active = 0;
	}

	$scope.carrega1 = function(){
		$scope.imgView = document.getElementById('bannerWeb');
		$scope.imgView.src = 'data:'+$scope.yourModel.filetype+';base64,'+$scope.yourModel.base64;
		setTimeout(function(){
			console.log($scope.imgView.naturalWidth, $scope.imgView.naturalHeight);
			if((parseInt($scope.imgView.naturalWidth) != 1920) || (parseInt($scope.imgView.naturalHeight) != 400)){
				document.getElementById('status').innerHTML = "¡Las dimensiones están mal en BANNER WEB!";
			}else{
				document.getElementById('status').innerHTML = "";			
			}
		}, 1000);
	};

	$scope.carrega2 = function(){
		$scope.imagem2 = document.getElementById('bannerMob');
		$scope.imagem2.src = 'data:'+$scope.yourMode2.filetype+';base64,'+$scope.yourMode2.base64;
	};
	
	$scope.salvar = function(dados){

		$scope.botao = false;
		
		if($scope.active == 1){
			$scope.is_active = true;
		}else{
			$scope.is_active = false;	
		}

		if($scope.yourModel){
			$scope.file1 = 'data:'+$scope.yourModel.filetype+';base64,'+$scope.yourModel.base64;
		}

		if($scope.yourMode2){
			$scope.file2 = 'data:'+$scope.yourMode2.filetype+';base64,'+$scope.yourMode2.base64;
		}

		var dados = {
			name: $scope.name,
			sort: $scope.sort,
			primary_color: $scope.primary_color,
			secondary_color: $scope.secondary_color,
			is_active: $scope.is_active,
			img_category: $scope.file1,
			banner: $scope.file2,
			new_img_category: $scope.file2,
		}

		if(!$scope.name){
			$scope.botao = true;
			document.getElementById('status').innerHTML = "¡Complete el campo NOMBRE!";
		}else{
			servicosAPI.postCategorias(dados).then(function (result) {
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
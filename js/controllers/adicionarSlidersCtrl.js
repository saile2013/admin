angular.module("sop").controller("adicionarSlidersCtrl", function($scope, $stateParams, $cookies, $state, servicosAPI){
	
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
	
	$scope.botao = true;
	$scope.dados = {};	
	$scope.active = 1;
	$scope.abriURL = '';

	$scope.verLink = function(link){
		window.open(link, '_blank');
		$scope.abriURL = 'true';
	}
	
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
			if((parseInt($scope.imgView.naturalWidth) != 1920) || (parseInt($scope.imgView.naturalHeight) != 470)){
				document.getElementById('status').innerHTML = "¡Las dimensiones están mal en BANNER (WEB)!";
			}else{
				document.getElementById('status').innerHTML = "";			
			}
		}, 1000);
	}

	$scope.carrega2 = function(){
		$scope.imgView = document.getElementById('bannerMob');
		$scope.imgView.src = 'data:'+$scope.yourMode2.filetype+';base64,'+$scope.yourMode2.base64;
		setTimeout(function(){
			console.log($scope.imgView.naturalWidth, $scope.imgView.naturalHeight);
			if((parseInt($scope.imgView.naturalWidth) != 750) || (parseInt($scope.imgView.naturalHeight) != 300)){
				document.getElementById('status').innerHTML = "¡Las dimensiones están mal en BANNER (MOBILE)!";
			}else{
				document.getElementById('status').innerHTML = "";			
			}
		}, 1000);
	}
	
	$scope.salvar = function(dados){

		$scope.botao = false;
		
		if($scope.active == 1){
			var active = true;
		}else{
			var active = false;	
		}

		if($scope.yourModel){
			$scope.file1 = 'data:'+$scope.yourModel.filetype+';base64,'+$scope.yourModel.base64;
		}

		if($scope.yourMode2){
			$scope.file2 = 'data:'+$scope.yourMode2.filetype+';base64,'+$scope.yourMode2.base64;
		}

		var dados = {
			name: $scope.name,
			link: $scope.link,
			sort: $scope.sort,
			banner: $scope.file1,
			banner_responsive: $scope.file2,
			is_active: active,			
		}

		if(!$scope.abriURL){
			$scope.botao = true;
			document.getElementById('status').innerHTML = "¡Testear el link que añades!";
		}else if(!$scope.name){
			$scope.botao = true;
			document.getElementById('status').innerHTML = "¡Complete el campo NOMBRE!";
		}else if(!$scope.yourModel || !$scope.yourMode2){
			$scope.botao = true;
			document.getElementById('status').innerHTML = "¡Selecciona las dos IMÁGENES!";
		}else{
			servicosAPI.postSliders(dados).then(function (result) {
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
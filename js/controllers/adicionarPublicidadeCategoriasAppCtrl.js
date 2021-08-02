angular.module("sop").controller("adicionarPublicidadeCategoriasAppCtrl", function($scope, $stateParams, $cookies, $state, servicosAPI){
	
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
	
	$scope.idCat = $stateParams.id;
	$scope.botao = true;
	$scope.dados = {};

	$scope.viewCategorias = function(){
		servicosAPI.dtlCategorias($scope.idCat).then(function (result) {
			console.log(result.data.data);
			$scope.name = result.data.data.name;
			$scope.thumbnail = result.data.data.thumbnail;
			$scope.small = result.data.data.small;
			$scope.medium = result.data.data.medium;
			$scope.large = result.data.data.large;

			if(result.data.data.active_banner_ads){
				$scope.active = 1;
			}else{
				$scope.active = 0;
			}		
		});
	}

	$scope.viewCategorias();

	$scope.is_active = function(){
		$scope.active = 1;
	}

	$scope.no_active = function(){
		$scope.active = 0;
	}

	$scope.carrega1 = function(){
		$scope.imgView1 = document.getElementById('thumbnail');
		$scope.imgView1.src = 'data:'+$scope.yourMode1.filetype+';base64,'+$scope.yourMode1.base64;
		setTimeout(function(){
			console.log($scope.imgView1.naturalWidth, $scope.imgView1.naturalHeight);
			if((parseInt($scope.imgView1.naturalWidth) != 375) || (parseInt($scope.imgView1.naturalHeight) != 375)){
				document.getElementById('status').innerHTML = "¡Las dimensiones están mal en (375x375)!";
			}else{
				document.getElementById('status').innerHTML = "";			
			}
		}, 1000);
	}

	$scope.carrega2 = function(){
		$scope.imgView2 = document.getElementById('small');
		$scope.imgView2.src = 'data:'+$scope.yourMode2.filetype+';base64,'+$scope.yourMode2.base64;
		setTimeout(function(){
			console.log($scope.imgView2.naturalWidth, $scope.imgView2.naturalHeight);
			if((parseInt($scope.imgView2.naturalWidth) != 512) || (parseInt($scope.imgView2.naturalHeight) != 512)){
				document.getElementById('status').innerHTML = "¡Las dimensiones están mal en (512x512)!";
			}else{
				document.getElementById('status').innerHTML = "";			
			}
		}, 1000);
	}

	$scope.carrega3 = function(){
		$scope.imgView3 = document.getElementById('medium');
		$scope.imgView3.src = 'data:'+$scope.yourMode3.filetype+';base64,'+$scope.yourMode3.base64;
		setTimeout(function(){
			console.log($scope.imgView3.naturalWidth, $scope.imgView3.naturalHeight);
			if((parseInt($scope.imgView3.naturalWidth) != 720) || (parseInt($scope.imgView3.naturalHeight) != 720)){
				document.getElementById('status').innerHTML = "¡Las dimensiones están mal en (720x720)!";
			}else{
				document.getElementById('status').innerHTML = "";			
			}
		}, 1000);
	}

	$scope.carrega4 = function(){
		$scope.imgView4 = document.getElementById('large');
		$scope.imgView4.src = 'data:'+$scope.yourMode4.filetype+';base64,'+$scope.yourMode4.base64;
		setTimeout(function(){
			if((parseInt($scope.imgView4.naturalWidth) != 1280) || (parseInt($scope.imgView4.naturalHeight) != 1280)){
				document.getElementById('status').innerHTML = "¡Las dimensiones están mal en (1280x1280)!";
			}else{
				document.getElementById('status').innerHTML = "";			
			}
		}, 1000);
	}
	
	$scope.salvar = function(){

		$scope.botao = false;

		if($scope.active == 1){
			$scope.is_active = true;
		}else{
			$scope.is_active = false;	
		}

		if($scope.yourMode1){
			$scope.file1 = 'data:'+$scope.yourMode1.filetype+';base64,'+$scope.yourMode1.base64;
		}

		if($scope.yourMode2){
			$scope.file2 = 'data:'+$scope.yourMode2.filetype+';base64,'+$scope.yourMode2.base64;
		}

		if($scope.yourMode3){
			$scope.file3 = 'data:'+$scope.yourMode3.filetype+';base64,'+$scope.yourMode3.base64;
		}

		if($scope.yourMode4){
			$scope.file4 = 'data:'+$scope.yourMode4.filetype+';base64,'+$scope.yourMode4.base64;
		}
		
		var dados = {
			banner_large: $scope.file4,
			active_banner_ads: active,
		}

		console.log(dados);

		servicosAPI.publicidadeCategorias($scope.idCat, dados).then(function (result) {
			$scope.botao = true;
			document.getElementById('status').innerHTML = "¡Salvo con éxito!";
		});
	};
	
	$scope.sair = function(){
		$cookies.remove('token');
		$state.go('inicio');
	}
	
});
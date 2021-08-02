angular.module("sop").controller("adicionarPublicidadeCategoriasWebCtrl", function($scope, $stateParams, $cookies, $state,  $stateParams, servicosAPI){
	
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
	$scope.botao = true;
	$scope.dados = {};	
	$scope.active = 1;

	servicosAPI.getPush().then(function(result){
		$scope.categorias = result.data.data.type_filters_options.categories;
	});

	servicosAPI.dtlCategorias($scope.id).then(function(result){
		console.log(result.data.data);
		$scope.name = result.data.data.name;

		$scope.imgView1 = document.getElementById('bannerWeb1');
		$scope.imgView2 = document.getElementById('bannerWeb2');
		$scope.imgView3 = document.getElementById('bannerMob3');

		if(result.data.data.img_ads_head){				
			$scope.imgView1.src = result.data.data.img_ads_head;
		}else{
			$scope.imgView1.src = '';
		}

		if(result.data.data.img_ads_squa){				
			$scope.imgView2.src = result.data.data.img_ads_squa;
		}else{
			$scope.imgView2.src = '';
		}

		if(result.data.data.img_ads_resp){				
			$scope.imgView3.src = result.data.data.img_ads_resp;
		}else{
			$scope.imgView3.src = '';
		}

		if(result.data.data.is_active_ads){
			$scope.active = 1;
		}else{
			$scope.active = 0;
		}
	});

	$scope.is_active = function(){
		$scope.active = 1;
	}

	$scope.no_active = function(){
		$scope.active = 0;
	}

	$scope.carrega1 = function(){
		$scope.imgView1 = document.getElementById('bannerWeb1');
		$scope.imgView1.src = 'data:'+$scope.yourMode1.filetype+';base64,'+$scope.yourMode1.base64;
		setTimeout(function(){
			console.log($scope.imgView1.naturalWidth, $scope.imgView1.naturalHeight);
			if((parseInt($scope.imgView1.naturalWidth) != 820) || (parseInt($scope.imgView1.naturalHeight) != 310)){
				document.getElementById('status').innerHTML = "¡Las dimensiones están mal en BANNER (WEB)!";
			}else{
				document.getElementById('status').innerHTML = "";			
			}
		}, 1000);
	}

	$scope.carrega2 = function(){
		$scope.imgView2 = document.getElementById('bannerWeb2');
		$scope.imgView2.src = 'data:'+$scope.yourMode2.filetype+';base64,'+$scope.yourMode2.base64;
		setTimeout(function(){
			console.log($scope.imgView2.naturalWidth, $scope.imgView2.naturalHeight);
			if((parseInt($scope.imgView2.naturalWidth) != 320) || (parseInt($scope.imgView2.naturalHeight) != 315)){
				document.getElementById('status').innerHTML = "¡Las dimensiones están mal en BANNER (WEB)!";
			}else{
				document.getElementById('status').innerHTML = "";			
			}
		}, 1000);
	}

	$scope.carrega3 = function(){
		$scope.imgView3 = document.getElementById('bannerMob3');
		$scope.imgView3.src = 'data:'+$scope.yourMode3.filetype+';base64,'+$scope.yourMode3.base64;
		setTimeout(function(){
			console.log($scope.imgView3.naturalWidth, $scope.imgView3.naturalHeight);
			if((parseInt($scope.imgView3.naturalWidth) != 375) || (parseInt($scope.imgView3.naturalHeight) != 375)){
				document.getElementById('status').innerHTML = "¡Las dimensiones están mal en BANNER (RESPONSIVE)!";
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

		if($scope.yourMode1){
			$scope.file1 = 'data:'+$scope.yourMode1.filetype+';base64,'+$scope.yourMode1.base64;
		}

		if($scope.yourMode2){
			$scope.file2 = 'data:'+$scope.yourMode2.filetype+';base64,'+$scope.yourMode2.base64;
		}

		if($scope.yourMode3){
			$scope.file3 = 'data:'+$scope.yourMode3.filetype+';base64,'+$scope.yourMode3.base64;
		}

		var dados = {
			img_ads_head: $scope.file1,
			img_ads_squa: $scope.file2,
			img_ads_resp : $scope.file3,
			is_active_ads: active,
		}

		if(!$scope.id){
			$scope.botao = true;
			document.getElementById('status').innerHTML = "¡Complete el campo CATEGORÍA!";
		}else{
			servicosAPI.putCategorias($scope.id, dados).then(function (result) {
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
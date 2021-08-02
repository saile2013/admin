angular.module("sop").controller("adicionarShoProdutosCtrl", function($scope, $stateParams, $cookies, $state, servicosAPI){
	
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
	
	$scope.idProd = $stateParams.id;
	$scope.botao = true;
	$scope.dados = {};

	servicosAPI.getShoStores().then(function(result){
		console.log(result.data.data);
		$scope.tiendas = result.data.data;
	});
	
	$scope.carrega1 = function(){
		$scope.imgVie1 = document.getElementById('bannerW1');
		$scope.imgVie1.src = 'data:'+$scope.yourModel1.filetype+';base64,'+$scope.yourModel1.base64;
		setTimeout(function(){
			if((parseInt($scope.imgVie1.naturalWidth) != 1024) || (parseInt($scope.imgVie1.naturalHeight) != 1024)){
				document.getElementById('status').innerHTML = "¡Las dimensiones están mal en Main Picture!";
			}else{
				document.getElementById('status').innerHTML = "";
			}
		}, 1000);
	}

	$scope.salvar = function(){

		$scope.botao = false;

		if($scope.yourModel1){
			$scope.file1 = 'data:'+$scope.yourModel1.filetype+';base64,'+$scope.yourModel1.base64;
		}
		
		if(!$scope.name){
			$scope.botao = true;
			document.getElementById('status').innerHTML = "¡Complete el campo NOMBRE!";
		}else{

			var dados = {
				name: $scope.name,
				description: $scope.description,
				price: $scope.price,
				discount: 0,
				properties: $scope.properties,
				quantity: $scope.cantidad,
				photo: $scope.file1,				
				store_id: $scope.tienda,				
			}

			console.log(dados);

			servicosAPI.postShoProdutos(dados).then(function (result) {
				$scope.botao = true;
				document.getElementById('status').innerHTML = "¡Salvo con éxito!";
				setTimeout(function(){
					$state.go('shoppers');
				}, 400);
			});
		}
	};

	$scope.sair = function(){
		$cookies.remove('token');
		$state.go('inicio');
	}
	
});
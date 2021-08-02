angular.module("sop").controller("adicionarIncriveisCtrl", function($scope, $state, $stateParams, $cookies, servicosAPI){
	
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
	$scope.loader = false;
	$scope.loader2 = true;
	$scope.pag2 = 1;
	

	var produtos = [];
	var produtos2 = [];

	var selProdutos2 = [];
	var idProdutos2 = [];

	servicosAPI.getProductos($scope.pag2).then(function (result) {
		console.log(result.data.data);
		for(var i=0; i<result.data.data.length; i++){
			produtos2.push(result.data.data[i]);
			$scope.loader = true;
		}

		if(!$scope.buscou3){
			$scope.maisPag2 = function(){
				$scope.apa = false;
				$scope.pag2 += 1;
				servicosAPI.getProductos($scope.pag2).then(function(result){
					for(var i=0; i<result.data.data.length; i++){
						produtos2.push(result.data.data[i]);
						$scope.apa = true;
					}
					
					if($scope.pag2 == result.data.last_page){
						$scope.parou = true;
					};
				});
			};
		}

		$scope.produtos2 = produtos2;
	});

	$scope.buProd2 = function(){
		$scope.loader2 = false;
		$scope.buscou3 = true;
		$scope.pag2 = 1;
		produtos2.splice(0);
		servicosAPI.searchProductos($scope.seProd2, null, $scope.pag2).then(function(result){
			for(var i=0; i<result.data.data.length; i++){
				produtos2.push(result.data.data[i]);
				$scope.loader2 = true;
			}
	
			$scope.maisPag2 = function(){
				$scope.apa = false;
				$scope.pag2 += 1;
				servicosAPI.searchProductos($scope.seProd2, null, $scope.pag2).then(function(result){
					for(var i=0; i<result.data.data.length; i++){
						produtos.push(result.data.data[i]);
						$scope.apa = true;
					}
					
					if($scope.pag2 == result.data.last_page){
						$scope.parou = true;
					};
				});
			};
	
			$scope.produtos2 = produtos2;
		});
	};

	$scope.selProd2 = function(id){

		idProdutos2.push(id);

		var dads = {
			products: idProdutos2
		}

		servicosAPI.postAmazing(dads).then(function(result){
			$scope.productos();
		});

		for(var i=0; i<produtos2.length; i++){
			if(id == produtos2[i].id){
				produtos2.splice(i, 1);				
			}
		}
	};

	$scope.back = function(){
		window.history.back();
	}
	
	$scope.sair = function(){
		$cookies.remove('token');
		$state.go('inicio');
	}
	
});
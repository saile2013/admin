angular.module("sop").controller("perfilCotacaoCtrl", function($scope, $state, $stateParams, $cookies, servicosAPI){
	
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

	servicosAPI.dtlLogistica($scope.id).then(function(result){
		console.log(result);
		$scope.produtos = result.data.data[0].new_order_items;
		$scope.loader = true;
	});

	$scope.back = function(){
		//$state.go('cotacao-logistica');
		window.history.back();
	}
	
	$scope.sair = function(){
		$cookies.remove('token');
		$state.go('inicio');
	}
	
});
angular.module("sop").controller("perfilCuponsCtrl", function($scope, $state, $stateParams, $cookies, servicosAPI){
	
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
	var produtos = [];

	servicosAPI.dtlCupons($scope.id).then(function(result){

		$scope.loader = true;

		console.log(result.data.data);

		$scope.Ids = result.data.data.id;
		$scope.title = result.data.data.title;
		$scope.description = result.data.data.description;
		$scope.expired_at = result.data.data.expired_at;
		$scope.code = result.data.data.code;
		$scope.discountType = result.data.data.discountType;
		$scope.lower_limit = result.data.data.lower_limit;
		$scope.quantity = result.data.data.quantity;
		$scope.upper_limit = result.data.data.upper_limit;
		$scope.value = result.data.data.value;
		
		$scope.products = result.data.data.applicables_to.products;
		$scope.stores = result.data.data.applicables_to.stores;
		$scope.users = result.data.data.users;
	});

	$scope.back = function(){
		window.history.back();
	}
	
	$scope.sair = function(){
		$cookies.remove('token');
		$state.go('inicio');
	}
	
});
angular.module("sop").controller("editarTallasCtrl", function($scope, $state, $cookies, $state, $stateParams, servicosAPI){
	
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

	var tiendas = [];
	$scope.id = $stateParams.id;
	$scope.botao = true;

	servicosAPI.dtlTallas($scope.id).then(function (result) {
		console.log(result.data.data.talla);
		if(result.data.data.store_id){
			$scope.tienda = result.data.data.store_id.toString();
		}
		if(result.data.data.type){
			$scope.type = result.data.data.type;
		}
		if(result.data.data.talla){
			$scope.talla = result.data.data.talla;
		}
		$scope.inicial = result.data.data.size_start;
		$scope.final = result.data.data.size_end;
	});

	servicosAPI.getLOjas().then(function(result){
		angular.forEach(result.data, function(value, key) {
			tiendas.push({key: value.id, value: value.name});
		});		
		$scope.tiendas = tiendas;
	});
	
	$scope.types = [
		{key: 'pecho', value: 'Pecho'},
		{key: 'cintura', value: 'Cintura'},
		{key: 'cadera', value: 'Cadera'}
	]

	$scope.tallas = [
		{key: 'XS', value: 'XS'},
		{key: 'S', value: 'S'},
		{key: 'M', value: 'M'},
		{key: 'L', value: 'L'},
		{key: 'XSSS', value: 'XSSS'},
		{key: 'XL', value: 'XL'},
		{key: 'XXL', value: 'XXL'}
	]
	
	$scope.salvar = function(){

		$scope.botao = false;

		if(!$scope.type){
			$scope.botao = true;
			document.getElementById('status').innerHTML = "Selecciona el campo TIPO!";
		}else if(!$scope.talla){
			$scope.botao = true;
			document.getElementById('status').innerHTML = "Selecciona el campo TALLA!";
		}else if(!$scope.inicial){
			$scope.botao = true;
			document.getElementById('status').innerHTML = "Completar el campo INICIAL!";
		}else if(!$scope.final){
			$scope.botao = true;
			document.getElementById('status').innerHTML = "Completar el campo FINAL!";
		}else{

			var dados = {
				store_id: $scope.tienda,
				type: $scope.type,
				talla: $scope.talla,
				size_start: $scope.inicial,
				size_end: $scope.final,
			}

			servicosAPI.putTallas($scope.id, dados).then(function (result) {
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
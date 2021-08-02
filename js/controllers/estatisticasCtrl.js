angular.module("sop").controller("estatisticasCtrl", function($scope, $state, $cookies, $state, $stateParams, servicosAPI){
	
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

	servicosAPI.dtlTiendas($scope.id).then(function (result) {
		$scope.name = result.data.data.name;
	});
	
	servicosAPI.getPush().then(function(result){
		console.log(result.data.data);
		$scope.tipos = result.data.data.type_filters;
		$scope.stores = result.data.data.types;
		$scope.categorias = result.data.data.type_filters_options.categories;
		$scope.platforms = result.data.data.type_filters_options.platform;
		$scope.tiendas = result.data.data.type_filters_options.stores;
		$scope.genders = result.data.data.type_filters_options.gender;
	});

	$scope.starts = [
		{id:'', name:'Seleccione una edad de inicio'},
		{id: 1, name:'1'}, {id: 2, name:'2'}, {id: 3, name:'3'}, {id: 4, name:'4'}, {id: 5, name:'5'},
		{id: 6, name:'6'}, {id: 7, name:'7'}, {id: 8, name:'8'}, {id: 9, name:'9'}, {id: 10, name:'10'},
		{id: 11, name:'11'}, {id: 12, name:'12'}, {id: 13, name:'13'}, {id: 14, name:'14'}, {id: 15, name:'15'},
		{id: 16, name:'16'}, {id: 17, name:'17'}, {id: 18, name:'18'}, {id: 19, name:'19'}, {id: 20, name:'20'},
		{id: 21, name:'21'}, {id: 22, name:'22'}, {id: 23, name:'23'}, {id: 24, name:'24'}, {id: 25, name:'25'},
		{id: 26, name:'26'}, {id: 27, name:'27'}, {id: 28, name:'28'}, {id: 29, name:'29'}, {id: 30, name:'30'},
		{id: 31, name:'31'}, {id: 32, name:'33'}, {id: 34, name:'34'}, {id: 35, name:'35'}, {id: 36, name:'36'},
		{id: 37, name:'37'}, {id: 38, name:'38'}, {id: 39, name:'39'}, {id: 40, name:'40'},
	]

	$scope.start = $scope.starts[0];

	$scope.finishs = [
		{id:'', name:'seleccione una edad final'},
		{id: 1, name:'1'}, {id: 2, name:'2'}, {id: 3, name:'3'}, {id: 4, name:'4'}, {id: 5, name:'5'},
		{id: 6, name:'6'}, {id: 7, name:'7'}, {id: 8, name:'8'}, {id: 9, name:'9'}, {id: 10, name:'10'},
		{id: 11, name:'11'}, {id: 12, name:'12'}, {id: 13, name:'13'}, {id: 14, name:'14'}, {id: 15, name:'15'},
		{id: 16, name:'16'}, {id: 17, name:'17'}, {id: 18, name:'18'}, {id: 19, name:'19'}, {id: 20, name:'20'},
		{id: 21, name:'21'}, {id: 22, name:'22'}, {id: 23, name:'23'}, {id: 24, name:'24'}, {id: 25, name:'25'},
		{id: 26, name:'26'}, {id: 27, name:'27'}, {id: 28, name:'28'}, {id: 29, name:'29'}, {id: 30, name:'30'},
		{id: 31, name:'31'}, {id: 32, name:'33'}, {id: 34, name:'34'}, {id: 35, name:'35'}, {id: 36, name:'36'},
		{id: 37, name:'37'}, {id: 38, name:'38'}, {id: 39, name:'39'}, {id: 40, name:'40'},
	]

	$scope.finish = $scope.finishs[0];

	$scope.buscar = function(){

		$scope.botao = false;

		if(!$scope.tipo){
			$scope.botao = true;
			document.getElementById('status').innerHTML = "Selecciona el campo TIPO!";
		}else if(!$scope.store){
			$scope.botao = true;
			document.getElementById('status').innerHTML = "Selecciona el campo ITEM!";
		}else if(!$scope.categoria){
			$scope.botao = true;
			document.getElementById('status').innerHTML = "Selecciona el campo CATEGORÍAS!";
		}else{

			if($scope.tipo.id == 'age'){

				var dados = {
					type_filter : "age",
					type : $scope.store.id,
					id : $scope.categoria.id,
					options : {
						"start" : $scope.start.id,
						"finish" : $scope.finish.id,
						"status" : true
					},			
					description : $scope.descripcion,
					title : $scope.titulo
				}

			}else if($scope.tipo.id == 'platform'){

				var dados = {
					type_filter : "platform",
					type : $scope.store.id,
					id : $scope.categoria.id,
					options : {
						"platform" : $scope.platform.id,
						"status" : true
					},			
					description : $scope.descripcion,
					title : $scope.titulo
				}

			}else if($scope.tipo.id == 'store_followers'){

				var dados = {
					type_filter : "store_followers",
					type : $scope.store.id,
					id : $scope.categoria.id,
					options : {
						"store" : $scope.tienda.id,
						"status" : true
					},			
					description : $scope.descripcion,
					title : $scope.titulo
				}

			}else if($scope.tipo.id == 'gender'){

				var dados = {
					type_filter : "gender",
					type : $scope.store.id,
					id : $scope.categoria.id,
					options : {
						"gender" : $scope.gender.id,
						"status" : true
					},			
					description :  $scope.descripcion,
					title : $scope.titulo
				}

			}else if($scope.tipo.id == 'users_with_orders'){

				var dados = {
					type_filter : "users_with_orders",
					type : $scope.store.id,
					id : $scope.categoria.id,
					options : {
						"gender" : $scope.gender.id,
						"status" : true
					},			
					description : $scope.descripcion,
					title : $scope.titulo
				}

			}else if($scope.tipo.id == 'specific_user'){

				var dados = {
					type_filter : "specific_user",
					type : $scope.store.id,
					id : $scope.categoria.id,
					options : {
						"email" : $scope.email,
					},			
					description : $scope.descripcion,
					title : $scope.titulo
				}
			}

			servicosAPI.postPush(dados).then(function (result) {
				console.log(result);
				$scope.botao = true;
			});

		}
	};
	
	$scope.sair = function(){
		$cookies.remove('token');
		$state.go('inicio');
	}
	
});
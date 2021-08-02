angular.module("sop").controller("pushCsvCtrl", function($scope, $state, $cookies, $state, baseAPI, Upload, servicosAPI){
	
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
	var stores = [];
	
	servicosAPI.getPush().then(function(result){

		console.log(result.data.data);

		$scope.tipos = result.data.data.type_filters;

		for(var i=0; i<result.data.data.types.length; i++){
			if(result.data.data.types[i].id != 'PRODUCT'){
				stores.push(result.data.data.types[i]);
			}
		}		
		$scope.stores = stores;

		$scope.categorias = result.data.data.type_filters_options.categories;
		$scope.platforms = result.data.data.type_filters_options.platform;
		$scope.tiendas = result.data.data.type_filters_options.stores;
		$scope.genders = result.data.data.type_filters_options.gender;
	});

	$scope.starts = [
		{id:'', name:'Seleccione una edad de inicio'},
		{id: 18, name:'18'}, {id: 19, name:'19'}, {id: 20, name:'20'}, {id: 21, name:'21'}, {id: 22, name:'22'},
		{id: 23, name:'23'}, {id: 24, name:'24'}, {id: 25, name:'25'}, {id: 26, name:'26'}, {id: 27, name:'27'},
		{id: 28, name:'28'}, {id: 29, name:'29'}, {id: 30, name:'31'}, {id: 32, name:'32'}, {id: 33, name:'33'},
		{id: 34, name:'34'}, {id: 35, name:'35'}, {id: 36, name:'36'}, {id: 37, name:'37'}, {id: 38, name:'38'},
		{id: 39, name:'39'}, {id: 40, name:'40'}, {id: 41, name:'41'}, {id: 42, name:'42'}, {id: 44, name:'44'},
		{id: 45, name:'45'}, {id: 46, name:'46'}, {id: 47, name:'47'}, {id: 48, name:'48'}, {id: 49, name:'49'},
		{id: 50, name:'50'}, {id: 51, name:'51'}, {id: 52, name:'52'}, {id: 53, name:'53'}, {id: 54, name:'54'},
		{id: 55, name:'55'}, {id: 56, name:'56'}, {id: 57, name:'57'}, {id: 58, name:'58'}, {id: 59, name:'59'},
		{id: 60, name:'60'}, {id: 61, name:'61'}, {id: 62, name:'62'}, {id: 63, name:'63'}, {id: 64, name:'64'},
		{id: 65, name:'65'}, {id: 66, name:'66'}, {id: 67, name:'67'}, {id: 68, name:'68'}, {id: 69, name:'69'},
		{id: 70, name:'70'}, {id: 71, name:'71'}, {id: 72, name:'72'}, {id: 73, name:'73'}, {id: 74, name:'74'},
		{id: 75, name:'75'}, {id: 76, name:'76'}, {id: 77, name:'77'}, {id: 78, name:'78'}, {id: 79, name:'79'},
		{id: 80, name:'80'},
	]

	$scope.start = $scope.starts[0];

	$scope.finishs = [
		{id:'', name:'seleccione una edad final'},
		{id: 18, name:'18'}, {id: 19, name:'19'}, {id: 20, name:'20'}, {id: 21, name:'21'}, {id: 22, name:'22'},
		{id: 23, name:'23'}, {id: 24, name:'24'}, {id: 25, name:'25'}, {id: 26, name:'26'}, {id: 27, name:'27'},
		{id: 28, name:'28'}, {id: 29, name:'29'}, {id: 30, name:'31'}, {id: 32, name:'32'}, {id: 33, name:'33'},
		{id: 34, name:'34'}, {id: 35, name:'35'}, {id: 36, name:'36'}, {id: 37, name:'37'}, {id: 38, name:'38'},
		{id: 39, name:'39'}, {id: 40, name:'40'}, {id: 41, name:'41'}, {id: 42, name:'42'}, {id: 44, name:'44'},
		{id: 45, name:'45'}, {id: 46, name:'46'}, {id: 47, name:'47'}, {id: 48, name:'48'}, {id: 49, name:'49'},
		{id: 50, name:'50'}, {id: 51, name:'51'}, {id: 52, name:'52'}, {id: 53, name:'53'}, {id: 54, name:'54'},
		{id: 55, name:'55'}, {id: 56, name:'56'}, {id: 57, name:'57'}, {id: 58, name:'58'}, {id: 59, name:'59'},
		{id: 60, name:'60'}, {id: 61, name:'61'}, {id: 62, name:'62'}, {id: 63, name:'63'}, {id: 64, name:'64'},
		{id: 65, name:'65'}, {id: 66, name:'66'}, {id: 67, name:'67'}, {id: 68, name:'68'}, {id: 69, name:'69'},
		{id: 70, name:'70'}, {id: 71, name:'71'}, {id: 72, name:'72'}, {id: 73, name:'73'}, {id: 74, name:'74'},
		{id: 75, name:'75'}, {id: 76, name:'76'}, {id: 77, name:'77'}, {id: 78, name:'78'}, {id: 79, name:'79'},
		{id: 80, name:'80'},
	]

	$scope.finish = $scope.finishs[0];

	$scope.submit = function() {
		
		$scope.botao = false;

		if(!$scope.tipo){
			$scope.botao = true;
			document.getElementById('status').innerHTML = "Selecciona el campo TIPO!";
		}else if(!$scope.store){
			$scope.botao = true;
			document.getElementById('status').innerHTML = "Selecciona el campo ITEM!";
		}else{
			$scope.upload($scope.file);
		}
	};

	$scope.selec = function (file) {
		$scope.nameFile = file.name;
	}

	$scope.upload = function (file) {

		console.log(file.name);

		$scope.botao = false;

		if($scope.store.id == 'CATEGORY'){
			var ids = $scope.categoria.id;
		}else if($scope.store.id == 'STORE'){
				var ids = $scope.tienda2.id;
		}

		if($scope.tipo.id == 'age'){

			var dados = {
				file: file,
				type_filter : "age",
				type : $scope.store.id,
				id : ids,
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
				file: file,
				type_filter : "platform",
				type : $scope.store.id,
				id : ids,
				options : {
					"platform" : $scope.platform.id,
					"status" : true
				},			
				description : $scope.descripcion,
				title : $scope.titulo
			}

		}else if($scope.tipo.id == 'store_followers'){

			var dados = {
				file: file,
				type_filter : "store_followers",
				type : $scope.store.id,
				id : ids,
				options : {
					"id": $scope.tienda.id,
					"status": true
				},			
				description : $scope.descripcion,
				title : $scope.titulo
			}

		}else if($scope.tipo.id == 'gender'){

			var dados = {
				file: file,
				type_filter : "gender",
				type : $scope.store.id,
				id : ids,
				options : {
					"gender" : $scope.gender.id,
					"status" : true
				},			
				description :  $scope.descripcion,
				title : $scope.titulo
			}

		}else if($scope.tipo.id == 'users_with_orders'){

			var dados = {
				file: file,
				type_filter : "users_with_orders",
				type : $scope.store.id,
				id : ids,
				options : {
					"gender" : $scope.gender.id,
					"status" : true
				},			
				description : $scope.descripcion,
				title : $scope.titulo
			}

		}else if($scope.tipo.id == 'specific_user'){

			var dados = {
				file: file,
				type_filter : "specific_user",
				type : $scope.store.id,
				id : ids,
				options : {
					"email" : $scope.email,
				},			
				description : $scope.descripcion,
				title : $scope.titulo
			}

		}else if($scope.tipo.id == 'all'){
			
			var dados = {
				file: file,
				type_filter : "file",
				type : "STORE",
				id : ids,
				options : {
				},			
				description : $scope.descripcion,
				title : $scope.titulo
			}

		}

		console.log($scope.tipo.id);

		Upload.upload({
			url: baseAPI.baseURL + 'api/wb/admin/push-notification',
			data: dados
		}).then(function (resp) {
			$scope.botao = true;
			document.getElementById('status').innerHTML = '¡Notificaciones enviadas con Exito!';
		}, function (resp) {
			console.log('Error status: ' + resp.status);
		}, function (evt) {
			var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
			console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
			document.getElementById('status').innerHTML = 'progress: ' + progressPercentage + '% ' + evt.config.data.file.name;
		});
	};

	$scope.sair = function(){
		$cookies.remove('token');
		$state.go('inicio');
	}
	
});
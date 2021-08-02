angular.module("sop").controller("dicionarioCategoriasCtrl", function($scope, $cookies, $state, $stateParams, Upload, baseAPI, servicosAPI){
	
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
	$scope.pag = 20;
	$scope.apa = true;
	
	servicosAPI.dtlCategorias($scope.id).then(function (result) {
		$scope.nameCate = result.data.data.name;
	});

	$scope.submit = function() {
		$scope.botao = false;
		$scope.upload($scope.file);
	};

	// upload on file select or drop
	$scope.upload = function (file) {
		Upload.upload({
			url: baseAPI.baseURL+'api/wb/admin/category-upload',
			data: {file: file}
		}).then(function (resp) {
			$scope.botao = true;
			document.getElementById('status').innerHTML = 'Success ' + resp.config.data.file.name + ' uploaded';
		}, function (resp) {
			$scope.botao = true;
			document.getElementById('status').innerHTML = 'Error status: ' + resp.status;
		}, function (evt) {
			$scope.botao = true;
			var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
			document.getElementById('status').innerHTML = 'progress: ' + progressPercentage + '% ' + evt.config.data.file.name;
		});
	};

	$scope.sair = function(){
		$cookies.remove('token');
		$state.go('inicio');
	}
	
});
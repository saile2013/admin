angular.module("sop").controller("criarUsuariosCtrl", function($scope, $cookies, $state, $stateParams, Upload, servicosAPI){
	
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
	$scope.dados = {};
	$scope.botao = true;

	$scope.selec = function (file) {
		$scope.nameFile = file.name;
	}

	$scope.submit = function() {
		
		$scope.botao = false;
		$scope.upload($scope.file);
	};

	$scope.upload = function (file) {

		$scope.botao = false;

		var dados = {
			file: file
		}

		Upload.upload({
			url: 'https://managerb2b-backend.lorob2b.com/api/wb/admin/companies/'+$scope.id+'/users',
			data: dados,
			headers: {
				"Authorization": 'Bearer' +$cookies.get('token'),
				"Content-Type": "application/json",
			},
		}).then(function (resp) {
			$scope.botao = true;
			document.getElementById('status2').innerHTML = '¡Enviado con Exito!';
			setTimeout(function(){ $state.go('perfil-lorob2b', {id:$scope.id}, {reload: true}); }, 1000);
			
		}).catch(function(erro){
			console.log(erro.data.error);
			if(erro.data.error){
				document.getElementById('status2').innerHTML = 'Error status: ' + erro.data.error;
			}
			if(erro.data.error.file){
				document.getElementById('status2').innerHTML = 'Error status: ' + erro.data.error.file[0];
			}
		}, function (resp) {
			if(resp.data.error.file){
				console.log(resp.data.error.file[0]);
				document.getElementById('status2').innerHTML = 'Error status: ' + resp.data.error.file[0];
			}
		}, function (evt) {
			var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
			console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
			document.getElementById('status2').innerHTML = 'progress: ' + progressPercentage + '% ' + evt.config.data.file.name;
		});
	};

	
	
	$scope.back = function(){
		$state.go('perfil-lorob2b', {id:$scope.id});
	}

});
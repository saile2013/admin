angular.module("sop").controller("adicionarChallengesCtrl", function($scope, $cookies, $state, Upload, baseAPI, servicosAPI){
	
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
	
	$scope.dados = {};
	$scope.active = 1;
	$scope.botao = true;
	var tiendas = [];
	$scope.nameFile = 'Sube un vídeo';

	servicosAPI.getProductos(1).then(function(result){
		console.log(result.data.filters.stores);
		angular.forEach(result.data.filters.stores, function(value, key) {
			tiendas.push({key: key, value: value});
		});		
		$scope.tiendas = tiendas;
	});
		
	$scope.submit = function() {

		console.log($scope.tienda);

		const date1 = new Date(document.getElementById('iniciar').value + ' ' + document.getElementById('iniciar2').value);
		const date2 = new Date(document.getElementById('finaliza').value + ' ' + document.getElementById('finaliza2').value);

		if($scope.name.substring(0,1) != '#'){
			$scope.botao = true;
			document.getElementById('status2').innerText = 'en "NOMBRE" el primer carácter debe ser un "#"';
		}else if(!$scope.tienda){
			$scope.botao = true;
			document.getElementById('status2').innerText = 'seleccionar una "TIENDA"';
			$scope.botao = true;
		}else if(!$scope.premio){
			$scope.botao = true;
			document.getElementById('status2').innerText = 'escribe el "PREMIO"';			
		}else if(!$scope.comentarios){
			$scope.botao = true;
			document.getElementById('status2').innerText = 'escribe el "COMENTARIOS"';			
		}else if (date1.getTime() >= date2.getTime()) {
			$scope.botao = true;
			document.getElementById('status2').innerText = 'FECHA invalida';
		}else if(!$scope.file){
			$scope.botao = true;
			document.getElementById('status2').innerText = 'seleccionar un archivo PDF';
		}else if(!$scope.file2){
			$scope.botao = true;
			document.getElementById('status2').innerText = 'seleccionar un VIDEO';
		}else{
			$scope.botao = false;
			$scope.upload($scope.file, $scope.file2);
		}
	};

	$scope.selec = function (file) {
		$scope.termos = file.name;
	}

	$scope.selec2 = function (file) {
		console.log(file);
		$scope.nameFile = file.name;
	}

	$scope.upload = function (file, file2) {

		$scope.error = false;

		servicosAPI.searchTiendas2($scope.tienda, 1, 1).then(function (result) {
			console.log(result.data.data);

			Upload.upload({
				url: baseAPI.baseURL2 + 'api/admin/challenges',
				method: 'POST',
				data: {
					name: $scope.name,
					'author[id]': result.data.data[0].id,
					'author[type]': 'store',

					"author[alias]": result.data.data[0].alias,
					"author[name]": result.data.data[0].name,

					"author[profile_picture]": result.data.data[0].profile_picture,
					"author[banner]": result.data.data[0].banner,
					"author[banner_jpeg]": result.data.data[0].banner,
					"author[banner_jpeg][large]": result.data.data[0].banner_large,
					"author[banner_jpeg][medium]": result.data.data[0].banner_medium,
					"author[banner_jpeg][small]": result.data.data[0].banner_small,
					"author[banner_jpeg][thumbnail]": result.data.data[0].banner_thumbnail,

					"author[new_banner]": null,
					"author[new_banner][large]": null,
					"author[new_banner][medium]": null,
					"author[new_banner][small]": null,
					"author[new_banner][thumbnail]": null,

					"author[new_profile_picture]": null,
					"author[new_profile_picture][large]": null,
					"author[new_profile_picture][medium]": null,
					"author[new_profile_picture][small]": null,
					"author[new_profile_picture][thumbnail]": null,

					"author[profile_picture_jpeg]": null,
					"author[profile_picture_jpeg][large]": null,
					"author[profile_picture_jpeg][medium]": null,
					"author[profile_picture_jpeg][small]": null,
					"author[profile_picture_jpeg][thumbnail]": null,

					"author[new_profile_picture]": null,
					"author[new_profile_picture][thumbnail]": null,
					"author[new_profile_picture][small]": null,
					"author[new_profile_picture][medium]": null,
					"author[new_profile_picture][large]": null,
					
					description: $scope.premio,
					comment: $scope.comentarios,
					started_at: document.getElementById('iniciar').value+' '+document.getElementById('iniciar2').value+':00',
					finished_at: document.getElementById('finaliza').value+' '+document.getElementById('finaliza2').value+':00',
					terms: file,
					video: file2,
				},
				headers: {
					"Authorization": "bearer "+$cookies.get('token')
				}
			}).catch(function(error){
				console.log(error.data.error);
				$scope.error = error.data.error;
				$scope.botao = true;
			}).then(function (resp) {
				if(resp.data.data.success != ''){
					$scope.botao = true;
					document.getElementById('status2').innerText = 'Enviado con Exito!';
					setTimeout(function(){
						$state.go('challenges');
					}, 400);
				}else{
					$scope.botao = true;
					document.getElementById('status2').innerText = resp.data.data.error;
				}
			}, function (resp) {
				$scope.botao = true;
				console.log('Error status: ' + resp.status);
			}, function (evt) {
				var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
				console.log('progress: ' + progressPercentage + '% ');
				document.getElementById('status2').innerText = 'progress: ' + progressPercentage + '% ';
			});

		});
	};
	
	$scope.sair = function(){
		$cookies.remove('token');
		$state.go('inicio');
	}
	
});
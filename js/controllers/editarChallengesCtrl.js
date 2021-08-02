angular.module("sop").controller("editarChallengesCtrl", function($scope, $stateParams, $cookies, $state, Upload, baseAPI, servicosAPI){
	
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
	
	$scope.alias = $stateParams.alias;
	$scope.dados = {};
	$scope.active = 1;
	$scope.botao = true;
	var tiendas = [];
	$scope.mudou1 = false;
	$scope.mudou2 = false;
	$scope.nameFile = 'Sube un vídeo';

	servicosAPI.getProductos(1).then(function(result){
		angular.forEach(result.data.filters.stores, function(value, key) {
			tiendas.push({key: key, value: value});
		});		
		$scope.tiendas = tiendas;
	});

	servicosAPI.dtlChallenges($scope.alias, $cookies.get('token')).then(function(result){
		console.log(result.data.data.author.id);
		$scope.name = result.data.data.name;
		$scope.tienda = result.data.data.author.id.toString();
		$scope.premio = result.data.data.description;
		$scope.comentarios = result.data.data.comment;
		$scope.termos = result.data.data.terms;
		
		if(result.data.data.media[0]){
			$scope.video = '//challenges-usea.streaming.media.azure.net'+result.data.data.media[0].streaming_paths.paths[0];
			$scope.thumbVideo = result.data.data.media[0].thumbnail_image.thumbnail;
			var termos = result.data.data.terms;
			var video = '//challenges-usea.streaming.media.azure.net'+result.data.data.media[0].streaming_paths.paths[0];
		}

		if(result.data.data.started_at){
			document.getElementById('iniciar').value = result.data.data.started_at.substr(0,10);
			document.getElementById('iniciar2').value = result.data.data.started_at.substr(-8);
		}

		if(result.data.data.finished_at){
			document.getElementById('finaliza').value = result.data.data.finished_at.substr(0,10);
			document.getElementById('finaliza2').value = result.data.data.finished_at.substr(-8);
		}

		$scope.submit = function() {		
			$scope.botao = false;
	
			if(termos){
				var file = termos;
			}else{
				var file = $scope.file;
			}
	
			if(video){
				var file2 = video;
			}else{
				var file2 = $scope.file2;
			}
	
			$scope.upload(file, file2);
		};
	});
		
	$scope.selec = function (file) {
		$scope.termos = file.name;
		file = false;
	}

	$scope.selec2 = function (file) {
		$scope.nameFile = file.name;
		$scope.thumbVideo = false;
		file2 = false;
	}

	$scope.mudaHr1 = function () {
		$scope.mudou1 = true;
	}

	$scope.mudaHr2 = function () {
		$scope.mudou2 = true;		
	}

	$scope.upload = function (file, file2) {

		console.log('elias '+$scope.file, $scope.file2);

		$scope.error = false;

		servicosAPI.searchTiendas2($scope.tienda, 1, 1).then(function (result) {

			console.log(result);

			const date1 = new Date(document.getElementById('iniciar').value + ' ' + document.getElementById('iniciar2').value);
			const date2 = new Date(document.getElementById('finaliza').value + ' ' + document.getElementById('finaliza2').value);

			if($scope.mudou1 == true){
				var date11 = document.getElementById('iniciar').value + ' ' + document.getElementById('iniciar2').value+':00';				
			}else{
				var date11 = document.getElementById('iniciar').value + ' ' + document.getElementById('iniciar2').value;
			}

			if($scope.mudou2 == true){
				var date22 = document.getElementById('finaliza').value + ' ' + document.getElementById('finaliza2').value+':00';
			}else{
				var date22 = document.getElementById('finaliza').value + ' ' + document.getElementById('finaliza2').value;
			}			

			console.log($scope.mudou2);

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
			}else if(!file){
				$scope.botao = true;
				document.getElementById('status2').innerText = 'seleccionar un archivo PDF';
			}else if(!file2){
				$scope.botao = true;
				document.getElementById('status2').innerText = 'seleccionar un VIDEO';
			}else{

				var dados = {
					name: $scope.name,

					"author": {
						"id": result.data.data[0].id,
						"type": "store",
						"alias": result.data.data[0].alias,
						"name": result.data.data[0].name,
						"profile_picture": result.data.data[0].profile_picture ?? null,
						"banner": result.data.data[0].banner ?? null,
						"banner_jpeg": {
							"large": result.data.data[0].banner_large ?? null,
							"medium": result.data.data[0].banner_medium ?? null,
							"small": result.data.data[0].banner_small ?? null,
							"thumbnail": result.data.data[0].banner_thumbnail ?? null
						},
						"new_banner": {
							"large": "null",
							"medium": "null",
							"small": "null",
							"thumbnail": "null"
						},
						"new_profile_picture": {
							"large": "null",
							"medium": "null",
							"small": "null",
							"thumbnail": "null"
						},
						"profile_picture_jpeg": {
							"large": "null",
							"medium": "null",
							"small": "null",
							"thumbnail": "null"
						}
					},

					description: $scope.premio,
					comment: $scope.comentarios,
					started_at: date11,
					finished_at: date22,
				}
		
				servicosAPI.putChallenge($scope.alias, $cookies.get('token'), dados)
				.catch((erro) => {
					$scope.botao = true;
					console.log(erro);
				}).then(function (result) {
					$scope.botao = true;
					document.getElementById('status2').innerHTML = '¡Salvo con éxito!';
				});

				if($scope.file && $scope.file2){
					Upload.upload({
						url: baseAPI.baseURL2 + 'api/admin/challenges/'+$scope.alias+'/media',
						method: 'POST',
						data: {
							terms: $scope.file,
							video: $scope.file2,
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
				}
			}

		});
	};
	
	$scope.sair = function(){
		$cookies.remove('token');
		$state.go('inicio');
	}
	
});
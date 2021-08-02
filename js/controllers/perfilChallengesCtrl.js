angular.module("sop").controller("perfilChallengesCtrl", function($scope, $state, $cookies, $state, $stateParams, servicosAPI){
	
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
	$scope.pag = 1;
	$scope.apa = true;
	var pedidos = [];
	var cores = '#F4F4F4';
	
	$scope.statos = [
		{value:'', aparence:'Seleccione un estado'},
		{value:'canceled', aparence:'Cancelada'},
		{value:'incomplete', aparence:'Incompleta'},
		{value:'opened', aparence:'Pagada'},
		{value:'payment_pending', aparence:'Pendiente de Pago'},
		{value:'delivered', aparence:'Entregado'},
	]

	$scope.estatu = $scope.statos[0];
	
	servicosAPI.dtlChallenges($scope.alias, $cookies.get('token')).then(function(result){
		$scope.nombre = result.data.data.name;
		$scope.alias = result.data.data.alias;
		$scope.author = result.data.data.author.name;
		$scope.banner = result.data.data.author.profile_picture;
		$scope.description = result.data.data.description;
		$scope.finished_at = result.data.data.finished_at;
		$scope.terms = result.data.data.terms;
		$scope.thumbnail = result.data.data.media[0].thumbnail_image.thumbnail;
	});

	servicosAPI.getParticipantes($scope.pag, $scope.alias, $cookies.get('token')).then(function(RESul){

		console.log(RESul.data.data);

		if(RESul.data.data){

			for(var i=0; i<RESul.data.data.length; i++){
				if(cores === '#F4F4F4'){
					var cores = '#FFFFFF';
				}else{
					var cores = '#F4F4F4';
				}
				pedidos.push({pedidos: RESul.data.data[i], cores: cores});
			}
			
			$scope.maisPag = function(){
				$scope.apa = false;
				$scope.pag += 1;
				servicosAPI.getParticipantes($scope.pag,  $scope.alias, $cookies.get('token')).then(function(result){
					for(var i=0; i<result.data.data.length; i++){
						if(cores === '#F4F4F4'){
							var cores = '#FFFFFF';
						}else{
							var cores = '#F4F4F4';
						}
						pedidos.push({pedidos: result.data.data[i], cores: cores});
						$scope.apa = true;
					}
					
					if($scope.pag == result.data.last_page){
						$scope.parou = true;
					};
				});
			};

			$scope.participantes = pedidos;
		}
	});

	$scope.valida = function(type, id){
		servicosAPI.validaPosts(type, id, $cookies.get('token')).then(function(result){
			console.log(result.data.data.status);
			document.getElementById('statusVer'+result.data.data.alias).innerText = result.data.data.status;
		});
	};

	$scope.abrirLink = function(alias, alias_post, description, name){
		console.log(alias, alias_post, description, name);
		servicosAPI.postLinkDet(alias, alias_post, description, name, $cookies.get('token')).then(function(result){
			console.log(result.data.shortLink);
			//window.open(result.data.shortLink, '_blank');
			navigator.clipboard.writeText(result.data.shortLink);
			document.getElementById('copy'+alias_post).innerHTML = 'copiado';
		});
	};

	$scope.enter = function(event){
		if(window.event.keyCode == 13){
			console.log('enter');
			$scope.buscar();
		}
	};

	$scope.seleStatus = function(){
		//$state.go('search-pedidos', {text:null, status:$scope.estatu.value, begin:null, end:null});
	};

	$scope.buscar = function(){
		if($scope.buscando){
			//$state.go('search-pedidos', {text:$scope.buscando, status:null, begin:null, end:null});
		}
	}
	
	$scope.sair = function(){
		$cookies.remove('token');
		$state.go('inicio');
	}
	
});
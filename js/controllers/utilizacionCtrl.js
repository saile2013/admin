angular.module("sop").controller("utilizacionCtrl", function($scope, $cookies, $state, servicosAPI){
	
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

	$scope.pag = 1;
	$scope.apa = true;
	var results = [];
	var cores = '#EEE';
	
	servicosAPI.getUtilizacion($scope.pag).then(function (result) {

		for(var i=0; i<result.data.data.length; i++){

			if(cores == '#EEE'){
				cores = '#F4F4F4';
			}else{
				cores = '#EEE';
			}

			results.push({
				agent: result.data.data[i].agent,
				created_at: result.data.data[i].created_at,
				event: result.data.data[i].event,
				fullname: result.data.data[i].fullname,
				ip: result.data.data[i].ip,
				method: result.data.data[i].method,
				updated_at: result.data.data[i].updated_at,
				url: result.data.data[i].url,
				cores: cores,
			});
		}

		$scope.maisPag = function(){
			$scope.apa = false;
			$scope.pag += 1;
			servicosAPI.getUtilizacion($scope.pag).then(function(result){
				for(var i=0; i<result.data.data.length; i++){
					results.push({
						agent: result.data.data[i].agent,
						created_at: result.data.data[i].created_at,
						event: result.data.data[i].event,
						fullname: result.data.data[i].fullname,
						ip: result.data.data[i].ip,
						method: result.data.data[i].method,
						updated_at: result.data.data[i].updated_at,
						url: result.data.data[i].url,
						cores: cores,
					});
					$scope.apa = true;
				}
				
				if($scope.pag == result.data.last_page){
					$scope.parou = true;
				};
			});
		};

		$scope.utilizaciones = results;
	});

	$scope.sair = function(){
		$cookies.remove('token');
		$state.go('inicio');
	}
	
});
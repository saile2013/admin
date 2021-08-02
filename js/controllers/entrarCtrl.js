angular.module("sop").controller("entrarCtrl", function($scope, $state, $cookies, servicosAPI){
	
	$scope.botao = true;
	$scope.ipCerto = false;

	servicosAPI.getIPs().then(function(result){
		console.log(result.data.data.hash);
        
        var ip = result.data.data.ip;
        var hash = result.data.data.hash;
        
		if(hash != hash2(ip)){
			$state.go('error-login');
		}else{
			$scope.ipCerto = true;
		}
	});

	$scope.logar = function(){

		$scope.botao = false;

		var dados = {
			email: $scope.email,
			password: $scope.senha,
		}

		servicosAPI.postLogin(dados).then(function(result){
			console.log(result.data.user.name);
			$cookies.put('token', result.data.data.access_token);
			$cookies.put('nome', result.data.user.name);
			$cookies.put('sobre', result.data.user.last_name);
			$state.go('home');
		}).catch(function(err, status){
			if(err.status == '401'){
				$scope.botao = true;
				document.getElementById('status').innerHTML = 'Por favor, valide sus datos de Login.';
			}
		});
	};
		
});
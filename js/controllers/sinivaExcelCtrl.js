angular.module("sop").controller("sinivaExcelCtrl", function($scope, $cookies, $state, $timeout, Excel, servicosAPI){
	
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
	$scope.limite = 25;
	$scope.apa = true;
	$scope.botao = true;
	$scope.loader = false;
	var tiendas = [];
	

	$scope.pagSoma = function(valor){
		$scope.logisticas = false;
		$scope.limite = valor;
		$scope.viewGet();
	};

	servicosAPI.getProductosIVA($scope.pag, $scope.limite).then(function(resuLT) {
		console.log(resuLT.data.data);
		$scope.ivans = resuLT.data.data;
		$scope.loader = true;
	});

	$scope.exportToExcel = function(tableId){
		console.log(tableId);
		var exportHref=Excel.tableToExcel(tableId,'WireWorkbenchDataExport');
		$timeout(function(){location.href=exportHref;},100); // trigger download
	}

	$scope.back = function(){
		window.history.back();
	};

	$scope.sair = function(){
		$cookies.remove('token');
		$state.go('inicio');
	}
	
});
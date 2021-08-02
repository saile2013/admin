angular.module("sop").controller("descuentosTiendasCtrl", function($scope, $stateParams, $cookies, $state, Upload, baseAPI, servicosAPI){
	
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
	
	$scope.idTien = $stateParams.id;
	$scope.botao = true;
	$scope.botao2 = true;
	$scope.descGn = 1;
	$scope.dados = {};
	
	$scope.viewTiendas = function(){
		servicosAPI.dtlTiendas($scope.idTien).then(function (result) {

			console.log(result.data.data);

			$scope.applys = result.data.data.apply_store;
			$scope.general_discount = result.data.data.general_discount;

			if(result.data.data.date_start_discount){
				$scope.date_start_discount = new Date(result.data.data.date_start_discount);
				document.getElementById('hra1').value = result.data.data.date_start_discount.substr(-8);
			}

			if(result.data.data.date_end_discount){
				$scope.date_end_discount = new Date(result.data.data.date_end_discount);
				document.getElementById('hra2').value = result.data.data.date_end_discount.substr(-8);
			}

			//document.getElementById('hra1').value = new Date(result.data.data.hora_inicio);
			//document.getElementById('hra2').value = new Date(result.data.data.hora_fim);
		});
	}

	$scope.viewTiendas();

	$scope.salvar1 = function(){

		$scope.botao = false;

		if($scope.general_discount === '0.00' || $scope.general_discount === ''){
			$scope.botao = true;
			return document.getElementById('status').innerHTML = "¡llenar el campo Descuento General!";
		}

		if($scope.date_start_discount == undefined || $scope.date_end_discount == undefined){
			$scope.botao = true;
			return document.getElementById('status').innerHTML = "¡llenar el campos Fechas!";
		}

		if(document.getElementById('hra1').value){
			var hra1 = document.getElementById('hra1').value;
		}else{
			var hra1 = null;
		}
		
		if(document.getElementById('hra2').value){
			var hra2 = document.getElementById('hra2').value;
		}else{
			var hra2 = null;
		}

		var dta1=new Date($scope.date_start_discount);
		var dia1=dta1.getDate();
		var mes1=dta1.getMonth();
		var ano1=dta1.getFullYear();		
		if(dia1 <= 9){ dia1 = '0'+dia1; }else if(dia1){ dia1 = dia1; }
		mes1 = (mes1+1);
		if(mes1 <= 9){ mes1 = '0'+mes1; }else if(mes1){ mes1 = mes1; }

		if(hra1 == null) { hra1 = '00:00' }else{ hra1 = hra1 }

		dta1 = ano1 + '-' + mes1 + '-' + dia1 + ' ' + hra1;
		//

		var dta2=new Date($scope.date_end_discount);
		var dia2=dta2.getDate();
		var mes2=dta2.getMonth();
		var ano2=dta2.getFullYear();		
		if(dia2 <= 9){ dia2 = '0'+dia2; }else if(dia2){ dia2 = dia2; }
		mes2 = (mes2+1);
		if(mes2 <= 9){ mes2 = '0'+mes2; }else if(mes2){ mes2 = mes2; }

		if(hra2 == null) { hra2 = '00:00' }else{ hra2 = hra2 }

		dta2 = ano2 + '-' + mes2 + '-' + dia2 + ' ' + hra2;

		$scope.dta1 = dta1;
		$scope.dta2 = dta2;

		var dados = {
			apply_store: 1,
			general_discount: $scope.general_discount,
			date_start_discount: $scope.dta1,
			date_end_discount:	$scope.dta2,
		}

		console.log(dados);

		servicosAPI.putTiendas($scope.idTien, dados).then(function (result) {
			$scope.botao = true;
			document.getElementById('status').innerHTML = "¡Salvo con éxito!";
		});
	};

	$scope.quitar = function() {		
		$scope.botao2 = false;
		servicosAPI.postQuitar($scope.idTien).then(function (result) {
			$scope.botao2 = true;
			document.getElementById('status').innerHTML = "¡Salvo con éxito!";
		});
	};

	$scope.submit = function() {		
		$scope.botao = false;
		$scope.upload($scope.file);
	};

	$scope.selec = function (file) {
		$scope.nameFile = file.name;
	}

	$scope.upload = function (file) {

		Upload.upload({
			url: baseAPI.baseURL + 'api/wb/admin/discount/'+$scope.idTien,
			method: 'POST',
			data: {discount_file: file}
		}).then(function (resp) {
			if(resp.data.data.success != ''){
				$scope.botao = true;
				document.getElementById('status2').innerText = 'Enviado con Exito!';
			}else{
				$scope.botao = true;
				document.getElementById('status2').innerText = resp.data.data.error;
			}
		}, function (resp) {
			console.log('Error status: ' + resp.status);
		}, function (evt) {
			var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
			console.log('progress: ' + progressPercentage + '% ');
			document.getElementById('status2').innerText = 'progress: ' + progressPercentage + '% ';
		});
	};

	$scope.sair = function(){
		$cookies.remove('token');
		$state.go('inicio');
	}
	
});
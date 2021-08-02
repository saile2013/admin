angular.module("sop").controller("relatoriosCtrl", function($scope, $state, $cookies, $state, servicosAPI){
	
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
	var clientes = [];
	var tiendas = [];

	var d = new Date();
	document.getElementById('hra1').value = d.getHours() + ':' + d.getMinutes();
	var e = new Date();
	document.getElementById('hra2').value = e.getHours() + ':' + e.getMinutes();
	 

	$scope.tipos = [
		{value:'', aparence:'Selecciona un tipo'},
		{value:'age', aparence:'Años'},
		{value:'gender', aparence:'Género'},
		{value:'followers', aparence:'Seguidores'},
		{value:'purchases', aparence:'Compras'},
		{value:'with-purchases', aparence:'Con compras'},
		{value:'likes', aparence:'Likes'},
	]

	$scope.tipo = $scope.tipos[0];

	$scope.estatos = [
		{value:'', aparence:'Estado del cliente'},
		{value:1, aparence:'Activo'},
		{value:0, aparence:'Inactivo'},
	]

	$scope.estato = $scope.estatos[0];

	$scope.generos = [
		{value:'', aparence:'Selecciona un genero'},
		{value:'f', aparence:'Femenino'},
		{value:'m', aparence:'Masculino'},
		{value:'other', aparence:'Femenino y Masculino'},
	]

	$scope.genero = $scope.generos[0];

	servicosAPI.getProductos().then(function(result){
		angular.forEach(result.data.filters.stores, function(value, key) {
			tiendas.push({key: key, value: value});
		});
		$scope.tiendas = tiendas;
	});

	$scope.statos = [
		{value:'', aparence:'Estado de compra'},
		{value:'canceled', aparence:'Cancelada'},
		{value:'incomplete', aparence:'Incompleta'},
		{value:'opened', aparence:'Pagada'},
		{value:'payment_pending', aparence:'Pendiente de Pago'},
	]

	$scope.estatu = $scope.statos[0];

	$scope.buys = [
		{value:'', aparence:'Comprado por'},
		{value:'web', aparence:'Web'},
		{value:'mobil', aparence:'Mobil'},
		{value:'none', aparence:'Ninguna compra'},
		{value:'all', aparence:'Todas las compras'},
	]

	$scope.buy = $scope.buys[0];

	$scope.seleTipos = function(){

		$scope.estato = $scope.estatos[0];
		$scope.age1 = "";
		$scope.age2 = "";

		$scope.dta1 = "";
		document.getElementById('hra1').value = "";
		$scope.dta2 = "";
		document.getElementById('hra2').value = "";

		$scope.genero = $scope.generos[0];
		$scope.tienda = "";
		$scope.estatu = $scope.statos[0];
		$scope.buy = $scope.buys[0];

		$scope.entidad = "";
		$scope.iDentidad = "";

		if($scope.tipo.value == 'age'){
			$scope.age = true;
			$scope.gender = false;
			$scope.followers = false;
			$scope.purchases = false;
			$scope.withPurchases = false;
			$scope.likes = false;
		}else if($scope.tipo.value == 'gender'){
			$scope.age = false;
			$scope.gender = true;
			$scope.followers = false;
			$scope.purchases = false;
			$scope.withPurchases = false;
			$scope.likes = false;
		}else if($scope.tipo.value == 'followers'){
			$scope.age = false;
			$scope.gender = false;
			$scope.followers = true;
			$scope.purchases = false;
			$scope.withPurchases = false;
			$scope.likes = false;
		}else if($scope.tipo.value == 'purchases'){
			$scope.age = false;
			$scope.gender = false;
			$scope.followers = false;
			$scope.purchases = true;
			$scope.withPurchases = false;
			$scope.likes = false;
		}else if($scope.tipo.value == 'with-purchases'){
			$scope.age = false;
			$scope.gender = false;
			$scope.followers = false;
			$scope.purchases = false;
			$scope.withPurchases = true;
			$scope.likes = false;
		}else if($scope.tipo.value == 'likes'){
			$scope.age = false;
			$scope.gender = false;
			$scope.followers = false;
			$scope.purchases = false;
			$scope.withPurchases = false;
			$scope.likes = true;
		}
	}

	$scope.buscar = function(){

		$scope.cliente = false;

		if(document.getElementById('hra1').value && document.getElementById('hra2').value){
			var data1=new Date($scope.dta1);
			var dia1=data1.getDate();
			var mes1=data1.getMonth();
			var ano1=data1.getFullYear();		
			if(dia1 <= 9){ dia1 = '0'+dia1; }else if(dia1){ dia1 = dia1; }
			mes1 = (mes1+1);
			if(mes1 <= 9){ mes1 = '0'+mes1; }else if(mes1){ mes1 = mes1; }
			data1 = ano1 + '-' + mes1 + '-' + dia1 +' '+document.getElementById('hra1').value+':00';
			//

			var data2=new Date($scope.dta2);
			var dia2=data2.getDate();
			var mes2=data2.getMonth();
			var ano2=data2.getFullYear();		
			if(dia2 <= 9){ dia2 = '0'+dia2; }else if(dia2){ dia2 = dia2; }
			mes2 = (mes2+1);
			if(mes2 <= 9){ mes2 = '0'+mes2; }else if(mes2){ mes2 = mes2; }
			data2 = ano2 + '-' + mes2 + '-' + dia2 +' '+document.getElementById('hra2').value+':00';
		}

		console.log(data1, data2);

		$scope.baixar = 0;
		servicosAPI.getRelatorios($scope.tipo.value, $scope.estato.value, $scope.age1, $scope.age2, data1, data2, $scope.genero.value, $scope.tienda, $scope.estatu.value, $scope.buy.value, $scope.entidad, $scope.iDentidad).then(function(result){
			console.log(result.data.status_code);
			if(result.data.status_code == 204){
				$scope.cliente = true;
			}else{
				if(result.data.data){
					$scope.baixar = result.data.data;
				}else{
					$scope.cliente = true;
				}
			}
		});
	};
	
	$scope.sair = function(){
		$cookies.remove('token');
		$state.go('inicio');
	}
	
});
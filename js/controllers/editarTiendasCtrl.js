angular.module("sop").controller("editarTiendasCtrl", function($scope, $stateParams, $cookies, $state, servicosAPI){
	
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
	$scope.dados = {};
	var clientes = [];
	var comerciais = [];
	var selClientes = [];
	var idClientes = [];
	var pag = 1;

	servicosAPI.getComerciais().then(function(result){
		console.log(result.data.data);
		for(var i=0; i<result.data.data.length; i++){
			comerciais.push(result.data.data[i]);
		}

		$scope.comerciais = comerciais;
	});

	servicosAPI.getCateTienda(pag).then(function(result){
		console.log(result.data);
		for(var i=0; i<result.data.data.length; i++){
			clientes.push(result.data.data[i]);
		}

		if(!$scope.buscou4){
			$scope.maisCliente = function(){
				$scope.apa = false;
				pag += 1;
				servicosAPI.getCateTienda(pag).then(function(result){
					for(var i=0; i<result.data.data.length; i++){
						clientes.push(result.data.data[i]);
						$scope.apa = true;
					}
					
					if(pag == result.data.last_page){
						$scope.parou = true;
					};
				});
			};
		};

		$scope.clientes = clientes;
	});

	$scope.buCliente = function(){
		$scope.buscou4 = true;
		pag = 1;
		clientes.splice(0);
		servicosAPI.searchCateTienda($scope.seCliente, pag).then(function(result){
			for(var i=0; i<result.data.data.length; i++){
				clientes.push(result.data.data[i]);
			}
	
			$scope.maisCliente = function(){
				$scope.apa = false;
				pag += 1;
				servicosAPI.searchCateTienda($scope.seCliente, pag).then(function(result){
					for(var i=0; i<result.data.data.length; i++){
						clientes.push(result.data.data[i]);
						$scope.apa = true;
					}
					
					if(pag == result.data.last_page){
						$scope.parou = true;
					};
				});
			};
	
			$scope.clientes = clientes;
		});
	};

	$scope.selCliente = function(id, name){
		selClientes.push({id:id, name:name});
		idClientes.push(id);
		$scope.selClientes = selClientes;

		for(var i=0; i<clientes.length; i++){
			if(id == clientes[i].id){
				clientes.splice(i, 1);				
			}
		}
	};

	$scope.remCliente = function(id){
		for(var i=0; i<selClientes.length; i++){
			if(id == selClientes[i].id){
				selClientes.splice(i, 1);
				idClientes.splice(i, 1);
			}
		}
	};
	
	$scope.viewTiendas = function(){
		servicosAPI.dtlTiendas($scope.idTien).then(function (result) {
			console.log(result);
			$scope.name = result.data.data.name;
			$scope.description = result.data.data.description;
			$scope.message_service = result.data.data.message_service;
			
			$scope.banner = result.data.data.banner;
			$scope.banner_app = result.data.data.banner_app;
			$scope.profile_picture = result.data.data.profile_picture;
			$scope.responsive_banner = result.data.data.responsive_banner;

			/*$scope.applys = result.data.data.apply_store;
			$scope.general_discount = result.data.data.general_discount;

			if(result.data.data.date_start_discount){
				$scope.date_start_discount = new Date(result.data.data.date_start_discount);
			}

			if(result.data.data.date_end_discount){
				$scope.date_end_discount = new Date(result.data.data.date_end_discount);
			}*/

			if(result.data.data.mall_id){
				$scope.centro = result.data.data.mall_id.toString();
			}
			$scope.custom_text = result.data.data.custom_text;

			console.log(result.data.data.is_active);

			if(result.data.data.is_active){
				$scope.active = 1;
			}else{
				$scope.active = 0;
			}

			for(var a=0; a<result.data.data.categories_ids.length; a++){
				servicosAPI.dtlCateTienda(result.data.data.categories_ids[a]).then(function (resuLT2) {
					console.log(resuLT2.data.data.name);
					selClientes.push({id:resuLT2.data.data.id, name:resuLT2.data.data.name});
					idClientes.push(resuLT2.data.data.id);					
				});
			}

			$scope.selClientes = selClientes;
		});
	}

	$scope.viewTiendas();

	$scope.is_activee = function(){
		$scope.active = 1;
	}

	$scope.no_active = function(){
		$scope.active = 0;
	}

	$scope.carrega1 = function(){
		$scope.imgVie1 = document.getElementById('bannerW1');
		$scope.imgVie1.src = 'data:'+$scope.yourModel.filetype+';base64,'+$scope.yourModel.base64;
		setTimeout(function(){
			if((parseInt($scope.imgVie1.naturalWidth) != 1920) || (parseInt($scope.imgVie1.naturalHeight) != 400)){
				document.getElementById('status').innerHTML = "¡Las dimensiones están mal en Banner (WEB)!";
			}else{
				document.getElementById('status').innerHTML = "";
			}
		}, 1000);
	}

	$scope.carrega2 = function(){
		$scope.imgVie2 = document.getElementById('bannerW2');
		$scope.imgVie2.src = 'data:'+$scope.yourMode2.filetype+';base64,'+$scope.yourMode2.base64;
		setTimeout(function(){
			if((parseInt($scope.imgVie2.naturalWidth) != 1080) || (parseInt($scope.imgVie2.naturalHeight) != 576)){
				document.getElementById('status').innerHTML = "¡Las dimensiones están mal en Banner (APP)";
			}else{
				document.getElementById('status').innerHTML = "";
			}
		}, 1000);
	}

	$scope.carrega3 = function(){
		$scope.imgVie3 = document.getElementById('bannerW3');
		$scope.imgVie3.src = 'data:'+$scope.yourMode3.filetype+';base64,'+$scope.yourMode3.base64;
		setTimeout(function(){
			if((parseInt($scope.imgVie3.naturalWidth) != 1024) || (parseInt($scope.imgVie3.naturalHeight) != 1024)){
				document.getElementById('status').innerHTML = "¡Las dimensiones están mal en (LOGO)!";
			}else{
				document.getElementById('status').innerHTML = "";
			}
		}, 1000);
	}

	$scope.carrega4 = function(){
		$scope.imgVie4 = document.getElementById('bannerW4');
		$scope.imgVie4.src = 'data:'+$scope.yourMode4.filetype+';base64,'+$scope.yourMode4.base64;
		setTimeout(function(){
			if((parseInt($scope.imgVie4.naturalWidth) != 750) || (parseInt($scope.imgVie4.naturalHeight) != 300)){
				document.getElementById('status').innerHTML = "¡Las dimensiones están mal en (RESPONSIVE)!";
			}else{
				document.getElementById('status').innerHTML = "";
			}
		}, 1000);
	}

	$scope.salvar = function(){

		$scope.botao = false;

		if($scope.active == 1){
			$scope.is_active = true;
		}else{
			$scope.is_active = false;	
		}

		if($scope.yourModel){
			$scope.file1 = 'data:'+$scope.yourModel.filetype+';base64,'+$scope.yourModel.base64;
		}

		if($scope.yourMode2){
			$scope.file2 = 'data:'+$scope.yourMode2.filetype+';base64,'+$scope.yourMode2.base64;
		}

		if($scope.yourMode3){
			$scope.file3 = 'data:'+$scope.yourMode3.filetype+';base64,'+$scope.yourMode3.base64;
		}

		if($scope.yourMode4){
			$scope.file4 = 'data:'+$scope.yourMode4.filetype+';base64,'+$scope.yourMode4.base64;
		}

		/*var dta1=new Date($scope.date_start_discount);
		var dia1=dta1.getDate();
		var mes1=dta1.getMonth();
		var ano1=dta1.getFullYear();		
		if(dia1 <= 9){ dia1 = '0'+dia1; }else if(dia1){ dia1 = dia1; }
		mes1 = (mes1+1);
		if(mes1 <= 9){ mes1 = '0'+mes1; }else if(mes1){ mes1 = mes1; }
		dta1 = ano1 + '-' + mes1 + '-' + dia1;
		//

		var dta2=new Date($scope.date_end_discount);
		var dia2=dta2.getDate();
		var mes2=dta2.getMonth();
		var ano2=dta2.getFullYear();		
		if(dia2 <= 9){ dia2 = '0'+dia2; }else if(dia2){ dia2 = dia2; }
		mes2 = (mes2+1);
		if(mes2 <= 9){ mes2 = '0'+mes2; }else if(mes2){ mes2 = mes2; }
		dta2 = ano2 + '-' + mes2 + '-' + dia2;

		$scope.dta1 = dta1;
		$scope.dta2 = dta2;*/

		var dados = {
			name: $scope.name,
			description: $scope.description,
			message_service: $scope.message_service,
			price: $scope.price,
			categories_id: idClientes,
			mall_id: $scope.centro,
			custom_text: $scope.custom_text,

			banner: $scope.file1,
			banner_app: $scope.file2,
			profile_picture: $scope.file3,
			banner_responsive: $scope.file4,
			
			is_active: $scope.is_active,

			/*apply_store: $scope.apply,
			general_discount: $scope.general_discount,
			date_start_discount: $scope.dta1,
			date_end_discount:	$scope.dta2,*/
		}

		console.log(dados);

		if(!$scope.name){
			$scope.botao = true;
			document.getElementById('status').innerHTML = "¡Complete el campo NOMBRE!";
		}else{
			servicosAPI.putTiendas2($scope.idTien, dados).then(function (result) {
				$scope.botao = true;
				document.getElementById('status').innerHTML = "¡Salvo con éxito!";
			});
		}
	};

	$scope.sair = function(){
		$cookies.remove('token');
		$state.go('inicio');
	}
	
});
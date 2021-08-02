angular.module("sop").controller("editarProductosCtrl", function($scope, $stateParams, $cookies, $state, servicosAPI){
	
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
	
	$scope.idProd = $stateParams.id;
	$scope.tp = $stateParams.tp;
	$scope.botao = true;
	$scope.dados = {};
	var staTOs = [];
	var staTOs2 = [];	
	var clientes = [];
	var selClientes = [];
	var idClientes = [];
	var pag = 1;
	
	$scope.viewProdutos = function(){
		staTOs.splice(0);
		staTOs2.splice(0);
		servicosAPI.dtlProductos($scope.idProd).then(function (result) {
			console.log(result.data.data);
			$scope.name = result.data.data.name;
			$scope.description = result.data.data.description;
			$scope.mainPicture = result.data.data.main_picture;
			$scope.pictureOne = result.data.data.picture_one;
			$scope.pictureTwo = result.data.data.picture_two;
			$scope.pictureThree = result.data.data.picture_three;
			$scope.pictureFour = result.data.data.picture_four;			
			$scope.price = result.data.data.price;
			$scope.ico_percent = parseInt(result.data.data.ico_percent);
			$scope.stock = result.data.data.stock;
			$scope.tax_included = result.data.data.tax_included;
			$scope.tax_percent = result.data.data.tax_percent;
			$scope.store_id = result.data.data.store_id;
			$scope.sort = result.data.data.sort;
			$scope.discount = parseInt(result.data.data.discount_value_applied);

			if(result.data.data.discount_start_date){
				$scope.data1 = new Date(result.data.data.discount_start_date.substr(0,10));
				document.getElementById('hra1').value = result.data.data.discount_start_date.substr(-8);
			}

			if(result.data.data.discount_finish_date){
				$scope.data2 = new Date(result.data.data.discount_finish_date.substr(0,10));
				document.getElementById('hra2').value = result.data.data.discount_finish_date.substr(-8);
			}


			for(var a=0; a<result.data.data.category_ids.length; a++){
				servicosAPI.dtlCategorias(result.data.data.category_ids[a]).then(function (resuLT2) {
					selClientes.push({id:resuLT2.data.data.id, name:resuLT2.data.data.name});
					idClientes.push(resuLT2.data.data.id);					
				});
			}

			$scope.selClientes = selClientes;

			$scope.checkboxModel = {
       			value1 : $scope.tax_included
			}
		});
	}

	$scope.viewProdutos();

	servicosAPI.getCategorias(pag).then(function (resuLT) {
		console.log(resuLT.data.data);
		for(var b=0; b<resuLT.data.data.length; b++){
			clientes.push(resuLT.data.data[b]);
		}
		
		if(!$scope.buscou4){
			$scope.maisCliente = function(){
				$scope.apa = false;
				pag += 1;
				servicosAPI.getCategorias(pag).then(function(result){
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
		servicosAPI.searchCategorias($scope.seCliente, null, pag).then(function(result){
			for(var i=0; i<result.data.data.length; i++){
				clientes.push(result.data.data[i]);
			}
	
			$scope.maisCliente = function(){
				$scope.apa = false;
				pag += 1;
				servicosAPI.searchCategorias($scope.seCliente, null, pag).then(function(result){
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

	$scope.carrega1 = function(){
		$scope.imgVie1 = document.getElementById('bannerW1');
		$scope.imgVie1.src = 'data:'+$scope.yourModel1.filetype+';base64,'+$scope.yourModel1.base64;
		setTimeout(function(){
			if((parseInt($scope.imgVie1.naturalWidth) != 1024) || (parseInt($scope.imgVie1.naturalHeight) != 1024)){
				document.getElementById('status').innerHTML = "¡Las dimensiones están mal en Main Picture!";
			}else{
				document.getElementById('status').innerHTML = "";
			}
		}, 1000);
	}

	$scope.carrega2 = function(){
		$scope.imgVie2 = document.getElementById('bannerW2');
		$scope.imgVie2.src = 'data:'+$scope.yourModel2.filetype+';base64,'+$scope.yourModel2.base64;
		setTimeout(function(){
			if((parseInt($scope.imgVie2.naturalWidth) != 1024) || (parseInt($scope.imgVie2.naturalHeight) != 1024)){
				document.getElementById('status').innerHTML = "¡Las dimensiones están mal en Picture One!";
			}else{
				document.getElementById('status').innerHTML = "";
			}
		}, 1000);
	}

	$scope.carrega3 = function(){
		$scope.imgVie3 = document.getElementById('bannerW3');
		$scope.imgVie3.src = 'data:'+$scope.yourModel3.filetype+';base64,'+$scope.yourModel3.base64;
		setTimeout(function(){
			if((parseInt($scope.imgVie3.naturalWidth) != 1024) || (parseInt($scope.imgVie3.naturalHeight) != 1024)){
				document.getElementById('status').innerHTML = "¡Las dimensiones están mal en Picture Two!";
			}else{
				document.getElementById('status').innerHTML = "";
			}
		}, 1000);
	}

	$scope.carrega4 = function(){
		$scope.imgVie4 = document.getElementById('bannerW4');
		$scope.imgVie4.src = 'data:'+$scope.yourModel4.filetype+';base64,'+$scope.yourModel4.base64;
		setTimeout(function(){
			if((parseInt($scope.imgVie4.naturalWidth) != 1024) || (parseInt($scope.imgVie4.naturalHeight) != 1024)){
				document.getElementById('status').innerHTML = "¡Las dimensiones están mal en Picture Three!";
			}else{
				document.getElementById('status').innerHTML = "";
			}
		}, 1000);
	}

	$scope.carrega5 = function(){
		$scope.imgVie5 = document.getElementById('bannerW5');
		$scope.imgVie5.src = 'data:'+$scope.yourModel5.filetype+';base64,'+$scope.yourModel5.base64;
		setTimeout(function(){
			if((parseInt($scope.imgVie5.naturalWidth) != 1024) || (parseInt($scope.imgVie5.naturalHeight) != 1024)){
				document.getElementById('status').innerHTML = "¡Las dimensiones están mal en Picture Four!";
			}else{
				document.getElementById('status').innerHTML = "";
			}
		}, 1000);
	}
	

	$scope.salvar = function(){

		$scope.botao = false;

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

		var data1=new Date($scope.data1);
		var dia1=data1.getDate();
		var mes1=data1.getMonth();
		var ano1=data1.getFullYear();		
		if(dia1 <= 9){ dia1 = '0'+dia1; }else if(dia1){ dia1 = dia1; }
		mes1 = (mes1+1);
		if(mes1 <= 9){ mes1 = '0'+mes1; }else if(mes1){ mes1 = mes1; }
		data1 = ano1 + '-' + mes1 + '-' + dia1;
		//

		var data2=new Date($scope.data2);
		var dia2=data2.getDate();
		var mes2=data2.getMonth();
		var ano2=data2.getFullYear();		
		if(dia2 <= 9){ dia2 = '0'+dia2; }else if(dia2){ dia2 = dia2; }
		mes2 = (mes2+1);
		if(mes2 <= 9){ mes2 = '0'+mes2; }else if(mes2){ mes2 = mes2; }
		data2 = ano2 + '-' + mes2 + '-' + dia2;

		var dtA1 = data1 +' '+hra1+':00';
		var dtA2 = data2 +' '+hra2+':00';

		if($scope.yourModel1){
			$scope.file1 = 'data:'+$scope.yourModel1.filetype+';base64,'+$scope.yourModel1.base64;
		}
		if($scope.yourModel2){
			$scope.file2 = 'data:'+$scope.yourModel2.filetype+';base64,'+$scope.yourModel2.base64;
		}
		if($scope.yourModel3){
			$scope.file3 = 'data:'+$scope.yourModel3.filetype+';base64,'+$scope.yourModel3.base64;
		}
		if($scope.yourModel4){
			$scope.file4 = 'data:'+$scope.yourModel4.filetype+';base64,'+$scope.yourModel4.base64;
		}
		if($scope.yourModel5){
			$scope.file5 = 'data:'+$scope.yourModel5.filetype+';base64,'+$scope.yourModel5.base64;
		}
		
		if(!$scope.name){
			$scope.botao = true;
			document.getElementById('status').innerHTML = "¡Complete el campo NOMBRE!";
		}else if(!idClientes[0]){
			$scope.botao = true;
			document.getElementById('status').innerHTML = "¡Seleccione una CATEGORÍA!";
		}else{

			var dADos = {
				name: $scope.name,
				description: $scope.description,
				price: $scope.price,
				main_picture: $scope.file1,
				picture_one: $scope.file2,
				picture_two: $scope.file3,
				picture_three: $scope.file4,
				picture_four: $scope.file5,
				tax_percent: $scope.tax_percent,
				tax_included: $scope.checkboxModel.value1,
				ico_percent: $scope.ico_percent,
				category_ids: idClientes,
				store_id: $scope.store_id,
				sort: $scope.sort,
				discount: $scope.discount,

				discount_start_date: dtA1,
				discount_finish_date: dtA2,
			}

			console.log(dADos);

			servicosAPI.putProductos($scope.idProd, dADos).then(function (result) {
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
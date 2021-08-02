angular.module("sop").controller("editarCuponsCtrl", function($scope, $cookies, $state, $stateParams, servicosAPI){
	
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
	
	$scope.id = $stateParams.id;
	$scope.botao = true;
	$scope.dados = {};
	
	$scope.pag = 1;
	$scope.pagTienda = 1;
	$scope.pagCliente = 1;
	$scope.pag2 = 1;
	$scope.mudou == false;

	var produtos = [];
	var produtos2 = [];

	var selProdutos = [];
	var idProdutos = [];

	var selProdutos2 = [];
	var idProdutos2 = [];

	var selTiendas = [];
	var idTiendas = [];

	var selClientes = [];
	var idClientes = [];

	var tiendas = [];
	var clientes = [];

	$scope.mudaHr1 = function () {
		$scope.mudou = true;
	};

	servicosAPI.dtlCupons($scope.id).then(function(result){
		console.log(result.data.data);

		$scope.Ids = result.data.data.id;
		$scope.title = result.data.data.title;
		$scope.description = result.data.data.description;
		
		if(result.data.data.expired_at){
			document.getElementById('dataExpired').value = result.data.data.expired_at.substr(0,10);
			document.getElementById('timeExpired').value = result.data.data.expired_at.substr(-8);
		}

		$scope.code = result.data.data.code;
		$scope.lower_limit = result.data.data.lower_limit;
		$scope.quantity = result.data.data.quantity;
		$scope.upper_limit = result.data.data.upper_limit;
		$scope.value = result.data.data.value;

		$scope.estatos3 = [
			{value:true, aparence:'Activar'},
			{value:false, aparence:'Desactivar'},
		]

		if(result.data.data.is_actived == true){
			$scope.is_actived = $scope.estatos3[0];
		}else{
			$scope.is_actived = $scope.estatos3[1];
		}
		//

		$scope.discountTypes = [
			{value:'percentage', aparence:'Porcentaje'},
			{value:'amount', aparence:'Cantidad'},
		]
		
		if(result.data.data.discountType == true){
			$scope.discountType = $scope.discountTypes[0];
		}else{
			$scope.discountType = $scope.discountTypes[1];
		}
		//

		$scope.estatos = [
			{value:true, aparence:'Activar'},
			{value:false, aparence:'Desactivar'},
		]
		
		if(result.data.data.discountShipping == true){
			$scope.discountShipping = $scope.estatos[0];
		}else{
			$scope.discountShipping = $scope.estatos[1];
		}
		
		//
		$scope.discountShippingTypes = [
			{value:'percentage', aparence:'Porcentaje'},
			{value:'amount', aparence:'Cantidad'},
		]
	
		$scope.discountShippingType = $scope.discountShippingTypes[0];

		//
		idProdutos2.splice(0);
		idTiendas.splice(0);
		idClientes.splice(0);
		idProdutos.splice(0);
		
		//
		for(var p=0; p<result.data.data.applicables_to.products.length; p++){
			selProdutos2.push({
				id:result.data.data.applicables_to.products[p].id, 
				name:result.data.data.applicables_to.products[p].name,
			});
			idProdutos2.push(result.data.data.applicables_to.products[p].id);
		}

		for(var s=0; s<result.data.data.applicables_to.stores.length; s++){
			selTiendas.push({
				id:result.data.data.applicables_to.stores[s].id, 
				name:result.data.data.applicables_to.stores[s].name,
			});
			idTiendas.push(result.data.data.applicables_to.stores[s].id);
		}

		for(var c=0; c<result.data.data.users.length; c++){
			selClientes.push({
				id:result.data.data.users[c].id, 
				name:result.data.data.users[c].name,
			});
			idClientes.push(result.data.data.users[c].id);
			console.log(result.data.data.users[c].id);
		}

		if(result.data.data.product_not_in){
			for(var n=0; n<result.data.data.product_not_in.length; n++){
				selProdutos.push({
					id:result.data.data.product_not_in[n].id, 
					name:result.data.data.product_not_in[n].name,
				});
				idProdutos.push(result.data.data.product_not_in[n].id);				
			}
			$scope.selProdutos = selProdutos;
		}

		$scope.selProdutos2 = selProdutos2;
		$scope.selTiendas = selTiendas;
		$scope.selClientes = selClientes;		
	});

	servicosAPI.getProductos($scope.pag).then(function (result) {
		console.log(result.data.data);
		for(var i=0; i<result.data.data.length; i++){
			produtos.push(result.data.data[i]);
		}

		if(!$scope.buscou){
			$scope.maisPag = function(){
				$scope.apa = false;
				$scope.pag += 1;
				servicosAPI.getProductos($scope.pag).then(function(result){
					for(var i=0; i<result.data.data.length; i++){
						produtos.push(result.data.data[i]);
						$scope.apa = true;
					}
					
					if($scope.pag == result.data.last_page){
						$scope.parou = true;
					};
				});
			};
		}

		$scope.produtos = produtos;
	});

	$scope.buProd = function(){
		$scope.buscou = true;
		$scope.pag = 1;
		produtos.splice(0);
		servicosAPI.searchProductos($scope.seProd, null, $scope.pag).then(function(result){
			for(var i=0; i<result.data.data.length; i++){
				produtos.push(result.data.data[i]);
			}
	
			$scope.maisPag = function(){
				$scope.apa = false;
				$scope.pag += 1;
				servicosAPI.searchProductos($scope.seProd, null, $scope.pag).then(function(result){
					for(var i=0; i<result.data.data.length; i++){
						produtos.push(result.data.data[i]);
						$scope.apa = true;
					}
					
					if($scope.pag == result.data.last_page){
						$scope.parou = true;
					};
				});
			};
	
			$scope.produtos = produtos;
		});
	};

	$scope.selProd = function(id, name){
		selProdutos.push({id:id, name:name});
		idProdutos.push(id);
		$scope.selProdutos = selProdutos;

		for(var i=0; i<produtos.length; i++){
			if(id == produtos[i].id){
				produtos.splice(i, 1);				
			}
		}
	};

	$scope.remProd = function(id){
		for(var i=0; i<selProdutos.length; i++){
			if(id == selProdutos[i].id){
				selProdutos.splice(i, 1);
				idProdutos.splice(i, 1);
			}
		}
	};

	//TIENDAS
	servicosAPI.getTiendas($scope.pag).then(function(result){
		for(var i=0; i<result.data.data.length; i++){
			tiendas.push(result.data.data[i]);
		}

		if(!$scope.buscou2){
			$scope.maisTienda = function(){
				$scope.apa = false;
				$scope.pagTienda += 1;
				servicosAPI.getTiendas($scope.pagTienda).then(function(result){
					for(var i=0; i<result.data.data.length; i++){
						tiendas.push(result.data.data[i]);
						$scope.apa = true;
					}
					
					if($scope.pagTienda == result.data.last_page){
						$scope.parou = true;
					};
				});
			};
		}

		$scope.tiendas = tiendas;
	});

	$scope.buTienda = function(){
		$scope.buscou2 = true;
		$scope.pagTienda = 1;
		tiendas.splice(0);
		servicosAPI.searchTiendas($scope.seTienda, $scope.pagTienda).then(function(result){
			for(var i=0; i<result.data.data.length; i++){
				tiendas.push(result.data.data[i]);
			}
	
			$scope.maisTienda = function(){
				$scope.apa = false;
				$scope.pagTienda += 1;
				servicosAPI.searchTiendas($scope.seTienda, $scope.pagTienda).then(function(result){
					for(var i=0; i<result.data.data.length; i++){
						tiendas.push(result.data.data[i]);
						$scope.apa = true;
					}
					
					if($scope.pagTienda == result.data.last_page){
						$scope.parou = true;
					};
				});
			};
	
			$scope.tiendas = tiendas;
		});
	};

	$scope.selTienda = function(id, name){
		selTiendas.push({id:id, name:name});
		idTiendas.push(id);
		$scope.selTiendas = selTiendas;

		for(var i=0; i<tiendas.length; i++){
			if(id == tiendas[i].id){
				tiendas.splice(i, 1);				
			}
		}
	};

	$scope.remTienda = function(id){
		for(var i=0; i<selTiendas.length; i++){
			if(id == selTiendas[i].id){
				selTiendas.splice(i, 1);
				idTiendas.splice(i, 1);
			}
		}
	};


	//PRODUTOS 2
	servicosAPI.getProductos($scope.pag2).then(function (result) {
		console.log(result.data.data);
		for(var i=0; i<result.data.data.length; i++){
			produtos2.push(result.data.data[i]);
		}

		if(!$scope.buscou3){
			$scope.maisPag2 = function(){
				$scope.apa = false;
				$scope.pag2 += 1;
				servicosAPI.getProductos($scope.pag2).then(function(result){
					for(var i=0; i<result.data.data.length; i++){
						produtos2.push(result.data.data[i]);
						$scope.apa = true;
					}
					
					if($scope.pag2 == result.data.last_page){
						$scope.parou = true;
					};
				});
			};
		}

		$scope.produtos2 = produtos2;
	});

	$scope.buProd2 = function(){
		$scope.buscou3 = true;
		$scope.pag2 = 1;
		produtos2.splice(0);
		servicosAPI.searchProductos($scope.seProd2, null, $scope.pag2).then(function(result){
			for(var i=0; i<result.data.data.length; i++){
				produtos2.push(result.data.data[i]);
			}
	
			$scope.maisPag2 = function(){
				$scope.apa = false;
				$scope.pag2 += 1;
				servicosAPI.searchProductos($scope.seProd2, null, $scope.pag2).then(function(result){
					for(var i=0; i<result.data.data.length; i++){
						produtos.push(result.data.data[i]);
						$scope.apa = true;
					}
					
					if($scope.pag2 == result.data.last_page){
						$scope.parou = true;
					};
				});
			};
	
			$scope.produtos2 = produtos2;
		});
	};

	$scope.selProd2 = function(id, name){
		selProdutos2.push({id:id, name:name});
		idProdutos2.push(id);
		$scope.selProdutos2 = selProdutos2;

		for(var i=0; i<produtos2.length; i++){
			if(id == produtos2[i].id){
				produtos2.splice(i, 1);				
			}
		}
	};

	$scope.remProd2 = function(id){
		for(var i=0; i<selProdutos2.length; i++){
			if(id == selProdutos2[i].id){
				selProdutos2.splice(i, 1);
				idProdutos2.splice(i, 1);
			}
		}
	};

	//CLIENTES
	servicosAPI.getClientes($scope.pagCliente).then(function(result){
		for(var i=0; i<result.data.data.length; i++){
			clientes.push(result.data.data[i]);
		}

		if(!$scope.buscou4){
			$scope.maisCliente = function(){
				$scope.apa = false;
				$scope.pagCliente += 1;
				servicosAPI.getClientes($scope.pagCliente).then(function(result){
					for(var i=0; i<result.data.data.length; i++){
						clientes.push(result.data.data[i]);
						$scope.apa = true;
					}
					
					if($scope.pagCliente == result.data.last_page){
						$scope.parou = true;
					};
				});
			};
		}

		$scope.clientes = clientes;
	});

	$scope.buCliente = function(){
		$scope.buscou4 = true;
		$scope.pagCliente = 1;
		clientes.splice(0);
		servicosAPI.searchClientes(null, null, $scope.seCliente, $scope.pagCliente).then(function(result){
			for(var i=0; i<result.data.data.length; i++){
				clientes.push(result.data.data[i]);
			}
	
			$scope.maisCliente = function(){
				$scope.apa = false;
				$scope.pagCliente += 1;
				servicosAPI.searchClientes(null, null, $scope.seCliente, $scope.pagCliente).then(function(result){
					for(var i=0; i<result.data.data.length; i++){
						clientes.push(result.data.data[i]);
						$scope.apa = true;
					}
					
					if($scope.pagCliente == result.data.last_page){
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

	$scope.salvar = function(){

		console.log($scope.upper_limit);

		$scope.botao = false;

		if($scope.mudou == true){
			var date11 = document.getElementById('timeExpired').value+':00';				
		}else{
			var date11 = document.getElementById('timeExpired').value;
		}

		var data1=new Date(document.getElementById('dataExpired').value);
		var dia1=data1.getDate();
		var mes1=data1.getMonth();
		var ano1=data1.getFullYear();		
		if(dia1 <= 9){ dia1 = '0'+dia1; }else if(dia1){ dia1 = dia1; }
		mes1 = (mes1+1);
		if(mes1 <= 9){ mes1 = '0'+mes1; }else if(mes1){ mes1 = mes1; }
		data1 = ano1 + '-' + mes1 + '-' + dia1 + ' ' +date11;

		if(!$scope.code){
			$scope.botao = true;
			document.getElementById('status').innerHTML = "¡Complete el campo CODE!";
		}else if(!$scope.title){
			$scope.botao = true;
			document.getElementById('status').innerHTML = "¡Complete el campo TITULO!";
		}else if($scope.is_actived.value == 'nada'){
			$scope.botao = true;
			document.getElementById('status').innerHTML = "¡Complete el campo ACTIVAR!";
		}else if(!$scope.description){
			$scope.botao = true;
			document.getElementById('status').innerHTML = "¡Complete el campo DESCRIPCIÓN!";
		}else if(!document.getElementById('dataExpired').value || !document.getElementById('timeExpired').value){
			$scope.botao = true;
			document.getElementById('status').innerHTML = "¡Complete el campo FECHA DE EXPIRACIÓN!";
		}else if(!$scope.quantity){
			$scope.botao = true;
			document.getElementById('status').innerHTML = "¡Complete el campo CANTIDAD DE CUPONES!";
		}else if(!$scope.lower_limit){
			$scope.botao = true;
			document.getElementById('status').innerHTML = "¡Complete el campo LÍMITE INFERIOR!";
		}else if(!$scope.upper_limit){
			$scope.botao = true;
			document.getElementById('status').innerHTML = "¡Complete el campo LÍMITE SUPERIOR!";
		}else if(!$scope.discountType.value){
			$scope.botao = true;
			document.getElementById('status').innerHTML = "¡Complete el campo TIPO DE DESCUENTO!";
		}else if(!$scope.value){
			$scope.botao = true;
			document.getElementById('status').innerHTML = "¡Complete el campo VALOR DEL CUPÓN!";
		}else{

			var dados = {				
				code: $scope.code, //este es requerido, código del cupón
				title: $scope.title, //este es requerido, título del cupón
				description: $scope.description, //este es requerido, descripción del cupón
				expired_at: data1, //este es requerido, fecha de expiración
				quantity: $scope.quantity, //este es requerido, se usa para decir la cantidad de cupones
				lower_limit: $scope.lower_limit, //este es requerido, se usa para establecer el valor mínimo de compra, este valor debe ser menor a upper_limit
				upper_limit: $scope.upper_limit, //este es requerido, se usa para establecer el valor máximo de compra, este valor debe ser mayor a lower_limit
				is_actived: $scope.is_actived.value, //este es requerido, puede ser true ó false
				discountType: $scope.discountType.value, //este es requerido, puede ser "percentaje" ó "amount"
				value: $scope.value, //Valor del cupón, si discountType es percentaje, debe ser de 0 a 100, si discountType es amount puede ser un número mayor a cero
				discountShipping: $scope.discountShipping.value,   //es opcional, Este campo puede ser true ó false
				discountShippingType: $scope.discountShippingType.value, //Ses opcional, í discountShipping es falso, este campo no se usa
				discountShippingValue: $scope.discountShippingValue,  //es opcional, Sí discountShipping es falso, este campo no se usa
				product_not_in: idProdutos,
				applicables_to:{ //es opcional, este campo permite limitar el cupón a productos o tiendas especificas
					stores: idTiendas,
					products: idProdutos2,		
				},//es opcional, este campo indica si el cupón aplica para usuarios especificos
				users: idClientes
			}

			console.log(dados);

			servicosAPI.putCupons($scope.id, dados).then(function (result) {
				$scope.botao = true;
				document.getElementById('status').innerHTML = "¡Salvo con éxito!";
			}).catch(function(err, status){
				$scope.erros = err.data.errors;
			});
		}
	};

	$scope.sair = function(){
		$cookies.remove('token');
		$state.go('inicio');
	}
	
});
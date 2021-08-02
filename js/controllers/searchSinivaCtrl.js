angular.module("sop").controller("searchSinivaCtrl", function($scope, $cookies, $state, $stateParams, servicosAPI){
	
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

	$scope.text = $stateParams.text;
	$scope.buscando = $stateParams.text;
	$scope.tienda = $stateParams.tienda;
	$scope.pag = 1;
	$scope.limite = 50;
	$scope.apa = true;
	$scope.botao = true;
	$scope.btnCSV = true;
	$scope.limpa = false;
	$scope.contar = 0;
	$scope.tax = 0;
	var logisticas = [];
	var LogisTICAS = [];
	var daDOS = [];
	var tiendas = [];

	$scope.pagSoma = function(valor){
		$scope.pag = 1;
		$scope.logisticas = false;
		$scope.limite = valor;
		$scope.viewGet();
	};

	$scope.csvProductosIVA = function(){
		$scope.btnCSV = false;
		servicosAPI.csvProductosIVA().then(function(result){
			location.href = result.data.data;
			$scope.btnCSV = true;
		});
	};

	servicosAPI.getProductos($scope.pag).then(function(result){
		angular.forEach(result.data.filters.stores, function(value, key) {
			tiendas.push({key: key, value: value});
		});
		$scope.tiendas = tiendas;
	});

	servicosAPI.getCategoriasIVA().then(function(result) {
		$scope.categorias = result.data;
	});

	$scope.viewGet = function(){

		LogisTICAS.splice(0);

		servicosAPI.searchProductos2($scope.text, $scope.tienda, $scope.pag, $scope.limite).then(function(result){
			
			$scope.totalRes = result.data.total;
			$scope.paginacao = result.data;
			$scope.logisticas = result.data.data;
			console.log(result.data.data);

			for(var i=0; i<result.data.data.length; i++){
				//LogisTICAS.push(result.data.data[i]);
			}

			/*$scope.maisPag = function(){
				$scope.apa = false;
				$scope.pag += 1;

				servicosAPI.searchProductos2($scope.text, $scope.tienda, $scope.pag, $scope.limite).then(function(result){
					if(result.data.data[0]){
						for(var i=0; i<result.data.data.length; i++){
							LogisTICAS.push(result.data.data[i]);
							$scope.apa = true;
						}
						
						if($scope.pag == result.data.last_page){
							$scope.parou = true;
						};
						
						if($scope.selectedAll){
							$scope.selectedAll = true;
							angular.forEach(result.data.data, function(logistica) {
								logistica.Selected = true;
								if(logistica.Selected == true){
									$scope.contar++;
									logisticas.push({id:logistica.id, sku:logistica.sku, tax:1, store_id:logistica.store_id});
								}
							});
						}
					}else{
						$scope.parou = true;
					}
				});
			};*/

			$scope.nexPag = function(){
				
				logisticas.splice(0);
				$scope.selectedAll = false;

				$scope.logisticas = false;
				$scope.apa = false;
				$scope.pag += 1;

				console.log($scope.text, $scope.tienda, $scope.pag, $scope.limite);

				servicosAPI.searchProductos2($scope.text, $scope.tienda, $scope.pag, $scope.limite).then(function(result){
					$scope.logisticas = result.data.data;
					if(result.data.data[0]){
						for(var i=0; i<result.data.data.length; i++){
							//LogisTICAS.push(result.data.data[i]);
							$scope.apa = true;
						}
						
						if($scope.pag == result.data.last_page){
							$scope.parou = true;
						};						
					}else{
						$scope.parou = true;
					}
				});
			};

			$scope.volPag = function(){

				logisticas.splice(0);
				$scope.selectedAll = false;
				
				$scope.logisticas = false;
				$scope.apa = false;
				$scope.pag -= 1;

				servicosAPI.searchProductos2($scope.text, $scope.tienda, $scope.pag, $scope.limite).then(function(result){
					$scope.logisticas = result.data.data;
					if(result.data.data[0]){
						for(var i=0; i<result.data.data.length; i++){
							//LogisTICAS.push(result.data.data[i]);
							$scope.apa = true;
						}
						
						if($scope.pag == result.data.last_page){
							$scope.parou = true;
						};						
					}else{
						$scope.parou = true;
					}
				});
			};

			//$scope.logisticas = LogisTICAS;
			$scope.botao = true;
			$scope.limpa = false;

			$scope.selectAll = function() {
				logisticas.splice(0);
				$scope.contar = 0;
				angular.forEach($scope.logisticas, function(logistica) {
					logistica.Selected = $scope.selectedAll;
					if(logistica.Selected == true){
						$scope.contar++;
						logisticas.push({id:logistica.id, sku:logistica.sku, tax:1, store_id:logistica.store_id});
					}
				});
			};

			$scope.checkboxClick = function(event, logistica) {
				$scope.selectedAll = false;
				if(logistica.Selected == true){
					$scope.contar++;
					logisticas.push({id:logistica.id, sku:logistica.sku, tax:1, store_id:logistica.store_id});
				}else{
					for(var i=0; i<logisticas.length; i++){
						if(logistica.id == logisticas[i].id){
							$scope.contar--;
							logisticas.splice(i, 1);
						}
					}
				}
			};

			$scope.checkboxClick2 = function(event, logistica) {
				$scope.clicou = true;
				if(logistica.Selected == true){
					$scope.tax = 1;
				}else{
					$scope.tax = 0;
				}
			};
		});
	};

	$scope.viewGet();

	$scope.salvar2 = function() {

		daDOS.splice(0);

		if(!$scope.categoriaa){
			document.getElementById('status').innerHTML = 'Seleccione una categoría';
		}else{

			$scope.botao = false;

			for(var i=0; i<logisticas.length; i++){
				daDOS.push({
					id:logisticas[i].id, 
					sku:logisticas[i].sku, 
					tax:logisticas[i].tax, 
					store_id:logisticas[i].store_id, 
					category_id:$scope.categoriaa						
				});
			}

			console.log(daDOS);

			servicosAPI.putsIVA(daDOS).then(function(result) {
				$scope.botao = true;
				document.getElementById('status').innerHTML = 'Salvado con éxito';
				console.log(result);
			});
		}
	};

	$scope.salvar = function(id) {

		if(!$scope.clicou){
			angular.forEach($scope.logisticas, function(logistica) {
				if(logistica.id == id){
					if(logistica.taxfree == true){
						$scope.tax = 1;
					}else{
						$scope.tax = 0;
					}				
				}
			});
		}

		if(document.getElementById('categorias'+id).value == ''){
			document.getElementById('status'+id).innerHTML = 'Seleccione una categoría';
		}else{

			document.getElementById('btn1'+id).style.display = 'none';
			document.getElementById('btn2'+id).style.display = 'block';

			var dados = {
				sku: document.getElementById('sku'+id).value,
				category_id: document.getElementById('categorias'+id).value,
				store_id: document.getElementById('store'+id).value,
				tax: $scope.tax,
			}

			console.log(dados);

			servicosAPI.putIVA(id, dados).then(function(result) {
				console.log(result.status);
				if(result.status == 200){
					document.getElementById('status'+id).innerHTML = 'Salvado con éxito';
				}

				document.getElementById('btn1'+id).style.display = 'block';
				document.getElementById('btn2'+id).style.display = 'none';
			});
		}
	};

	$scope.enter = function(event){
		if(window.event.keyCode == 13){
			console.log('enter');
			$scope.buscar();
		}
	};

	$scope.busTienda = function() {
		$state.go('search-siniva', {text:$scope.text, tienda:$scope.tienda});
	};

	$scope.buscar = function(){
		if($scope.buscando){
			$state.go('search-siniva', {text:$scope.buscando, tienda:$scope.tienda});
		}
	};
	
	$scope.back2 = function(){
		$scope.loader = false;
		$scope.abreProds = false;
	};

	$scope.sair = function(){
		$cookies.remove('token');
		$state.go('inicio');
	}
	
});
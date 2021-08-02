angular.module("sop").controller("sinivaCtrl", function($scope, $cookies, $state, servicosAPI){
	
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
	$scope.limite = 50;
	$scope.apa = true;
	$scope.botao = true;
	$scope.btnCSV = true;
	$scope.limpa = false;
	$scope.contar = 0;
	$scope.tax = 0;
	var LogisTICAS = [];
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
			console.log(result.data.data);
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

		servicosAPI.getProductos2($scope.pag, $scope.limite).then(function(result) {
			console.log(result.data);

			$scope.paginacao = result.data;
			$scope.logisticas = result.data.data;
			for(var i=0; i<result.data.data.length; i++){
				//LogisTICAS.push(result.data.data[i]);
			}

			$scope.maisPag = function(){

				$scope.apa = false;
				$scope.pag += 1;

				servicosAPI.getProductos2($scope.pag, $scope.limite).then(function(result){
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

			$scope.nexPag = function(){

				$scope.logisticas = false;
				$scope.apa = false;
				$scope.pag += 1;

				servicosAPI.getProductos2($scope.pag, $scope.limite).then(function(result){
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

				$scope.logisticas = false;
				$scope.apa = false;
				$scope.pag -= 1;

				servicosAPI.getProductos2($scope.pag, $scope.limite).then(function(result){
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

			$scope.checkboxClick = function(event, logistica) {
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
		$state.go('search-siniva', {text:null, tienda:$scope.tienda});
	};

	$scope.buscar = function(){
		if($scope.buscando){
			$state.go('search-siniva', {text:$scope.buscando, tienda:null});
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
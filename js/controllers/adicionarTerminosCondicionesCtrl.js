angular.module("sop").controller("adicionarTerminosCondicionesCtrl", function($scope, $state, $cookies, servicosAPI){
	
	$scope.botao = true;
	var tiendas = [];

	$scope.tinymceModel = '';

	servicosAPI.getProductos().then(function(result){
		angular.forEach(result.data.filters.stores, function(value, key) {
			tiendas.push({key: key, value: value});
		});		
		$scope.tiendas = tiendas;
	});
	
	$scope.abreIcones = function(){
		console.log($scope.iconsAbr);
		$scope.iconsAbr = !$scope.iconsAbr;
	}

	$scope.salvar = function(){

		if(!$scope.alias){
			document.getElementById('status').innerHTML = 'Completa el campo de alias!';
		}else{

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

			var data1=new Date($scope.de);
			var dia1=data1.getDate();
			var mes1=data1.getMonth();
			var ano1=data1.getFullYear();		
			if(dia1 <= 9){ dia1 = '0'+dia1; }else if(dia1){ dia1 = dia1; }
			mes1 = (mes1+1);
			if(mes1 <= 9){ mes1 = '0'+mes1; }else if(mes1){ mes1 = mes1; }
			data1 = ano1 + '-' + mes1 + '-' + dia1 + ' ' + hra1 + ':00';
			//

			var data2=new Date($scope.ate);
			var dia2=data2.getDate();
			var mes2=data2.getMonth();
			var ano2=data2.getFullYear();		
			if(dia2 <= 9){ dia2 = '0'+dia2; }else if(dia2){ dia2 = dia2; }
			mes2 = (mes2+1);
			if(mes2 <= 9){ mes2 = '0'+mes2; }else if(mes2){ mes2 = mes2; }
			data2 = ano2 + '-' + mes2 + '-' + dia2 + ' ' + hra2 + ':00';
			//

			var dados = {
				tittle: $scope.titulo,
				url: $scope.url,
				alias: $scope.alias,
				store_id: $scope.tienda,
				start_at: data1,
				finish_at: data2,
				text: $scope.tinymceModel
			}

			console.log(dados);

			servicosAPI.postTerminosCod(dados).then(function(result){
				console.log(result);
				document.getElementById('status').innerHTML = 'Guardado con exito!';
				$scope.botao = true;
			}).catch(function(err, status){
				alert(err, status);
				$scope.botao = true;
			});
		}
	};
		
});
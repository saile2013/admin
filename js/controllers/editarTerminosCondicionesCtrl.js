angular.module("sop").controller("editarTerminosCondicionesCtrl", function($scope, $state, $cookies, $stateParams, servicosAPI){
	
	$scope.botao = true;
	$scope.id = $stateParams.id;
	$scope.tinymceModel = '';

	var tiendas = [];

	servicosAPI.getProductos().then(function(result){
		angular.forEach(result.data.filters.stores, function(value, key) {
			tiendas.push({key: key, value: value});
		});		
		$scope.tiendas = tiendas;
	});

	servicosAPI.getDtlTerminosCod($scope.id).then(function(result){
		console.log(result.data.data.term_conditions[0]);
		$scope.alias = result.data.data.term_conditions[0].alias;
		$scope.ate = result.data.data.term_conditions[0].finish_at.substring(0,10);
		$scope.hrAte = result.data.data.term_conditions[0].finish_at.substr(-8, 5);
		$scope.is_active = result.data.data.term_conditions[0].is_active;
		$scope.de = result.data.data.term_conditions[0].start_at.substring(0,10);
		$scope.hrDe = result.data.data.term_conditions[0].start_at.substr(-8, 5);
		if(result.data.data.term_conditions[0].store_id){
			$scope.tienda = result.data.data.term_conditions[0].store_id.toString();
		}
		$scope.tinymceModel = result.data.data.term_conditions[0].text;
		$scope.titulo = result.data.data.term_conditions[0].tittle;
		$scope.url = result.data.data.term_conditions[0].url;

		console.log($scope.tienda);

		var dta1=new Date($scope.de);
		var dia1=dta1.getDate();
		var mes1=dta1.getMonth();
		var ano1=dta1.getFullYear();		
		if(dia1 <= 9){ dia1 = '0'+dia1; }else if(dia1){ dia1 = dia1; }
		mes1 = (mes1+1);
		if(mes1 <= 9){ mes1 = '0'+mes1; }else if(mes1){ mes1 = mes1; }
		dta1 = ano1 + '-' + mes1 + '-' + dia1;

		console.log($scope.hrDe);
		//

		var dta2=new Date($scope.ate);
		var dia2=dta2.getDate();
		var mes2=dta2.getMonth();
		var ano2=dta2.getFullYear();
		if(dia2 <= 9){ dia2 = '0'+dia2; }else if(dia2){ dia2 = dia2; }
		mes2 = (mes2+1);
		if(mes2 <= 9){ mes2 = '0'+mes2; }else if(mes2){ mes2 = mes2; }
		dta2 = ano2 + '-' + mes2 + '-' + dia2;

		$scope.de = new Date(dta1);
		$scope.ate = new Date(dta2);

		document.getElementById('hra1').value = $scope.hrDe;
		document.getElementById('hra2').value = $scope.hrAte;

	});
	
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

			servicosAPI.putTerminosCod($scope.id, dados).then(function(result){
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
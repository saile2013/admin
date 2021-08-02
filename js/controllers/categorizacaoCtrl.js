angular.module("sop").controller("categorizacaoCtrl", function($scope, $cookies, $state, servicosAPI){
	
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
	$scope.botao = true;
	$scope.limpa = false;
	$scope.carregaDados = true;
	$scope.contar = 0;
	var logisticas = [];
	var LogisTICAS = [];

	$scope.tipos = [
		{key: '1', value: 'Categorias'},
		{key: '2', value: 'Tiendas'},
	]

	$scope.tipos2 = [
		{key: '1', value: 'Insertar'},
		{key: '2', value: 'Deletar'},		
	]

	$scope.chaTipo = function() {
		if($scope.tipo == 1){
			servicosAPI.getNewCategorias().then(function(result){
				console.log(result.data);
				$scope.lisCatTies = result.data;
			});
		}else if($scope.tipo == 2){
			servicosAPI.getActiveStore().then(function(result){
				console.log(result.data);
				$scope.lisCatTies = result.data;
			});
		}
	};

	$scope.chaCatTien = function(tipo, lisCatTie) {
		if(tipo == 1){
			servicosAPI.getSubCaterias1(lisCatTie).then(function(result){
				console.log(result.data);
				$scope.lisCatTie22s = "";
				$scope.lisCatTie2s = result.data;
			});
		}else if(tipo == 2){
			servicosAPI.getSubCaterias2(lisCatTie).then(function(result){
				console.log(result.data);
				$scope.lisCatTie2s = "";
				$scope.lisCatTie22s = result.data;
			});
		}
	};

	$scope.chaCatTien2 = function(tipo, lisCatTie, lisCatTie2) {

		if(tipo == 1){

			logisticas.splice(0);
			LogisTICAS.splice(0);
			$scope.contar = 0;
			$scope.pag = 1;

			servicosAPI.getProResult1(lisCatTie, $scope.pag).then(function(result){

				console.log(result.data.data.data);

				for(var i=0; i<result.data.data.data.length; i++){
					LogisTICAS.push(result.data.data.data[i]);
				}

				$scope.maisPag = function(){
					$scope.apa = false;
					$scope.pag += 1;
					servicosAPI.getProResult1(lisCatTie, $scope.pag).then(function(result){
						if(result.data.data.data[0]){
							for(var i=0; i<result.data.data.data.length; i++){
								LogisTICAS.push(result.data.data.data[i]);
								$scope.apa = true;
							}

							if($scope.selectedAll){
								$scope.selectedAll = true;
								angular.forEach(result.data.data.data, function(logistica) {
									logistica.Selected = true;
									if(logistica.Selected == true){
										$scope.contar++;
										logisticas.push(logistica.id);
									}
								});
							}
						}else{
							$scope.parou = true;
						}
					});
				};

				$scope.logisticas = LogisTICAS;
				$scope.botao = true;
				$scope.limpa = false;

				$scope.selectAll = function() {
					logisticas.splice(0);
					$scope.contar = 0;
					angular.forEach($scope.logisticas, function(logistica) {
						logistica.Selected = $scope.selectedAll;
						if(logistica.Selected == true){
							$scope.contar++;
							logisticas.push(logistica.id);
						}
					});
				};

				$scope.checkboxClick = function(event, logistica) {
					$scope.selectedAll = false;
					if(logistica.Selected == true){
						$scope.contar++;
						logisticas.push(logistica.id);
					}else{
						for(var i=0; i<logisticas.length; i++){
							if(logistica.id == logisticas[i]){
								$scope.contar--;
								logisticas.splice(i, 1);
							}
						}
					}
				};
			});

		}else{

			if(lisCatTie2 == 'todos'){

				logisticas.splice(0);
				LogisTICAS.splice(0);
				$scope.contar = 0;
				$scope.pag = 1;

				servicosAPI.getProResult222(lisCatTie, $scope.pag).then(function(result){
					console.log(result.data.data.data);
						
					for(var i=0; i<result.data.data.data.length; i++){
						LogisTICAS.push(result.data.data.data[i]);
					}

					$scope.maisPag = function(){
						$scope.apa = false;
						$scope.pag += 1;
						servicosAPI.getProResult222(lisCatTie, $scope.pag).then(function(result){
							if(result.data.data.data[0]){
								for(var i=0; i<result.data.data.data.length; i++){
									LogisTICAS.push(result.data.data.data[i]);
									$scope.apa = true;
								}
								
								if($scope.selectedAll){
									$scope.selectedAll = true;
									angular.forEach(result.data.data.data, function(logistica) {
										logistica.Selected = true;
										if(logistica.Selected == true){
											$scope.contar++;
											logisticas.push(logistica.id);
										}
									});
								}
							}else{
								$scope.parou = true;
							}
						});
					};

					$scope.logisticas = LogisTICAS;
					$scope.botao = true;
					$scope.limpa = false;

					$scope.selectAll = function() {
						logisticas.splice(0);
						$scope.contar = 0;
						angular.forEach($scope.logisticas, function(logistica) {
							logistica.Selected = $scope.selectedAll;
							if(logistica.Selected == true){
								$scope.contar++;
								logisticas.push(logistica.id);
							}
						});
					};

					$scope.checkboxClick = function(event, logistica) {
						console.log(logistica);
						$scope.selectedAll = false;
						if(logistica.Selected == true){
							$scope.contar++;
							logisticas.push(logistica.id);
						}else{
							for(var i=0; i<logisticas.length; i++){
								if(logistica.id == logisticas[i]){
									$scope.contar--;
									logisticas.splice(i, 1);
								}
							}
						}
					};
				});

			}else{

				logisticas.splice(0);
				LogisTICAS.splice(0);
				$scope.contar = 0;
				$scope.pag = 1;
	
				servicosAPI.getProResult2(lisCatTie, lisCatTie2, $scope.pag).then(function(result){
					console.log(result.data.data.data);
						
					for(var i=0; i<result.data.data.data.length; i++){
						LogisTICAS.push(result.data.data.data[i]);
					}
	
					$scope.maisPag = function(){
						$scope.apa = false;
						$scope.pag += 1;
						servicosAPI.getProResult2(lisCatTie, lisCatTie2, $scope.pag).then(function(result){
							if(result.data.data.data[0]){
								for(var i=0; i<result.data.data.data.length; i++){
									LogisTICAS.push(result.data.data.data[i]);
									$scope.apa = true;
								}
								
								if($scope.selectedAll){
									$scope.selectedAll = true;
									angular.forEach(result.data.data.data, function(logistica) {
										logistica.Selected = true;
										if(logistica.Selected == true){
											$scope.contar++;
											logisticas.push(logistica.id);
										}
									});
								}
							}else{
								$scope.parou = true;
							}
						});
					};
	
					$scope.logisticas = LogisTICAS;
					$scope.botao = true;
					$scope.limpa = false;
	
					$scope.selectAll = function() {
						logisticas.splice(0);
						$scope.contar = 0;
						angular.forEach($scope.logisticas, function(logistica) {
							logistica.Selected = $scope.selectedAll;
							if(logistica.Selected == true){
								$scope.contar++;
								logisticas.push(logistica.id);
							}
						});
					};
	
					$scope.checkboxClick = function(event, logistica) {
						console.log(logistica);
						$scope.selectedAll = false;
						if(logistica.Selected == true){
							$scope.contar++;
							logisticas.push(logistica.id);
						}else{
							for(var i=0; i<logisticas.length; i++){
								if(logistica.id == logisticas[i]){
									$scope.contar--;
									logisticas.splice(i, 1);
								}
							}
						}
					};
				});
			}

		}
	};

	$scope.digitou = function (event) {
		if($scope.buscar != ''){
			$scope.selectedAll = false;
			logisticas.splice(0);
			$scope.contar = 0;
			document.getElementById('selectedAll').style.display = 'none';
			angular.forEach($scope.logisticas, function(logistica) {
				logistica.Selected = $scope.selectedAll;
			});
		}else{
			document.getElementById('selectedAll').style.display = 'block';
		}
	};

	$scope.clicaResulta1 = function(tipo2, lisCatTie, lisCatTie2, tipo) {



		if(tipo2){

			if(tipo2 == 1){
	
				if(logisticas.length > 0){
	
					if($scope.words){
	
						$scope.carregaDados = false;
						$scope.logisticas = false;

						var words = $scope.words.split(",").join("|");
						var merda1 = logisticas.toString();
	
						var dados = {
							'words': words,
							'products': merda1
						};

						$scope.infTipo = tipo;
						$scope.infLisCatTie = lisCatTie;
						$scope.infLisCatTie2 = lisCatTie2;
						$scope.infTipo2 = tipo2;
						$scope.infWords = words;
	
						servicosAPI.postProDictionary1(dados).then(function(result){
							$scope.ok = "solicitud enviada con éxito";
							$scope.ok2 = "";
							$scope.ok3 = "";
							$scope.carregaDados = true;
	
							//
							if(tipo == 1){
	
								//CATEGORIAS
								logisticas.splice(0);
								LogisTICAS.splice(0);
								$scope.contar = 0;
								$scope.pag = 1;
		
								servicosAPI.getProResult1(lisCatTie, $scope.pag).then(function(result){
		
									for(var i=0; i<result.data.data.data.length; i++){
										LogisTICAS.push(result.data.data.data[i]);
									}
		
									$scope.maisPag = function(){
										$scope.apa = false;
										$scope.pag += 1;
										servicosAPI.getProResult1(lisCatTie, $scope.pag).then(function(result){
											if(result.data.data.data[0]){
												for(var i=0; i<result.data.data.data.length; i++){
													LogisTICAS.push(result.data.data.data[i]);
													$scope.apa = true;
												}
												
												if($scope.selectedAll){
													$scope.selectedAll = true;
													angular.forEach(result.data.data.data, function(logistica) {
														logistica.Selected = true;
														if(logistica.Selected == true){
															$scope.contar++;
															logisticas.push(logistica.id);
														}
													});
												}
											}else{
												$scope.parou = true;
											}
										});
									};
		
									$scope.logisticas = LogisTICAS;
									$scope.botao = true;
									$scope.limpa = false;
		
									$scope.selectAll = function() {
										logisticas.splice(0);
										$scope.contar = 0;
										angular.forEach($scope.logisticas, function(logistica) {
											logistica.Selected = $scope.selectedAll;
											if(logistica.Selected == true){
												$scope.contar++;
												logisticas.push(logistica.id);
											}
										});
									};
		
									$scope.checkboxClick = function(event, logistica) {
										$scope.selectedAll = false;
										if(logistica.Selected == true){
											$scope.contar++;
											logisticas.push(logistica.id);
										}else{
											for(var i=0; i<logisticas.length; i++){
												if(logistica.id == logisticas[i]){
													$scope.contar--;
													logisticas.splice(i, 1);
												}
											}
										}
									};
								});
	
							}else{
								
								//TIENDAS
								logisticas.splice(0);
								LogisTICAS.splice(0);
								$scope.contar = 0;
								$scope.pag = 1;
	
								servicosAPI.getProResult2(lisCatTie, lisCatTie2, $scope.pag).then(function(result){
									console.log(result.data.data.data);
										
									for(var i=0; i<result.data.data.data.length; i++){
										LogisTICAS.push(result.data.data.data[i]);
									}
	
									$scope.maisPag = function(){
										$scope.apa = false;
										$scope.pag += 1;
										servicosAPI.getProResult2(lisCatTie, lisCatTie2, $scope.pag).then(function(result){
											if(result.data.data.data[0]){
												for(var i=0; i<result.data.data.data.length; i++){
													LogisTICAS.push(result.data.data.data[i]);
													$scope.apa = true;
												}
												
												if($scope.selectedAll){
													$scope.selectedAll = true;
													angular.forEach(result.data.data.data, function(logistica) {
														logistica.Selected = true;
														if(logistica.Selected == true){
															$scope.contar++;
															logisticas.push(logistica.id);
														}
													});
												}
											}else{
												$scope.parou = true;
											}
										});
									};
	
									$scope.logisticas = LogisTICAS;
									$scope.botao = true;
									$scope.limpa = false;
	
									$scope.selectAll = function() {
										logisticas.splice(0);
										$scope.contar = 0;
										angular.forEach($scope.logisticas, function(logistica) {
											logistica.Selected = $scope.selectedAll;
											if(logistica.Selected == true){
												$scope.contar++;
												logisticas.push(logistica.id);
											}
										});
									};
	
									$scope.checkboxClick = function(event, logistica) {
										console.log(logistica);
										$scope.selectedAll = false;
										if(logistica.Selected == true){
											$scope.contar++;
											logisticas.push(logistica.id);
										}else{
											for(var i=0; i<logisticas.length; i++){
												if(logistica.id == logisticas[i]){
													$scope.contar--;
													logisticas.splice(i, 1);
												}
											}
										}
									};
								});
	
							}
							//
						});
	
					}else{						
						document.getElementById('words').focus();
						console.log($scope.words);
					}
	
				}else{
					$scope.ok2 = "selecione que quieres borrar la palabra!";
				}
	
			}else{

				if(logisticas.length > 0){

					if($scope.words){
		
						var words = $scope.words.split(",").join("|");
						var merda2 = logisticas.toString();
		
						servicosAPI.dltProDictionary1(words, merda2).then(function(result){
							$scope.ok = "solicitud enviada con éxito";
							$scope.ok2 = "";
							$scope.ok3 = "";
							$scope.carregaDados = true;
		
							//
							if(tipo == 1){
		
								//CATEGORIAS
								logisticas.splice(0);
								LogisTICAS.splice(0);
								$scope.contar = 0;
								$scope.pag = 1;
		
								servicosAPI.getProResult1(lisCatTie, $scope.pag).then(function(result){
		
									for(var i=0; i<result.data.data.data.length; i++){
										LogisTICAS.push(result.data.data.data[i]);
									}
		
									$scope.maisPag = function(){
										$scope.apa = false;
										$scope.pag += 1;
										servicosAPI.getProResult1(lisCatTie, $scope.pag).then(function(result){
											if(result.data.data.data[0]){
												for(var i=0; i<result.data.data.data.length; i++){
													LogisTICAS.push(result.data.data.data[i]);
													$scope.apa = true;
												}
												
												if($scope.selectedAll){
													$scope.selectedAll = true;
													angular.forEach(result.data.data.data, function(logistica) {
														logistica.Selected = true;
														if(logistica.Selected == true){
															$scope.contar++;
															logisticas.push(logistica.id);
														}
													});
												}
											}else{
												$scope.parou = true;
											}
										});
									};
		
									$scope.logisticas = LogisTICAS;
									$scope.botao = true;
									$scope.limpa = false;
		
									$scope.selectAll = function() {
										logisticas.splice(0);
										$scope.contar = 0;
										angular.forEach($scope.logisticas, function(logistica) {
											logistica.Selected = $scope.selectedAll;
											if(logistica.Selected == true){
												$scope.contar++;
												logisticas.push(logistica.id);
											}
										});
									};
		
									$scope.checkboxClick = function(event, logistica) {
										$scope.selectedAll = false;
										if(logistica.Selected == true){
											$scope.contar++;
											logisticas.push(logistica.id);
										}else{
											for(var i=0; i<logisticas.length; i++){
												if(logistica.id == logisticas[i]){
													$scope.contar--;
													logisticas.splice(i, 1);
												}
											}
										}
									};
								});
								
							}else{
								
								//TIENDAS
								logisticas.splice(0);
								LogisTICAS.splice(0);
								$scope.contar = 0;
								$scope.pag = 1;
		
								servicosAPI.getProResult2(lisCatTie, lisCatTie2, $scope.pag).then(function(result){
									console.log(result.data.data.data);
										
									for(var i=0; i<result.data.data.data.length; i++){
										LogisTICAS.push(result.data.data.data[i]);
									}
		
									$scope.maisPag = function(){
										$scope.apa = false;
										$scope.pag += 1;
										servicosAPI.getProResult2(lisCatTie, lisCatTie2, $scope.pag).then(function(result){
											if(result.data.data.data[0]){
												for(var i=0; i<result.data.data.data.length; i++){
													LogisTICAS.push(result.data.data.data[i]);
													$scope.apa = true;
												}
												
												if($scope.selectedAll){
													$scope.selectedAll = true;
													angular.forEach(result.data.data.data, function(logistica) {
														logistica.Selected = true;
														if(logistica.Selected == true){
															$scope.contar++;
															logisticas.push(logistica.id);
														}
													});
												}
											}else{
												$scope.parou = true;
											}
										});
									};
		
									$scope.logisticas = LogisTICAS;
									$scope.botao = true;
									$scope.limpa = false;
		
									$scope.selectAll = function() {
										logisticas.splice(0);
										$scope.contar = 0;
										angular.forEach($scope.logisticas, function(logistica) {
											logistica.Selected = $scope.selectedAll;
											if(logistica.Selected == true){
												$scope.contar++;
												logisticas.push(logistica.id);
											}
										});
									};
		
									$scope.checkboxClick = function(event, logistica) {
										console.log(logistica);
										$scope.selectedAll = false;
										if(logistica.Selected == true){
											$scope.contar++;
											logisticas.push(logistica.id);
										}else{
											for(var i=0; i<logisticas.length; i++){
												if(logistica.id == logisticas[i]){
													$scope.contar--;
													logisticas.splice(i, 1);
												}
											}
										}
									};
								});
							}
							//
						});
		
					}else{
						document.getElementById('words').focus();
						console.log($scope.words);
					}

				}else{
					$scope.ok2 = "selecione que quieres borrar la palabra!";
				}
	
			}
		}else{
			$scope.ok3 = "selecione insertar o deletar!";
		}
	};
	
	$scope.mTodos = function() {
		$scope.logisticas = false;
		$scope.botao = false;
		LogisTICAS.splice(0);
	};

	$scope.enter = function(event){
		if(window.event.keyCode == 13){
			console.log('enter');
			$scope.buscar();
		}
	};

	$scope.sair = function(){
		$cookies.remove('token');
		$state.go('inicio');
	}
	
	//tagger(document.querySelector('[name="words"]'), {});
});
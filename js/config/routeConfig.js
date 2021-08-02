angular.module("sop").config(function($stateProvider, $urlRouterProvider) {
	
	$urlRouterProvider.otherwise('/entrar');
		
	$stateProvider.state('inicio', {
		url: '/entrar',
		templateUrl: 'view/entrar.html',
		controller: 'entrarCtrl',
				
	}).state('home', {
	   url: '/home', 
	   views: {
			'': { 
				templateUrl: 'view/home.html',
				controller: 'homeCtrl'
			},
			'menu@home': { templateUrl: 'view/menu.html' }
		}
	   
	}).state('relatorios', {
		url: '/relatorios', 
		views: {
			'': { 
				templateUrl: 'view/relatorios.html',
				controller: 'relatoriosCtrl'
			}
		}		 
	 
	}).state('clientes', {
		url: '/clientes', 
		views: {
			'': { 
				templateUrl: 'view/clientes.html',
				controller: 'clientesCtrl'
			}
		}		 
	 
	}).state('perfil-clientes', {
		url: '/perfilClientes/:id', 
		views: {
			'': { 
				templateUrl: 'view/perfil-clientes.html',
				controller: 'perfilClientesCtrl'
			}
		}		 
	 
	}).state('search-perfil-clientes', {
		url: '/searchPerfilClientes/:id/:tienda/:status/:text', 
		views: {
			'': { 
				templateUrl: 'view/search-perfil-clientes.html',
				controller: 'searchPerfilClientesCtrl'
			}
		}		 
	 
	}).state('search-clientes', {
		url: '/searchClientes/:status/:genero/:text',
		views: {
			'': { 
				templateUrl: 'view/search-clientes.html',
				controller: 'searchClientesCtrl'
			}
		}		 
	 
	}).state('pedidos', {
	   url: '/pedidos', 
	   views: {
			'': { 
				templateUrl: 'view/pedidos.html',
				controller: 'pedidosCtrl'
			},
			'menu@pedidos': { templateUrl: 'view/menu.html' }
		}
		
	
	}).state('search-pedidos', {
		url: '/searchPedidos/:text/:status/:begin/:end',
		views: {
			 '': { 
				 templateUrl: 'view/search-pedidos.html',
				 controller: 'searchPedidosCtrl'
			 },
			 'menu@search-pedidos': { templateUrl: 'view/menu.html' }
		 }
		 
		
	}).state('search-pedidos.perfil-pedidos', {
		url: '/:idPed', 
		views: {
				'': { 
					templateUrl: 'view/perfil-pedidos.html',
					controller: 'perfilPedidosCtrl'
				}
			}
			
	}).state('pedidos.perfil-pedidos', {
		url: '/:idPed', 
		views: {
			 '': { 
				 templateUrl: 'view/perfil-pedidos.html',
				 controller: 'perfilPedidosCtrl'
			 }
		 }
		 
	}).state('perfil-clientes.perfil-pedidos', {
		url: '/:idPed', 
		views: {
				'': { 
					templateUrl: 'view/perfil-pedidos.html',
					controller: 'perfilPedidosCtrl'
				}
			}
			
	}).state('search-perfil-clientes.perfil-pedidos', {
		url: '/:idPed', 
		views: {
				'': { 
					templateUrl: 'view/perfil-pedidos.html',
					controller: 'perfilPedidosCtrl'
				}
			}
			
	}).state('search-pedidos.perfil-strefunds', {
		url: '/:idPed', 
		views: {
				'': { 
					templateUrl: 'view/perfil-strefunds.html',
					controller: 'perfilStrefundsCtrl'
				}
			}
			
	}).state('pedidos.perfil-strefunds', {
		url: '/:idPed', 
		views: {
				'': { 
					templateUrl: 'view/perfil-strefunds.html',
					controller: 'perfilStrefundsCtrl'
				}
			}
			
	}).state('perfil-clientes.perfil-strefunds', {
		url: '/:idPed', 
		views: {
				'': { 
					templateUrl: 'view/perfil-strefunds.html',
					controller: 'perfilStrefundsCtrl'
				}
			}
			
	}).state('search-perfil-clientes.perfil-strefunds', {
		url: '/:idPed', 
		views: {
				'': { 
					templateUrl: 'view/perfil-strefunds.html',
					controller: 'perfilStrefundsCtrl'
				}
			}
			
	}).state('pedidos.payments-pedidos', {
		url: '/:idPed', 
		views: {
			 '': { 
				 templateUrl: 'view/payments-pedidos.html',
				 controller: 'paymentsPedidosCtrl'
			 }
		 }
		 
	}).state('search-pedidos.payments-pedidos', {
		url: '/:idPed', 
		views: {
				'': { 
					templateUrl: 'view/payments-pedidos.html',
					controller: 'paymentsPedidosCtrl'
				}
			}
			
	}).state('search-pedidos.historico-pedidos', {
		url: '/:idPed/:order_id', 
		views: {
				'': { 
					templateUrl: 'view/historico-pedidos.html',
					controller: 'historicoPedidosCtrl'
				}
			}
			
	}).state('pedidos.historico-pedidos', {
		url: '/:idPed/:order_id', 
		views: {
				'': { 
					templateUrl: 'view/historico-pedidos.html',
					controller: 'historicoPedidosCtrl'
				}
			}
			
	}).state('perfil-clientes.historico-pedidos', {
		url: '/:idPed/:order_id', 
		views: {
				'': { 
					templateUrl: 'view/historico-pedidos.html',
					controller: 'historicoPedidosCtrl'
				}
			}
			
	}).state('search-perfil-clientes.historico-pedidos', {
		url: '/:idPed/:order_id', 
		views: {
				'': { 
					templateUrl: 'view/historico-pedidos.html',
					controller: 'historicoPedidosCtrl'
				}
			}
			
	}).state('exportar-pedidos', {
		url: '/exportarPedidos', 
		views: {
			 '': { 
				 templateUrl: 'view/exportar-pedidos.html',
				 controller: 'exportarPedidosCtrl'
			 },
			 'menu@exportar-pedidos': { templateUrl: 'view/menu.html' }
		 }
		 
	}).state('exportar-refunds', {
		url: '/exportarRefunds', 
		views: {
				'': { 
					templateUrl: 'view/exportar-refunds.html',
					controller: 'exportarRefundsCtrl'
				},
				'menu@exportar-refunds': { templateUrl: 'view/menu.html' }
			}
			
	}).state('refunds', {
	   url: '/refunds', 
	   views: {
			'': { 
				templateUrl: 'view/refunds.html',
				controller: 'refundsCtrl'
			},
			'menu@refunds': { templateUrl: 'view/menu.html' }
		}
		
	}).state('refunds.perfil-refunds', {
		url: '/:idRef/:idOrd', 
		views: {
			 '': { 
				 templateUrl: 'view/perfil-refunds.html',
				 controller: 'perfilRefundsCtrl'
			 }
		 }
		 
	}).state('search-refunds.perfil-refunds', {
		url: '/:idRef/:idOrd', 
		views: {
				'': { 
					templateUrl: 'view/perfil-refunds.html',
					controller: 'perfilRefundsCtrl'
				}
			}
			
	}).state('search-refunds', {
		url: '/searchRefunds/:text/:begin/:end',
		views: {
			'': { 
				templateUrl: 'view/search-refunds.html',
				controller: 'searchRefundsCtrl'
			},
			'menu@search-refunds': { templateUrl: 'view/menu.html' }
		}			
		
	}).state('periodos-search', {
	   url: '/periodosSearch/:pais/:estado/:cidade/:bairro/:rua/:idDate',
	   views: {
			'': { 
				templateUrl: 'view/periodos-search.html',
				controller: 'periodosSearchCtrl'
			},
			'menu@periodos-search': { templateUrl: 'view/menu.html' }
		}
		
	}).state('categorias', {
	   url: '/categorias', 
	   views: {
			'': { 
				templateUrl: 'view/categorias.html',
				controller: 'categoriasCtrl'
			},
			'menu@categorias': { templateUrl: 'view/menu.html' }
		}

	}).state('search-categorias', {
		url: '/searchCategorias/:text/:status',
		views: {
			 '': { 
				 templateUrl: 'view/search-categorias.html',
				 controller: 'searchCategoriasCtrl'
			 },
			 'menu@search-categorias': { templateUrl: 'view/menu.html' }
		 }
		 
		
	}).state('editar-categorias', {
		url: '/editarCategorias/:id',
		views: {
			 '': { 
				 templateUrl: 'view/editar-categorias.html',
				 controller: 'editarCategoriasCtrl'
			 },
			 'menu@editar-categorias': { templateUrl: 'view/menu.html' }
		 }
		 
	}).state('adicionar-categorias', {
		url: '/adicionarCategorias',
		views: {
			 '': { 
				 templateUrl: 'view/adicionar-categorias.html',
				 controller: 'adicionarCategoriasCtrl'
			 },
			 'menu@adicionar-categorias': { templateUrl: 'view/menu.html' }
		 }
		 
	}).state('dicionario-categorias', {
		url: '/dicionarioCategorias/:id',
		views: {
				'': { 
					templateUrl: 'view/dicionario-categorias.html',
					controller: 'dicionarioCategoriasCtrl'
				}
			}
			
	}).state('productos', {
	   url: '/productos', 
	   views: {
			'': { 
				templateUrl: 'view/productos.html',
				controller: 'productosCtrl'
			},
			'menu@productos': { templateUrl: 'view/menu.html' }
		}
		
	}).state('editar-productos', {
		url: '/editarProductos/:id/:tp',
		views: {
			 '': { 
				 templateUrl: 'view/editar-productos.html',
				 controller: 'editarProductosCtrl'
			 },
			 'menu@editar-productos': { templateUrl: 'view/menu.html' }
		 }
		 
	}).state('search-productos', {
		url: '/searchProductos/:text/:tienda/:status',
		views: {
			'': { 
				templateUrl: 'view/search-productos.html',
				controller: 'searchProductosCtrl'
			},
			'menu@search-productos': { templateUrl: 'view/menu.html' }
		}
		
	}).state('reportar-vendas', {
		url: '/reportarVendas/:id', 
		views: {
			'': { 
				templateUrl: 'view/reportar-vendas.html',
				controller: 'reportarVendasCtrl'
			}
		}
		 
	}).state('tiendas', {
	   url: '/tiendas', 
	   views: {
			'': { 
				templateUrl: 'view/tiendas.html',
				controller: 'tiendasCtrl'
			},
			'menu@tiendas': { templateUrl: 'view/menu.html' }
		}
		
	}).state('publicidade-tiendas', {
		url: '/publicidadeTiendas', 
		views: {
			 '': { 
				 templateUrl: 'view/publicidade-tiendas.html',
				 controller: 'publicidadeTiendasCtrl'
			 },
			 'menu@publicidade-tiendas': { templateUrl: 'view/menu.html' }
		 }
		 
	}).state('search-publicidade-tiendas', {
		url: '/searchPublicidadeTiendas/:text/:status', 
		views: {
				'': { 
					templateUrl: 'view/search-publicidade-tiendas.html',
					controller: 'searchPublicidadeTiendasCtrl'
				},
				'menu@search-publicidade-tiendas': { templateUrl: 'view/menu.html' }
			}
			
	}).state('adicionar-tiendas', {
		url: '/adicionarTiendas', 
		views: {
			 '': { 
				 templateUrl: 'view/adicionar-tiendas.html',
				 controller: 'adicionarTiendasCtrl'
			 },
			 'menu@adicionar-tiendas': { templateUrl: 'view/menu.html' }
		 }
		 
	}).state('editar-tiendas', {
		url: '/editarTiendas/:id',
		views: {
			 '': { 
				 templateUrl: 'view/editar-tiendas.html',
				 controller: 'editarTiendasCtrl'
			 },
			 'menu@editar-tiendas': { templateUrl: 'view/menu.html' }
		 }
		 
	}).state('descuentos-tiendas', {
		url: '/descuentos/:id',
		views: {
			'': { 
				templateUrl: 'view/descuentos-tiendas.html',
				controller: 'descuentosTiendasCtrl'
			},
			'menu@descuentos-tiendas': { templateUrl: 'view/menu.html' }
		}
			
	}).state('perfil-tiendas', {
		url: '/perfilTiendas/:id',
		views: {
				'': { 
					templateUrl: 'view/perfil-tiendas.html',
					controller: 'perfilTiendasCtrl'
				},
				'menu@perfil-tiendas': { templateUrl: 'view/menu.html' }
			}
			
	}).state('editar-pasillos', {
		url: '/editarPasillos/:id/:store_id',
		views: {
				'': { 
					templateUrl: 'view/editar-pasillos.html',
					controller: 'editarPasillosCtrl'
				},
				'menu@editar-pasillos': { templateUrl: 'view/menu.html' }
			}
			
	}).state('adicionar-pasillos', {
		url: '/adicionarPasillos/:idTien',
		views: {
				'': { 
					templateUrl: 'view/adicionar-pasillos.html',
					controller: 'adicionarPasillosCtrl'
				},
				'menu@adicionar-pasillos': { templateUrl: 'view/menu.html' }
			}
			
	}).state('dicionario-pasillos', {
		url: '/dicionarioPasillos/:id',
		views: {
			'': { 
				templateUrl: 'view/dicionario-pasillos.html',
				controller: 'dicionarioPasillosCtrl'
			}
		}
			
	}).state('search-tiendas', {
		url: '/searchTiendas/:text/:status',
		views: {
			'': { 
				templateUrl: 'view/search-tiendas.html',
				controller: 'searchTiendasCtrl'
			},
			'menu@search-tiendas': { templateUrl: 'view/menu.html' }
		}
		
	}).state('search-pasillos', {
		url: '/searchPasillos/:text/:store_id',
		views: {
			 '': { 
				 templateUrl: 'view/search-pasillos.html',
				 controller: 'searchPasillosCtrl'
			 },
			 'menu@search-pasillos': { templateUrl: 'view/menu.html' }
		 }
		 
		
	}).state('status-logistica', {
		url: '/statusLogistica', 
		views: {
			 '': { 
				 templateUrl: 'view/status-logistica.html',
				 controller: 'statusLogisticaCtrl'
			 }
		 }
		 
	}).state('search-status-logistica', {
		url: '/searchStatusLogistica/:tienda/:transportadora/:status/:text/:begin/:end/:hra1/:hra2',
		views: {
			'': { 
				templateUrl: 'view/search-status-logistica.html',
				controller: 'searchStatusLogisticaCtrl'
			}
		}
		
	}).state('status-logistica.perfil-cotacao', {
		url: '/:id', 
		views: {
			'': { 
				templateUrl: 'view/perfil-cotacao.html',
				controller: 'perfilCotacaoCtrl'
			}
		}
			
	}).state('encomendas-logistica', {
	   url: '/encomendasLogistica', 
	   views: {
			'': { 
				templateUrl: 'view/encomendas-logistica.html',
				controller: 'encomendasLogisticaCtrl'
			}
		}
		
	}).state('search-encomendas-logistica', {
		url: '/searchEncomendasLogistica/:tienda/:transportadora/:text/:begin/:end/:hra1/:hra2',
		views: {
			'': { 
				templateUrl: 'view/search-encomendas-logistica.html',
				controller: 'searchEncomendasLogisticaCtrl'
			}
		}
		
	}).state('encomendas-logistica.perfil-cotacao', {
		url: '/:id', 
		views: {
			'': { 
				templateUrl: 'view/perfil-cotacao.html',
				controller: 'perfilCotacaoCtrl'
			}
		}
			
	}).state('cotacao-logistica', {
		url: '/cotacaoLogistica', 
		views: {
			 '': { 
				 templateUrl: 'view/cotacao-logistica.html',
				 controller: 'cotacaoLogisticaCtrl'
			 }
		 }
		 
	}).state('search-cotacao-logistica', {
		url: '/searchCotacaoLogistica/:tienda/:transportadora/:text/:begin/:end/:hra1/:hra2',
		views: {
			'': { 
				templateUrl: 'view/search-cotacao-logistica.html',
				controller: 'searchCotacaoLogisticaCtrl'
			}
		}
		
	}).state('cotacao-logistica.perfil-cotacao', {
		url: '/:id', 
		views: {
			'': { 
				templateUrl: 'view/perfil-cotacao.html',
				controller: 'perfilCotacaoCtrl'
			}
		}
			
	}).state('search-cotacao-logistica.perfil-cotacao', {
		url: '/:id', 
		views: {
			'': { 
				templateUrl: 'view/perfil-cotacao.html',
				controller: 'perfilCotacaoCtrl'
			}
		}
			
	}).state('direcao-logistica', {
		url: '/direcaoLogistica', 
		views: {
			'': { 
				templateUrl: 'view/direcao-logistica.html',
				controller: 'direcaoLogisticaCtrl'
			}
		}
			
	}).state('search-direcao-logistica', {
		url: '/searchDirecaoLogistica/:text', 
		views: {
			'': { 
				templateUrl: 'view/search-direcao-logistica.html',
				controller: 'searchDirecaoLogisticaCtrl'
			}
		}
			
	}).state('editar-direcao-logistica', {
		url: '/editarDirecaoLogistica/:id', 
		views: {
			'': { 
				templateUrl: 'view/editar-direcao-logistica.html',
				controller: 'editarDirecaoLogisticaCtrl'
			}
		}
			
	}).state('utilizacion', {
	   url: '/utilizacion', 
	   views: {
			'': { 
				templateUrl: 'view/utilizacion.html',
				controller: 'utilizacionCtrl'
			},
			'menu@utilizacion': { templateUrl: 'view/menu.html' }
		}
		
	}).state('tiendas-tematicas', {
		url: '/tiendasTematicas', 
		views: {
			 '': { 
				 templateUrl: 'view/tiendas-tematicas.html',
				 controller: 'tiendasTematicasCtrl'
			 }
		 }
		 
	}).state('perfil-tiendas-tematicas', {
		url: '/perfilTiendasTematicas/:id',
		views: {
			'': { 
				templateUrl: 'view/perfil-tiendas-tematicas.html',
				controller: 'perfilTiendasTematicasCtrl'
			}
		}	

	}).state('adicionar-tiendas-tematicas', {
		url: '/adicionarTiendasTematicas',
		views: {
			'': { 
				templateUrl: 'view/adicionar-tiendas-tematicas.html',
				controller: 'adicionarTiendasTematicasCtrl'
			}
		}

	}).state('adicionar-kit', {
		url: '/adicionarKit',
		views: {
			'': { 
				templateUrl: 'view/adicionar-kit.html',
				controller: 'adicionarKitCtrl'
			}
		}			
	}).state('sliders', {
		url: '/sliders',
		views: {
			'': { 
				templateUrl: 'view/sliders.html',
				controller: 'slidersCtrl'
			}
		}			
	}).state('editar-sliders', {
		url: '/editarSliders/:id',
		views: {
			'': { 
				templateUrl: 'view/editar-sliders.html',
				controller: 'editarSlidersCtrl'
			}
		}	

	}).state('search-sliders', {
		url: '/searchSliders/:text',
		views: {
			 '': { 
				 templateUrl: 'view/search-sliders.html',
				 controller: 'searchSlidersCtrl'
			 }
		 }		

	}).state('adicionar-sliders', {
		url: '/adicionarSliders',
		views: {
			'': { 
				templateUrl: 'view/adicionar-sliders.html',
				controller: 'adicionarSlidersCtrl'
			}
		}
		
	}).state('pushs', {
		url: '/pushs',
		views: {
			'': { 
				templateUrl: 'view/pushs.html',
				controller: 'pushsCtrl'
			}
		}

	}).state('push-csv', {
		url: '/pushCsv',
		views: {
			'': { 
				templateUrl: 'view/push-csv.html',
				controller: 'pushCsvCtrl'
			}
		}

	}).state('tiendas-estatisticas', {
		url: '/tiendasEstatisticas',
		views: {
			'': { 
				templateUrl: 'view/tiendas-estatisticas.html',
				controller: 'tiendasEstatisticasCtrl'
			}
		}

	}).state('search-tiendas-estatisticas', {
		url: '/searchTiendasEstatisticas/:text',
		views: {
			'': { 
				templateUrl: 'view/search-tiendas-estatisticas.html',
				controller: 'searchTiendasEstatisticasCtrl'
			}
		}

	}).state('estatisticas', {
		url: '/estatisticas/:id',
		views: {
			'': { 
				templateUrl: 'view/estatisticas.html',
				controller: 'estatisticasCtrl'
			}
		}		
	}).state('seguidores-estatisticas', {
		url: '/seguidoresEstatisticas/:id',
		views: {
			'': { 
				templateUrl: 'view/seguidores-estatisticas.html',
				controller: 'seguidoresEstatisticasCtrl'
			}
		}

	}).state('likes-estatisticas', {
		url: '/likesEstatisticas/:id',
		views: {
			'': { 
				templateUrl: 'view/likes-estatisticas.html',
				controller: 'likesEstatisticasCtrl'
			}
		}		
	
	}).state('vendidos-estatisticas', {
		url: '/vendidosEstatisticas/:id',
		views: {
			'': { 
				templateUrl: 'view/vendidos-estatisticas.html',
				controller: 'vendidosEstatisticasCtrl'
			}
		}		

	}).state('gustados-estatisticas', {
		url: '/gustadosEstatisticas/:id',
		views: {
			'': { 
				templateUrl: 'view/gustados-estatisticas.html',
				controller: 'gustadosEstatisticasCtrl'
			}
		}		

	}).state('dias-estatisticas', {
		url: '/diasEstatisticas/:id',
		views: {
			'': {
				templateUrl: 'view/dias-estatisticas.html',
				controller: 'diasEstatisticasCtrl'
			}
		}
		
	}).state('demograficos-estatisticas', {
		url: '/demograficosEstatisticas/:id',
		views: {
			'': {
				templateUrl: 'view/demograficos-estatisticas.html',
				controller: 'demograficosEstatisticasCtrl'
			}
		}		

	}).state('porcidade-estatisticas', {
		url: '/porcidadeEstatisticas/:id',
		views: {
			'': {
				templateUrl: 'view/porcidade-estatisticas.html',
				controller: 'porcidadeEstatisticasCtrl'
			}
		}		

	}).state('cupons', {
		url: '/cupons',
		views: {
			'': {
				templateUrl: 'view/cupons.html',
				controller: 'cuponsCtrl'
			}
		}

	}).state('cupons.perfil-cupons', {
		url: '/:id',
		views: {
			'': {
				templateUrl: 'view/perfil-cupons.html',
				controller: 'perfilCuponsCtrl'
			}
		}		

	}).state('search-cupons', {
		url: '/searchCupons/:text',
		views: {
			'': {
				templateUrl: 'view/search-cupons.html',
				controller: 'searchCuponsCtrl'
			}
		}		
	}).state('search-cupons.perfil-cupons', {
		url: '/:id',
		views: {
			'': {
				templateUrl: 'view/perfil-cupons.html',
				controller: 'perfilCuponsCtrl'
			}
		}		

	}).state('adicionar-cupons', {
		url: '/adicionarCupons',
		views: {
			'': {
				templateUrl: 'view/adicionar-cupons.html',
				controller: 'adicionarCuponsCtrl'
			}
		}		

	}).state('editar-cupons', {
		url: '/editarCupons/:id',
		views: {
			'': {
				templateUrl: 'view/editar-cupons.html',
				controller: 'editarCuponsCtrl'
			}
		}		

	}).state('siniva', {
		url: '/siniva',
		views: {
			'': {
				templateUrl: 'view/siniva.html',
				controller: 'sinivaCtrl'
			}
		}		

	}).state('search-siniva', {
		url: '/searchSiniva/:text/:tienda',
		views: {
			'': {
				templateUrl: 'view/search-siniva.html',
				controller: 'searchSinivaCtrl'
			}
		}

	}).state('siniva.excel', {
		url: '/:id',
		views: {
			'': {
				templateUrl: 'view/siniva-excel.html',
				controller: 'sinivaExcelCtrl'
			}
		}

	}).state('search-siniva.excel', {
		url: '/:id',
		views: {
			'': {
				templateUrl: 'view/siniva-excel.html',
				controller: 'sinivaExcelCtrl'
			}
		}

	}).state('ativos-siniva', {
		url: '/ativosSiniva',
		views: {
			'': {
				templateUrl: 'view/ativos-siniva.html',
				controller: 'ativosSinivaCtrl'
			}
		}
	}).state('search-ativos-siniva', {
		url: '/searchAtivosSiniva/:text/:tienda',
		views: {
			'': {
				templateUrl: 'view/search-ativos-siniva.html',
				controller: 'searchAtivosSinivaCtrl'
			}
		}
	
	}).state('publicidade-categorias', {
		url: '/publicidadeCategorias',
		views: {
			'': {
				templateUrl: 'view/publicidade-categorias.html',
				controller: 'publicidadeCategoriasCtrl'
			}
		}
	
	}).state('search-publicidade-categorias', {
		url: '/searchPublicidadeCategorias/:text/:status',
		views: {
			'': {
				templateUrl: 'view/search-publicidade-categorias.html',
				controller: 'searchPublicidadeCategoriasCtrl'
			}
		}
	
	}).state('adicionar-publicidade-categorias-app', {
		url: '/adicionarPublicidadeCategoriasApp/:id',
		views: {
			'': {
				templateUrl: 'view/adicionar-publicidade-categorias-app.html',
				controller: 'adicionarPublicidadeCategoriasAppCtrl'
			}
		}

	}).state('adicionar-publicidade-categorias-web', {
		url: '/adicionarPublicidadeCategoriasWeb/:id',
		views: {
			'': {
				templateUrl: 'view/adicionar-publicidade-categorias-web.html',
				controller: 'adicionarPublicidadeCategoriasWebCtrl'
			}
		}

	}).state('adicionar-publicidade-tiendas-app', {
		url: '/adicionarPublicidadeTiendasApp/:id',
		views: {
			'': {
				templateUrl: 'view/adicionar-publicidade-tiendas-app.html',
				controller: 'adicionarPublicidadeTiendasAppCtrl'
			}
		}

	}).state('manutencao', {
		url: '/manutencao',
		views: {
			'': {
				templateUrl: 'view/manutencao.html',
				controller: 'manutencaoCtrl'
			}
		}

	}).state('tienda-cidade', {
		url: '/tiendaCidade/:id',
		views: {
			'': {
				templateUrl: 'view/tienda-cidade.html',
				controller: 'tiendaCidadeCtrl'
			}
		}
	
	}).state('precos-incriveis', {
		url: '/precosIncriveis',
		views: {
			'': {
				templateUrl: 'view/precos-incriveis.html',
				controller: 'precosIncriveisCtrl'
			}
		}
	
	}).state('precos-incriveis.adicionar', {
		url: '/:id',
		views: {
			'': {
				templateUrl: 'view/adicionar-incriveis.html',
				controller: 'adicionarIncriveisCtrl'
			}
		}
	
	}).state('search-incriveis', {
		url: '/searchIncriveis/:text',
		views: {
			'': {
				templateUrl: 'view/search-incriveis.html',
				controller: 'searchIncriveisCtrl'
			}
		}
	
	//recomendados
	}).state('precos-recomendados', {
		url: '/precosRecomendados',
		views: {
			'': {
				templateUrl: 'view/precos-recomendados.html',
				controller: 'precosRecomendadosCtrl'
			}
		}

	}).state('precos-recomendados.adicionar', {
		url: '/:id',
		views: {
			'': {
				templateUrl: 'view/adicionar-recomendados.html',
				controller: 'adicionarRecomendadosCtrl'
			}
		}

		
	}).state('search-recomendados', {
		url: '/searchRecomendados/:text',
		views: {
			'': {
				templateUrl: 'view/search-recomendados.html',
				controller: 'searchRecomendadosCtrl'
			}
		}
	
	}).state('orden-tiendas', {
		url: '/ordenTiendas',
		views: {
			'': {
				templateUrl: 'view/orden-tiendas.html',
				controller: 'ordenTiendasCtrl'
			}
		}
	
	}).state('search-orden-tiendas', {
		url: '/searchOrdenTiendas/:text',
		views: {
			'': {
				templateUrl: 'view/search-orden-tiendas.html',
				controller: 'searchOrdenTiendasCtrl'
			}
		}
	
	}).state('palavras-chaves', {
		url: '/palavrasChaves',
		views: {
			'': {
				templateUrl: 'view/palavras-chaves.html',
				controller: 'palavrasChavesCtrl'
			}
		}	
	
	}).state('perfil-palavras', {
		url: '/perfilPalavras/:id',
		views: {
			'': {
				templateUrl: 'view/perfil-palavras.html',
				controller: 'perfilPalavrasCtrl'
			}
		}	
	
	}).state('chaves-usuarios', {
		url: '/chavesUsuarios/:id',
		views: {
			'': {
				templateUrl: 'view/chaves-usuarios.html',
				controller: 'chavesUsuariosCtrl'
			}
		}	
	
	}).state('search-chaves-usuarios', {
		url: '/searchChavesUsuarios/:id/:text',
		views: {
			'': {
				templateUrl: 'view/search-chaves-usuarios.html',
				controller: 'searchChavesUsuariosCtrl'
			}
		}	
	
	}).state('search-palavras-chaves', {
		url: '/searchPalavrasChaves/:text/:begin/:end',
		views: {
			'': {
				templateUrl: 'view/search-palavras-chaves.html',
				controller: 'searchPalavrasChavesCtrl'
			}
		}
	
	}).state('search-perfil-palavras', {
		url: '/searchPerfilPalavras/:id/:text/:begin/:end',
		views: {
			'': {
				templateUrl: 'view/search-perfil-palavras.html',
				controller: 'searchPerfilPalavrasCtrl'
			}
		}
	
	}).state('detalhes-busca', {
		url: '/detalhesBusca',
		views: {
			'': {
				templateUrl: 'view/detalhes-busca.html',
				controller: 'detalhesBuscaCtrl'
			}
		}
	
	}).state('search-detalhes-busca', {
		url: '/searchDetalhesBusca/:text/:begin/:end',
		views: {
			'': {
				templateUrl: 'view/search-detalhes-busca.html',
				controller: 'searchDetalhesBuscaCtrl'
			}
		}
	
	}).state('blacklist', {
		url: '/blacklist',
		views: {
			'': {
				templateUrl: 'view/blacklist.html',
				controller: 'blacklistCtrl'
			}
		}
	
	}).state('search-blacklist', {
		url: '/searchBlacklist/:id/:tienda/:status/:text', 
		views: {
			'': { 
				templateUrl: 'view/search-blacklist.html',
				controller: 'searchBlacklistCtrl'
			}
		}		 
	 
	
	}).state('adicionar-blacklist', {
		url: '/adicionarBlacklist',
		views: {
			'': { 
				templateUrl: 'view/adicionar-blacklist.html',
				controller: 'adicionarBlacklistCtrl'
			}
		}		 
	 
	}).state('home-publicidade', {
		url: '/homePublicidade',
		views: {
			'': { 
				templateUrl: 'view/home-publicidade.html',
				controller: 'homePublicidadeCtrl'
			}
		}		 
	 
	}).state('home-48horas', {
		url: '/home48horas',
		views: {
			'': { 
				templateUrl: 'view/home-48horas.html',
				controller: 'home48horasCtrl'
			}
		}		 
	 
	}).state('pedidos-plans', {
		url: '/pedidosPlans',
		views: {
			'': { 
				templateUrl: 'view/pedidos-plans.html',
				controller: 'pedidosPlansCtrl'
			}
		}		 
	 
	}).state('search-pedidos-plans', {
		url: '/searchPedidosPlans/:text/:status/:begin/:end',
		views: {
			 '': { 
				 templateUrl: 'view/search-pedidos-plans.html',
				 controller: 'searchPedidosPlansCtrl'
			 },
			 'menu@search-pedidos-plans': { templateUrl: 'view/menu.html' }
		 }
		 
		
	}).state('pedidos-plans.perfil-pedidos-plans', {
		url: '/:idPed', 
		views: {
			 '': { 
				 templateUrl: 'view/perfil-pedidos-plans.html',
				 controller: 'perfilPedidosPlansCtrl'
			 }
		 }
		 
	}).state('pedidos-plans.perfil-strefunds-plans', {
		url: '/:idPed', 
		views: {
				'': { 
					templateUrl: 'view/perfil-strefunds-plans.html',
					controller: 'perfilStrefundsPlansCtrl'
				}
			}
			
	}).state('pedidos-plans.historico-pedidos-plans', {
		url: '/:idPed/:order_id', 
		views: {
				'': { 
					templateUrl: 'view/historico-pedidos-plans.html',
					controller: 'historicoPedidosPlansCtrl'
				}
			}
			
	}).state('search-pedidos-plans.perfil-pedidos-plans', {
		url: '/:idPed', 
		views: {
				'': { 
					templateUrl: 'view/perfil-pedidos-plans.html',
					controller: 'perfilPedidosPlansCtrl'
				}
			}
			
	}).state('search-pedidos-plans.perfil-strefunds-plans', {
		url: '/:idPed', 
		views: {
				'': { 
					templateUrl: 'view/perfil-strefunds-plans.html',
					controller: 'perfilStrefundsPlansCtrl'
				}
			}
			
	}).state('search-pedidos-plans.historico-pedidos-plans', {
		url: '/:idPed/:order_id', 
		views: {
				'': { 
					templateUrl: 'view/historico-pedidos-plans.html',
					controller: 'historicoPedidosPlansCtrl'
				}
			}
			
	}).state('exportar-pedidos-plans', {
		url: '/exportarPedidosPlans', 
		views: {
				'': { 
					templateUrl: 'view/exportar-pedidos-plans.html',
					controller: 'exportarPedidosPlansCtrl'
				},
				'menu@exportar-pedidos-plans': { templateUrl: 'view/menu.html' }
			}
			
	}).state('emails', {
		url: '/emails', 
		views: {
				'': { 
					templateUrl: 'view/emails.html',
					controller: 'emailsCtrl'
				},
				'menu@emails': { templateUrl: 'view/menu.html' }
			}
			
	}).state('terminos-condiciones', {
		url: '/terminosCondiciones', 
		views: {
				'': { 
					templateUrl: 'view/terminos-condiciones.html',
					controller: 'terminosCondicionesCtrl'
				},
				'menu@terminos-condiciones': { templateUrl: 'view/menu.html' }
			}
			
	}).state('adicionar-terminos-condiciones', {
		url: '/adicionarTerminosCondiciones', 
		views: {
				'': { 
					templateUrl: 'view/adicionar-terminos-condiciones.html',
					controller: 'adicionarTerminosCondicionesCtrl'
				},
				'menu@adicionar-terminos-condiciones': { templateUrl: 'view/menu.html' }
			}
			
	}).state('editar-terminos-condiciones', {
		url: '/editarTerminosCondiciones/:id', 
		views: {
			'': { 
				templateUrl: 'view/editar-terminos-condiciones.html',
				controller: 'editarTerminosCondicionesCtrl'
			},
			'menu@editar-terminos-condiciones': { templateUrl: 'view/menu.html' }
		}

	}).state('search-terminos-condiciones', {
		url: '/:start_at/:finish_at', 
		views: {
			'': { 
				templateUrl: 'view/search-terminos-condiciones.html',
				controller: 'searchTerminosCondicionesCtrl'
			},
			'menu@search-terminos-condiciones': { templateUrl: 'view/menu.html' }
		}

	}).state('videos-admin', {
		url: '/videosAdmin', 
		views: {
			'': { 
				templateUrl: 'view/videos-admin.html',
				controller: 'videosAdminCtrl'
			},
			'menu@videos-admin': { templateUrl: 'view/menu.html' }
		}
	}).state('cargue-tienda-cidad', {
		url: '/cargueTiendaCidad', 
		views: {
			'': { 
				templateUrl: 'view/cargue-tienda-cidad.html',
				controller: 'cargueTiendaCidadCtrl'
			},
			'menu@cargue-tienda-cidad': { templateUrl: 'view/menu.html' }
		}

	}).state('restaurantes', {
		url: '/restaurantes', 
		views: {
			'': { 
				templateUrl: 'view/restaurantes.html',
				controller: 'restaurantesCtrl'
			},
			'menu@restaurantes': { templateUrl: 'view/menu.html' }
		}

	}).state('restaurantes-ordenes', {
		url: '/restaurantesOrdenes', 
		views: {
			'': { 
				templateUrl: 'view/restaurantes-ordenes.html',
				controller: 'restaurantesOrdenesCtrl'
			},
			'menu@restaurantes-ordenes': { templateUrl: 'view/menu.html' }
		}

	}).state('search-restaurantes-ordenes', {
		url: '/searchRestaurantesOrdenes/:text/:status/:begin/:end',
		views: {
			 '': { 
				 templateUrl: 'view/search-restaurantes-ordenes.html',
				 controller: 'searchRestaurantesOrdenesCtrl'
			 },
			 'menu@search-restaurantes-ordenes': { templateUrl: 'view/menu.html' }
		}		
	
	}).state('restaurantes-categorias', {
		url: '/restaurantesCategorias', 
		views: {
			'': { 
				templateUrl: 'view/restaurantes-categorias.html',
				controller: 'restaurantesCategoriasCtrl'
			},
			'menu@restaurantes-categorias': { templateUrl: 'view/menu.html' }
		}

	}).state('search-restaurantes-categorias', {
		url: '/searchRestaurantesCategorias/:text',
		views: {
			 '': { 
				 templateUrl: 'view/search-restaurantes-categorias.html',
				 controller: 'searchRestaurantesCategoriasCtrl'
			 },
			 'menu@search-restaurantes-categorias': { templateUrl: 'view/menu.html' }
		}		
	
	}).state('listado-marcas', {
		url: '/listadoMarcas', 
		views: {
			'': { 
				templateUrl: 'view/listado-marcas.html',
				controller: 'listadoMarcasCtrl'
			},
			'menu@listado-marcas': { templateUrl: 'view/menu.html' }
		}

	}).state('search-listado-marcas', {
		url: '/searchListadoMarcas/:text',
		views: {
			 '': { 
				 templateUrl: 'view/search-listado-marcas.html',
				 controller: 'searchListadoMarcasCtrl'
			 },
			 'menu@search-listado-marcas': { templateUrl: 'view/menu.html' }
		}		
	
	}).state('listado-restaurantes', {
		url: '/listadoRestaurantes',
		views: {
			 '': { 
				 templateUrl: 'view/listado-restaurantes.html',
				 controller: 'listadoRestaurantesCtrl'
			 },
			 'menu@listado-restaurantes': { templateUrl: 'view/menu.html' }
		}		
	
	}).state('search-listado-restaurantes', {
		url: '/searchListadoRestaurantes/:text',
		views: {
			 '': { 
				 templateUrl: 'view/search-listado-restaurantes.html',
				 controller: 'searchListadoRestaurantesCtrl'
			 },
			 'menu@search-listado-restaurantes': { templateUrl: 'view/menu.html' }
		}		
	
	}).state('refunds-restaurantes', {
		url: '/refundsRestaurantes',
		views: {
			 '': { 
				 templateUrl: 'view/refunds-restaurantes.html',
				 controller: 'refundsRestaurantesCtrl'
			 },
			 'menu@refunds-restaurantes': { templateUrl: 'view/menu.html' }
		}		
	
	}).state('search-refunds-restaurantes', {
		url: '/searchRefundsRestaurantes/:text/:begin/:end',
		views: {
			 '': { 
				 templateUrl: 'view/search-refunds-restaurantes.html',
				 controller: 'searchRefundsRestaurantesCtrl'
			 },
			 'menu@search-refunds-restaurantes': { templateUrl: 'view/menu.html' }
		}		
	
	}).state('restaurantes-ordenes.perfil-restaurantes-ordenes', {
		url: '/:idPed', 
		views: {
				'': { 
					templateUrl: 'view/perfil-restaurantes-ordenes.html',
					controller: 'perfilRestaurantesOrdenesCtrl'
				}
			}
			
	}).state('search-restaurantes-ordenes.perfil-restaurantes-ordenes', {
		url: '/:idPed', 
		views: {
				'': { 
					templateUrl: 'view/perfil-restaurantes-ordenes.html',
					controller: 'perfilRestaurantesOrdenesCtrl'
				}
			}
			
	}).state('restaurantes-ordenes.perfil-restaurantes-historico', {
		url: '/:idPed/:order_id', 
		views: {
				'': { 
					templateUrl: 'view/perfil-restaurantes-historico.html',
					controller: 'perfilRestaurantesHistoricoCtrl'
				}
			}
			
	}).state('search-restaurantes-ordenes.perfil-restaurantes-historico', {
		url: '/:idPed/:order_id', 
		views: {
			'': { 
				templateUrl: 'view/perfil-restaurantes-historico.html',
				controller: 'perfilRestaurantesHistoricoCtrl'
			}
		}			

	}).state('refunds-restaurantes.perfil-restaurantes-ordenes', {
		url: '/:idPed', 
		views: {
				'': { 
					templateUrl: 'view/perfil-restaurantes-ordenes.html',
					controller: 'perfilRestaurantesOrdenesCtrl'
				}
			}
			
	}).state('refunds-restaurantes.perfil-restaurantes-historico', {
		url: '/:idPed/:order_id',
		views: {
			 '': { 
				 templateUrl: 'view/perfil-restaurantes-historico.html',
				 controller: 'perfilRestaurantesHistoricoCtrl'
			 }			 
		}		
	
	}).state('search-refunds-restaurantes.perfil-restaurantes-ordenes', {
		url: '/:idPed', 
		views: {
				'': { 
					templateUrl: 'view/perfil-restaurantes-ordenes.html',
					controller: 'perfilRestaurantesOrdenesCtrl'
				}
			}
			
	}).state('search-refunds-restaurantes.perfil-restaurantes-historico', {
		url: '/:idPed/:order_id',
		views: {
			 '': { 
				 templateUrl: 'view/perfil-restaurantes-historico.html',
				 controller: 'perfilRestaurantesHistoricoCtrl'
			 }			 
		}		
	
	}).state('redimidos', {
		url: '/redimidos',
		views: {
			 '': { 
				 templateUrl: 'view/redimidos.html',
				 controller: 'redimidosCtrl'
			 }			 
		}		
	
	}).state('search-redimidos', {
		url: '/searchRedimidos/:text',
		views: {
			 '': { 
				 templateUrl: 'view/search-redimidos.html',
				 controller: 'searchRedimidosCtrl'
			 }			 
		}		
	
	}).state('no-redimidos', {
		url: '/noRedimidos',
		views: {
			 '': { 
				 templateUrl: 'view/no-redimidos.html',
				 controller: 'noRedimidosCtrl'
			 }			 
		}		
	
	}).state('search-no-redimidos', {
		url: '/searchNoRedimidos/:text',
		views: {
			 '': { 
				 templateUrl: 'view/search-no-redimidos.html',
				 controller: 'searchNoRedimidosCtrl'
			 }			 
		}		
	
	}).state('riesgo', {
		url: '/riesgo',
		views: {
			 '': { 
				 templateUrl: 'view/riesgo.html',
				 controller: 'riesgoCtrl'
			 }			 
		}		
	
	}).state('adicionar-riesgo', {
		url: '/adicionarRiesgo',
		views: {
			 '': { 
				 templateUrl: 'view/adicionar-riesgo.html',
				 controller: 'adicionarRiesgoCtrl'
			 }			 
		}		
	
	}).state('editar-riesgo', {
		url: '/editarRiesgo/:id',
		views: {
			 '': { 
				 templateUrl: 'view/editar-riesgo.html',
				 controller: 'editarRiesgoCtrl'
			 }			 
		}		
	
	}).state('exportar-logistica', {
		url: '/exportarLogistica',
		views: {
			 '': { 
				 templateUrl: 'view/exportar-logistica.html',
				 controller: 'exportarLogisticaCtrl'
			 }			 
		}		
	
	}).state('tallas', {
		url: '/tallas',
		views: {
			 '': { 
				 templateUrl: 'view/tallas.html',
				 controller: 'tallasCtrl'
			 }			 
		}		
	
	}).state('adicionar-tallas', {
		url: '/adicionarTallas',
		views: {
			 '': { 
				 templateUrl: 'view/adicionar-tallas.html',
				 controller: 'adicionarTallasCtrl'
			 }			 
		}		
	
	}).state('editar-tallas', {
		url: '/editarTallas/:id',
		views: {
			 '': { 
				 templateUrl: 'view/editar-tallas.html',
				 controller: 'editarTallasCtrl'
			}			 
		}		
	
	}).state('sem-coberturas', {
		url: '/semCoberturas',
		views: {
			 '': { 
				 templateUrl: 'view/sem-coberturas.html',
				 controller: 'semCoberturasCtrl'
			}			 
		}		
	
	}).state('error-login', {
		url: '/errorLogin',
		views: {
			 '': { 
				 templateUrl: 'view/error-login.html',
				 controller: 'errorLoginCtrl'
			}			 
		}		
	
	}).state('shoppers', {
		url: '/shoppers',
		views: {
			 '': { 
				 templateUrl: 'view/shoppers.html',
				 controller: 'shoppersCtrl'
			}			 
		}		
	
	}).state('search-shoppers', {
		url: '/searchShoppers/:text/:tienda',
		views: {
			 '': { 
				 templateUrl: 'view/search-shoppers.html',
				 controller: 'searchShoppersCtrl'
			}			 
		}		
	
	}).state('desativar-cidades', {
		url: '/desativarCidades',
		views: {
			 '': { 
				 templateUrl: 'view/desativar-cidades.html',
				 controller: 'desativarCidadesCtrl'
			}			 
		}		
	
	}).state('search-desativar-cidades', {
		url: '/searchDesativarCidades/:text',
		views: {
			 '': { 
				 templateUrl: 'view/search-desativar-cidades.html',
				 controller: 'searchDesativarCidadesCtrl'
			}			 
		}		
	
	}).state('adicionar-shoProdutos', {
		url: '/adicionarShoProdutos',
		views: {
			 '': { 
				 templateUrl: 'view/adicionar-shoProdutos.html',
				 controller: 'adicionarShoProdutosCtrl'
			}			 
		}		
	
	}).state('perfil-shoProdutos', {
		url: '/perfilShoProdutos/:id',
		views: {
			 '': { 
				 templateUrl: 'view/perfil-shoProdutos.html',
				 controller: 'perfilShoProdutosCtrl'
			 },
			 'menu@perfil-shoProdutos': { templateUrl: 'view/menu.html' }
		 }
		 
	}).state('search-perfil-shoProdutos', {
		url: '/searchPerfilShoProdutos/:id/:status/:genero/:text',
		views: {
			'': { 
				templateUrl: 'view/search-perfil-shoProdutos.html',
				controller: 'searchPerfilShoProdutosCtrl'
			}			 
		}		
	
	}).state('challenges', {
		url: '/challenges',
		views: {
			'': { 
				templateUrl: 'view/challenges.html',
				controller: 'challengesCtrl'
			}			 
		}		
	
	}).state('search-challenges', {
		url: '/searchChallenges/:text',
		views: {
			'': { 
				templateUrl: 'view/search-challenges.html',
				controller: 'searchChallengesCtrl'
			}			 
		}		
	
	}).state('perfil-challenges', {
		url: '/perfilChallenges/:alias',
		views: {
			'': { 
				templateUrl: 'view/perfil-challenges.html',
				controller: 'perfilChallengesCtrl'
			}			 
		}		
	
	}).state('adicionar-challenges', {
		url: '/adicionarChallenges',
		views: {
			'': { 
				templateUrl: 'view/adicionar-challenges.html',
				controller: 'adicionarChallengesCtrl'
			}			 
		}		
	
	}).state('editar-challenges', {
		url: '/editarChallenges/:alias',
		views: {
			'': { 
				templateUrl: 'view/editar-challenges.html',
				controller: 'editarChallengesCtrl'
			}			 
		}		
	
	}).state('categorizacao', {
		url: '/categorizacao',
		views: {
			'': { 
				templateUrl: 'view/categorizacao.html',
				controller: 'categorizacaoCtrl'
			}			 
		}		
	
	}).state('categorizacao-paca', {
		url: '/categorizacaoPaca',
		views: {
			'': { 
				templateUrl: 'view/categorizacao-paca.html',
				controller: 'categorizacaoPacaCtrl'
			}			 
		}		
	
	}).state('usuarios-test', {
		url: '/usuariosTest',
		views: {
			'': { 
				templateUrl: 'view/usuarios-test.html',
				controller: 'usuariosTestCtrl'
			}			 
		}		
	
	
	}).state('todos-usuarios-test', {
		url: '/todosUsuariosTest',
		views: {
			'': { 
				templateUrl: 'view/todos-usuarios-test.html',
				controller: 'todosUsuariosTestCtrl'
			}			 
		}		
	
	
	}).state('search-todos-usuarios-test', {
		url: '/searchTodosUsuariosTest/:text',
		views: {
			'': { 
				templateUrl: 'view/search-todos-usuarios-test.html',
				controller: 'searchTodosUsuariosTestCtrl'
			}			 
		}		
	
	
	}).state('search-usuarios-test', {
		url: '/searchUsuariosTest/:text',
		views: {
			'': { 
				templateUrl: 'view/search-usuarios-test.html',
				controller: 'searchUsuariosTestCtrl'
			}			 
		}		
	
	
	}).state('search-usuarios-test.modulo', {
		url: '/:id',
		views: {
			'': { 
				templateUrl: 'view/modulo-user-test.html',
				controller: 'moduloUserTestCtrl'
			}			 
		}		
	
	
	}).state('todos-usuarios-test.modulo', {
		url: '/:id', 
		views: {
				'': { 
					templateUrl: 'view/modulo-user-test.html',
					controller: 'moduloUserTestCtrl'
				}
			}
			
	}).state('usuarios-test.modulo', {
		url: '/:id', 
		views: {
				'': { 
					templateUrl: 'view/modulo-user-test.html',
					controller: 'moduloUserTestCtrl'
				}
			}
			
	}).state('lorob2b', {
		url: '/lorob2b', 
		views: {
				'': { 
					templateUrl: 'view/lorob2b.html',
					controller: 'lorob2bCtrl'
				}
			}
			
	}).state('adicionar-lorob2b', {
		url: '/adicionarLorob2b', 
		views: {
				'': { 
					templateUrl: 'view/adicionar-lorob2b.html',
					controller: 'adicionarLorob2bCtrl'
				}
			}
			
	}).state('search-lorob2b', {
		url: '/searchLorob2b/:text', 
		views: {
				'': { 
					templateUrl: 'view/search-lorob2b.html',
					controller: 'searchLorob2bCtrl'
				}
			}
			
	}).state('perfil-lorob2b', {
		url: '/perfilLorob2b/:id', 
		views: {
				'': { 
					templateUrl: 'view/perfil-lorob2b.html',
					controller: 'perfilLorob2bCtrl'
				}
			}
			
	}).state('perfil-lorob2b.criar-usuarios', {
		url: '/criarUsuarios/:id', 
		views: {
				'': { 
					templateUrl: 'view/criar-usuarios.html',
					controller: 'criarUsuariosCtrl'
				}
			}
			
	}).state('perfil-lorob2b.subir-credito', {
		url: '/subirCredito/:id', 
		views: {
				'': { 
					templateUrl: 'view/subir-credito.html',
					controller: 'subirCreditoCtrl'
				}
			}
			
	}).state('perfil-lorob2b.distribuir-credito', {
		url: '/distribuirCredito/:id', 
		views: {
				'': { 
					templateUrl: 'view/distribuir-credito.html',
					controller: 'distribuirCreditoCtrl'
				}
			}
			
	}).state('perfil-lorob2b.ativar-landpage', {
		url: '/ativarLandpage/:id', 
		views: {
				'': { 
					templateUrl: 'view/ativar-landpage.html',
					controller: 'ativarLandpageCtrl'
				}
			}
			
	}).state('perfil-lorob2b.editar-credito', {
		url: '/editarCredito/:id/:idCharge', 
		views: {
				'': { 
					templateUrl: 'view/editar-credito.html',
					controller: 'editarCreditoCtrl'
				}
			}
			
	});
});
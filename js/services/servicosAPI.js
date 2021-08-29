angular.module("sop").factory("servicosAPI", function($http, baseAPI){
	
	$http.defaults.headers.common['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo0MDYyMSwiZXhwIjoxNjE5MTg2ODA2fQ.Xkh273-gPngxgOjUlZ17MK4PxQDZtxozr6Ir9OeNV0E';

	//Login
	var _postLogin = function(dados){
		/*return $http({
			method: 'POST', 
			url: 'https://api.loro.com.co/auth/admin_login', 
			data: dados,
			headers: {
				"Authorization": undefined,
				"Accept": "application/vnd.wishback.v3+json",
			}
		});*/
		return $http({
			method: 'POST', 
			url: 'https://www-mongo-backend.loro.com.co/admin/auth/login', 
			data: dados,
			headers: {
				"Authorization": undefined,
				"Content-Type": "application/json",
			},			
		});
	};

	var _validaLogin = function(token){
		return $http({
			method: 'GET', 
			url: 'https://www-mongo-backend.loro.com.co/api/mb/user/verify-token', 
			headers: {
				"Authorization": "bearer "+token,
			  	"Content-Type": "application/json",
			}
		});
	};
	//

	//Pedidos
	var _getPedidos = function(page){
		return $http({method: 'GET', url: baseAPI.baseURL + 'api/wb/admin/orders?page='+page});
	};

	var _dtlPedidos = function(id){
		return $http({method: 'GET', url: baseAPI.baseURL + 'api/wb/admin/orders/'+id});
	};

	var _csvPedidos = function(data1, data2, tienda){

		if(data1 != 'NaN-NaN-NaN' && !tienda){
			console.log('data1');
			var datas = 'begin='+data1+'&end='+data2;
		}else{
			var datas = '';
		}

		if(tienda && data1 == 'NaN-NaN-NaN'){
			console.log('loja');
			var tiends = 'store='+tienda;
		}else{
			var tiends = '';
		}

		console.log(data1, data2, tienda);

		if(data1 != 'NaN-NaN-NaN' && tienda){
			console.log('tudo');
			var tudo = 'begin='+data1+'&end='+data2+'&store='+tienda;
		}else{
			var tudo = '';
		}

		return $http({method: 'GET', url: baseAPI.baseURL + 'api/wb/admin/export-orders?'+datas+tiends+tudo});
	};

	var _searchPedidos = function(text, status, begin, end, page){

		if(text){
			var text = 'search='+text+'&'
		}else{
			var text = '';
		}

		if(status){
			var status = 'state='+status+'&';
		}else{
			var status = '';
		}

		if(begin){
			var begin = 'begin='+begin+'&';
		}else{
			var begin = '';
		}

		if(end){
			var end = 'end='+end+'&';
		}else{
			var end = '';
		}

		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/orders?'+text+status+begin+end+'page='+page});
	};

	var _payPedidos = function(id){
		return $http({method: 'GET', url: baseAPI.baseURL + 'api/wb/admin/orders/'+id});
	};

	var _historicoPedidos = function(id){
		return $http({method: 'GET', url: baseAPI.baseURL + 'api/wb/admin/paymentz-status/'+id});
	};

	var _putEstadosOrdens = function(id, dados){
		return $http({
			method: 'PUT', 
			url: baseAPI.baseURL + 'api/wb/admin/order/update-state/'+id,
			data: dados
		});
	};

	var _putMudaTiendas = function(idStore, id){
		return $http({
			method: 'PUT', 
			url: baseAPI.baseURL + 'api/wb/admin/order/update-store/'+id,
			data: {'store_id': idStore}
		});
	};
	//


	//Pedidos PLANS
	var _getPedidosPlans = function(page){
		return $http({method: 'GET', url: baseAPI.baseURL + 'api/wb/admin/orders-plans?page='+page});
	};

	var _dtlPedidosPlans = function(id){
		return $http({method: 'GET', url: baseAPI.baseURL + 'api/wb/admin/orders-plans/'+id});
	};

	var _csvPedidosPlans = function(data1, data2, tienda){

		if(data1 != 'NaN-NaN-NaN' && !tienda){
			console.log('data1');
			var datas = 'begin='+data1+'&end='+data2;
		}else{
			var datas = '';
		}

		if(tienda && data1 == 'NaN-NaN-NaN'){
			console.log('loja');
			var tiends = 'store='+tienda;
		}else{
			var tiends = '';
		}

		console.log(data1, data2, tienda);

		if(data1 != 'NaN-NaN-NaN' && tienda){
			console.log('tudo');
			var tudo = 'begin='+data1+'&end='+data2+'&store='+tienda;
		}else{
			var tudo = '';
		}

		return $http({method: 'GET', url: baseAPI.baseURL + 'api/wb/admin/export-orders-plans?'+datas+tiends+tudo});
	};

	var _searchPedidosPlans = function(text, status, begin, end, page){
		return $http({method: 'GET', url: baseAPI.baseURL + 'api/wb/admin/orders-plans?search='+text+'&state='+status+'&begin='+begin+'&end='+end+'&page='+page});
	};

	var _payPedidosPlans = function(id){
		return $http({method: 'GET', url: baseAPI.baseURL + 'api/wb/admin/orders-plans/'+id});
	};

	var _historicoPedidosPlans = function(id){
		return $http({method: 'GET', url: baseAPI.baseURL + 'api/wb/admin/paymentz-status-plans/'+id});
	};

	var _putNovosDados = function(id, name, last_name, phone_number){
		return $http({
			method: 'PUT', 
			url: baseAPI.baseURL + 'api/wb/admin/update-order/'+id+'?name='+name+'&last_name='+last_name+'&phone_number='+phone_number
		});
	};
	//

	
	//Refunds
	var _getRefunds = function(page){
		return $http({method: 'GET', url: baseAPI.baseURL + 'api/wb/admin/orders?state=opened&page='+page});
	};

	var _searchRefunds = function(text, begin, end, page){

		if(text){
			var text = 'search='+text+'&'
		}else{
			var text = '';
		}
		if(begin && end){
			var datas = 'begin='+begin+'&end='+end+'&'
		}else{
			var datas = '';
		}

		return $http({method: 'GET', url: baseAPI.baseURL + 'api/wb/admin/orders?state=opened&'+text+datas+'page='+page});
	};

	var _postRefunds = function(id, dados){
		return $http({
					method: 'POST', 
					url: baseAPI.baseURL + 'api/wb/admin/refund/'+id,
					data: dados});
	};

	var _csvRefunds = function(data1, data2){
		return $http({method: 'GET', url: baseAPI.baseURL + 'api/wb/admin/export-refunds?begin='+data1+'&end='+data2});
	};
	//
	
	//Categorias
	var _getCategorias = function(page){
		return $http({method: 'GET', url: baseAPI.baseURL + 'api/wb/admin/category?page='+page});
	};

	var _dtlCategorias = function(idCat){
		return $http({method: 'GET', url: baseAPI.baseURL + 'api/wb/admin/category/'+idCat});
	};

	var _postCategorias = function(dados){
		return $http({
					method: 'POST', 
					url: baseAPI.baseURL + 'api/wb/admin/category',
					data: dados});
	};

	var _putCategorias = function(idCat, dados){
		return $http({
					method: 'PUT', 
					url: baseAPI.baseURL + 'api/wb/admin/category/'+idCat,
					data: dados});
	};

	var _postDeepLinks = function(urlBase, jsonSendChall, token){
		return $http({
			method: 'POST', 
			url: urlBase,
			data: jsonSendChall,
			headers: {
				"Authorization": "bearer "+token
			}
		});
	};

	var _publicidadeCategorias = function(idCat, dados){
		return $http({
					method: 'PUT', 
					url: baseAPI.baseURL + 'api/wb/admin/category/'+idCat,
					data: dados});
	};

	var _searchCategorias = function(text, status, page){

		if(text){
			var text = 'search='+text+'&'
		}else{
			var text = '';
		}

		if(status == 1){
			var status = 'is_active=true&';
		}else if(status == 2){
			var status = 'is_active=false&';
		}else{
			var status = '';
		}

		return $http({method: 'GET', url: baseAPI.baseURL + 'api/wb/admin/category?'+text+status+'page='+page});
	};
	//
	
	//Produtos
	var _getProductos = function(page){
		return $http({method: 'GET', url: baseAPI.baseURL + 'api/wb/admin/product?order_by=name&order=asc&page='+page+'&challenge=true'});
	};

	var _dtlProductos = function(idProd){
		return $http({method: 'GET', url: baseAPI.baseURL + 'api/wb/admin/product/'+idProd});
	};

	var _putProductos = function(idProd, dADos){
		return $http({
					method: 'PUT', 
					url: baseAPI.baseURL + 'api/wb/admin/product/'+idProd,
					data: dADos});
	};

	var _searchProductos = function(text, tienda, page){

		if(text){
			var text = 'search='+text+'&'
		}else{
			var text = '';
		}
		if(tienda){
			var tienda = 'store='+tienda+'&'
		}else{
			var tienda = '';
		}

		if(status == 1){
			var status = 'is_active=true&';
		}else if(status == 2){
			var status = 'is_active=false&';
		}else{
			var status = '';
		}

		return $http({method: 'GET', url: baseAPI.baseURL + 'api/wb/admin/product?'+text+tienda+status+'page='+page});
	};
	//
	
	//Tiendas
	var _getTiendas = function(page){
		return $http({method: 'GET', url: baseAPI.baseURL + 'api/wb/admin/store?page='+page});
	};

	var _getCateTienda = function(page){
		return $http({method: 'GET', url: baseAPI.baseURL + 'api/wb/admin/store-categories?page='+page});
	};

	var _getComerciais = function(){
		return $http({method: 'GET', url: baseAPI.baseURL + 'api/wb/pickers/malls'});
	};

	var _searchCateTienda = function(text, page){
		return $http({method: 'GET', url: baseAPI.baseURL + 'api/wb/admin/store-categories?search='+text+'&page='+page});
	};

	var _dtlCateTienda = function(id){
		return $http({method: 'GET', url: baseAPI.baseURL + 'api/wb/admin/store-categories/'+id});
	};

	var _dtlTiendas = function(idTien){
		return $http({method: 'GET', url: baseAPI.baseURL + 'api/wb/admin/store/'+idTien});
	};

	var _putTiendas = function(idTien, dados){
		return $http({
					method: 'POST', 
					url: baseAPI.baseURL + 'api/wb/admin/discount/store/'+idTien,
					data: dados});
	};

	var _putTiendas2 = function(idTien, dados){
		return $http({
					method: 'PUT', 
					url: baseAPI.baseURL + 'api/wb/admin/store/'+idTien,
					data: dados});
	};

	var _postQuitar = function(idTien){
		return $http({
					method: 'GET', 
					url: 'https://social-backend.loro.com.co/api/reverse-discount?store='+idTien});
	};

	var _publicidadeTiendas = function(idTien, dados){
		return $http({
					method: 'PUT', 
					url: baseAPI.baseURL + 'api/wb/admin/store/'+idTien,
					data: dados});
	};

	var _postTiendas = function(dados){
		return $http({
					method: 'POST', 
					url: baseAPI.baseURL + 'api/wb/admin/store',
					data: dados});
	};

	var _searchTiendas = function(text, status, page){

		if(text){
			var text = 'search='+text+'&';
		}else{
			var text = '';
		}

		if(status == 1){
			var status = 'is_active=true&';
		}else if(status == 2){
			var status = 'is_active=false&';
		}else{
			var status = '';
		}

		return $http({method: 'GET', url: baseAPI.baseURL + 'api/wb/admin/store?'+text+status+'page='+page+'&orderby=name&order=desc'});
	};
	//

	var _searchTiendas2 = function(text, status, page){

		if(text){
			var text = 'store_id='+text+'&';
		}else{
			var text = '';
		}

		if(status == 1){
			var status = 'is_active=true&';
		}else if(status == 2){
			var status = 'is_active=false&';
		}else{
			var status = '';
		}

		return $http({method: 'GET', url: baseAPI.baseURL + 'api/wb/admin/store?'+text+status+'page='+page+'&orderby=name&order=desc&challenge=true'});
	};
	//

	//Pasillos
	var _getPasillos = function(id, page){
		return $http({method: 'GET', url: baseAPI.baseURL + 'api/wb/admin/hall?store='+id+'&page='+page});
	};

	var _dtlPasillos = function(id){
		return $http({method: 'GET', url: baseAPI.baseURL + 'api/wb/admin/hall/'+id});
	};

	var _putPasillos = function(id, dados){
		return $http({
					method: 'PUT', 
					url: baseAPI.baseURL + 'api/wb/admin/hall/'+id,
					data: dados});
	};

	var _postPasillos = function(dados){
		return $http({
					method: 'POST', 
					url: baseAPI.baseURL + 'api/wb/admin/hall',
					data: dados});
	};

	var _searchPasillos = function(text, store_id, page){
		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/hall?search='+text+'&store='+store_id+'&page='+page});
	};

	var _getTags = function(hall_id, store_id){
		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/hall-dictionary?hall_id='+hall_id+'&store_id='+store_id});
	};

	var _postTags = function(dados){
		return $http({
					method: 'POST', 
					url: baseAPI.baseURL + 'api/wb/admin/hall-dictionary',
					data: dados});
	};
	//

	//Logistica
	var _getLogistica = function(page){
		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/order/shipment-quote?page='+page+'&page_size=50'});
	};

	var _getExportarLogistica = function(data1, data2){
		console.log(data1, data2);
		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/export-order-shipment?initial_date='+data1+'&final_date='+data2});
	};

	var _dtlLogistica = function(id){
		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/order/shipment-quote?id='+id});
	};

	var _searchLogistica = function(id, data1, data2, page){

		if(id){
			var id = 'store_id='+id+'&'
		}else{
			var id = '';
		}
		if(data1 && data2){
			var datas = 'initial_date='+data1+'&final_date='+data2+'&'
		}else{
			var datas = '';
		}

		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/order/shipment-quote?'+id+datas+'page='+page+'&page_size=50'});
	};

	var _search2Logistica = function(id, transportadora, data1, data2, hra1, hra2, buscar, page){

		console.log(id, transportadora, data1, data2, hra1, hra2, buscar, page);

		if(id){
			var id = 'store_id='+id+'&'
		}else{
			var id = '';
		}

		if(transportadora){
			var transportadora = 'carrier_code='+transportadora+'&'
		}else{
			var transportadora = '';
		}

		if(hra1 && hra2){
			var hra1 = ' '+hra1;
			var hra2 = ' '+hra2;
		}else{
			var hra1 = '';
			var hra2 = '';
		}

		if(data1 && data2){
			var datas = 'initial_date='+data1+hra1+'&final_date='+data2+hra2+'&'
		}else{
			var datas = '';
		}

		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/order/shipment-quote?search='+buscar+'&'+id+transportadora+datas+'page='+page+'&page_size=50'});
	};

	var _encomendasLogistica = function(page){
		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/order/shipment?page='+page+'&page_size=50'});
	};

	var _searchEncomendasLogistica = function(id,data1,data2,page){

		if(id){
			var id = 'store_id='+id+'&'
		}else{
			var id = '';
		}
		if(data1 && data2){
			var datas = 'initial_date='+data1+'&final_date='+data2+'&'
		}else{
			var datas = '';
		}

		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/order/shipment?'+id+datas+'page='+page+'&page_size=50'});
	};

	var _search2EncomendasLogistica = function(id, transportadora, data1, data2, hra1, hra2, buscar, page){
		
		if(id){
			var id = 'store_id='+id+'&'
		}else{
			var id = '';
		}

		if(transportadora){
			var transportadora = 'carrier_code='+transportadora+'&'
		}else{
			var transportadora = '';
		}

		if(hra1 && hra2){
			var hra1 = ' '+hra1;
			var hra2 = ' '+hra2;
		}else{
			var hra1 = '';
			var hra2 = '';
		}

		if(data1 && data2){
			var datas = 'initial_date='+data1+hra1+'&final_date='+data2+hra2+'&'
		}else{
			var datas = '';
		}

		console.log(id, transportadora, data1, data2, hra1, hra2, buscar, page);

		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/order/shipment?search='+buscar+'&'+id+transportadora+datas+'page='+page+'&page_size=50'});
	};

	var _postLogistica = function(dados){
		return $http({
					method: 'POST', 
					url: baseAPI.baseURL + 'api/wb/admin/order/shipment-quote',
					data: dados});
	};

	var _statusLogistica = function(page){
		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/order/shipment-track?page='+page+'&page_size=50'});
	};

	var _searchStatusLogistica = function(store, carrier, status, data1, data2, page){

		if(store){
			var store = 'store_id='+store+'&'
		}else{
			var store = '';
		}
		if(carrier){
			var carrier = 'carrier_code='+carrier+'&'
		}else{
			var carrier = '';
		}

		if(status){
			var status = 'shipment_status='+status+'&'
		}else{
			var status = '';
		}

		if(data1 && data2){
			var datas = 'initial_date='+data1+'&final_date='+data2+'&'
		}else{
			var datas = '';
		}

		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/order/shipment-track?'+store+carrier+status+datas+'page='+page+'&page_size=50'});
	};

	var _search2StatusLogistica = function(store, carrier, status, data1, data2, hra1, hra2, buscar, page){

		if(store){
			var store = 'store_id='+store+'&'
		}else{
			var store = '';
		}

		if(carrier){
			var carrier = 'carrier_code='+carrier+'&'
		}else{
			var carrier = '';
		}

		if(status){
			var status = 'shipment_status='+status+'&'
		}else{
			var status = '';
		}

		if(hra1 && hra2){
			var hra1 = ' '+hra1;
			var hra2 = ' '+hra2;
		}else{
			var hra1 = '';
			var hra2 = '';
		}

		if(data1 && data2){
			var datas = 'initial_date='+data1+hra1+'&final_date='+data2+hra2+'&'
		}else{
			var datas = '';
		}

		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/order/shipment-track?search='+buscar+'&'+store+carrier+status+datas+'page='+page+'&page_size=50'});
	};

	var _postEncomendasLogistica = function(dados){
		return $http({
					method: 'POST', 
					url: baseAPI.baseURL + 'api/wb/admin/order/shipment',
					data: dados});
	};

	var _postStatusLogistica = function(dados){
		return $http({
					method: 'POST', 
					url: baseAPI.baseURL + 'api/wb/admin/order/shipment-track',
					data: dados});
	};

	var _postEnderecoTiendas = function(dados){
		return $http({
					method: 'POST', 
					url: baseAPI.baseURL + 'api/wb/admin/store-address',
					data: dados});
	};

	var _putEnderecoCotacao = function(id, dados){
		return $http({
					method: 'PUT', 
					url: baseAPI.baseURL + 'api/wb/admin/order/set-address/'+id,
					data: dados});
	};

	var _getEnderecoCotacao = function(id){
		return $http({
					method: 'GET', 
					url: baseAPI.baseURL + 'api/wb/admin/store-address/'+id});
	};
	
	var _getCidade = function(cidade){
		return $http({
			method: 'GET', 
			headers: {
				"Authorization": undefined,
			},
			url: 'https://geo.loro.com.co/loro/autocomplete-ciudad.php?key=989fdg9fg54g8f154g6s4gf464sdf82&ciudad='+cidade});
	};

	var _getDane = function(cidade, estado){
		return $http({
			method: 'GET', 
			headers: {
				"Authorization": undefined,
			},
			url: 'https://geo.loro.com.co/loro/codigo-dane.php?key=989fdg9fg54g8f154g6s4gf464sdf82&ciudad='+cidade+'&departamento='+estado});
	};
	//

	
	//Utilizacion
	var _getUtilizacion = function(page){
		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/log-activity?orderby=id&order=desc&page='+page});
	};

	var _dtlUtilizacion = function(){
		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/log-activity/2'});
	};
	//

	//Sliders
	var _getSliders = function(page){
		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/slider?orderby=name&order=desc&page='+page});
	};

	var _dtlSliders = function(id){
		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/slider/'+id});
	};

	var _putSliders = function(id, dados){
		return $http({
					method: 'PUT', 
					url: baseAPI.baseURL + 'api/wb/admin/slider/'+id,
					data: dados});
	};

	var _searchSliders = function(text, page){
		console.log(text, page);
		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/slider?search='+text+'&orderby=name&order=desc&page='+page});
	};

	var _postSliders = function(dados){
		return $http({
					method: 'POST', 
					url: baseAPI.baseURL + 'api/wb/admin/slider',
					data: dados});
	};
	//

	//Clientes
	var _getClientes = function(page){
		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/user?order_by=name&order=desc&page='+page});
	};

	var _putClientes = function(id, dados){
		return $http({
			method: 'PUT', 
			url: baseAPI.baseURL + 'api/wb/admin/user/'+id,
			data: dados});
	};

	var _putClientesPruebas = function(dados){
		return $http({
			method: 'POST', 
			url: baseAPI.baseURL + 'api/wb/admin/test-users/',
			data: dados});
	};

	var _dtlClientes = function(id, page){
		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/user/'+id+'/order?order_by=name&order=desc&page='+page});
	};

	var _searchClientes = function(active, gender, text, page){

		if(active){
			var active = 'active='+active+'&';
		}else{
			var active = '';
		}

		if(gender){
			var gender = 'gender='+gender+'&';
		}else{
			var gender = '';
		}

		if(text){
			var text = 'search='+text+'&';
		}else{
			var text = '';
		}


		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/user?'+active+gender+text+'order_by=name&order=desc&page='+page});
	};

	var _searchPerfilClientes = function(id, tienda, status, text, page){

		if(tienda){
			var search = 'search='+tienda+'&';
		}else if(status){
			var search = 'search='+status+'&';
		}else if(text){
			var search = 'search='+text+'&';
		}else{
			var search = '';
		}

		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/user/'+id+'/order?'+search+'order_by=name&order=desc&page='+page});
	};

	var _getRelatorios = function(tipo, estato, age1, age2, dta1, dta2, genero, tienda, estatu, buy, entidad, iDentidad){

		if(tipo){
			var tipo = 'type='+tipo+'&';
		}else{
			var tipo = '';
		}

		if(estato){
			var estato = 'active='+estato+'&';
		}else{
			var estato = '';
		}

		if(age1, age2){
			var age1 = 'start_at='+age1+'&';
			var age2 = 'finish_at='+age2+'&';
		}else{
			var age1 = '';
			var age2 = '';
		}

		if(dta1, dta2){
			var dta1 = 'start_at='+dta1+'&';
			var dta2 = 'finish_at='+dta2+'&';
		}else{
			var dta1 = '';
			var dta2 = '';
		}

		if(genero){
			var genero = 'gender='+genero+'&';
		}else{
			var genero = '';
		}

		if(tienda){
			var tienda = 'store_id='+tienda+'&';
		}else{
			var tienda = '';
		}

		if(estatu){
			var estatu = 'state='+estatu+'&';
		}else{
			var estatu = '';
		}

		if(buy){
			var buy = 'buy_by='+buy+'&';
		}else{
			var buy = '';
		}

		if(entidad){
			var entidad = 'entity='+entidad+'&';
		}else{
			var entidad = '';
		}

		if(iDentidad){
			var iDentidad = 'id='+iDentidad+'&';
		}else{
			var iDentidad = '';
		}

		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/user/report?'+tipo+estato+age1+age2+dta1+dta2+genero+tienda+estatu+buy+entidad+iDentidad+'&order_by=name&order=desc'});
	};

	//PUSH
	var _getPush = function(page){
		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/push-notification'});
	};

	var _postPush = function(dados){
		return $http({
			method: 'POST', 
			url: baseAPI.baseURL + 'api/wb/admin/push-notification',
			data: dados});
	};

	var _postPushUsers = function(dados){
		return $http({
			method: 'POST', 
			url: baseAPI.baseURL + 'api/wb/admin/users-notifications',
			data: dados});
	};

	//ESTATISTICAS
	var _getSeguidores = function(id, page){
		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/stats/store-followers/'+id});
	};

	var _getLikes = function(id, page){
		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/stats/store-product-likes/'+id});
	};

	var _getVendidos = function(id, page){
		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/stats/store-most-sales/'+id});
	};

	var _getGustados = function(id, page){
		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/stats/store-most-likes/'+id});
	};

	var _getDiasEstatisticas = function(id, page){
		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/stats/store-sales-date/'+id});
	};

	var _getDemograficosTin = function(id, page){
		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/stats/store-followers-ages/'+id});
	};

	var _getDemograficosPro = function(id, page){
		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/stats/product-likes-ages/'+id});
	};

	var _getPorCidades = function(id, page){
		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/stats/city-sales/'+id});
	};

	//CUPONS
	var _getCupons = function(page){
		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/coupon?page='+page});
	};

	var _getRedimidos = function(page){
		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/users-coupon-redimided?export=true&page='+page
		});
	};

	var _searchRedimidos = function(text, page){
		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/users-coupon-redimided?search='+text+'&export=true&page='+page});
	};

	var _getNoRedimidos = function(page){
		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/users-coupon-not-redimided?page='+page
		});
	};

	var _searchNoRedimidos = function(text, page){
		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/users-coupon-not-redimided?search='+text+'&export=true&page='+page});
	};

	var _dtlCupons = function(id){
		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/coupon/'+id});
	};

	var _searchCupons = function(text, page){
		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/coupon?search='+text+'&page='+page});
	};

	var _postCupons = function(dados){
		return $http({
			method: 'POST', 
			url: baseAPI.baseURL + 'api/wb/admin/coupon',
			data: dados});
	};

	var _putCupons = function(id, dados){
		return $http({
			method: 'PUT', 
			url: baseAPI.baseURL + 'api/wb/admin/coupon/'+id,
			data: dados});
	};
	

	//DIA SIN IVA
	var _csvProductosIVA = function(){
		return $http({
			method: 'GET',
			url: baseAPI.baseURL + 'api/wb/admin/taxfree/product-export'});
	};

	var _getProductosIVA = function(page, limit){
		return $http({
			method: 'GET',
			url: baseAPI.baseURL + 'api/wb/admin/taxfree/product?all=todas'});
	};

	var _searchProductosIVA = function(text, tienda, page, limit){

		if(text){
			var text = 'search='+text+'&'
		}else{
			var text = '';
		}

		if(tienda){
			var tienda = 'store_id='+tienda+'&'
		}else{
			var tienda = '';
		}

		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/taxfree/product?'+text+tienda+'page='+page+'&limit='+limit});
	};

	var _getCategoriasIVA = function(page){
		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/taxfree/category'});
	};

	var _putIVA = function(id, dados){
		return $http({
			method: 'PUT', 
			url: baseAPI.baseURL + 'api/wb/admin/taxfree/product/'+id,
			data: dados});
	};

	var _putsIVA = function(dados){
		return $http({
			method: 'PUT', 
			url: baseAPI.baseURL + 'api/wb/admin/taxfree/productMass',
			data: dados});
	};

	var _getProductos2 = function(page, limit){
		return $http({method: 'GET', url: baseAPI.baseURL + 'api/wb/admin/product?order_by=name&order=asc&page='+page+'&limit='+limit});
	};

	var _searchProductos2 = function(text, tienda, page, limit){

		if(text){
			var text = 'search='+text+'&'
		}else{
			var text = '';
		}

		if(tienda){
			var tienda = 'store='+tienda+'&'
		}else{
			var tienda = '';
		}

		return $http({method: 'GET', url: baseAPI.baseURL + 'api/wb/admin/product?'+text+tienda+'page='+page+'&limit='+limit});
	};
	//

	//MANUTENÇÃO
	var _putManutencao = function(dados){
		return $http({
			method: 'PUT', 
			url: baseAPI.baseURL + 'api/wb/admin/maintenance',
			data: dados});
	}

	var _getManutencao = function(){
		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/maintenance'});
	}
	//


	//TIENDA & CIUDAD
	var _postStoreCity = function(daDos){
		console.log(daDos);
		return $http({
			method: 'POST', 
			url: baseAPI.baseURL + 'api/wb/admin/store-city',
			data: daDos});
	}

	var _putTiendaCity = function(id, daDos){
		console.log(id, daDos);
		return $http({
			method: 'PUT', 
			url: baseAPI.baseURL + 'api/wb/admin/store-city/'+id,
			data: daDos});
	}

	var _getStoreCity = function(id, page){
		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/store-city/'+id+'?orderBy=id&order=DESC&page='+page});
	}

	var _putStoreCity = function(id, dados){
		return $http({
			method: 'PUT', 
			url: baseAPI.baseURL + 'api/wb/admin/store/'+id,
			data: dados});
	};
	
	var _putStoreMass = function(id, dados){
		return $http({
			method: 'PUT', 
			url: baseAPI.baseURL + 'api/wb/admin/store-city-mass-update/'+id,
			data: dados});
	};

	var _rmStoreCity = function(id){
		return $http({
			method: 'DELETE', 
			url: baseAPI.baseURL + 'api/wb/admin/store-city/'+id});
	}

	var _postCargue = function(dados){
		return $http({
			method: 'POST', 
			url: baseAPI.baseURL + 'api/wb/admin/import-stores-city',
			data: dados});
	}
	//

	
	//PREÇOS INCRIVEIS
	var _getAmazing = function(page){
		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/amazing?page='+page+'&per_page=50'});
	}

	var _searchAmazing = function(page, text){

		if(text){
			var text = 'search='+text+'&';
		}else{
			var text = '';
		}

		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/amazing?'+text+'page='+page+'&per_page=50'});
	}

	var _deleteAmazing = function(id){
		return $http({
			method: 'DELETE', 
			url: baseAPI.baseURL + 'api/wb/admin/amazing/'+id});
	}

	var _postAmazing = function(dados){
		return $http({
			method: 'POST', 
			url: baseAPI.baseURL + 'api/wb/admin/amazing',
			data: dados});
	}
	//


	//PREÇOS RECOMENDADOS
	var _getRecomendados = function(page){
		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/recommended?page='+page+'&per_page=50'});
	}

	var _postRecomendados = function(dados){
		return $http({
			method: 'POST', 
			url: baseAPI.baseURL + 'api/wb/admin/recommended',
			data: dados});
	}
	
	var _deleteRecomendados = function(id){
		return $http({
			method: 'DELETE', 
			url: baseAPI.baseURL + 'api/wb/admin/recommended/'+id});
	}

	var _searchRecomendados = function(page, text){

		if(text){
			var text = 'search='+text+'&';
		}else{
			var text = '';
		}

		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/recommended?'+text+'page='+page+'&per_page=50'});
	}
	//


	//ORDEN TIENDAS
	var _getOrden = function(page){

		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/store?page='+page});
	};

	var _searchOrden = function(page, text){
		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/store?search='+text+'&page='+page,
		});
	};

	var _putOrden = function(id, pos){
		return $http({
			method: 'POST', 
			url: baseAPI.baseURL + 'api/wb/admin/store-sort/'+id,
			data: {'sort': pos},
		});
	};
	//

	//KEYWORDS
	var _getWords = function(page){
		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/histories?page='+page,
		});
	};

	var _getDtlWords = function(page){
		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/searches?page='+page,
		});
	};
	

	var _getPerfilKey = function(page, id){
		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/histories/'+id+'/searches?page='+page,
		});
	};

	var _searchPerfilKey = function(page, id, text, begin, end){

		if(text){
			var text = 'search='+text+'&'
		}else{
			var text = '';
		}

		if(begin){
			var begin = 'from='+begin+'&';
		}else{
			var begin = '';
		}

		if(end){
			var end = 'to='+end+'&';
		}else{
			var end = '';
		}

		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/histories/'+id+'/searches?'+text+begin+end+'page='+page,
		});
	};

	var _getKeyUsers = function(page, id){
		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/histories/'+id+'/users?page='+page,
		});
	};

	var _searchKeyUsers = function(page, id, text){
		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/histories/'+id+'/users?search='+text+'&page='+page,
		});
	};

	var _searchWords = function(page, text, begin, end){

		if(text){
			var text = 'search='+text+'&'
		}else{
			var text = '';
		}

		if(begin){
			var begin = 'from='+begin+'&';
		}else{
			var begin = '';
		}

		if(end){
			var end = 'to='+end+'&';
		}else{
			var end = '';
		}


		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/histories?'+text+begin+end+'&page='+page,
		});
	};

	var _searchDtlWords = function(page, text, begin, end){
		if(text){
			var text = 'search='+text+'&'
		}else{
			var text = '';
		}

		if(begin){
			var begin = 'from='+begin+'&';
		}else{
			var begin = '';
		}

		if(end){
			var end = 'to='+end+'&';
		}else{
			var end = '';
		}

		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/searches?'+text+begin+end+'&page='+page,
		});
	};

	var _getDetalhesBusca = function(page, id, text){
		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/histories/'+id+'/users?search='+text+'&page='+page,
		});
	};
	//

	//BLACKLIST
	var _getBlacklist = function(page){
		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/blacklist?page='+page});
	}

	var _postBlacklist = function(dados, type){
		return $http({
			method: 'POST', 
			url: baseAPI.baseURL + 'api/wb/admin/blacklist/'+type,
			data: dados});
	}

	//EMAILS
	var _getEmails = function(id){
		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/store-emails?store_id='+id});
	}

	var _rmvEmails = function(id, dados){
		console.log(dados);
		return $http({
			method: 'DELETE', 
			url: baseAPI.baseURL + 'api/wb/admin/store-emails/'+id,
			data: dados,
			headers: {
				'Content-type': 'application/json;charset=utf-8'
			}
		});

	}

	var _postEmails = function(dados){
		return $http({
			method: 'POST', 
			url: baseAPI.baseURL + 'api/wb/admin/store-emails',
			data: dados});
	}
	//


	//TERMINOS & CONDICIONES
	var _postTerminosCod = function(dados){
		return $http({
			method: 'POST', 
			url: baseAPI.baseURL + 'api/wb/admin/terms-conditions',
			data: dados});
	}

	var _putTerminosCod = function(id, dados){
		return $http({
			method: 'PUT', 
			url: baseAPI.baseURL + 'api/wb/admin/terms-conditions/'+id,
			data: dados});
	}

	var _getTerminosCod = function(page){
		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/terms-conditions?page='+page});
	}

	var _searchTerminosCod = function(page, data1, data2){
		console.log(page, data1, data2);
		return $http({
			method: 'GET',
			url: baseAPI.baseURL + 'api/wb/admin/terms-conditions?page='+page+'&start_at='+data1+'&finish_at='+data2});
	}

	var _getDtlTerminosCod = function(id){
		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/terms-conditions?id='+id});
	}
	//

	//RESTAURANTES
	var _getRestaurantesOrdenes = function(page){
		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/restaurants/orders?page='+page});
	}

	var _dtlRestaurantesOrdenes = function(id){
		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/restaurants/orders/'+id});
	}

	var _searchRestaurantesOrdenes = function(text, status, begin, end, page){

		if(text){
			var text = 'search='+text+'&'
		}else{
			var text = '';
		}

		if(status){
			var status = 'state='+status+'&';
		}else{
			var status = '';
		}

		if(begin){
			var begin = 'begin='+begin+'&';
		}else{
			var begin = '';
		}

		if(end){
			var end = 'end='+end+'&';
		}else{
			var end = '';
		}

		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/restaurants/orders?'+text+status+begin+end+'page='+page});
	};

	var _getRestaurantesCategorias = function(page){
		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/restaurants/categories?page='+page});
	}

	var _searchRestaurantesCategorias = function(text, page){
		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/restaurants/categories?search='+text+'&page='+page});
	}

	var _getListadoMarcas = function(page){
		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/restaurants/restaurants?marks=true&page='+page});
	}

	var _searchListadoMarcas = function(text, page){
		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/restaurants/restaurants?marks=true&search='+text+'&page='+page});
	}

	var _getListadoRestaurantes = function(page){
		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/restaurants/restaurants?page='+page});
	}

	var _searchListadoRestaurantes = function(text, page){
		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/restaurants/restaurants?search='+text+'&page='+page});
	}

	var _getRefundsRestaurantes = function(page){
		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/restaurants/orders?refund=true&page='+page});
	}

	
	var _searchRefundsRestaurantes = function(text, begin, end, page){

		if(text){
			var text = 'search='+text+'&'
		}else{
			var text = '';
		}

		if(begin){
			var begin = 'begin='+begin+'&';
		}else{
			var begin = '';
		}

		if(end){
			var end = 'end='+end+'&';
		}else{
			var end = '';
		}

		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/restaurants/orders?refund=true&'+text+begin+end+'page='+page});
	};

	var _payRestaurantes = function(id){
		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/restaurants/orders/'+id});
	};


	//AREA DE RISCO
	var _getRiesgo = function(page){
		return $http({
			method: 'GET', 
			headers: {
				"Authorization": undefined,
			},
			url: 'https://geo.loro.com.co/loro/area_de_riesgo.php?key=989fdg9fg54g8f154g6s4gf464sdf82&pag='+page});
	};

	var _postRiesgo = function(latitude, longitude, radio){
		return $http({
			method: 'GET', 
			headers: {
				"Authorization": undefined,
			},
			url: 'https://geo.loro.com.co/loro/reg_area_de_riesgo.php?lat='+latitude+'&lng='+longitude+'&radio='+radio+'&key=989fdg9fg54g8f154g6s4gf464sdf82'});
	};

	var _putRiesgo = function(id, latitude, longitude, radio){
		return $http({
			method: 'GET', 
			headers: {
				"Authorization": undefined,
			},
			url: 'https://geo.loro.com.co/loro/update_area_de_riesgo.php?id='+id+'&lat='+latitude+'&lng='+longitude+'&radio='+radio+'&key=989fdg9fg54g8f154g6s4gf464sdf82'});
	};


	//TALLAS
	var _postTallas = function(daDos){
		return $http({
			method: 'PUT', 
			url: baseAPI.baseURL + 'api/wb/admin/talla/1',
			data: daDos});
	}

	var _getTallas = function(page){
		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/talla?orderBy=id&order=DESC&page='+page});
	}

	var _dtlTallas = function(id){
		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/talla/'+id});
	}

	var _putTallas = function(id, daDos){
		return $http({
			method: 'PUT', 
			url: baseAPI.baseURL + 'api/wb/admin/talla/'+id,
			data: daDos});
	}

	//SEM Coberturas
	var _getSemCoberturas = function(page){
		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/users-without-coverage?page='+page});
	}

	//IPs
	var _getIPs = function(){
		return $http({
			method: 'GET', 
			headers: {
				"Authorization": undefined,
			},
			url: 'https://geo.loro.com.co/loro/ip-check.php?key=989fdg9fg54g8f154g6s4gf464sdf82'});
	}
	
	//GET LOJAS
	var _getLOjas = function(){
		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/stores-all'});
	}

	//SHOPPERS
	var _getShoProdutos = function(page){
		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/shoppers/products?order_by=name&order=desc&page='+page});
	};

	//SHOPPERS
	var _getShoCidades = function(page){
		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/shoppers/stores?order_by=name&order=desc&page='+page});
	};

	var _searchShoCidades = function(text, page){
		if(text){
			var text = 'search='+text+'&'
		}else{
			var text = '';
		}
		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/shoppers/stores?'+text+'order_by=name&order=desc&page='+page});
	};

	var _getSearchShoProdutos = function(text, tienda, page){
		
		if(text){
			var text = 'search='+text+'&'
		}else{
			var text = '';
		}

		if(tienda){
			var tienda = 'store_id='+tienda+'&';
		}else{
			var tienda = '';
		}

		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/shoppers/products?'+text+tienda+'&order_by=name&order=desc&page='+page});
	};

	var _getShoStores = function(page){
		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/shoppers/stores?order_by=name&order=desc&page='+page});
	};

	var _postShoProdutos = function(dados){
		return $http({
			method: 'POST', 
			url: baseAPI.baseURL + 'api/wb/shoppers/products',
			data: dados});
	}

	var _dtlShoProdutos = function(id){
		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/shoppers/products/'+id});
	};

	var _putClientes2 = function(id, dados){
		return $http({
			method: 'PUT', 
			url: baseAPI.baseURL + 'api/wb/shoppers/products/'+id,
			data: dados});
	};

	var _putShopCidades = function(id, dados){
		return $http({
			method: 'PUT', 
			url: baseAPI.baseURL + 'api/wb/shoppers/stores/'+id,
			data: dados});
	};
	

	//CHALLENGES
	var _getChallenges = function(pag, token){
		return $http({
			method: 'GET', 
			url: baseAPI.baseURL2 + 'api/admin/challenges?page='+pag,
			headers: {
				"Authorization": "bearer "+token
			}
		});
	};

	var _searchChallenges = function(pag, token, text){
		if(text){
			var text = 'search='+text+'&'
		}else{
			var text = '';
		}

		return $http({
			method: 'GET', 
			url: baseAPI.baseURL2 + 'api/admin/challenges?'+text+'page='+pag,
			headers: {
				"Authorization": "bearer "+token
			}
		});
	};

	var _dtlChallenges = function(alias, token){
		return $http({
			method: 'GET', 
			url: baseAPI.baseURL2 +'api/admin/challenges/'+alias,
			headers: {
				"Authorization": "bearer "+token
			}
		});
	};

	var _getParticipantes = function(pag, alias, token){
		return $http({
			method: 'GET', 
			url: baseAPI.baseURL2 + 'api/admin/challenges/'+alias+'/posts?page='+pag,
			headers: {
				"Authorization": "bearer "+token
			}
		});
	};

	var _validaPosts = function(type, id, token){
		return $http({
			method: 'PUT', 
			url: baseAPI.baseURL2 + 'api/admin/posts/'+id,
			data: {type: type},
			headers: {
				"Authorization": "bearer "+token
			}
		});
	};

	var _putChallenge = function(id, token, dados){
		return $http({
			method: 'PUT', 
			url: baseAPI.baseURL2 + 'api/admin/challenges/'+id,
			data: dados,
			headers: {
				"Authorization": "bearer "+token
			}
		});
	};

	var _postLinkCha = function(alias, description, name, token){
		var dds = {
			"longDynamicLink": 'https://loro.page.link/?link=https://loro.com.co/retos/'+alias+'&apn=co.com.loro&afl=https://loro.com.co/retos/'+alias+'&ofl=https://loro.com.co/retos/'+alias+'&ibi=co.com.loro&ifl=&st='+description+'&sd='+name,
			"suffix": {
				"option": "SHORT"
    		}

		}
		return $http({
			method: 'POST', 
			url: 'https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=AIzaSyAnbBGIiaX08lbi8hl_Vy_O3nGFuyDK70E',
			data: dds,
			headers: {
				"Authorization": "bearer "+token
			}
		});
	};

	var _postLinkDet = function(alias, alias_post, description, name, token){
		var dds = {
			"longDynamicLink": 'https://loro.page.link/?link=https://loro.com.co/retos/'+alias+'/posts/'+alias_post+'&apn=co.com.loro&afl=https://loro.com.co/retos/'+alias+'/posts/'+alias_post+'&ofl=https://loro.com.co/retos/'+alias+'/posts/'+alias_post+'&ibi=co.com.loro&ifl=&st='+description+'&sd='+name,
			"suffix": {
				"option": "SHORT"
			}
		}
		return $http({
			method: 'POST', 
			url: 'https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=AIzaSyAnbBGIiaX08lbi8hl_Vy_O3nGFuyDK70E',
			data: dds,
			headers: {
				"Authorization": "bearer "+token
			}
		});
	};


	//CATEGORIZACION
	//1
	var _getNewCategorias = function(){
		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/parent-categories',
		});
	};

	var _getSubCaterias1 = function(parent_category){
		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/sub-categories/'+parent_category,
		});
	};

	var _getProResult1 = function(lisCatTie2, page){
		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/product-category/'+lisCatTie2+'/?page='+page,
		});
	};

	var _getProResult11 = function(lisCatTie2, page){
		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/category-dictionary/'+lisCatTie2+'/?page='+page,
		});
	};


	//2
	var _getActiveStore = function(){
		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/active-stores',
		});
	};

	var _getSubCaterias2 = function(store_id){
		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/store-halls/'+store_id,
		});
	};

	var _getProResult2 = function(lisCatTie, lisCatTie22, page){
		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/store-products/'+lisCatTie+'/'+lisCatTie22+'/?page='+page,
		});
	};

	var _getProResult22 = function(lisCatTie22, page){
		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/halls-dictionary/'+lisCatTie22+'/?page='+page,
		});
	};

	var _getProResult222 = function(lisCatTie22, page){
		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/store-products/'+lisCatTie22+'/?page='+page,
		});
	};

	//3
	var _postProDictionary1 = function(dados){
		return $http({
			method: 'POST', 
			url: baseAPI.baseURL + 'api/wb/admin/product-dictionary',
			data: dados});
	};

	var _dltProDictionary1 = function(words, merda2){
		return $http({
			method: 'DELETE', 
			url: baseAPI.baseURL + 'api/wb/admin/product-dictionary',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: 'products='+merda2+'&words='+words});
	};

	var _postProDictionary2 = function(dados){
		return $http({
			method: 'POST', 
			url: baseAPI.baseURL + 'api/wb/admin/category-dictionary',
			data: dados});
	};

	var _postProDictionary22 = function(dados){
		return $http({
			method: 'POST', 
			url: baseAPI.baseURL + 'api/wb/admin/halls-dictionary',
			data: dados});
	};

	var _dltPassDictionary1 = function(word_id){
		return $http({
			method: 'DELETE', 
			url: baseAPI.baseURL + 'api/wb/admin/category-dictionary/'+word_id});
	};

	var _dltPassDictionary2 = function(word_id){
		return $http({
			method: 'DELETE', 
			url: baseAPI.baseURL + 'api/wb/admin/halls-dictionary/'+word_id});
	};
	
	//FILTROS PALAVRAS CHAVES
	var _getOrdSearch = function(orderby, order, buscando, page){

		if(order == 1){
			var order = 'asc'
		}else{
			var order = 'desc'
		}

		if(buscando){
			var buscando = '&search='+buscando;
		}else{
			var buscando = '';
		}

		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/histories?order_by='+orderby+'&order='+order+buscando+'&page='+page,
		});
	};

	var _getOrdTotal = function(orderby, order, buscando, page){

		if(order == 3){
			var order = 'asc'
		}else{
			var order = 'desc'
		}

		if(buscando){
			var buscando = '&search='+buscando;
		}else{
			var buscando = '';
		}

		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/histories?order_by='+orderby+'&order='+order+buscando+'&page='+page,
		});
	};

	var _getOrdType = function(orderby, order, buscando, page){

		if(order == 5){
			var order = 'asc'
		}else{
			var order = 'desc'
		}

		if(buscando){
			var buscando = '&search='+buscando;
		}else{
			var buscando = '';
		}

		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/histories?order_by='+orderby+'&order='+order+buscando+'&page='+page,
		});
	};

	var _getOrdCon = function(orderby, order, buscando, page){

		if(order == 7){
			var order = 'asc'
		}else{
			var order = 'desc'
		}

		if(buscando){
			var buscando = '&search='+buscando;
		}else{
			var buscando = '';
		}

		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/histories?order_by='+orderby+'&order='+order+buscando+'&page='+page,
		});
	};

	var _getOrdSin = function(orderby, order, buscando, page){

		if(order == 9){
			var order = 'asc'
		}else{
			var order = 'desc'
		}

		if(buscando){
			var buscando = '&search='+buscando;
		}else{
			var buscando = '';
		}

		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/histories?order_by='+orderby+'&order='+order+buscando+'&page='+page,
		});
	};

	//
	var _getOrdUserId = function(id, orderby, order, buscando, page){

		if(order == 1){
			var order = 'asc'
		}else{
			var order = 'desc'
		}

		if(buscando){
			var buscando = '&search='+buscando;
		}else{
			var buscando = '';
		}

		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/histories/'+id+'/users?order_by='+orderby+'&order='+order+buscando+'&page='+page,
		});
	};

	var _getOrdUserNombre = function(id, orderby, order, buscando, page){

		if(order == 3){
			var order = 'asc'
		}else{
			var order = 'desc'
		}

		if(buscando){
			var buscando = '&search='+buscando;
		}else{
			var buscando = '';
		}

		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/histories/'+id+'/users?order_by='+orderby+'&order='+order+buscando+'&page='+page,
		});
	};

	var _getOrdUserEmail = function(id, orderby, order, buscando, page){

		if(order == 5){
			var order = 'asc'
		}else{
			var order = 'desc'
		}

		if(buscando){
			var buscando = '&search='+buscando;
		}else{
			var buscando = '';
		}

		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/histories/'+id+'/users?order_by='+orderby+'&order='+order+buscando+'&page='+page,
		});
	};

	var _getOrdUserDni = function(id, orderby, order, buscando, page){

		if(order == 7){
			var order = 'asc'
		}else{
			var order = 'desc'
		}

		if(buscando){
			var buscando = '&search='+buscando;
		}else{
			var buscando = '';
		}

		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/histories/'+id+'/users?order_by='+orderby+'&order='+order+buscando+'&page='+page,
		});
	};

	var _getOrdUserCreado = function(id, orderby, order, buscando, page){

		if(order == 9){
			var order = 'asc'
		}else{
			var order = 'desc'
		}

		if(buscando){
			var buscando = '&search='+buscando;
		}else{
			var buscando = '';
		}

		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/histories/'+id+'/users?order_by='+orderby+'&order='+order+buscando+'&page='+page,
		});
	};

	//
	var _getOrdDtlSearch = function(id, orderby, order, buscando, from, to, page){

		console.log(from, to);

		if(order == 1){
			var order = 'asc'
		}else{
			var order = 'desc'
		}

		if(buscando){
			var buscando = '&search='+buscando;
		}else{
			var buscando = '';
		}

		if(from!='NaN-NaN-NaN' && to!='NaN-NaN-NaN'){
			if(from && to){
				var from = '&from='+from;
				var to = '&to='+to;
			}else{
				var from = '';
				var to = '';	
			}
		}else{
			var from = '';
			var to = '';
		}

		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/histories/'+id+'/searches?order_by='+orderby+'&order='+order+buscando+from+to+'&page='+page,
		});
	};

	var _getOrdDtlOrigin = function(id, orderby, order, buscando, from, to, page){

		if(order == 3){
			var order = 'desc'
		}else{
			var order = 'asc'
		}

		if(buscando){
			var buscando = '&search='+buscando;
		}else{
			var buscando = '';
		}

		if(from!='NaN-NaN-NaN' && to!='NaN-NaN-NaN'){
			if(from && to){
				var from = '&from='+from;
				var to = '&to='+to;
			}else{
				var from = '';
				var to = '';	
			}
		}else{
			var from = '';
			var to = '';
		}

		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/histories/'+id+'/searches?order_by='+orderby+'&order='+order+buscando+from+to+'&page='+page,
		});
	};

	var _getOrdDtlType = function(id, orderby, order, buscando, from, to, page){

		if(order == 5){
			var order = 'asc'
		}else{
			var order = 'desc'
		}

		if(buscando){
			var buscando = '&search='+buscando;
		}else{
			var buscando = '';
		}

		if(from!='NaN-NaN-NaN' && to!='NaN-NaN-NaN'){
			if(from && to){
				var from = '&from='+from;
				var to = '&to='+to;
			}else{
				var from = '';
				var to = '';	
			}
		}else{
			var from = '';
			var to = '';
		}

		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/histories/'+id+'/searches?order_by='+orderby+'&order='+order+buscando+from+to+'&page='+page,
		});
	};

	var _getOrdDtlResult = function(id, orderby, order, buscando, from, to, page){

		if(order == 7){
			var order = 'asc'
		}else{
			var order = 'desc'
		}

		if(buscando){
			var buscando = '&search='+buscando;
		}else{
			var buscando = '';
		}

		if(from!='NaN-NaN-NaN' && to!='NaN-NaN-NaN'){
			if(from && to){
				var from = '&from='+from;
				var to = '&to='+to;
			}else{
				var from = '';
				var to = '';	
			}
		}else{
			var from = '';
			var to = '';
		}

		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/histories/'+id+'/searches?order_by='+orderby+'&order='+order+buscando+from+to+'&page='+page,
		});
	};

	var _getOrdDtlCreado = function(id, orderby, order, buscando, from, to, page){

		if(order == 9){
			var order = 'asc'
		}else{
			var order = 'desc'
		}

		if(buscando){
			var buscando = '&search='+buscando;
		}else{
			var buscando = '';
		}

		if(from!='NaN-NaN-NaN' && to!='NaN-NaN-NaN'){
			if(from && to){
				var from = '&from='+from;
				var to = '&to='+to;
			}else{
				var from = '';
				var to = '';	
			}
		}else{
			var from = '';
			var to = '';
		}

		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/histories/'+id+'/searches?order_by='+orderby+'&order='+order+buscando+from+to+'&page='+page,
		});
	};

	//
	var _getDtlSearch = function(orderby, order, buscando, from, to, page){

		console.log(from, to);

		if(order == 1){
			var order = 'asc'
		}else{
			var order = 'desc'
		}

		if(buscando){
			var buscando = '&search='+buscando;
		}else{
			var buscando = '';
		}

		if(from!='NaN-NaN-NaN' && to!='NaN-NaN-NaN'){
			if(from && to){
				var from = '&from='+from;
				var to = '&to='+to;
			}else{
				var from = '';
				var to = '';	
			}
		}else{
			var from = '';
			var to = '';
		}

		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/searches?order_by='+orderby+'&order='+order+buscando+from+to+'&page='+page,
		});
	};

	var _getDtlOrigin = function(orderby, order, buscando, from, to, page){

		if(order == 3){
			var order = 'desc'
		}else{
			var order = 'asc'
		}

		if(buscando){
			var buscando = '&search='+buscando;
		}else{
			var buscando = '';
		}

		if(from!='NaN-NaN-NaN' && to!='NaN-NaN-NaN'){
			if(from && to){
				var from = '&from='+from;
				var to = '&to='+to;
			}else{
				var from = '';
				var to = '';	
			}
		}else{
			var from = '';
			var to = '';
		}

		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/searches?order_by='+orderby+'&order='+order+buscando+from+to+'&page='+page,
		});
	};

	var _getDtlType = function(orderby, order, buscando, from, to, page){

		if(order == 5){
			var order = 'asc'
		}else{
			var order = 'desc'
		}

		if(buscando){
			var buscando = '&search='+buscando;
		}else{
			var buscando = '';
		}

		if(from!='NaN-NaN-NaN' && to!='NaN-NaN-NaN'){
			if(from && to){
				var from = '&from='+from;
				var to = '&to='+to;
			}else{
				var from = '';
				var to = '';	
			}
		}else{
			var from = '';
			var to = '';
		}

		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/searches?order_by='+orderby+'&order='+order+buscando+from+to+'&page='+page,
		});
	};

	var _getDtlResult = function(orderby, order, buscando, from, to, page){

		if(order == 7){
			var order = 'asc'
		}else{
			var order = 'desc'
		}

		if(buscando){
			var buscando = '&search='+buscando;
		}else{
			var buscando = '';
		}

		if(from!='NaN-NaN-NaN' && to!='NaN-NaN-NaN'){
			if(from && to){
				var from = '&from='+from;
				var to = '&to='+to;
			}else{
				var from = '';
				var to = '';	
			}
		}else{
			var from = '';
			var to = '';
		}

		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/searches?order_by='+orderby+'&order='+order+buscando+from+to+'&page='+page,
		});
	};

	var _getDtlCreado = function(orderby, order, buscando, from, to, page){

		if(order == 9){
			var order = 'asc'
		}else{
			var order = 'desc'
		}

		if(buscando){
			var buscando = '&search='+buscando;
		}else{
			var buscando = '';
		}

		if(from!='NaN-NaN-NaN' && to!='NaN-NaN-NaN'){
			if(from && to){
				var from = '&from='+from;
				var to = '&to='+to;
			}else{
				var from = '';
				var to = '';	
			}
		}else{
			var from = '';
			var to = '';
		}

		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/searches?order_by='+orderby+'&order='+order+buscando+from+to+'&page='+page,
		});
	};


	//FILTROS EXPORTAR
	var _getExpTodos = function(buscando){

		if(buscando){
			var buscando = '?search='+buscando;
		}else{
			var buscando = '';
		}

		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/histories-export'+buscando,
		});
	};

	var _getExpFechas = function(from, to, buscando){

		if(buscando){
			var buscando = '&search='+buscando;
		}else{
			var buscando = '';
		}

		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/histories-export?from='+from+'&to='+to+buscando,
		});
	};

	var _getExpBuscas = function(ordenar, order, search){

		if(search){
			var search = 'search='+search+'&';
		}else{
			var search = '';
		}

		if(ordenar == 1){
			var ordenar = 'order_by=search&';
		}else if(ordenar == 2){
			var ordenar = 'order_by=total&';
		}else if(ordenar == 3){
			var ordenar = 'order_by=type&';
		}else if(ordenar == 4){
			var ordenar = 'order_by=total_found&';
		}else if(ordenar == 5){
			var ordenar = 'order_by=total_not_found&';
		}else{
			var ordenar = '';
		}
		
		//
		if(order == 1){
			var order = 'order=asc';
		}else if(order == 2){
			var order = 'order=desc';
		}else if(order == 3){
			var order = 'order=desc';
		}else if(order == 4){
			var order = 'order=asc';
		}else if(order == 5){
			var order = 'order=asc';
		}else if(order == 6){
			var order = 'order=desc';
		}else if(order == 7){
			var order = 'order=asc';
		}else if(order == 8){
			var order = 'order=desc';
		}else if(order == 9){
			var order = 'order=asc';
		}else if(order == 10){
			var order = 'order=desc';
		}else{
			var order = '';
		}

		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/histories-export?search='+search+ordenar+order,
		});
	};

	//
	var _getExpTodos2 = function(id){

		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/histories/'+id+'/users-export',
		});
	};

	var _getExpBuscas2 = function(id, ordenar, order, buscas){

		if(buscas){
			var buscas = 'search='+buscas+'&';
		}else{
			var buscas = '';
		}

		if(ordenar == 1){
			var ordenar = 'order_by=id&';
		}else if(ordenar == 2){
			var ordenar = 'order_by=name&';
		}else if(ordenar == 3){
			var ordenar = 'order_by=email&';
		}else if(ordenar == 4){
			var ordenar = 'order_by=dni_number&';
		}else if(ordenar == 5){
			var ordenar = 'order_by=created_at';
		}else{
			var ordenar = '';
		}
		
		//
		if(order == 1){
			var order = 'order=asc';
		}else if(order == 2){
			var order = 'order=desc';
		}else if(order == 3){
			var order = 'order=desc';
		}else if(order == 4){
			var order = 'order=asc';
		}else if(order == 5){
			var order = 'order=asc';
		}else if(order == 6){
			var order = 'order=desc';
		}else if(order == 7){
			var order = 'order=asc';
		}else if(order == 8){
			var order = 'order=desc';
		}else if(order == 9){
			var order = 'order=asc';
		}else if(order == 10){
			var order = 'order=desc';
		}else{
			var order = '';
		}

		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/histories/'+id+'/users-export?'+buscas+ordenar+order,
		});
	};


	//
	var _getExpTodos3 = function(id, buscando){

		if(buscando){
			var buscando = '?search='+buscando;
		}else{
			var buscando = '';
		}

		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/histories/'+id+'/searches-export'+buscando,
		});
	};

	var _getExpFechas3 = function(id, from, to, buscando){

		if(buscando){
			var buscando = '&search='+buscando;
		}else{
			var buscando = '';
		}

		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/histories/'+id+'/searches-export?from='+from+'&to='+to+buscando,
		});
	};

	var _getExpBuscas3 = function(id, ordenar, order, buscando){

		if(buscando){
			var buscando = 'search='+buscando+'&';
		}else{
			var buscando = '';
		}

		if(ordenar == 1){
			var ordenar = 'order_by=id&';
		}else if(ordenar == 2){
			var ordenar = 'order_by=origin&';
		}else if(ordenar == 3){
			var ordenar = 'order_by=type&';
		}else if(ordenar == 4){
			var ordenar = 'order_by=result&';
		}else if(ordenar == 5){
			var ordenar = 'order_by=created_at';
		}else{
			var ordenar = '';
		}
		
		//
		if(order == 1){
			var order = 'order=asc';
		}else if(order == 2){
			var order = 'order=desc';
		}else if(order == 3){
			var order = 'order=desc';
		}else if(order == 4){
			var order = 'order=asc';
		}else if(order == 5){
			var order = 'order=asc';
		}else if(order == 6){
			var order = 'order=desc';
		}else if(order == 7){
			var order = 'order=asc';
		}else if(order == 8){
			var order = 'order=desc';
		}else if(order == 9){
			var order = 'order=asc';
		}else if(order == 10){
			var order = 'order=desc';
		}else{
			var order = '';
		}

		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/histories/'+id+'/searches-export?'+buscando+ordenar+order,
		});
	};

	//
	var _getExpTodos4 = function(buscando){

		if(buscando){
			var buscando = '?search='+buscando;
		}else{
			var buscando = '';
		}

		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/searches-export'+buscando,
		});
	};

	var _getExpFechas4 = function(from, to, buscando){

		if(buscando){
			var buscando = '&search='+buscando;
		}else{
			var buscando = '';
		}

		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/searches-export?from='+from+'&to='+to+buscando,
		});
	};

	var _getExpBuscas4 = function(ordenar, order, buscando){

		if(buscando){
			var buscando = 'search='+buscando+'&';
		}else{
			var buscando = '';
		}

		if(ordenar == 1){
			var ordenar = 'order_by=id&';
		}else if(ordenar == 2){
			var ordenar = 'order_by=origin&';
		}else if(ordenar == 3){
			var ordenar = 'order_by=type&';
		}else if(ordenar == 4){
			var ordenar = 'order_by=result&';
		}else if(ordenar == 5){
			var ordenar = 'order_by=created_at';
		}else{
			var ordenar = '';
		}
		
		//
		if(order == 1){
			var order = 'order=asc';
		}else if(order == 2){
			var order = 'order=desc';
		}else if(order == 3){
			var order = 'order=desc';
		}else if(order == 4){
			var order = 'order=asc';
		}else if(order == 5){
			var order = 'order=asc';
		}else if(order == 6){
			var order = 'order=desc';
		}else if(order == 7){
			var order = 'order=asc';
		}else if(order == 8){
			var order = 'order=desc';
		}else if(order == 9){
			var order = 'order=asc';
		}else if(order == 10){
			var order = 'order=desc';
		}else{
			var order = '';
		}

		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/searches-export?'+buscando+ordenar+order,
		});
	};

	//USUARIOS TEST
	var _getUsuariosTest = function(page){

		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/test-users?page='+page,
		});
	};

	var _getTodosUsuariosTest = function(page){

		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/test-users/all?page='+page,
		});
	};

	var _searchTodosUsuariosTest = function(page, text){

		if(text){
			var text = '&search='+text
		}else{
			var text = "";
		}

		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/test-users?page='+page+text,
		});
	};

	var _searchUsuariosTest = function(page, text){

		if(text){
			var text = '&search='+text
		}else{
			var text = "";
		}

		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/test-users?page='+page+text,
		});
	};

	var _getSystemModulos = function(){
		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/system-modules',
		});
	};

	var _getModulosUsers = function(id){

		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/test-users/'+id,
		});
	};

	var _postModulosUsers = function(dados){
		return $http({
			method: 'POST', 
			url: baseAPI.baseURL + 'api/wb/admin/test-users',
			data: dados});
	};

	//TIENDAS PEDIDOS
	var _getTiendasGroup = function(id){

		return $http({
			method: 'GET', 
			url: baseAPI.baseURL + 'api/wb/admin/order/get-grouped-stores/'+id,
		});
	};

	//LORO B2B
	var _getCompaniesB2B = function(pag, token){

		return $http({
			method: 'GET',
			url: 'https://managerb2b-backend.lorob2b.com/api/wb/admin/companies?page='+pag,
			headers: {
				"Authorization": 'Bearer' +token,
				"Content-Type": "application/json",
			},
		});
	};

	var _searchCompaniesB2B = function(text, pag, token){

		if(text){
			var text = '&search='+text
		}else{
			var text = "";
		}

		return $http({
			method: 'GET',
			url: 'https://managerb2b-backend.lorob2b.com/api/wb/admin/companies?page='+pag+text,
			headers: {
				"Authorization": 'Bearer' +token,
				"Content-Type": "application/json",
			},
		});
	};

	var _postCompaniesB2B = function(dados, token){

		return $http({
			method: 'POST',
			url: 'https://managerb2b-backend.lorob2b.com/api/wb/admin/companies',
			data: dados,
			headers: {
				"Authorization": 'Bearer' +token,
				"Content-Type": "application/json",
			},
		});
	};

	var _perfilCompaniesB2B = function(id, token){

		return $http({
			method: 'GET',
			url: 'https://managerb2b-backend.lorob2b.com/api/wb/admin/companies/'+id,
			headers: {
				"Authorization": 'Bearer' +token,
				"Content-Type": "application/json",
			},
		});
	};

	var _putCompaniesB2B = function(dados, id, token){

		return $http({
			method: 'PUT',
			url: 'https://managerb2b-backend.lorob2b.com/api/wb/admin/companies/'+id,
			data: dados,
			headers: {
				"Authorization": 'Bearer' +token,
				"Content-Type": "application/json",
			},
		});
	};

	var _getCompaniesB2Busers = function(id, pag, token){

		return $http({
			method: 'GET',
			url: 'https://managerb2b-backend.lorob2b.com/api/wb/admin/companies/'+id+'/users?page='+pag,
			headers: {
				"Authorization": 'Bearer' +token,
				"Content-Type": "application/json",
			},
		});
	};

	var _expCompaniesB2Busers = function(id, token){

		return $http({
			method: 'GET',
			url: 'https://managerb2b-backend.lorob2b.com/api/wb/admin/companies/'+id+'/users-export',
			headers: {
				"Authorization": 'Bearer' +token,
				"Content-Type": "application/json",
			},
		});
	};

	var _postSubirCreditoB2B = function(dados, id, token){

		return $http({
			method: 'POST',
			url: 'https://managerb2b-backend.lorob2b.com/api/wb/admin/companies/'+id+'/charges',
			data: dados,
			headers: {
				"Authorization": 'Bearer' +token,
				"Content-Type": "application/json",
			},
		});
	};

	var _putSubirCreditoB2B = function(dados, id, idCharge, token){

		return $http({
			method: 'PUT',
			url: 'https://managerb2b-backend.lorob2b.com/api/wb/admin/companies/'+id+'/charges/'+idCharge,
			data: dados,
			headers: {
				"Authorization": 'Bearer' +token,
				"Content-Type": "application/json",
			},
		});
	};

	var _searchCompaniesB2Busers = function(id, text, pag, token){

		if(text){
			var text = '&search='+text
		}else{
			var text = "";
		}

		return $http({
			method: 'GET',
			url: 'https://managerb2b-backend.lorob2b.com/api/wb/admin/companies/'+id+'/users?page='+pag+text,
			headers: {
				"Authorization": 'Bearer' +token,
				"Content-Type": "application/json",
			},
		});
	};

	var _getMetricasB2B = function(id, token){

		return $http({
			method: 'GET',
			url: 'https://managerb2b-backend.lorob2b.com/api/wb/admin/companies/'+id+'/charges',
			headers: {
				"Authorization": 'Bearer' +token,
				"Content-Type": "application/json",
			},
		});
	};

	var _getMetricasB2Bperfil = function(id, idCharge, token){

		return $http({
			method: 'GET',
			url: 'https://managerb2b-backend.lorob2b.com/api/wb/admin/companies/'+id+'/charges/'+idCharge,
			headers: {
				"Authorization": 'Bearer' +token,
				"Content-Type": "application/json",
			},
		});
	};


	return {

		//LORO B2B
		getCompaniesB2B: 	_getCompaniesB2B,
		searchCompaniesB2B:	_searchCompaniesB2B,
		postCompaniesB2B:	_postCompaniesB2B,
		putSubirCreditoB2B:	_putSubirCreditoB2B,
		perfilCompaniesB2B:	_perfilCompaniesB2B,
		putCompaniesB2B:	_putCompaniesB2B,
		getCompaniesB2Busers:	_getCompaniesB2Busers,
		expCompaniesB2Busers:	_expCompaniesB2Busers,
		postSubirCreditoB2B:	_postSubirCreditoB2B,
		searchCompaniesB2Busers:	_searchCompaniesB2Busers,
		getMetricasB2B:		_getMetricasB2B,
		getMetricasB2Bperfil:	_getMetricasB2Bperfil,

		//TIENDAS PEDIDOS
		getTiendasGroup:	_getTiendasGroup,



		//USUARIOS TESTES
		getUsuariosTest: 	_getUsuariosTest,
		getTodosUsuariosTest:	_getTodosUsuariosTest,
		searchTodosUsuariosTest:	_searchTodosUsuariosTest,
		searchUsuariosTest:	_searchUsuariosTest,
		getSystemModulos:	_getSystemModulos,
		getModulosUsers:	_getModulosUsers,
		postModulosUsers:	_postModulosUsers,

		//FILTROS PALAVRAS CHAVES
		getOrdSearch:	_getOrdSearch,
		getOrdTotal:	_getOrdTotal,
		getOrdType:		_getOrdType,
		getOrdCon:		_getOrdCon,
		getOrdSin:		_getOrdSin,
		getOrdUserId:	_getOrdUserId,
		getOrdUserNombre:	_getOrdUserNombre,
		getOrdUserEmail:	_getOrdUserEmail,
		getOrdUserDni:		_getOrdUserDni,
		getOrdUserCreado:	_getOrdUserCreado,
		getOrdDtlSearch:	_getOrdDtlSearch,
		getOrdDtlOrigin:	_getOrdDtlOrigin,
		getOrdDtlType:		_getOrdDtlType,
		getOrdDtlResult:	_getOrdDtlResult,
		getOrdDtlCreado:	_getOrdDtlCreado,
		getDtlSearch: 		_getDtlSearch,
		getDtlOrigin:		_getDtlOrigin,
		getDtlType:			_getDtlType,
		getDtlResult:		_getDtlResult,
		getDtlCreado:		_getDtlCreado,

		//FILTROS EXPORTAR
		getExpTodos: 	_getExpTodos,
		getExpFechas:	_getExpFechas,
		getExpBuscas:	_getExpBuscas,
		getExpTodos2:	_getExpTodos2,
		getExpBuscas2:	_getExpBuscas2,
		getExpTodos3:	_getExpTodos3,
		getExpFechas3:	_getExpFechas3,
		getExpBuscas3:	_getExpBuscas3,
		getExpTodos4: 	_getExpTodos4,
		getExpFechas4:	_getExpFechas4,
		getExpBuscas4:	_getExpBuscas4,
		

		//CATEGORIZACION
		getProResult1:		_getProResult1,
		getSubCaterias1:	_getSubCaterias1,
		getActiveStore:		_getActiveStore,
		getSubCaterias2:	_getSubCaterias2,
		getProResult2:		_getProResult2,
		getNewCategorias: 	_getNewCategorias,
		postProDictionary1:	_postProDictionary1,
		getProResult11:		_getProResult11,
		getProResult22:		_getProResult22,
		getProResult222:	_getProResult222,
		dltProDictionary1:	_dltProDictionary1,
		postProDictionary2:	_postProDictionary2,
		dltPassDictionary1:	_dltPassDictionary1,
		dltPassDictionary2: _dltPassDictionary2,
		postProDictionary22:_postProDictionary22,

		//LOGIN
		postLogin:			_postLogin,
		validaLogin:		_validaLogin,
		
		//Pedidos
		getPedidos:			_getPedidos,
		dtlPedidos:			_dtlPedidos,
		csvPedidos:			_csvPedidos,
		searchPedidos:		_searchPedidos,
		payPedidos:			_payPedidos,
		historicoPedidos:	_historicoPedidos,
		putNovosDados:		_putNovosDados,
		putEstadosOrdens:	_putEstadosOrdens,
		putMudaTiendas:		_putMudaTiendas,
		//

		//Pedidos PLANS
		getPedidosPlans:		_getPedidosPlans,
		dtlPedidosPlans:		_dtlPedidosPlans,
		csvPedidosPlans:		_csvPedidosPlans,
		searchPedidosPlans:		_searchPedidosPlans,
		payPedidosPlans:		_payPedidosPlans,
		historicoPedidosPlans:	_historicoPedidosPlans,
		//

		//REFUNDS
		getRefunds:			_getRefunds,
		postRefunds:		_postRefunds,
		searchRefunds:		_searchRefunds,
		csvRefunds:			_csvRefunds,

		//CATEGORIAS
		getCategorias:		_getCategorias,
		dtlCategorias:		_dtlCategorias,
		postCategorias:		_postCategorias,
		putCategorias:		_putCategorias,
		postDeepLinks:		_postDeepLinks,
		publicidadeCategorias:_publicidadeCategorias,
		searchCategorias:	_searchCategorias,

		//PRODUCTOS
		getProductos:		_getProductos,
		dtlProductos:		_dtlProductos,
		putProductos:		_putProductos,
		postTiendas:		_postTiendas,
		searchProductos:	_searchProductos,

		//TIENDAS
		getTiendas:			_getTiendas,
		getCateTienda:		_getCateTienda,
		getComerciais:		_getComerciais,
		searchCateTienda:	_searchCateTienda,
		dtlCateTienda:		_dtlCateTienda,
		dtlTiendas:			_dtlTiendas,
		putTiendas:			_putTiendas,
		putTiendas2:		_putTiendas2,
		postQuitar:			_postQuitar,
		publicidadeTiendas:	_publicidadeTiendas,
		searchTiendas:		_searchTiendas,
		searchTiendas2:		_searchTiendas2,

		//PASILLOS
		getPasillos:		_getPasillos,
		dtlPasillos:		_dtlPasillos,
		putPasillos:		_putPasillos,
		postPasillos:		_postPasillos,
		searchPasillos:		_searchPasillos,
		getTags:			_getTags,
		postTags:			_postTags,

		//Logisticas
		getLogistica:				_getLogistica,
		getExportarLogistica:		_getExportarLogistica,
		dtlLogistica:				_dtlLogistica,
		searchLogistica:			_searchLogistica,
		search2Logistica:			_search2Logistica,
		postLogistica:				_postLogistica,
		encomendasLogistica:		_encomendasLogistica,
		searchEncomendasLogistica:	_searchEncomendasLogistica,
		search2EncomendasLogistica:	_search2EncomendasLogistica,
		postEncomendasLogistica:	_postEncomendasLogistica,
		statusLogistica:			_statusLogistica,
		searchStatusLogistica:		_searchStatusLogistica,
		search2StatusLogistica:		_search2StatusLogistica,
		postStatusLogistica:		_postStatusLogistica,
		putEnderecoCotacao:			_putEnderecoCotacao,
		getEnderecoCotacao:			_getEnderecoCotacao,
		getCidade:					_getCidade,
		getDane:					_getDane,
		postEnderecoTiendas:		_postEnderecoTiendas,
		//getEnderecoTiendas:		_getEnderecoTiendas,

		getUtilizacion:		_getUtilizacion,
		dtlUtilizacion:		_dtlUtilizacion,

		//SLIDERS
		getSliders:			_getSliders,
		dtlSliders:			_dtlSliders,
		putSliders:			_putSliders,
		searchSliders:		_searchSliders,
		postSliders:		_postSliders,

		//Clientes
		getClientes:		_getClientes,
		putClientes:		_putClientes,
		putClientesPruebas:	_putClientesPruebas,
		dtlClientes:		_dtlClientes,
		searchClientes:		_searchClientes,
		searchPerfilClientes:_searchPerfilClientes,
		getRelatorios:		_getRelatorios,

		//PUSH
		getPush:			_getPush,
		postPush:			_postPush,
		postPushUsers:		_postPushUsers,

		//ESTATISTICAS
		getSeguidores:		_getSeguidores,
		getLikes:			_getLikes,
		getVendidos:		_getVendidos,
		getGustados:		_getGustados,
		getDiasEstatisticas:_getDiasEstatisticas,
		getDemograficosTin:	_getDemograficosTin,
		getDemograficosPro:	_getDemograficosPro,
		getPorCidades:		_getPorCidades,

		//CUPONS
		getCupons:			_getCupons,
		getRedimidos:		_getRedimidos,
		searchRedimidos:	_searchRedimidos,
		getNoRedimidos:		_getNoRedimidos,
		searchNoRedimidos:	_searchNoRedimidos,
		dtlCupons:			_dtlCupons,
		searchCupons:		_searchCupons,
		postCupons:			_postCupons,
		putCupons:			_putCupons,

		//DIA SIN IVA
		getProductosIVA: 	_getProductosIVA,
		getCategoriasIVA:	_getCategoriasIVA,
		putIVA:				_putIVA,
		putsIVA:			_putsIVA,
		getProductos2:		_getProductos2,
		searchProductos2:	_searchProductos2,
		searchProductosIVA:	_searchProductosIVA,
		csvProductosIVA:	_csvProductosIVA,

		//MANUTENÇÃO
		putManutencao:		_putManutencao,
		getManutencao:		_getManutencao,

		//TIENDA & CIUDAD
		postStoreCity: 		_postStoreCity,
		putTiendaCity:		_putTiendaCity,
		getStoreCity:		_getStoreCity,
		putStoreCity:		_putStoreCity,
		putStoreMass:		_putStoreMass,
		rmStoreCity:		_rmStoreCity,
		postCargue: 		_postCargue,

		//PREÇOS INCRIVEIS
		getAmazing:			_getAmazing,
		deleteAmazing:		_deleteAmazing,
		postAmazing:		_postAmazing,
		searchAmazing:		_searchAmazing,

		//PREÇOS RECOMENDADOS
		getRecomendados:	_getRecomendados,
		postRecomendados:	_postRecomendados,
		deleteRecomendados:	_deleteRecomendados,
		searchRecomendados:	_searchRecomendados,


		//ORDEN TIENDAS
		getOrden:			_getOrden,
		putOrden:			_putOrden,
		searchOrden:		_searchOrden,

		//KEYWORDS
		getWords:			_getWords,
		getDtlWords:		_getDtlWords,
		searchDtlWords:		_searchDtlWords,
		getPerfilKey:		_getPerfilKey,
		searchPerfilKey:	_searchPerfilKey,
		getKeyUsers:		_getKeyUsers,
		searchKeyUsers:		_searchKeyUsers,
		searchWords:		_searchWords,
		getDetalhesBusca:	_getDetalhesBusca,

		//BLACKLIST
		getBlacklist:		_getBlacklist,
		postBlacklist:		_postBlacklist,

		//EMAILS
		getEmails: 			_getEmails,
		rmvEmails:			_rmvEmails,
		postEmails:			_postEmails,

		//TERMINOS & CONDICIONES
		postTerminosCod: 	_postTerminosCod,
		putTerminosCod:		_putTerminosCod,
		getTerminosCod:		_getTerminosCod,
		getDtlTerminosCod:	_getDtlTerminosCod,
		searchTerminosCod:	_searchTerminosCod,

		//RESTAURANTES
		getRestaurantesOrdenes:			_getRestaurantesOrdenes,
		searchRestaurantesOrdenes:		_searchRestaurantesOrdenes,
		getRestaurantesCategorias: 		_getRestaurantesCategorias,
		searchRestaurantesCategorias:	_searchRestaurantesCategorias,
		getListadoMarcas: 				_getListadoMarcas,
		searchListadoMarcas:			_searchListadoMarcas,
		getListadoRestaurantes:			_getListadoRestaurantes,
		searchListadoRestaurantes:		_searchListadoRestaurantes,
		getRefundsRestaurantes: 		_getRefundsRestaurantes,
		searchRefundsRestaurantes:		_searchRefundsRestaurantes,
		dtlRestaurantesOrdenes:			_dtlRestaurantesOrdenes,
		payRestaurantes:				_payRestaurantes,

		//RIESGO
		getRiesgo:	_getRiesgo,
		postRiesgo:	_postRiesgo,
		putRiesgo:	_putRiesgo,


		//TALLAS
		postTallas:	_postTallas,
		getTallas:	_getTallas,
		dtlTallas:	_dtlTallas,
		putTallas:	_putTallas,

		//SEM COBERTURAS
		getSemCoberturas:	_getSemCoberturas,


		//IPs
		getIPs:		_getIPs,

		//GET LOJAS
		getLOjas:	_getLOjas,

		//SHOPPERS
		getShoProdutos: 		_getShoProdutos,
		getShoCidades:			_getShoCidades,
		searchShoCidades:		_searchShoCidades,
		getShoStores:			_getShoStores,
		postShoProdutos:		_postShoProdutos,
		dtlShoProdutos:			_dtlShoProdutos,
		getSearchShoProdutos:	_getSearchShoProdutos,
		putClientes2:			_putClientes2,
		putShopCidades:			_putShopCidades,

		//CHALLENGES
		getChallenges:			_getChallenges,
		searchChallenges:		_searchChallenges,
		dtlChallenges:			_dtlChallenges,
		getParticipantes:		_getParticipantes,
		validaPosts:			_validaPosts,
		putChallenge:			_putChallenge,
		postLinkCha:			_postLinkCha,
		postLinkDet:			_postLinkDet,
	};
});
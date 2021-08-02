angular.module("sop").factory("baseAPI", function($location){

	console.log($location.host());

	if($location.host() == 'qasuperadmin.loro.com.co'){
		return {
			//baseURL: "https://admin-backend.loro.com.co/"
			baseURL: "https://qa-admin-backend.loro.com.co/",
			baseURL2: "https://challenges-back-dev.loro.com.co/"
		}
	}else if($location.host() == 'localhost'){
		return {
			baseURL: "https://admin-backend.loro.com.co/",
			//baseURL: "https://qa-admin-backend.loro.com.co/",
			baseURL2: "https://challenges-back-dev.loro.com.co/"
		}
	}else{
		return {
			baseURL: "https://admin-backend.loro.com.co/",
			baseURL2: "https://challenges-back-master.loro.com.co/"
			//baseURL: "https://qa-admin-backend.loro.com.co/"
		}
	}

	//baseURL: "https://admin-backend.loro.com.co/"
	//baseURL: "https://dev-backend.loro.com.co/"
});
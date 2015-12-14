angular.module('datacontext', [])
.constant('datacontext.urls',{
	products: 'http://localhost:8888/products',
	product: 'http://localhost:8888/product/',
	comment: '/comment/' 
})
.factory('datacontext.api', ['$http', 'datacontext.urls', function ($http, urls){
	var Api = {
		getAllProducts: function(){
			return $http({ url: urls.products, method : 'GET', headers: { 'Content-Type': 'application/json' } });
		},
		getProductDetail: function(id){
			return $http({ url: urls.product + id , method : 'GET', headers: { 'Content-Type': 'application/json' } });			
		},
		insertProduct: function(data){
			return $http({ url: urls.product, method : 'POST', data: data, headers: { 'Content-Type': 'application/json' }, });			
		},
		insertComment: function(id, data){
			return $http({ url: urls.product + id + urls.comment, method : 'POST', data: data, headers: { 'Content-Type': 'application/json' } });			
		} 
	}
	return Api;
}])
.provider('datacontext', ['datacontext.urls', function(urls){
	var datacontextProvider = this;
	datacontextProvider.apiUrls = urls;
	datacontextProvider.serviceLocation = {
		home : 'http://localhost:8888'
	};
	
	datacontextProvider.$get = ['datacontext.api', '$q', '$http', '$location', '$timeout', function(api, $q, $http, $location, $timeout){
		
		var parseQueryString = function (queryString) {
			var data = {},
				pairs, pair, separatorIndex, escapedKey, escapedValue, key, value;

			if (queryString === null) {
				return data;
			}

			pairs = queryString.split("&");

			for (var i = 0; i < pairs.length; i++) {
				pair = pairs[i];
				separatorIndex = pair.indexOf("=");

				if (separatorIndex === -1) {
					escapedKey = pair;
					escapedValue = null;
				} else {
					escapedKey = pair.substr(0, separatorIndex);
					escapedValue = pair.substr(separatorIndex + 1);
				}

				key = decodeURIComponent(escapedKey);
				value = decodeURIComponent(escapedValue);

				data[key] = value;
			}

			return data;
		};
		
		//Public Variables
		var Datacontext = this;
		
		Datacontext.products = function(){
			var deferred = $q.defer();
			api.getAllProducts().success(function(data){
				deferred.resolve(data);
			}).error(function(errorData){
				deferred.reject(errorData)
			});
			return deferred.promise;
		};
		
		Datacontext.product = function(id){
			var deferred = $q.defer();
			api.getProductDetail(id).success(function(data){
				deferred.resolve(data);
			}).error(function(errorData){
				deferred.reject(errorData)
			});
			return deferred.promise;
		};
		
		Datacontext.saveProduct = function(data){
			var deferred = $q.defer();
			api.insertProduct(data).success(function(data){
				deferred.resolve(data);
			}).error(function(errorData){
				deferred.reject(errorData)
			});
			return deferred.promise;
		};
		
		Datacontext.saveComment = function(id, data){
			var deferred = $q.defer();
			api.insertComment(id, data).success(function(data){
				deferred.resolve(data);
			}).error(function(errorData){
				deferred.reject(errorData)
			});
			return deferred.promise;
		};
		
		
		return Datacontext;
		
	}];
}]);
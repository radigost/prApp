'use strict';

/**
 * @ngdoc function
 * @name adminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the adminApp
 */
angular.module('adminApp')

.controller('MainCtrl',['orders', function (orders) {
	console.log("Загружен контроллер");
	var vm = this
	vm.orders = orders
	console.log(vm.orders);


	 

}])


.controller('ProductsCtrl',['$scope','gingerFactory', function ($scope,gingerFactory) {
//console.log(false);
	 gingerFactory.getProducts().query(function(response)
		 	{$scope.products = response;
			 	});

	 gingerFactory.getTags().query(function(response){
	 		$scope.alltags = response;
	 		$scope.tagLength = response.length;
	 });

	$scope.popular = false;
	$scope.addProduct= function(){
		var newProduct = {};
		newProduct.price = $scope.price;
		newProduct.title = $scope.title;
		newProduct.description = $scope.description;
		newProduct.img = $scope.img;
		newProduct.tags = $scope.tags;
		newProduct.popular = $scope.popular;
		gingerFactory.getProducts().save(newProduct);
		$scope.products.push(newProduct);
		$scope.price="";
		$scope.title="";
		$scope.description="";
		$scope.img="";
		$scope.tags="";
		$scope.popular="";
		$scope.newTag={};
	 };

	$scope.delProduct = function(item){
		console.log("started");
		gingerFactory.getProducts().remove({id:item._id},function(sucsess){
			for(var i = $scope.products.length-1; i >= 0; i--){
		        if($scope.products[i]._id == item._id){
		            $scope.products.splice(i,1);
			        }
		    }
			console.log("done");
			});
	};

	$scope.changeItem = function(){
		if ($scope.popular) {$scope.popluar = false;}
		else $scope.popular = true;
	};

	$scope.saveTagChanges = function(){
		var abura = $scope.alltags
		console.log(abura);
		for (var i in abura) {
			if (abura[i].hasOwnProperty('name') ) {
				gingerFactory.getTags().update({id: abura[i]._id},abura[i]).$promise;	
                }


		}
	};

	$scope.addTag= function(){
		$scope.alltags.push($scope.newTag);
		gingerFactory.getTags().save($scope.newTag).$promise;
		$scope.newTag = {}
	};

	$scope.delTag= function(tag){
		console.log("started");
		gingerFactory.getTags().remove({id:tag._id},function(sucsess){
			for(var i = $scope.alltags.length-1; i >= 0; i--){
		        if($scope.alltags[i].id == tag.id){
		            $scope.alltags.splice(i,1);
			        }
		    }
			console.log("done");
			});
	};

}])
.controller('BlogCtrl',['$scope','blogFactory', function ($scope,blogFactory) {

	 blogFactory.getBlog().query(function(response)
	 	{$scope.blog = response;
	 	});

	  $scope.delBlog = function(id){
	  	console.log("started");
	  	blogFactory.getBlog().remove({id:id},function(sucsess){
	  		for(var i = $scope.blog.length-1; i >= 0; i--){
	            if($scope.blog[i].id == id){
	                $scope.blog.splice(i,1);
	            }
	        }
	  		console.log("done");
	  		});
	  };




}])


.controller('CallbackCtrl',['$scope','callbackFactory', function ($scope,callbackFactory) {

	 callbackFactory.getCallback().query(function(response)
	 	{$scope.callbacks = response;
	 	});

	  $scope.delCallback = function(id){	
          var del_obj = callbackFactory.getCallback().get({callback_id:id},function(){
                console.log("started "+id);
                //console.log(del_obj);
                del_obj.$remove({callback_id:id},function(){
                
                for(var i = $scope.callbacks.length-1; i >= 0; i--){
                    if($scope.callbacks[i]._id == id){
                        console.log($scope.callbacks[i]);
                        $scope.callbacks.splice(i,1);
                    }
                    }
                console.log("done");
                });
      });
	  };




}])



  ;

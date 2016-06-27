'use strict';

/**
 * @ngdoc function
 * @name adminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the adminApp
 */
console.log("Грузим контроллеры");
angular.module('adminApp').controller('MainCtrl',MainCtrl);
MainCtrl.$inject = ['orders','users'];
function MainCtrl(orders,users) {
	console.log("Загружен контроллер");
	var vm = this;
	vm.orders = orders
	vm.users= users;
	vm.orderDeliver = function (item) {
		item.delivered = true;
		// console.log(item);
		vm.orders.orderDeliver(item);
	};
	vm.deleteOrder = function (item) {
		item.delivered = true;
		// console.log(item);
		vm.orders.delOrder(item);
		_.remove(vm.orders.orders,function (el) {
			return el.id == item.id;
		});
	};

	// console.log(vm.orders);
	// console.log(vm.users);

};



angular.module('adminApp').controller('ProductsCtrl',ProductsCtrl);
ProductsCtrl.$inject = ['tags','products','$uibModal'];
function ProductsCtrl(tags,products,$uibModal) {
	var vm = this;
	vm.tags = tags;
	vm.products = products;
	// console.log(vm);
	vm.addTag =function (newTag) {
		console.log(newTag,vm.tags);
		vm.tags.tags.push(newTag);
		vm.tags.saveTag(newTag);
		vm.newTag = {};
	} ;
	vm.deleteTag =function (Tag) {
		_.remove(vm.tags.tags,function (el) {
			return el.name == Tag.name;
		});
		vm.tags.delTag(Tag);
	} ;
	vm.addProduct =function (newProduct) {
		// console.log(newProduct);
		vm.products.products.push(newProduct);
		vm.products.saveProduct(newProduct);
		$('#myModal').modal('hide');
		vm.newProduct = {};
	} ;
	vm.deleteProduct =function (Product) {
		// console.log(Product);
		_.remove(vm.products.products,function (el) {
			return el.title == Product.title;
		});
		vm.products.delProduct(Product);
	} ;

	vm.addRemoveTags = function (product) {
		tags = _.differenceBy(vm.tags.tags,product.tags,'name');
		// console.log(vm.tags.tags);


		var modalInstance = $uibModal.open({
			// animation: $scope.animationsEnabled,
			templateUrl: 'templates/addRemoveTags.html',
			controller: function ($scope, $uibModalInstance) {
				// console.log("hello from controller",vm.products,product);
				$scope.item = product;
				$scope.tags = tags;
				$scope.add = function (element) {
					// console.log(item);
					vm.products.addTag(product,element);
					$scope.item.tags.push(element);
					_.remove($scope.tags,function (o) {
						return o.id==element.id;
					});
				}
				$scope.remove = function (element) {
					// console.log(item);
					vm.products.delTag(product,element)
					$scope.tags.push(element);
					_.remove($scope.item.tags,function (o) {
						return o.id==element.id;
					});
				}
				$scope.ok = function () {
					$uibModalInstance.dismiss('cancel');
				};
				// $scope.cancel = function () {
				// 	$uibModalInstance.dismiss('cancel');
				// };
			},
			size: 'lg',
			// resolve: {
			// 	items: function () {
			// 		return $scope.items;
			// 	}
			// }
		});
		modalInstance.result.then(function (selectedItem) {
			// $scope.selected = selectedItem;
		}, function () {
			// $log.info('Modal dismissed at: ' + new Date());
			// console.log(selectedItem);
		});
	};
		


};


angular.module('adminApp').controller('BlogCtrl',BlogCtrl)
BlogCtrl.$inject=['$scope','entries'];
function BlogCtrl($scope,entries) {
	var vm = this;
	vm.entries = entries;
	vm.addEntry=function (entry) {
		console.log(entry);
		vm.entries.saveEntry(entry);
		vm.entries.entries.push(entry);
	}
	vm.deleteEntry=function (entry) {
		console.log(entry);
		vm.entries.delEntry(entry);
		_.remove(vm.entries.entries,function (el) {
			return el.title == entry.title;
		});
		// vm.entries.entries.push(entry);
	}
	// console.log(vm);

	function disabled(data) {
		var date = data.date,
			mode = data.mode;
		return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
	}
	vm.dateOptions = {
		dateDisabled: disabled,
		formatYear: 'yy',
		maxDate: new Date(2020, 5, 22),
		minDate: new Date(),
		startingDay: 1
	};
	vm.popup2 = {
		opened: false
	};
	vm.open2 = function() {
		vm.popup2.opened = true;
	};

};



angular.module('adminApp').controller('CallbackCtrl',CallbackCtrl)
CallbackCtrl.$inject = ['$scope','calls'];
function CallbackCtrl($scope,calls) {
	var vm = this;
	vm.callbacks = calls;
	vm.delCallback=function (callback) {
		console.log(callback);
		vm.callbacks.delCall(callback);
		_.remove(vm.callbacks.calls,function (el) {
			return el.id == callback.id;
		});
	}
	// console.log(vm.callbacks.calls);
};
console.log("Прогрузили контроллеры");
(function() {
	'use strict';

	var MainControl = function(IntegerSpiralService) {
		var vm = this;

		vm.test = function(input, direction) {
			vm.matrix = IntegerSpiralService.printMatrix(input, direction);
		};
	};

	angular.module('IntegerSpiral').controller('MainCtrl', MainControl);
})();
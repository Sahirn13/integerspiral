(function(){
	'use strict';


	var serviceFunction = function() {

		var fillInMatrix = function(input, direction) {
			var size = getMatrixSize(input);
			var initialSize = size;
			var edgeElement = size * size - 1;
			var matrix = generateMatrix(size);
			var result = [];
			var maxDigits = (input + '').length;


			for(var cycle = 0; cycle < (initialSize + 1) / 2; cycle++) {
				fillFirstRow(matrix, edgeElement, size, cycle, direction);
				edgeElement -= (size - cycle);

				if(direction) {
					fillLeftEdge(matrix, edgeElement, size, cycle, direction);
				} else {
					fillRightEdge(matrix, edgeElement, size, cycle, direction);
				}
				edgeElement -= (size - 2 - cycle);

				fillLastRow(matrix, edgeElement, size, cycle, direction);
				edgeElement -= (size - cycle);

				if(direction) {
					fillRightEdge(matrix, edgeElement, size, cycle, direction);
				} else {
					fillLeftEdge(matrix, edgeElement, size, cycle, direction);
				}
				edgeElement -= (size - 2 - cycle);

				size -= 1;
			}

			var maxSpace = "";
			for(var i = 0; i <= maxDigits; i++) {
				maxSpace += " ";
			}

			for(var i = 0; i < initialSize; i++) {
				var row = "";
				for(var j = 0; j < initialSize; j++) {
					if(parseInt(matrix[j][i], 10) <= input) {
						row += formatNumber(matrix[j][i], direction, maxDigits);
					} else {
						row += maxSpace;
					}
				}

				result.push(row);
			}

			return result;
		};


		var getMatrixSize = function(input) {
			var n = Math.floor(Math.sqrt(input));
			if(n % 2 === 0) {
				n += 1;
			} else {
				n += 2;
			}
			return n;
		};

		var generateMatrix = function(size) {
			var matrix = new Array(size);
			for(var i = 0; i < size; i++) {
				matrix[i] = new Array(size);
			};
			return matrix;
		};


		var fillFirstRow = function(matrix, edgeValue, n, cycle, direction) {
			if(direction) {
				for(var i = n - 1; i >= cycle; i--) {
					matrix[i][cycle] = edgeValue;
					edgeValue -= 1;
				}
			} else {
				for(var i = cycle; i <= n - 1; i++) {
					matrix[i][cycle] = edgeValue;
					edgeValue -= 1;
				}
			}
			
		};

		var fillLastRow = function(matrix, edgeValue, n, cycle, direction) {
			if(direction) {
				for(var i = cycle; i <= n - 1; i++) {
					matrix[i][n - 1] = edgeValue;
					edgeValue -= 1;
				}	
			} else {
				for(var i = n - 1; i >= cycle; i--) {
					matrix[i][n - 1] = edgeValue;
					edgeValue -= 1;
				}	
			}
		};

		var fillLeftEdge = function(matrix, edgeValue, n, cycle, direction) {
			if(direction) {
				for(var i = cycle + 1; i < n - 1; i++) {
					matrix[cycle][i] = edgeValue;
					edgeValue -= 1;
				}
			} else {
				for(var i = n - 2; i > cycle; i--) {
					matrix[cycle][i] = edgeValue;
					edgeValue -= 1;
				}
			}
			
		};

		var fillRightEdge = function(matrix, edgeValue, n, cycle, direction) {
			if(direction) {
				for(var i = n - 2; i > cycle; i--) {
					matrix[n - 1][i] = edgeValue;
					edgeValue -= 1;
				}
			} else {
				for(var i = cycle + 1; i <n - 1; i++) {
					matrix[n - 1][i] = edgeValue;
					edgeValue -= 1;
				}
			}
		};

		var formatNumber = function(value, direction, maxDigits) {
			var result = "";
			var difference = value + "";
			difference = maxDigits - difference.length;
			for(var i = 0; i <= difference; i++) {
				result += " ";
			}
			if(direction) {
				return result + value;
			} else {
				return value + result;
			}
		};

		return {
			printMatrix: fillInMatrix,
			getMatrixSize: getMatrixSize,
			generateMatrix: generateMatrix,

		};
		
	};

	angular.module('IntegerSpiral').factory('IntegerSpiralService', serviceFunction);

})();
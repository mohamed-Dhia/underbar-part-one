(function() {
	"use strict";
	describe("Part I - a visit from the past", function() {
		describe("identity", function() {
			// Returns the same value that is used as the argument.
			//It() Identity should output whatever the input is without modifying the input.
			// expect(_.identity) Ex. function([]){return []};
			// expect(_.identity([1,2,3])) to return [1,2,3]

			it("should exist", function() {
				expect(_.identity).to.exist;
			});

			it("given a primitive input should return primitive output", function() {
				expect(_.identity("simple string")).to.equal("simple string");
				expect(_.identity(1)).to.equal(1);
			});

			it("should return whatever value is passed into it", function() {
				var uniqueObject = {};
				expect(_.identity(1)).to.equal(1);
				expect(_.identity("string")).to.equal("string");
				expect(_.identity(false)).to.be.false;
				expect(_.identity(uniqueObject)).to.equal(uniqueObject);
			});

			it("should not return falsy values when used as a predicate", function() {
				var truthTest = function(value) {
					if (_.identity(value)) {
						return true;
					}
					return "fails truth test";
				};
				expect(truthTest(0)).to.equal("fails truth test");
				expect(truthTest("")).to.equal("fails truth test");
				expect(truthTest(null)).to.equal("fails truth test");
				expect(truthTest(undefined)).to.equal("fails truth test");
				expect(truthTest(NaN)).to.equal("fails truth test");
				expect(truthTest(false)).to.equal("fails truth test");
			});

			it("should output whatever input it is given without modifying it", function() {
				expect(_.identity([1, 2, 3])).to.deep.equal([1, 2, 3]);
				expect(_.identity({ this: "is", a: "test" })).to.deep.equal({
					this: "is",
					a: "test"
				});
			});
		});

		describe("first", function() {
			it("should exist", function() {
				expect(_.first).to.exist;
			});

			//Returns the first element of an array
			//ex) f([1, 2, 3]) >> 1
			//The first argument will always return an element
			it("Return the first element of an array", function() {
				expect(_.first(["caccicity", "alovaria", "rosestan"])).to.equal(
					"caccicity"
				);
				expect(_.first([2, 4, 6, 8])).to.equal(2);
			});

			//Passing n (second argument) will return the first n elements of the array.
			//ex) f([2, 3, 4, 5, 6, 7, 8], 2) >> [2, 3]
			//number can exceed the number of elements from the 1st argument (limit doesn't matter)
			//ex) f([2, 3, 4, 5], 10) >> [2, 3, 4, 5]
			it("should return entire array of each element when 2nd argument exceeds length", function() {
				expect(
					_.first(["Monster Energy", "Redbull", "Calpico"], 90)
				).to.deep.equal(["Monster Energy", "Redbull", "Calpico"]);
			});

			it("Passing an integer as the 2nd Argument returns the first element(s) up to that integer", function() {
				expect(
					_.first(["caccicity", "alovaria", "rosestan"], 2)
				).to.deep.equal(["caccicity", "alovaria"]);
			});

			//Passing an empty array or object will return undefined
			//ex) f([]) >> undefined
			it("Returns undefined when array is empty", function() {
				expect(_.first([])).to.equal(undefined);
			});

			it("Argument can not be passed as object", function() {
				expect(_.first({ plantName: "caccicity" })).to.equal(undefined);
			});

			it("Returns empty array if object is passed with a second argument", function() {
				expect(_.first({ plantName: "caccicity" }, 4)).to.deep.equal([]);
			});

			it("Returns empty array if second argument is invalid", function() {
				expect(_.first("Any String", "Elle")).to.deep.equal([]);
				expect(_.first([], 2)).to.deep.equal([]);
			});

			// The result will always be an array (when second argument is passed in)
			it("returns array when integer is passed in as second argument", function() {
				expect(
					_.first(["redbull", "how do I know what I am"], 3)
				).to.be.instanceof(Array);
			});
		});

		describe("last", function() {
			it("should exist", function() {
				expect(_.last).to.exist;
			});
			it("should return the last element in the array", function() {
				expect(_.last([1, 2, 3])).to.equal(3);
				expect(
					_.last([
						[1, 2],
						[3, 4]
					])
				).to.eql([3, 4]);
			});
			it("should return the last n elements when passed an n parameter", function() {
				expect(_.last([1, 2, 3], 2)).to.eql([2, 3]);
			});
			it("should return the entire array if the second argument is greater than the length of the array", function() {
				expect(_.last([1, 2, 3], 5)).to.eql([1, 2, 3]);
			});
			it("should return an empty array if given a negative number for second argument", function() {
				expect(_.last([1, 2, 3], -1)).to.be.empty;
			});
			it("should return an empty array if the second argument is 0", function() {
				expect(_.last([1, 2, 3], 0)).to.be.empty;
			});
			it("should return an empty array if array being passed is empty", function() {
				expect(_.last([], 5)).to.be.empty;
			});
			it("should not mutate original array", function() {
				const noMutations = [0, 1, 2];
				let lastElement = _.last(noMutations);
				expect(noMutations).to.eql([0, 1, 2]);
			});
		});

		describe("each", function() {
			it("should be a function", function() {
				expect(_.each).to.be.an.instanceOf(Function);
			});

			it("should not return anything", function() {
				var returnValue = _.each([], function() {});
				expect(returnValue).to.not.exist;
			});

			it("should not mutate the input array", function() {
				var input = [1, 2, 3, 4, 5];
				var result = _.each(input, function(item) {
					/* noop */
				});

				/*
				 * Mutation of inputs should be avoided without good justification otherwise
				 * as it can often lead to hard to find bugs and confusing code!
				 * Imagine we were reading the code above, and we added the following line:
				 *
				 * var lastElement = input[input.length - 1];
				 *
				 * Without knowing that mutation occured inside of each,
				 * we would assume that `lastElement` is 5. But if inside of
				 * each, we use the array method `pop`, we would permanently
				 * change `input` and our assumption would not longer be true,
				 * `lastElement` would be 4 instead!
				 *
				 * The tricky part is that we have no way of knowing about the mutation
				 * just by looking at the code above. We'd have to dive into the
				 * implementation of each to the exact line that uses `pop`.
				 * If we write a lot of code with this assumption, it might be very hard
				 * to trace back to the correct line in each.
				 *
				 * You can avoid an entire class of bugs by writing functions
				 * that don't mutate their inputs!
				 */

				expect(input).to.eql([1, 2, 3, 4, 5]);
			});

			it(" should iterate over arrays and provide access to each value", function() {
				var letters = ["a", "b", "c"];
				var iterations = [];

				_.each(letters, function(letter) {
					iterations.push(letter);
				});

				expect(iterations).to.eql(["a", "b", "c"]);
			});

			it("should iterate over arrays and provide access to each index", function() {
				var letters = ["a", "b", "c"];
				var iterations = [];

				_.each(letters, function(letter, index) {
					iterations.push([letter, index]);
				});

				expect(iterations).to.eql([
					["a", 0],
					["b", 1],
					["c", 2]
				]);
			});

			it("should iterate over arrays and provide access to the original collection", function() {
				var letters = ["a", "b", "c"];
				var iterations = [];

				_.each(letters, function(letter, index, collection) {
					iterations.push([letter, index, collection]);
				});

				expect(iterations).to.eql([
					["a", 0, letters],
					["b", 1, letters],
					["c", 2, letters]
				]);
			});

			it("should only iterate over numeric keys of an array, not all properties", function() {
				var iterations = [];
				var letters = ["a", "b", "c"];
				letters.someProperty = "Do not iterate over me!";

				_.each(letters, function(letter, index, collection) {
					iterations.push(letter);
				});

				expect(iterations).to.not.include("Do not iterate over me!");
			});

			it("should iterate over objects and provide access to each value", function() {
				var letters = { d: "dog", e: "elephant", f: "flotsam" };
				var iterations = [];

				_.each(letters, function(value) {
					iterations.push(value);
				});

				expect(iterations).to.eql(["dog", "elephant", "flotsam"]);
			});

			it("should iterate over objects and provide access to each key", function() {
				var letters = { d: "dog", e: "elephant", f: "flotsam" };
				var iterations = [];

				_.each(letters, function(value, property) {
					iterations.push([value, property]);
				});

				expect(iterations).to.eql([
					["dog", "d"],
					["elephant", "e"],
					["flotsam", "f"]
				]);
			});

			it("should iterate over objects and provide access to the original object", function() {
				var letters = { d: "dog", e: "elephant", f: "flotsam" };
				var iterations = [];

				_.each(letters, function(value, property, object) {
					iterations.push([value, property, object]);
				});

				expect(iterations).to.eql([
					["dog", "d", letters],
					["elephant", "e", letters],
					["flotsam", "f", letters]
				]);
			});

			it("should not confuse an object with a `length` property for an array", function() {
				var dresser = { length: 39, width: 79, height: 127 };
				var iterations = [];

				_.each(dresser, function(value, property, object) {
					iterations.push([value, property, object]);
				});

				expect(iterations).to.eql([
					[39, "length", dresser],
					[79, "width", dresser],
					[127, "height", dresser]
				]);
			});
		});

		describe("indexOf", function() {
			//Returns the index at which value can be found in the array, or -1 if value is not present in the array
			it("should exist", function() {
				expect(_.indexOf).to.exist;
			});

			it("should give index at which the element appears", function() {
				var arr = [1, 2, 3];
				var arrStr = ["hi", "me", "yo", "cool"];
				expect(_.indexOf(arr, 2)).to.equal(1);
				expect(_.indexOf(arrStr, "cool")).to.equal(3);
			});

			it("should return -1 for an element that does not exist in array", function() {
				var arr = [1, 2, 3];
				expect(_.indexOf(arr, "Yo")).to.equal(-1);
				expect(_.indexOf(arr, 8)).to.equal(-1);
			});

			it("should return the first index that the desired value appears if appears multiple times", function() {
				var arrStr = ["hi", "me", "yo", "cool", "ok", "hi", "me"];
				var arr = [1, 3, 4, 3, 4];
				expect(_.indexOf(arrStr, "me")).to.equal(1);
				expect(_.indexOf(arrStr, "hi")).to.equal(0);
				expect(_.indexOf(arr, 3)).to.equal(1);
			});

			it("should be able to take a third argument which indicates the starting index for the search", function() {
				var arrStr = ["hi", "me", "yo", "cool", "ok", "hi", "me"];
				var arr = [1, 3, 4, 3, 4];
				expect(_.indexOf(arrStr, "me", 2)).to.equal(6);
				expect(_.indexOf(arrStr, "hi", 1)).to.equal(5);
				expect(_.indexOf(arr, 3, 2)).to.equal(3);
			});

			//figure out isSorted
			//use performnace.now to find run time of indexOf without isSorted
			//use performance.now to find with isSorted
			//assign variables for the times
			//compare those times
			//compare isSorted time < notSorted time
			it("should execute faster when passed true for isSorted parameter and array is freaking huge", function() {
				var bigArr = _.range(10000000);
				var t0 = performance.now();
				_.indexOf(bigArr, 4526290);
				var t1 = performance.now();
				_.indexOf(bigArr, 4526290, true);
				var t2 = performance.now();
				var notSortedTime = t1 - t0;
				var sortedTime = t2 - t1;
				expect(sortedTime < notSortedTime).to.be.true;
			});
		});

		// describe('findIndex', function() {
		//   it('should exist', function() {
		//     expect(_.findIndex).to.exist;
		//   });
		//   it('should return the index of the first element that passes truth test', function() {
		//     var numbers = [1, 2, 3, 4];
		//     var even = function even(value) {
		//       return value % 2 === 0;
		//     };
		//     expect(_.findIndex(numbers, even)).to.equal(1);
		//   });
		//   it('should return -1 if no element passes truth test', function() {
		//     var numbers = [1, 3, 5, 7];
		//     var even = function(value) {
		//       return value % 2 === 0;
		//     };
		//     expect(_.findIndex(numbers, even)).to.equal(-1);
		//   });
		//   it('should not modify input array', function() {
		//     var numbers = [1, 2, 3, 4];
		//     var even = function(value) {
		//       return value % 2 === 0;
		//     };
		//     _.findIndex(numbers);
		//     expect(_.identity(numbers)).to.eql([1, 2, 3, 4]);
		//   });
		// });

		describe("filter", function() {
			it("should exist", function() {
				expect(_.filter).to.exist;
			});
			//Returns a list of items that match a specified function test
			//Passing in a list of items, and a test funtion, it will test each item and it will return a
			//list of items that passed  the function test.
			//(describe) if given a list and a true test it will return a list of values that pass the test.
			//(It) If given an array of items it will return the items that pass the function test
			//ex. [10,11,12,13,14,15] and function(x) { return x%2 ===0}  -> [10,12,14]
			it("should return a list of values that passed the test", function() {
				expect(
					_.filter([10, 11, 12, 13, 14, 15], function(x) {
						return x % 2 === 0;
					})
				).to.deep.equal([10, 12, 14]);
			});
			//(it) should work on boolean expressions
			//ex. [true, false, true, true, true] and function(x) {return true;} -> [true, true, true, true]
			it("should work on boolean expressions", function() {
				expect(
					_.filter([true, false, true, true, true], function(x) {
						return x === true;
					})
				).to.deep.equal([true, true, true, true]);
			});
			//
			//(it) should return an empty array if no element passes the test
			//ex. [12,13,17,14,11,23] and function(x) {return x%10 === 0} -> []
			it("should return an empty array if no element passes the test", function() {
				expect(
					_.filter([12, 13, 17, 14, 11, 23], function(x) {
						return x % 10 === 0;
					})
				).to.deep.equal([]);
			});
			//
			//(it) should not mutate the original array
			it("should not mutate the original array", function() {
				var oldArray = [1, 2, 3, 4, 5];
				_.filter(oldArray, function(x) {
					return x % 2 === 0;
				});
				expect(oldArray).to.deep.equal([1, 2, 3, 4, 5]);
			});
			//(it) should produce a new array of passed elements
			it("should produce a new array", function() {
				var oldArray = [1, 5, 7, 9, 8, 6, 4];
				expect(
					_.filter(oldArray, function(x) {
						return x % 2 === 0;
					})
				).to.not.equal(oldArray);
			});
		});

		describe("reject", function() {
			// It takes in a list and a stand alone function
			// It examines each element in the list
			// The output should be made up of unmutated input elements
			// The input still deep equals the input after _.reject runs
			// Elements that that fail the test are returned in an array
			it("should exist", function() {
				expect(_.reject).to.exist;
			});
			it("returns a new array", function() {
				var nums = [1, 2, 3, 4, 5, 6];
				var sames = _.reject(nums, function(num) {
					return num === 0;
				});
				expect(sames).to.not.equal(nums);
			});
			it("does not modify the input array", function() {
				var nums = [1, 2, 3, 4, 5, 6];
				var odds = _.reject(nums, function(num) {
					return num % 2 === 0;
				});
				expect(nums).to.deep.equal(nums);
			});
			it("returns an array made of unmodified input elements", function() {
				var nums = [1, 2, 3, 4, 5, 6];
				var odds = _.reject(nums, function(num) {
					return num % 2 === 0;
				});
				expect(odds).to.include(nums[0]);
				expect(odds).to.include(nums[2]);
				expect(odds).to.include(nums[4]);
			});
			it("returns a new array with the elements that fail a test", function() {
				var odds = _.reject([1, 2, 3, 4, 5, 6], function(num) {
					return num % 2 === 0;
				});
				expect(odds).to.deep.equal([1, 3, 5]);
			});
			it("returns an empty array when all elements fail a test", function() {
				var nums = [2, 4, 6];
				var odds = _.reject(nums, function(num) {
					return num % 2 === 0;
				});
				expect(odds).to.deep.equal([]);
			});
		});

		describe("uniq", function() {
			it("should exist", function() {
				expect(_.uniq).to.exist;
			});

			//it should not mutate the original array
			it("it should not mutate the original array", function() {
				let arr1 = [1, 2, 3, 4, 5, 5];
				_.uniq(arr1);
				expect(arr1).to.deep.equal([1, 2, 3, 4, 5, 5]);
			});

			//if the list is empty, then return an empty array
			it("if the list is empty, then return an empty array", function() {
				expect(_.uniq([])).to.deep.equal([]);
			});

			//it should return an array with no duplicate values
			it("it should return an array with no duplicate values", function() {
				expect(_.uniq([1, 1, 2, 3, 4, 5, 6, 6, 7])).to.deep.equal([
					1,
					2,
					3,
					4,
					5,
					6,
					7
				]);
			});

			//it should compute much faster if isSorted is set to true
			it("it should not return a sorted list if isSorted is set to false", function() {
				let sorted = [1, 1, 1, 2, 2, 2, 3, 3, 3, 4];
				let unSorted = [4, 3, 1, 1, 2, 3, 1, 2, 2, 3];

				expect(_.uniq(sorted, true)).to.not.deep.equal(_.uniq(unSorted, false));
			});

			//it should give a unique list of items based on our iteratee function
			it("it should give a unique list of items based on our iteratee function", function() {
				let mySorted = [1, 1, 2, 2, 2, 3, 3, 3, 4, 4];
				let myIter = function(value) {
					return value === 3;
				};

				expect(_.uniq(mySorted, myIter)).to.deep.equal([1, 3]);
			});

			//it should expect our result to be an array
			it("it should expect our result to be an array", function() {
				expect(
					Array.isArray(_.uniq([1, 1, 2, 3, 4, 5, 6, 6, 7]))
				).to.deep.equal(true);
			});
		});

		describe("map", function() {
			const nums = [1, 2, 3];
			const birthdays = {
				a: { month: "Mar", day: 16 },
				b: { month: "Aug", day: 29 },
				c: { month: "Mar", day: 17 }
			};
			const addOne = num => {
				return num + 1;
			};
			const isBirthdaysGreaterThan16 = birthday => {
				return birthday.day > 16;
			};
			const showsElementIndex = (letter, index) => {
				return `element: ${letter} | idx: ${index}`;
			};

			it("should return new array of transformed values", function() {
				expect(_.map(nums, addOne)).to.deep.equal([2, 3, 4]);
			});
			it("should iterate over every element and it's index in input array", function() {
				expect(_.map(["a", "b"], showsElementIndex)).to.eql([
					"element: a | idx: 0",
					"element: b | idx: 1"
				]);
			});
			it("should return an array", function() {
				expect(_.map(birthdays, isBirthdaysGreaterThan16)).to.be.an("array");
			});
			it("should map through an object and return new array", function() {
				expect(_.map(birthdays, isBirthdaysGreaterThan16)).to.eql([
					false,
					true,
					true
				]);
			});
			it("should not mutate original input", function() {
				const birthdaysGreaterThan16 = _.map(
					birthdays,
					isBirthdaysGreaterThan16
				);
				expect(birthdays).to.deep.equal({
					a: { month: "Mar", day: 16 },
					b: { month: "Aug", day: 29 },
					c: { month: "Mar", day: 17 }
				});
				expect(birthdays !== birthdaysGreaterThan16).to.be.true;
				expect(_.map(nums, addOne) !== nums).to.be.true;
			});
			it("should exist", function() {
				expect(_.map).to.exist;
			});
		});

		describe("pluck", function() {
			// Returns an array of values
			// Given an array of objects return an array of values

			// (describe) If given an array containing objects, return an array of values
			// (it) Given an array of objects (fruits), should return an array with the value as the elements

			// (describe) If give an array of objects and a non-existent key, should return an array of undefined
			// (it) Given an array of objects(fruits) with key 'vegetables', should return [undefined, undefined, undefined];

			describe("Testing _.pluck Method", function() {
				const fruits = [
					{ fruit: "banana" },
					{ fruit: "orange" },
					{ fruit: "watermelon" }
				];
				const valuesOfFruits = ["banana", "orange", "watermelon"];

				const mixedDataTypes = [
					{ dataType: true },
					{ dataType: 1 },
					{ dataType: "String" },
					{ dataType: { insideArrObjKey: "insideArrObjValue" } }
				];
				const valuesOfMixedDataTypes = [
					true,
					1,
					"String",
					{ insideArrObjKey: "insideArrObjValue" }
				];

				it("should exist", function() {
					expect(_.pluck).to.exist;
				});

				it("Should return an array", function() {
					expect(_.pluck(fruits)).to.be.an("array");
				});

				it("Should not mutate original argument", function() {
					_.pluck(fruits, "fruit");

					expect(fruits).to.deep.equal([
						{ fruit: "banana" },
						{ fruit: "orange" },
						{ fruit: "watermelon" }
					]);
				});

				it("If given an array containing objects, return an array of values", function() {
					expect(_.pluck(fruits, "fruit")).to.deep.equal(valuesOfFruits);
				});

				it("If given an array with mixed data types, should return values", function() {
					expect(_.pluck(mixedDataTypes, "dataType")).to.eql(
						valuesOfMixedDataTypes
					);
				});

				it("If given an array of objects and a non-existent key, should return an array of undefined", function() {
					expect(_.pluck(fruits, "vegetable")).to.eql([
						undefined,
						undefined,
						undefined
					]);
				});
			});
		});

		describe("reduce", function() {
			it("should exist", function() {
				expect(_.reduce).to.exist;
			});

			it("should work when no memo is provided", function() {
				let sum = (memo, elem) => memo + elem;
				expect(_.reduce([1, 2, 3], sum)).to.equal(6);

				let multiply = (memo, elem) => memo * elem;
				expect(_.reduce([1, 2, 3], multiply)).to.equal(6);
			});

			it("should reduce in the correct order", function() {
				let sum = (memo, elem) => memo + elem;
				expect(_.reduce(["First", "Second", "Third"], sum)).to.equal(
					"FirstSecondThird"
				);
			});

			it("should work when memo is a primative value", function() {
				let multiply = (memo, elem) => memo * elem;
				expect(_.reduce([1, 2, 3], multiply, 0)).to.equal(0);
			});

			it("should work when memo is an object", function() {
				let people = [
					{ name: "jeff", age: 25, height: 80 },
					{ name: "mike", age: 36, height: 75 },
					{ name: "billy", age: 21, height: 86 }
				];
				let getNameAgePairs = (memo, elem) => {
					memo[elem.name] = elem.age;
					return memo;
				};
				expect(_.reduce(people, getNameAgePairs, {})).to.deep.equal({
					jeff: 25,
					mike: 36,
					billy: 21
				});
			});

			it("should not mutate input array", function() {
				let money = [5, 10, 15, 20];
				let sum = (memo, elem) => memo + elem;
				_.reduce(money, sum);
				expect(money).to.deep.equal([5, 10, 15, 20]);
			});
		});
	});

	describe("Part II - A Journey into the beyond!", function() {
		it("is scary but you can do it!", function() {
			let expected = "You Can Do It";
			expect("You Can Do It").to.equal(expected);
		});
	});
})();

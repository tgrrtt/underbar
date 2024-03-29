/*jshint eqnull:true, expr:true*/

var _ = {};

(function() {

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if (n === 0) {
      return [];
    }

    return n === undefined ? array[array.length-1] : array.slice(-n);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    } else if (typeof collection === "object") {
      for (var j in collection) {
        iterator(collection[j], j, collection);
      } 
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var newArray = [];
    _.each(collection, function (item) {
      if (test(item)) {
        newArray.push(item);
      }
    });

    return newArray;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    return _.filter(collection, function(item){
      return !test(item);
    });
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var newArray = [];
    return _.filter(array, function(item) {
      if (newArray.indexOf(item) === -1) {
        newArray.push(item);
        return item;
      }
    });
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.

    var newArray = [];
    _.each(collection, function(item) {
      newArray.push(iterator(item));
    });
    return newArray;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Calls the method named by functionOrKey on each value in the list.
  // Note: you will nead to learn a bit about .apply to complete this.
  // _.invoke([1,2,3], multiplyBy3) should return [3,6,9]
  // _.invoke([1,2,3], multiplyBy, 4) should return [4,8,12]
  
  _.invoke = function(collection, functionOrKey, argsArray) {
    // if (typeof functionOrKey === 'string') {
    //   return _.map(collection, function(value) {
    //     return value[functionOrKey].apply(value);
    //   })
    // } else {
    //   return _.map(collection, function(value) {
    //     return functionOrKey.apply(value);
    //   })
    // }
    return _.map(collection, function(value) {
      return ((typeof functionOrKey !== "string") ? functionOrKey : value[functionOrKey]).apply(value, argsArray);
    });
  };



  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  //
  // You can pass in an initialValue that is passed to the first iterator
  // call. If initialValue is not explicitly passed in, it should default to the
  // first element in the collection.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  _.reduce = function(collection, iterator, accumulator) {
    var total = accumulator !== undefined ? accumulator : collection[0];

    _.each(collection, function (item) {
      total = iterator(total, item);
    });

    return total;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    iterator = iterator ? iterator : _.identity;
    return _.reduce(collection, function(passed, item) {
      if (passed === true && iterator(item)) {
        return true;
      } else {
        return false;
      }
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    if (!collection.length) {
      return false;
    }
    iterator = iterator ? iterator : _.identity;

    try {
      return _.reduce(collection, function(passed, item) {
        if (iterator(item)) {
          throw true;
        } else {
          return false;
        }
      }, true);
    } catch (bool){
      return bool;
    }
    
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    
    _.each(arguments, function (item) {
      _.each(item, function(item, i) {
        obj[i] = item;
      });
    });
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    _.each(arguments, function (item) {
      _.each(item, function(item, i) {
        if (!obj.hasOwnProperty(i)) {
          obj[i] = item;
        }
      });
    });
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // _.memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var results = {};
    return function (argument) {
      if (results[argument]) {
        return results[argument];
      }
      results[argument] = func.apply(this, arguments);
      return results[argument];
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var args = Array.prototype.slice.call(arguments);
    func = args.shift();
    wait = args.shift();
    setTimeout(function() {
      func.apply(this, args);
    }, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    var arrCopy = array.slice();
    var tempVal;
    var randIndex;
    for (var i = 0; i < arrCopy.length; i++) {
        randIndex = Math.floor(Math.random() * arrCopy.length);
        tempVal = arrCopy[randIndex];
        arrCopy[randIndex] = arrCopy[i];
        arrCopy[i] = tempVal;
    }
    return arrCopy;
  };


  /**
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */


  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function(arrays) {
    var args = Array.prototype.slice.call(arguments, 0);
    var longestArrLen = 0;
    var zipped = [];
    var currArr = [];
    
    for (var i = 0; i < args.length; i++) {
      if (args[i].length > longestArrLen) {
        longestArrLen = args[i].length;
      }
    }

    for (var j = 0; j < longestArrLen; j++) {
      currArr = [];
      
      for (var k = 0; k < args.length; k++) {
        currArr.push(args[k][j]);
      }
      
      zipped.push(currArr);
    }
    
    return zipped;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    var flatArray = [];
    function flatten(array) {
      _.each(array, function (item) {
        if (Array.isArray(item)) {
          flatten(item);
        } else {
          flatArray.push(item);
        }
      });
    }
    flatten(nestedArray);
    return flatArray;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var args = Array.prototype.slice.call(arguments, 0);
    var allItems = [];
    var intersection = [];
    // for each array passed in
    _.each(args, function (item) {
      // for each item in array
      _.each(item, function (thing) {
        if (allItems.indexOf(thing) === -1) {
          allItems.push(thing);
        } else if (intersection.indexOf(thing) === -1) {
          intersection.push(thing);
        }
      });
    });
    return intersection;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var args = Array.prototype.slice.call(arguments, 0);
    var removedFrom = args.splice(0,1)[0];
    _.each(args, function (array) {
      _.each(array, function (item) {
        var index = removedFrom.indexOf(item);
        if (index !== -1) {
          removedFrom.splice(index, 1);
        }
      });
    });
    return removedFrom;
  };


  /**
   * MEGA EXTRA CREDIT
   * =================
   */

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See the Underbar readme for details.
  _.throttle = function(func, wait) {
  };

}).call(this);

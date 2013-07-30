// Scope
// -----

// To avoid global scope pollution, declare all variables and functions inside an
// [immediately-invoked function expression](http://benalman.com/news/2010/11/immediately-invoked-function-expression/) using an augmented [module pattern](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript).

var PDP = (function( pdp ) {

  'use strict';

  // Utils
  // ----------------
  // An assortment of helper methods and polyfills.

  pdp.utils = {};

  // Return the hash parameters from the current URL. [source](http://stackoverflow.com/questions/4197591/parsing-url-hash-fragment-identifier-with-javascript/4198132#4198132)

  pdp.utils.getHashParams = function() {

    var hashParams = {};
    var e,
        a = /\+/g,  // Regex for replacing addition symbol with a space
        r = /([^&;=<>]+)([=><]?)([^&;]*)/g,
        d = function (s) { return decodeURIComponent(s.replace(a, ' ')); },
        q = window.location.hash.substring(1).replace(/^!\/?/, '');

    while (e = r.exec(q)) {
      hashParams[d(e[1])] = {
        values: d(e[3]),
        comparator: d(e[2])
      };
    }

    return hashParams;

  };

  // Cache data in the localStorage, adapted from https://gist.github.com/rpflorence/1345787

  pdp.utils.getJSON = function( url ) {

    var supportsLocalStorage = 'localStorage' in window;

    // Both functions return a promise, so no matter which function
    // gets called inside getCache, you get the same API.

    function getJSON( url ) {

      var promise = $.getJSON(url);

      promise.done(function(data) {
        localStorage.setItem(url, JSON.stringify(data));
      });

      console.log('%c' + url + ' fetched via AJAX', 'color: orange');

      return promise;
    }

    function getStorage( url ) {

      var storageDfd = new $.Deferred(),
          storedData = localStorage.getItem(url);

      if (!storedData) {
        return getJSON(url);
      }

      setTimeout(function() {
        storageDfd.resolveWith(null, [JSON.parse(storedData)]);
      });

      console.log('%c' + url + ' fetched via localStorange', 'color: blue');

      return storageDfd.promise();

    }

    return supportsLocalStorage ? getStorage( url ) : getJSON( url );

  };


  // localStorage polyfill from https://gist.github.com/juliocesar/926500.

  if (!('localStorage' in window)) {
    window.localStorage = {
      _data       : {},
      setItem     : function(id, val) { return this._data[id] = String(val); },
      getItem     : function(id) { return this._data.hasOwnProperty(id) ? this._data[id] : undefined; },
      removeItem  : function(id) { return delete this._data[id]; },
      clear       : function() { return this._data = {}; }
    };
  }

  // A `bind()` polyfill

  if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
      if (typeof this !== 'function') {
        // closest thing possible to the ECMAScript 5 internal IsCallable function
        throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
      }

      var aArgs = Array.prototype.slice.call(arguments, 1), 
          fToBind = this, 
          FNOP = function () {},
          fBound = function () {
            return fToBind.apply(this instanceof FNOP && oThis ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
          };

      FNOP.prototype = this.prototype;
      fBound.prototype = new FNOP();

      return fBound;
    };
  }

  return pdp;

}( PDP || {} ));

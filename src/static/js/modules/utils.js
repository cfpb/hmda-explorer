var PDP = (function( pdp ) {

  'use strict';

  // Utils
  // ----------------
  // An assortment of helper methods and polyfills.
  var utils = {};

  // Error visualization
  utils.showError = function( errorText ) {
    $('#error').text( errorText ).delay( 20000 ).fadeOut();
  };

  // takes a variable name and returns a nice title
  // ex. state_name becomes State
  utils.varToTitle = function( varName ) {
    var nameParts = varName.split('_'),
        varTitle;

    nameParts = nameParts.reverse();

    // a varName can have both 'name' and an int on the end
    if ( isNaN(nameParts[0]) === false ) {
      nameParts.splice(0, 1);
    }

    if ( nameParts[0] === 'name' ) {
      nameParts.splice(0, 1);
    }

    if ( nameParts[0] === 'year' ) {
      nameParts.splice(1, 2);
    }

    varTitle = nameParts.reverse().join(' ');
    varTitle = varTitle.charAt(0).toUpperCase() + varTitle.slice(1);

    return varTitle;
  };

  // When given a number of bytes, this'll return a string with proper units.
  utils.getPrettyFilesize = function( bytes ) {
    if (bytes>=1073741824) {
      bytes = ( bytes/1073741824 ).toFixed( 1 ) + ' GB';
    } else if ( bytes>=1048576 ) {
      bytes = ( bytes/1048576 ).toFixed( 1 ) + ' MB';
    } else if ( bytes >= 1024 ) {
      bytes = ( bytes/1024 ).toFixed( 0 ) + ' KB';
    } else if ( bytes > 1 ) {
      bytes = bytes + ' bytes';
    } else if ( bytes == 1 ) {
      bytes = bytes + ' byte';
    } else {
      bytes = '0 byte';
    }
    return bytes;
  };

  // Return the hash parameters from the current URL. [source](http://goo.gl/mebsOI)
  utils.getHashParams = function() {

    var hashParams = {};
    var e,
        a = /\+/g,  // Regex for replacing addition symbol with a space
        r = /([^!&;=<>]+)(!?[=><]?)([^&;]*)/g,
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

  // Sanitize strings
  utils.sanitize = function( string ) {

    var tagBody = '(?:[^"\'>]|"[^"]*"|\'[^\']*\')*',
        tagOrComment = new RegExp('<(?:!--(?:(?:-*[^->])*--+|-?)|script\\b' + tagBody + '>[\\s\\S]*?</script\\s*|style\\b' + tagBody + '>[\\s\\S]*?</style\\s*|/?[a-z]' + tagBody + ')>', 'gi');

    function removeTags( html ) {
      var oldHtml;
      do {
        oldHtml = html;
        html = html.replace(tagOrComment, '');
      } while (html !== oldHtml);
      return html.replace(/</g, '&lt;');
    }
    return removeTags( string );

  };

  // Add commas to a number to make it pretty.
  utils.commify = function( num ) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  utils.isBlank = function (str) {
      return (!str || /^\s*$/.test(str));
  };

  utils.emptyObject = function (obj) {
    if (_.isObject(obj)) {
      return !_.some(obj, function(val, key) {
          return !pdp.utils.isBlank(val);
      });
    }
  };

  utils.nonEmptyValues = function (obj) {
    if (!_.isObject(obj)) {
      return [];
    }
    return _.filter(obj, function(val, key) {
        return !pdp.utils.isBlank(val);
    });
  };

  // localStorage polyfill from https://gist.github.com/juliocesar/926500.
  // Basically just creates an object in memory.
  if ( !('localStorage' in window) ) {
    window.localStorage = {
      _data       : {},
      setItem     : function(id, val) { return this._data[id] = String(val); },
      getItem     : function(id) { return this._data.hasOwnProperty(id) ? this._data[id] : undefined; },
      removeItem  : function(id) { return delete this._data[id]; },
      clear       : function() { return this._data = {}; }
    };
  }

  // Cache AJAX requests in localStorage.
  utils.getJSON = function( url ) {

    var supportsLocalStorage = 'localStorage' in window,
        keyPrefix = 'hmda',
        storageKey = keyPrefix + ':' + url.substring( url.indexOf('?') + 1 ),
        // 6 hour cache expiration in ms.
        ttl = 6 * 60 * 60 * 1000;

    function getJSON( url ) {

      var deferred = url.indexOf('jsonp') !== -1 ? $.jsonp({ url: url }) : $.getJSON( url );

      deferred.done(function(data) {

        // if the request returns a status of 'computing'
        // results are not ready and should not be cached
        if (data && data.computing) {
          return;
        }

        try {
          localStorage.setItem( storageKey, JSON.stringify(data) );
          localStorage.setItem( storageKey + ':expiration', +new Date() + ttl );
        } catch( e ) {
          clearStorage();
        }
        // This is a safety to prevent the polyfill object from growing too huge.
        // @TODO: Make this less lame.
        if ( window.localStorage.length > 100 ) {
          clearStorage();
        }
      });

      return deferred;
    }

    function getStorage( url ) {

      var storageDfd = new $.Deferred(),
          storedData = localStorage.getItem( storageKey ),
          storedDataExp = localStorage.getItem( storageKey + ':expiration' ),
          promise;

      if (!storedData || !storedDataExp || storedDataExp < +new Date()) {
        return getJSON( url );
      }

      setTimeout( function() {
        storageDfd.resolveWith( null, [ JSON.parse(storedData) ] );
      });

      promise = storageDfd.promise();
      promise.status = 200;
      promise.statusText = 'success';

      return promise;

    }

    function clearStorage() {

      _.keys( localStorage ).forEach( function( key ){
        if ( key.indexOf( keyPrefix ) !== -1 ) {
          localStorage.removeItem(key);
        }
      });

    }

    window.clearStorage = clearStorage;

    // Both functions return a promise, so no matter which function
    // gets called, the API is the same.
    return supportsLocalStorage ? getStorage( url ) : getJSON( url );

  };

  // Pass a keypress event and its default action will be prevented if a
  // non-numeric key was pressed. Numbers, commas, tab, delete, backspace,
  // meta, A (for selecting all), V (for pasting) and arrow keys are allowed to be pressed.
  utils.requireNumeric = function( e ) {

      var key = e.which,
          allowedKeys = [ 8, 9, 16, 17, 18, 36, 37, 38, 39, 40, 46, 48, 49, 50, 51, 52, 53,
                          54, 55, 56, 57, 65, 86, 91, 93, 96, 97, 98, 99, 100, 101, 102,
                          103, 104, 105, 188, 189, 224 ];

      if ( allowedKeys.indexOf( key ) === -1 ) {
        e.preventDefault();
        $( this ).tooltip( { title: 'Numbers only, please!', trigger: 'manual' } );
        $( this ).tooltip( 'show' );
        setTimeout( function(){
          $( this ).tooltip('destroy');
        }.bind( this ), 3000);
      }

  };

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

  // A `splice()` polyfill.
  String.prototype.splice = function( idx, rem, s ) {
      return (this.slice(0,idx) + s + this.slice(idx + Math.abs(rem)));
  };

  // A `indexOf()` polyfill.
  if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
      if (this === null) {
        throw new TypeError();
      }
      var n, k, t = Object(this),
          len = t.length >>> 0;

      if (len === 0) {
        return -1;
      }
      n = 0;
      if (arguments.length > 1) {
        n = Number(arguments[1]);
        if (n != n) { // shortcut for verifying if it's NaN
          n = 0;
        } else if (n !== 0 && n != Infinity && n != -Infinity) {
          n = (n > 0 || -1) * Math.floor(Math.abs(n));
        }
      }
      if (n >= len) {
        return -1;
      }
      for (k = n >= 0 ? n : Math.max(len - Math.abs(n), 0); k < len; k++) {
        if (k in t && t[k] === searchElement) {
          return k;
        }
      }
      return -1;
    };
  }

  $.fn.initTooltips = function( options ){

    var settings = $.extend({
        placement: 'top',
        container: false
    }, options );

    return this.find('.help').tooltip({
      placement: settings.placement,
      container: settings.container,
      title: function getTooltipTitle(){
        return $( this ).attr('title') || $( this ).next('.help-text').html();
      }
    });
  };

  pdp.utils = utils;

  return pdp;

}( PDP || {} ));

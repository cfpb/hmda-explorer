(function(){

  'use strict';

  describe('The global observer', function(){

    var ee;
    var fn1;
    var fn2;

    beforeEach(function() {

      ee = PDP.observer;

    });

    it('should exist', function(){

      expect( ee ).not.toBeUndefined();

    });

    it('initialises the event object and a listener array', function(){

      ee.getListeners('foo');

      expect( _.has( ee._events, 'foo' ) ).toBeTruthy();

    });

    it('should not overwrite listener arrays', function(){

      var listeners = ee.getListeners('foo');

      listeners.push('bar');

      expect( ee._events.foo ).toEqual( ['bar'] );

    });

    it('allows you to fetch listeners by regex', function(){

      var count = 0;

      ee.addListener('foo', function() { count++; });
      ee.addListener('bar', function() { count++; return 'bar'; });
      ee.addListener('baz', function() { count++; return 'baz'; });

      var listeners = ee.getListeners(/ba[rz]/);

      expect( listeners.bar.length + listeners.baz.length ).toEqual( 2 );

    });

    it('adds a listener to the specified event', function(){

      fn1 = function(){};

      ee.addListener('foo', fn1);

      expect( ee.getListeners('foo') ).not.toBeUndefined();

    });

  });

})();

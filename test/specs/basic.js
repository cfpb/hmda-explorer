define(['jquery', 'backbone', 'models/app'], function( $, Backbone, App ) {

    describe('Basic', function(){

        it('should pass a single assertion without causing an error', function(){
            expect(true).toBeTruthy();
        });

        it('should let me test our AMD modules', function(){
            expect($).toBeDefined();
        });

        it('should play nicely with Backbone', function(){

            expect(Backbone).toBeDefined();

            var model = new App();
            expect(model).toBeDefined();

            model.set('foo', 'bar');
            expect(model.get('foo')).toBe('bar');

        });

    });

});

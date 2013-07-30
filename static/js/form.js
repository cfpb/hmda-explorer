// Scope
// -----

// To avoid global scope pollution, declare all variables and functions inside an
// [immediately-invoked function expression](http://benalman.com/news/2010/11/immediately-invoked-function-expression/) using an augmented [module pattern](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript).

var PDP = (function ( pdp ) {

  'use strict';

  // The Form Object
  // ----------------
  // The `form` object stores stuff specific to the DOM form.

  var form = {};

  // Cache a reference to the form's jQuery object.

  form.$el = $('form');

  // Cache a reference to all the filter fields.

  form.$fields = form.$el.find('.field');

  // The 'getField' method returns a field's name and value when given
  // a jQuery object of the field's HTML element.

  form.getField = function( $el ) {

    var tagName = $el.prop('tagName').toLowerCase(),
        type = $el.attr('type'),
        name = $el.attr('name') || 'untitled',
        value = $el.val(),
        field = {};

    // If the element has no tag name or type, or it has no `value`, abort.
    // It's either not selected or broken.

    if ( !( tagName || type ) || !value ) {
      return false;
    }

    // If it's a radio or checkbox element, abort if it's not selected. Otherwise,
    // remove the empty array from the value name (which really only applies to checkboxes).

    if ( type === 'radio' || type === 'checkbox' ) {
      if ( !$el.is(':checked') ) {
        return false;
      } else {
        name = name.replace( '[]', '' );
      }
    }

    // Build and return the field's deets.

    field = {
      name: name,
      tagName: tagName,
      type: type,
      value: value
    };

    return field;

  };

  form.updateField = function( el, dependency ) {

    // Broadcast that an update is starting.

    observer.emitEvent('update:started');

    // Remove all current options from field.

    this.resetField( el );

    var id = $(el).find('select').attr('id');

    // Fetch form field options and set fields when that request is fulfilled.

    this.fetchFieldOptions( id ).done( function( options ) {

        this.setFieldOptions( el, options );

        // Broadcast that the update has ended.

        observer.emitEvent('update:stopped');

    }.bind( this ));

  };

  // The `setFieldOptions` populates a select element with supplied options.

  form.setFieldOptions = function( el, options ) {

    var dropdown = $( el ).find('select'),
        template = _.template('<option value="<%= value %>"><%= label %></option>');

    _.forEach( options, function( option ) {
      dropdown.append( template( option ) );
    });

    dropdown.trigger('liszt:updated');

  };

  // The `fetchFieldOptions` method returns a promise to a field's options.

  form.fetchFieldOptions = function( id ) {

    var promise = $.ajax( query.endpoint + id + '.json' );

    return promise;

  };

  // The `emptyField` method removes all options from a `select` element and tells
  // chosen to update the element accordingly.

  form.resetField = function( el ) {

    $( el ).find('option').remove();
    $( el ).find('select').trigger('liszt:updated');

  };

  // Check if any filter fields need to be shown or hidden.

  form.checkDeps = function( el ) {

    // The form field element is passed from the observer.
    // Grab the data-dependent attribute on the form field.

    var $el = $( el ),
        dependents = $el.attr('data-dependent'),
        $dependents;

    // Helper function to emit events

    function emit( el, id ) {
      observer.emitEvent( 'field:shown', [el, id] );
    }

    // If the form field does in fact have any dependents, create a jQuery
    // object of their field containers and show/hide them as needed.

    if ( dependents ) {

      // Split and join the dependents with hashes if there are multiple 
      // so we can reference the appropriate fields by id later.

      dependents = dependents.split(' ').join(', #');
      $dependents = $( '#' + dependents ).parents('.field');

      // If it has a value, show all of its dependent fields. For each
      // dependent field, broadcast that is has been shown.

      if ( $el.val() ) {
        $dependents.removeClass('hidden');
        _.forEach( $dependents, function( $dependent ){
          emit( $dependent, $el.attr('id') );
        });
      } else {
        $dependents.addClass('hidden');
      }

    }

  };

  pdp.form = form;

  return pdp;

}( PDP || {} ));

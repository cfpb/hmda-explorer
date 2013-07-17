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

  // The `showFilter` method shows all the fields of a given filter section.

  form.showFilter = function( el ) {

    var $el = $( el ),
        $fields = $el.find('.fields'),
        height = Math.max( $fields.show().height(), 150 );

    // This is a hack to calculate the height of the DOM element ahead of time so
    // there's no irritating jump when it slides open.

    $fields.hide().css( 'height', 0 );
    $fields.show().animate( {height: height}, 150 );

    $el.removeClass('closed').attr( 'title', 'Hide this filter section' );

    pdp.observer.emitEvent( 'filter:shown', el );

  };

  // The `hideFilter` method hides all the fields of a given filter section.

  form.hideFilter = function( el ) {

    $( el ).addClass('closed').attr( 'title', 'Show this filter section' ).find('.fields').slideUp( 200 );

    pdp.observer.emitEvent( 'filter:hidden', el );

  };

  // The `checkFilters` method checks if a filter has any fields with values.

  form.checkFilters = function() {

    pdp.form.$fields.each(function(){

      var $el = $( this ),
          $parentFilter = $(this).parents('.filter.closed');

      if ( pdp.form.hasValue( $el ) && $parentFilter.length > 0 ) {
        pdp.form.showFilter( $parentFilter );
      }

    });

  };

  // The 'hasValue' method checks if a field has any value selected.

  form.hasValue = function( el ) {

    var $el = $( el ).find('select, input');

    //$el.css('background', 'orange')

    //console.log(el);

    // If it's a select element or text box

    if ( $el.prop('tagName').toLowerCase() === 'select' || $el.attr('type') === 'text' ) {

      if ( $el.val() ) {

        return $el.val().length > 0;

      }

    // If it's a checkbox or radio element

    } else if ( $el.attr('type') === ( 'checkbox' || 'radio' ) ) {

      return $el.prop('checked');

    }

    // Return false by default

    return false;

  };

  // The `getField` method returns a field's attributes and value(s) when given
  // a jQuery object of the field's HTML element.

  form.getField = function( $el ) {

    var tagName = $el.prop('tagName').toLowerCase(),
        type = $el.attr('type'),
        name = $el.attr('name') || undefined,
        value = $el.val(),
        field = {},
        comparator = '=';

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
      values: value,
      comparator: _.isEmpty( $el.data('comparator') ) ? '=' : $el.data('comparator')
    };

    return field;

  };

  // The 'getFields' method returns an array of *all* fields' attributes and values.

  form.getFields = function( $el ) {

    var fields = [],
        $fields = pdp.app.$el.find('.param');

    $fields.each(function(){

      var $this = $( this ),
          field = pdp.form.getField( $this );

      if ( field ) {
        fields.push( field );
      }

    });

    return fields;

  };

  // The `setFields` method sets all fields' values/options from the `query.params` hash.

  form.setFields = function() {

    var params = pdp.query.params;

    // Helper function to set all options of a field.

    function setOptions( field, param ) {

      _.forEach( field.values, function( val ){

        // Set radios.
        $('input[name=' + param + '][value="' + val + '"]').prop('checked', true);

        // Set checkboxes.
        $('input[name=' + param + '\\[\\]][value="' + val + '"]').prop('checked', true);

      });

      // Set selects.
      $('select[name=' + param + ']').val( field.values ).trigger('liszt:updated');

      //console.log('set: ' + param);
      //console.log($('#' + param));

    }

    _.forEach( params, setOptions );

  };

  // The `updateFieldOptions` method fetches and sets a field's options

  form.updateFieldOptions = function( el, dependency ) {

    // Abort if this isn't a select field

    if ( $(el).find('select').length < 1 ) {
      return false;
    }

    // Broadcast that an update is starting.

    pdp.observer.emitEvent('update:started');

    // Remove all current options from field.

    this.resetField( el );

    var id = $(el).find('select').attr('id');

    // Fetch form field options and set fields when that request is fulfilled.

    this.fetchFieldOptions( id ).done( function( options ) {

        this.setFieldOptions( el, options );

        // Broadcast that the update has ended.

        pdp.observer.emitEvent('update:stopped');
        pdp.observer.emitEvent('field:updated');

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

    var promise = $.ajax( pdp.query.endpoint + id + '.json' );

    return promise;

  };

  // The `resetField` method removes all options from a `select` element and tells
  // `chosen` to update the element accordingly.

  form.resetField = function( el ) {

    $( el ).find('option').remove();
    $( el ).find('select').trigger('liszt:updated');

  };

  // The `disableField` method disables a `select` and its `chosen` container.

  form.disableField = function( el ) {

    var $el = $( el ),
        $select = $el.find('select'),
        placeholder;

    $el.addClass('disabled').find('select, input').attr('disabled', 'disabled');

    // If it's a select element, swap out its placeholder text

    if ( !_.isEmpty( $select ) ) {
      placeholder = $select.data('pre-placeholder');
      $select.attr('data-placeholder', placeholder).trigger('liszt:updated');
    }

    return el;

  };

  // The `enableField` method enables a `select` and its `chosen` container.

  form.enableField = function( el ) {

    var $el = $( el ),
        $select = $el.find('select'),
        placeholder;

    $el.removeClass('disabled').find('select, input').removeAttr('disabled').trigger('liszt:updated');

    // If it's a select element, swap out its placeholder text

    if ( !_.isEmpty( $select ) ) {
      placeholder = $select.data('post-placeholder');
      $select.attr('data-placeholder', placeholder).trigger('liszt:updated');
    }

    return el;

  };

  // Check if any filter fields need to be shown or hidden.

  form.checkDeps = function( el ) {

    // The form field element is passed from the observer.
    // Grab the data-dependent attribute on the form field.

    var $el = $( el ),
        dependents = $el.attr('data-dependent'),
        $dependents;

    // Helper function to emit events

    function emit( el, id, activity ) {
      pdp.observer.emitEvent( 'field:' + activity, [el, id] );
    }

    // If the form field does in fact have any dependents.

    if ( dependents ) {

      // Split and join the dependents with hashes if there are multiple 
      // so we can reference the appropriate fields by id later.

      dependents = dependents.split(' ').join(', #');
      $dependents = $( '#' + dependents ).parents('.field');

      // If it has a value, show all of its dependent fields. For each
      // dependent field, broadcast that is has been shown.

      if ( $el.val() ) {
        _.forEach( $dependents, function( $dependent ){
          emit( $dependent, $el.attr('id'), 'shown' );
        });
      } else {
        _.forEach( $dependents, function( $dependent ){
          emit( $dependent, $el.attr('id'), 'hidden' );
        });
      }

    }

  };

  pdp.form = form;

  return pdp;

}( PDP || {} ));

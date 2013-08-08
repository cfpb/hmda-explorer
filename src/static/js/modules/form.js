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

  form.init = function() {
    this.$fields = form.$el.find('.field');
  };

  // Initialize ZeroClipboard on the share button.

  form.clip = new ZeroClipboard( $('#share'), {
    moviePath: 'static/js/zeroclipboard/ZeroClipboard.swf'
  });

  // When the share URL has been saved to clipboard, show a tooltip for a few seconds.

  form.clip.on( 'complete', function(client, args) {

    $('#share_url').tooltip('show');
    $('#share_url').select();
    setTimeout( function(){
      $('#share_url').tooltip('hide');
    }, 3000);

  });

  // The `showFilter` method shows all the fields of a given filter section.

  form.showFilter = function( el ) {

    var $el = $( el ),
        $fields = $el.find('.fields'),
        height = Math.max( $fields.show().height(), 10 );

    // This is a hack to calculate the height of the DOM element ahead of time so
    // there's no irritating jump when it slides open.

    $fields.hide().css( 'height', 0 );
    $fields.show().animate( {height: height}, 150, 'swing', function(){
      // We set height to auto after the animation so that the div can expand 
      // if a lot of items in a 'chosen' select widget are chosen.
      $( this ).css('height', 'auto');
    });

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

    // Check if the co-applicant section needs to be shown.

    $('.field.co_applicant').each(function(){

      if ( pdp.form.hasValue( $(this) ) ) {
        pdp.form.toggleCoApplicants( 'show' );
      }

    });

  };

  // The `checkLocations` method checks if any state/msa sections need to be added.

  form.checkLocations = function() {

    var currentLocations = 0,
        totalLocations = 1,
        currentNum = [];

    // Iterate over the param keys and see if any are states or msa's greater than 1.

    _.forEach( _.keys( pdp.query.params ), function( param ){
      currentNum = param.match(/(state_abbr|msamd)\-(\d+)$/);
      if ( currentNum && currentNum.length > 0 ) {
        totalLocations = Math.max( currentNum[2], totalLocations );
      }
    });

    // Add the appropriate number of state/msa sections, counting up to the total quantity.

    while ( currentLocations < totalLocations ) {
      currentLocations++;
      form.addState( currentLocations );
    }

  };

  // The 'hasValue' method checks if a field has any value selected.

  form.hasValue = function( $el ) {

    var $els = $el.find('select, input');

    // If it's a select element or text box

    if ( $els.prop('tagName').toLowerCase() === 'select' || $els.attr('type') === 'text' ) {

      if ( $els.val() ) {

        return $els.val().length > 0;

      }

    // If it's a checkbox or radio element

    } else if ( $els.attr('type') === ( 'checkbox' || 'radio' ) ) {

      var any = _.some($els,  function(e){
        return $(e).prop('checked');
      });

      return any;

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
      values: value instanceof Array ? value : [ value ],
      comparator: _.isEmpty( $el.data('comparator') ) ? '=' : $el.data('comparator')
    };

    return field;

  };

  // The 'getFields' method returns an array of *all* fields' attributes and values.

  form.getFields = function() {

    var fields = [],
        $fields = pdp.app.$el.find('.param');

    $fields.each( function(){

      var $this = $( this ),
          field = pdp.form.getField( $this );

      if ( field ) {
        fields.push( field );
      }

    });

    return fields;

  };

  // The `setField` method sets a field's values/options.
  // @name = param key of the field (e.g. as_of_year)

  form.setField = function( name ) {

    var params = pdp.query.params,
        field = params[ name ];

    _.forEach( field.values, function( val ){

      // Set radios.
      $('input[name=' + name + '][value="' + val + '"]').prop('checked', true);

      // Set checkboxes.
      $('input[name=' + name + '\\[\\]][value="' + val + '"]').prop('checked', true);

    });

    // Set selects.
    $('select[name=' + name + ']').val( field.values ).trigger('liszt:updated');

    // Set textboxes.
    if ( params[name].comparator !== '=' ) {
      $('input[type=text][name=' + name + '][data-comparator="' + params[name].comparator + '"]').val( field.values[0] );
    } else {
      $('input[type=text][name=' + name + ']').val( field.values[0] );
    }

  };

  // The `setFields` method sets all fields' values/options from the `query.params` hash.

  form.setFields = function( options ) {

    var opts = options || {},
        params = _.keys( pdp.query.params );

    function emptyOptions( field, param ) {

      // Clear radios.
      $('input').prop('checked', false);

      // Clear selects.
      $('select').val('').trigger('liszt:updated');

    }

    _.forEach( params, opts.empty ? emptyOptions : this.setField );

  };

  // The `updateFieldOptions` method fetches and sets a field's options

  form.updateFieldOptions = function( el, dependencies ) {

    // Abort if this isn't a select field

    if ( $(el).find('select').length < 1 ) {
      return false;
    }

    // Broadcast that an update is starting.

    pdp.observer.emitEvent('update:started');

    // Remove all current options from field.

    this.resetField( el );

    // If there's a data-concept attribute, use it, otherwise use the id. This is because
    // some fields have weird concept names (e.g. county_name is [fips](http://qu.demo.cfpb.gov/data/hmda/concept/fips.json))

    var concept = $(el).find('select').data('concept') || $(el).find('select').attr('id'),
        id = $(el).find('select').attr('id'),
        conceptProperty = $(el).find('select').data('concept-property') || $(el).find('select').attr('id'),
        conceptFetch = this.fetchFieldOptions( concept );

    // Fetch form field options and set fields when that request is fulfilled.

    conceptFetch.done( function( data ) {

        // Grab the id of this element's dependency (e.g. state_abbr), @TODO rework this
        // as it's kinda dumb and inefficient.

        var options,
            dependency = $( '[data-dependent~=' + id + ']' ).attr('id').replace( /\-[\w^_]+$/, '' );

        // Only return objects from the JSON that match the the id of the depdency.

        function filterDeps( obj ){

          return _.contains( dependencies, obj[ dependency ] );

        }

        // Modify the object to fit the underscore template.

        function mapDeps( obj ){

          return {
            label: obj[ conceptProperty.replace( /\-[\w^_]+$/, '' ) ],
            value: obj._id
          };

        }

        // Sort all the options into alphabetical order.

        function sortDeps( obj ){

          return obj.label;

        }

        // If any data was returned.

        if ( data.table.data ) {

          options = _( data.table.data ).filter( filterDeps ).map( mapDeps ).sortBy( sortDeps ).value();

          this.setFieldOptions( el, options );

        }

        // Broadcast that the update has ended.

        pdp.observer.emitEvent('update:stopped');
        pdp.observer.emitEvent('field:updated');

    }.bind( this ));

  };

  // The `setFieldOptions` populates a select element with supplied options.

  form.setFieldOptions = function( el, options ) {

    var dropdown = $( el ).find('select'),
        template = PDP.templates.option;

    _.forEach( options, function( option ) {
      dropdown.append( template( option ) );
    });

    dropdown.trigger('liszt:updated');

  };

  // The `fetchFieldOptions` method returns a promise to a field's options.

  form.fetchFieldOptions = function( concept ) {

    var promise = pdp.utils.getJSON( pdp.query.endpoint + 'concept/' + concept + '.' + pdp.query.format + '?' );

    return promise;

  };

  // The `resetField` method removes all options from a `select` element and tells
  // `chosen` to update the element accordingly.

  form.resetField = function( el ) {

    $( el ).find('option').remove();
    $( el ).find('select').trigger('liszt:updated');

  };

  // The `resetFields` method clears all values from all fields and tells
  // `chosen` to update selects accordingly.

  form.resetFields = function() {

    var $fields = pdp.app.$el.find('.param');

    $fields.each( function() {

        var param = $( this ).attr('name').replace(/\[\]/g, '\\[\\]');

        // Clear radios and checkboxes
        $('input[type=radio][name=' + param + ']').prop('checked', false);
        $('input[type=checkbox][name=' + param + ']').prop('checked', false);
        $('input[type=text][name=' + param + ']').val('');
        $('select[name=' + param + ']').val('').trigger('liszt:updated');

    });

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

  // The `hideField` shows a field.

  form.hideField = function( el ) {

    $( el ).addClass('hidden');

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

  // The `showField` shows a field.

  form.showField = function( el ) {

    $( el ).removeClass('hidden');

    return el;

  };

  // Check if any filter fields need to be shown or hidden.
  // @names = array of param keys (e.g. as_of_year)

  form.checkDeps = function( names ) {

    // Ensure names is an array.

    names = names instanceof Array ? names : [ names ];

    // Helper function to emit events

    function emit( activity, el, dependencies ) {
      pdp.observer.emitEvent( 'field:' + activity, [el, dependencies] );
    }

    _.forEach( names, function( name ){

      // The form field element is passed from the observer.
      // Grab the data-dependent attribute on the form field.

      var $el = $( '#' + name ),
          dependents = $el.attr('data-dependent'),
          $dependents;

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
            // `dependency` should be an array of the values the parent is supplying.
            // For example with states, it might be: [CA, WA, OR]
            var dependencies = form.getField( $el ).values;
            emit( 'shown', $dependent, dependencies );
          });
        } else {
          _.forEach( $dependents, function( $dependent ){
            emit( 'hidden', $dependent, $el.attr('id') );
          });
        }

      }

    });

  };

  // Check if any filter fields are mutally exclusive and need to be shown or hidden.
  // @names = array of param keys (e.g. as_of_year)

  form.checkMutuallyExclusive = function( names ) {

    // Ensure names is an array.

    names = names instanceof Array ? names : [ names ];

    _.forEach( names, function( name ){

      var $el = $( '#' + name ),
          $partner = $( '.field.' + $el.data('toggle') );

      if ( $partner.length > 0 && $el.val().length > 0 ) {
        form.disableField( $partner );
      } else {
        form.enableField( $partner );
      }

    });

  };

  // Add a new state/MSA location section thingy.

  form.addState = function( num ) {

    var template = PDP.templates.location;

    $('#location-sets').append( template( { num: num } ) );

    $( '.location-set-' + num ).find('select').chosen({ width: '100%', disable_search_threshold: 10, allow_single_deselect: true });

  };

  // Toggle co-applicant section.

  form.toggleCoApplicants = function( action ) {

    if ( action === 'hide' ) {
      $('.co_applicant').addClass('hidden');
    } else {
      $('.co_applicant').removeClass('hidden');
      $('.include_co_applicant input[value=1]').prop( 'checked', true );
    }

  };

  // The `updateShareLink` method puts the current share link in the share text box.

  form.updateShareLink = function() {

    var hash = pdp.query.generateUrlHash(),
        baseUrl = window.location.href.replace(/#.*/, '');

    $('#share_url').val( baseUrl + '#' + hash );

  };

  pdp.form = form;

  return pdp;

}( PDP || {} ));

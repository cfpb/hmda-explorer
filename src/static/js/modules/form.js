var PDP = (function ( pdp ) {

  'use strict';

  // The Form Object
  // ----------------
  // The `form` object stores stuff specific to the DOM form.
  var form = {};

  // Cache a reference to the form's jQuery object and field sections.
  form.$el = $('form');

  // Maximum number of locations a person can search on.
  form.maxNumLocations = 15;
  // Set the starting number of location sets available.
  form.locationCount = 1;
  // Set a counter so group set IDs are unique (never decremented)
  form.locationSetNum = 1;
  // 2014 MSAs may show the same name and code number in 2014/2015 as previous
  // years, even though the underlying geography has changed
  form.warn2014Msa = false;
  // When users follow a permalink, have form dependencies already been checked?
  var depsHaveBeenChecked = false;

  // Cache a reference to all the filter fields.
  form.init = function() {
    this.$fields = form.$el.find('.field:not(.ignore)');
    if ( !_.isEmpty( pdp.utils.getHashParams() ) ) {
      pdp.form.setCustom( 'User modified (see filters below)' );
      pdp.form.selectCustom();
    }
  };

  // Initialize ZeroClipboard on the share button.
  form.clip = new ZeroClipboard( $('.share.btn'), {
    moviePath: 'static/js/zeroclipboard/ZeroClipboard.swf',
    hoverClass: 'clipboard-hover'
  });

  // When the share URL has been saved to clipboard, show a tooltip for a few seconds.
  form.clip.on( 'complete', function(client, args) {

    $('.share_url').tooltip('show');
    $('.share_url').select();
    setTimeout( function(){
      $('.share_url').tooltip('hide');
    }, 3000);

  });

  // The `hideSections` method hides all filter sections (location, applicant, lender, etc.)
  // This is used if a filter set other than `custom` is chosen.
  form.hideSections = function() {
    $('.filter:not(.year)').not('.footer').addClass('hidden');
    $('.year .intro').addClass('hidden');
  };

  // The `showSections` method shows all filter sections (location, applicant, lender, etc.)
  form.showSections = function() {
    $('.filter:not(.year)').not('.footer').removeClass('hidden');
    $('.year .intro').removeClass('hidden');
  };

  // The `setCustom` method modifies the custom suggested filter text.
  form.setCustom = function( text ) {
    $('.suggested .custom').text( text ).parent('select').trigger('liszt:updated');
  };

  // The `selectCustom` method selects the custom option in the suggested filter dropdown.
  form.selectCustom = function(){
    $('#suggested').val('custom').trigger('liszt:updated');
  };

  // The `removeCustom` method removes the custom option in the suggested filter dropdown.
  form.removeCustom = function(){
    $('.suggested .custom').text('').trigger('liszt:updated');
  };

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

    $el.removeClass('closed').attr( 'title', '' );
    pdp.observer.emitEvent( 'filter:shown', el );

  };

  // The `hideFilter` method hides all the fields of a given filter section.
  form.hideFilter = function( el ) {

    $( el ).addClass('closed').attr( 'title', 'Show this filter section' ).find('.fields').slideUp( 200 );
    pdp.observer.emitEvent( 'filter:hidden', el );

  };

  // The `checkFilters` method checks all the filters for any fields with values
  // and expands them if so.
  form.checkFilters = function() {

    pdp.form.$fields.each(function(){

      var $el = $( this ),
          $parentFilter = $(this).parents('.filter.closed');

      if ( pdp.form.hasValue( $el ) && $parentFilter.length > 0 ) {
        pdp.form.showFilter( $parentFilter );
      }

    });

    // Check if any optional fields needs to be shown.
    $('.field.optional').each(function(){

      if ( pdp.form.hasValue( $( this ) ) ) {
        var children = $( this ).data('optional').split(' ');
        _( children ).forEach(function( child ){
          pdp.form.toggleOptional( child, 'show' );
        });
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
      currentNum = param.match(/(state_code|msamd)\-(\d+)$/);
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

    if ( !$els ) {
      return false;
    }

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
        value = $el.val() && $el.val().indexOf(',') !== -1 ? $el.val().replace( /,/g, '' ) : $el.val(),
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

    // Set textboxes, handle rate spread specialness.
    // rate_spread specialness
    if( name === 'rate_spread'){
      $('input[name="rate_spread"][data-comparator="' + params['rate_spread'].comparator + '"]').prop('checked', true);
    } else if ( params[name].comparator !== '=') {
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

    if ( $( el ).find('.spinning').length < 1 ) {
      $( el ).append( PDP.templates.spinner );
    }

    $( el ).find('.spinning').show();

    // Broadcast that an update is starting.
    pdp.observer.emitEvent('update:started');

    // Remove all current options from field.
    this.resetField( el );

    // If there's a data-concept attribute, use it, otherwise use the id. This is because
    // some fields have weird concept names (e.g. county_name is [fips](https://api.consumerfinance.gov/data/hmda/concept/fips.json))
    var concept = $(el).find('select').data('concept') || $(el).find('select').attr('id'),
        id = $(el).find('select').attr('id'),
        conceptProperty = $(el).find('select').data('concept-property') || $(el).find('select').attr('id'),
        conceptFetch = this.fetchFieldOptions( concept, dependencies );


    // Fetch form field options and set fields when that request is fulfilled.
    conceptFetch.done( function( data ) {

      // Grab the id of this element's dependency (e.g. state_code), @TODO rework this
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

      // Modify census tract objects to fit the underscore template (they have a totally different format).
      function mapCensus( obj ){
        return {
          label: obj.census_tract_number,
          value: obj.census_tract_number
        };
      }

      // Sort all the options into alphabetical order.
      function sortDeps( obj ){
        return obj.label;
      }

      // FIPS is weird, gotta trim the first two digits of the county ids.
      function cleanCounties( obj ) {
        if ( concept === 'fips' ) {
          return {
            label: obj.label,
            value: obj.value.toString().substr(2,100)
          };
        }
        return obj;
      }

      // If any data was returned.
      if ( typeof data.table !== 'undefined' ) {

        options = _( data.table.data ).filter( filterDeps ).map( mapDeps ).map( cleanCounties ).sortBy( sortDeps ).value();
        this.setFieldOptions( el, options );

        // Broadcast that the update has ended.
        pdp.observer.emitEvent('field:updated');

      }

      // Census tract concept data is in a different format.
      if ( typeof data.results !== 'undefined' ) {

        options = _( data.results ).map( mapCensus ).sortBy( sortDeps ).uniq( true, 'value' ).value();
        this.setFieldOptions( el, options );

        // Broadcast that the update has ended.
        pdp.observer.emitEvent('field:updated');

      }

      pdp.observer.emitEvent('update:stopped');

      $( el ).find('.spinning').hide();

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
  form.fetchFieldOptions = function( concept, dependencies ) {

    var promise;

    switch( concept ) {

      // Use custom static data for fips because the concept data doesn't have state_codes in it.
      case 'fips':
        promise = pdp.utils.getJSON( 'static/js/static_data/concept/fips.json' );
        break;

      // Census tract concept data is a format totally different from normal concept data so
      // we have to handle it in a special way.
      case 'census_tract_number':
        var state = dependencies.pop();
        promise = pdp.utils.getJSON( pdp.query.endpoint + 'slice/census_tracts.' + pdp.query.format + '?&$where=state_code=' + state + '+AND+county_code+IN+(' + dependencies + ')&$limit=3000' );
        break;

      // Default course for getting concept data.
      default:
        promise = pdp.utils.getJSON( pdp.query.endpoint + 'concept/' + concept + '.' + pdp.query.format + '?' );

    }

    window.prms = promise;

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
  form.resetFields = function( reset ) {

    var $fields = !reset ? pdp.app.$el.find('.param:not(#as_of_year)') : pdp.app.$el.find('.param');

    $fields.each( function() {

        var param = $( this ).attr('name').replace(/\[\]/g, '\\[\\]');

        // Clear radios and checkboxes
        $('input[type=radio][name=' + param + ']').prop('checked', false);
        $('input[type=checkbox][name=' + param + ']').prop('checked', false);
        $('input[type=text][name=' + param + ']').val('');
        $('select[name=' + param + ']').val('').trigger('liszt:updated');
        form.checkMutuallyExclusive( param );

    });

  };

  // The `disableField` method disables a `select` and its `chosen` container.
  form.disableField = function( el ) {

    var $el = $( el ),
        $select = $el.find('select'),
        placeholder;

    $el.addClass('disabled').find('select, input, button').attr('disabled', 'disabled');

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

    $el.removeClass('disabled').find('select, input, button').removeAttr('disabled').trigger('liszt:updated');

    // If it's a select element, swap out its placeholder text
    if ( !_.isEmpty( $select ) ) {
      placeholder = $select.data('post-placeholder');
      $select.attr('data-placeholder', placeholder).trigger('liszt:updated');
    }

    return el;

  };

  // The `hideField` shows a field.
  form.hideField = function( el ) {
    $( el ).addClass('hidden');
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

            // Workaround for passing multiple parameters to census tract:
            // If the parent class if county_code, which passes deps to census,
            // then get the value already selected in the "state" field and
            // add it to the dependencies array
            if( $el.parent().parent().hasClass('county_code') ){
              dependencies.push( $el.closest('.fields').find('li.state_code').find('.chzn-done').val() );
            }

            emit( 'shown', $dependent, dependencies );
          });
        } else {
          if ( !depsHaveBeenChecked ) {
            setTimeout(function(){
              form.checkDeps([$el.attr('id')]);
              depsHaveBeenChecked = true;
            }, 100);
          }
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
          partner = $el.data('toggle'),
          $partner = $( '.field.' + partner );

      if ( $partner.length > 0 && $el.val() && $el.val().length > 0 ) {
        form.disableField( $partner );
      } else {
        // Don't reenable the MSA field if there's a wonky 2014 year conflict.
        if (partner && partner.indexOf('msamd') > -1 && pdp.form.warn2014Msa) {
          return;
        }
        form.enableField( $partner );
      }

    });

  };

  // Disable MSAs if there's a 2014 MSA conflict
  form.disableMSAs = function() {
    $('.field.msamd select').val('').trigger('liszt:updated');
    pdp.form.checkMutuallyExclusive(['msamd-1', 'msamd-2', 'msamd-3', 'msamd-4', 'msamd-5']);
    pdp.form.disableField( $('.field.msamd') );
  };

  form.onUpdateWarnings = function() {
    if (pdp.form.warn2014Msa) {
      pdp.form.disableMSAs();
      $('.msa-warning').removeClass('hidden');
      $('#summary-table-form select').find('option[value=msamd_name]').remove();
      $('#summary-table-form select').trigger('liszt:updated');
    } else {
      pdp.form.enableField( $('.field.msamd') );
      $('.msa-warning').addClass('hidden');
      $('#summary-table-form option[value=loan_type_name]').after('<option value="msamd_name">MSA</option>');
      $('#summary-table-form select').trigger('liszt:updated');
    }
  };

  // Add a new state/MSA location section thingy.
  form.addState = function( num ) {

    var template = PDP.templates.location,
        tooltipPlacement = $( window ).width() > 768 ? 'right' : 'left';

    $('#location-sets').append( template( { num: num } ) ).initTooltips({ placement: tooltipPlacement, container: 'body' });
    $( '.location-set-' + num ).find('select').chosen({ width: '100%', disable_search_threshold: 10, allow_single_deselect: true });

    if (pdp.form.warn2014Msa) {
      pdp.form.disableMSAs();
    }

  };

  // Toggle optional sections.
  // @name = name of field (e.g. co_applicant)
  // @action = show/hide
  form.toggleOptional = function( name, action ) {

    if ( action === 'hide' ) {
      $( '.' + name ).addClass('hidden');
    } else {
      $( '.' + name ).removeClass('hidden');
      $( '.include_' + name +  ' input[value=1]' ).prop( 'checked', true );
    }

  };

  // The `updateShareLink` method puts the current share link in the share text box.
  form.updateShareLink = function() {
    var hash = pdp.query.generateUrlHash(),
        baseUrl = window.location.href.replace(/#.*/, '');
    $('.share_url').val( baseUrl + '#' + hash );

  };

  // Check to see if a static file has been generated for this API Query string
  // If a static file is present in the mapping, re-route the download function
  // to a static file as indicated in mapping.js
  form.checkStatic = function( codeStatus, format ){
    var apiCallParams = pdp.query.params,
    hmdaMapLoc = fileMap.slices[0].staticFiles;

    // Remove the select parameters that may be there after summary table generation
    apiCallParams = pdp.query.removeSelectParam( apiCallParams );
    // Get the exact value for comparison with mapping.js
    apiCallParams = PDP.query._buildApiQuery(apiCallParams);

    // If a static file exists, then return the appropriate URL
    if( typeof hmdaMapLoc[apiCallParams] === 'undefined' || typeof hmdaMapLoc[apiCallParams][codeStatus] === 'undefined' || typeof hmdaMapLoc[apiCallParams][codeStatus][format] === 'undefined'){
      return false;
    } else {
      return fileMap.endpoint + hmdaMapLoc[apiCallParams][codeStatus][format] + '.zip';
    }
  };

  //---------------------------------------------------------------------------
  // Rules

  form.checkYearRules = function(years) {
    var showAllYears;
    var inside = _.some(years, function(y) {
      return y === '2014' || y === '2015' || y === '2016' || y === '2017';
    });
    var outside = _.some(years, function(y) {
      return y !== '2014' && y !== '2015' && y !== '2016' && y !== '2017';
    });

    if( years ) {
      pdp.form.warn2014Msa = inside && outside;
    } else {
      showAllYears = true;
      pdp.form.warn2014Msa = true;
    }

    pdp.form.onUpdateWarnings();
  };

  pdp.form = form;

  return pdp;

}( PDP || {} ));

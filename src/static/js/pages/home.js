$(function(){

  'use strict';

  var map,
      video;

  // Circle nav on the homepage.
  $('.homepage .hero a').on( 'click', function( ev ){

    var target = $( this ).attr('href');
    ev.preventDefault();
    $('html, body').animate({ scrollTop: $( target ).position().top }, 200);

  });

  // Change the underlying data link for graph when a different radio is selected
  $('#map_radios').on('change', function( ev ){
    var radio = $(this).find('input[type=radio]:checked');
    if( radio.val() === 'r' ){
      $( '#map-title' ).find('a.underlying').attr('href', 'explore#!/as_of_year=2013,2012,2011&property_type=1,2&owner_occupancy=1&action_taken=1&loan_purpose=3&lien_status=1&select=state_name,county_name,as_of_year,count&section=summary');
    } else {
      $( '#map-title' ).find('a.underlying').attr('href', 'explore#!/as_of_year=2013,2012,2011&property_type=1,2&owner_occupancy=1&action_taken=1&loan_purpose=1&lien_status=1&select=state_name,county_name,as_of_year,count&section=summary');
    }
  });

  // Map toggling on the homepage.
  map = (function(){

    var map = {};

    map.base = L.mapbox.map('map', 'cfpb.fxomkj4i').setView([39.54, -97.87], 4);
    
    map.layers = {
      r2013: L.mapbox.tileLayer('cfpb.6uwyiudi'),
      r2012: L.mapbox.tileLayer('cfpb.2yugzaor'),
      p2013: L.mapbox.tileLayer('cfpb.c0nyu8fr'),
      p2012: L.mapbox.tileLayer('cfpb.pbjoflxr')
    };

    map.layersLoaded = 0;
    

    map.firstLoad = function() {
      
      var selectedLayer = map.getSelectedLayer(),
          otherLayers = _.omit(  map.layers, selectedLayer );
      
      map.addAndHide( map.layers[ selectedLayer ] );

      $( document ).one('scroll',function( e ){
        _( otherLayers ).forEach( function( layer ){
          map.addAndHide( layer );
        });

        map.layersLoaded = 1;
      });

    };
    
    map.addAndHide = function(layer) {
      layer.addTo( map.base );
       
      // IE and MapBox don't completely get along so we only add snazzy
      // fade-in effects with non-IE browsers.
    
      if ( !$('body').hasClass('lt-ie9') ) {
        map.base.addLayer( layer );
        $( layer._tileContainer ).hide();
      }

    };

    // In order to get a nice fade when we toggle between layers, 
    // add them before they are needed, but don't add the currently
    // hidden ones until a scroll event is fired.
    map.addLayers = function() {
      if ( map.layersLoaded ){
        _( map.layers ).forEach( function( layer ){
          addAndHide( layer );
        });
      }else{
        map.firstLoad();
      }

    };


     
    map.showMap = function() {

      this.addLayers();
      this.showLayer();

      $('#map-title').removeClass('hidden');

      $('#map .controls input').on( 'change', function( ev ){
        $( this ).parent().addClass('selected').siblings().removeClass('selected');
        map.showLayer();
      });

    };

    map.getSelectedLayer = function() {

      var type = $('#map .type input:checked').val(),
          year = $('#map .year input:checked').val();
      return type + year;

    };

    map.showLayer = function() {

      var selectedLayer = map.getSelectedLayer(),
          otherLayers = _.omit( map.layers, selectedLayer );

      // IE and MapBox don't completely get along so we only add snazzy
      // fade-in effects with non-IE browsers.
      if ( !$('body').hasClass('lt-ie9') ) {

        $( map.layers[ selectedLayer ]._tileContainer ).fadeIn();

        _( otherLayers ).forEach( function( layer ){
          $( layer._tileContainer ).fadeOut( 800 );
        });

      } else {

        map.base.addLayer( map.layers[ selectedLayer ] );

        _( otherLayers ).forEach( function( layer ){
          map.base.removeLayer( layer );
        });

      }
      
    };

    map.fixLegend = function() {

      var under30,
          over30;

      under30 = $('#map .legend-labels li').first().html();
      $('#map .legend-labels li').first().html( under30 + '< -30%' );

      over30 = $('#map .legend-labels li:nth-last-child(2)').html();
      $('#map .legend-labels li:nth-last-child(2)').html( over30.replace( 'Over 30%', '> 30%' ) );

      $('#map .my-legend .legend-title').html('Percentage Change');

      $('#map .my-legend .legend-source').hide();

    };

    map.init = function() {

      this.base.scrollWheelZoom.disable();

      map.showMap();
      $('#map-title').removeClass('hidden');

      // Ensure the correct layer is shown whenever the user zooms.
      this.base.on( 'zoomend', function(){

        this.showLayer();

      }.bind( this ));

      // Fix the darn legend.
      this.base.on( 'ready', function(){

        map.fixLegend();

      }.bind( this ));

      $('#map .help').tooltip({
        placement: 'right',
        container: 'body',
        title: function getTooltipTitle(){
          return $( this ).next('.help-text').html();
        }
      }).on('shown.bs.tooltip', function () {
        $('.tooltip').css({
          'margin-left': '15px',
          'margin-top': '6px',
          'width': '250px'
        });
      }).on('hide.bs.tooltip', function () {
        $('.tooltip').css({
          'margin-left': '0',
          'margin-top': '0',
          'width': 'auto'
        });
      });

      // IE8 doesn't hear the map 'ready' event so here's a setinterval hack.
      if ( $('body').hasClass('lt-ie9') ) {
        var checkForLegend = setInterval( function(){
          if ( $('#map .my-legend .legend-source').length ) {
            map.fixLegend();
            clearInterval( checkForLegend );
          }
        }, 1000);
      }

    };

    map.init();

  })();

  // Methods to open and close the youtube video overlay on the homepage.
  video = (function(){

    var $vid = $('#youtube'),
        $embed = $('<iframe width="100%" height="100%" src="//www.youtube.com/embed/wR9Tsdqgmuk?rel=0&version=3&enablejsapi=1&autoplay=1" frameborder="0" allowfullscreen></iframe>'),
        $exit = $('#youtube .exit'),
        pos = $('.video').position().top + ( $('section.video').height() / 2 );

    return {

      isOpen: false,

      init: function() {

      },

      open: function(){
        $vid.css( 'top', pos + 'px' )
            .removeClass('hidden')
            .animate({ 'height': '100%', 'margin-top': -pos + 'px' }, 300, 'swing', function(){
              setTimeout( function(){
                $vid.append( $embed );
                $exit.show();
                onYouTubeIframeAPIReady();
              }, 500 );
            });
        $embed.css( 'height', $(window).height() - 60 + 'px')
              .css( 'width', $(window).width() - 60 + 'px');
        this.isOpen = true;
      },

      close: function(){
        $embed.remove();
        $exit.hide();
        $vid.addClass('closing');
        setTimeout( function(){
          $vid.css({ 'height': 0, 'margin-top': 0 }).addClass('hidden').removeClass('closing');
        }, 500 );
        this.isOpen = false;
      }

    };
  })();

  // Remove the video embed for now.
  video.init();

  // Video overlay.
  $('a.launch-youtube').on( 'click', function( ev ){

    ev.preventDefault();
    video.open();

  });

  // Autoplay video if requested.
  if ( window.location.hash && window.location.hash === '#video' ) {
    video.open();
  }

  // Close video overlay
  $( document ).on( 'keyup', function( ev ) {

    if ( ev.which === 27 ) {
      ev.preventDefault();
      video.close();
    }

  });

  // Close video overlay
  $( 'section.video .exit, #youtube' ).on( 'click', function( ev ) {

      ev.preventDefault();

      if ( video.isOpen ) {
        video.close();
      }

  });

});

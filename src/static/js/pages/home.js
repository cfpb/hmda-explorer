$(function(){

  'use strict';

  var map,
      video;

  // layer.on('ready', function() {
  //   // the layer has been fully loaded now, and you can
  //   // call .getTileJSON and investigate its properties
  // });

  // Circle nav on the homepage.
  $('.homepage .hero a').on( 'click', function( ev ){

    var target = $( this ).attr('href');
    ev.preventDefault();
    $('html, body').animate({ scrollTop: $( target ).position().top }, 200);

  });

  // Map toggling on the homepage.
  map = (function(){

    var map = {};

    map.base = L.mapbox.map('map', 'cfpb.hmda_basemap').setView([39.54, -97.87], 4);
    
    map.layers = {
      a2012: L.mapbox.tileLayer('cfpb.hmda_a2012'),
      a2011: L.mapbox.tileLayer('cfpb.hmda_a2011'),
      o2012: L.mapbox.tileLayer('cfpb.hmda_o2012'),
      o2011: L.mapbox.tileLayer('cfpb.hmda_o2011')
    };

    // In order to get a nice fade when we toggle between layers, 
    // add them all at once but hide their containers.
    map.addLayers = function() {

      _( map.layers ).forEach( function( layer ){
        layer.addTo( map.base );
        map.base.addLayer( layer );
        $( layer._tileContainer ).hide();
      });

    };

    map.showLayer = function() {

      var type = $('#map .type input:checked').val(),
          year = $('#map .year input:checked').val(),
          selectedLayer = type + year,
          otherLayers = _.omit( map.layers, selectedLayer );

      $( map.layers[ selectedLayer ]._tileContainer ).fadeIn();

      _( otherLayers ).forEach( function( layer ){
        $( layer._tileContainer ).fadeOut( 800 );
      });
      
    };

    map.init = function() {

      this.base.scrollWheelZoom.disable();
      this.base.on( 'ready', function(){

        this.addLayers();
        this.showLayer();

        $('#map-title').removeClass('hidden');

        $('#map .controls input').on( 'click', function( ev ){
          $( this ).parent().addClass('selected').siblings().removeClass('selected');
          map.showLayer();
        });

      }.bind( this ));

      // Ensure the correct layer is shown whenever the user zooms.
      this.base.on( 'zoomend', function(){

        this.showLayer();

      }.bind( this ));

      $('#map .help').tooltip({ placement: 'right' });

    };

    map.init();

  })();

  // Methods to open and close the youtube video overlay on the homepage.
  video = (function(){

    var $vid = $('#youtube'),
        $embed = $('#youtube > iframe'),
        $exit = $('#youtube .exit'),
        pos = $('.video').position().top + ( $('section.video').height() / 2 );

    return {

      isOpen: false,

      init: function() {
        var url = $embed.attr('src');
        url = url.concat( '&autoplay=1' );
        $embed.attr( 'src', url );
        $embed.remove();
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

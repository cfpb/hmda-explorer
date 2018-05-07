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
      $( '#map-title' ).find('a.underlying').attr('href', 'explore#!/as_of_year=2017,2016,2015&property_type=1,2&owner_occupancy=1&action_taken=1&loan_purpose=3&lien_status=1&select=state_name,county_name,as_of_year,count&section=summary');
    } else {
      $( '#map-title' ).find('a.underlying').attr('href', 'explore#!/as_of_year=2017,2016,2015&property_type=1,2&owner_occupancy=1&action_taken=1&loan_purpose=1&lien_status=1&select=state_name,county_name,as_of_year,count&section=summary');
    }
  });

  // Map toggling on the homepage.
  map = (function(){

    var map = {};

    L.mapbox.accessToken = 'pk.eyJ1IjoiY29udG8iLCJhIjoiYWY0ODdmZTM2N2M1NTE4YmVkNTdkZWI1ZTcxNWRmNTgifQ.ZXAoSbSp6NTPLQ8zP0lQ2Q';

    map.base = L.mapbox.map('map', 'cfpb.2w2r43j9').setView([39.54, -97.87], 4);

    map.layers = {
      r_year1: L.mapbox.tileLayer('cfpb.hmda_r_o_15_16'),
      r_year2: L.mapbox.tileLayer('cfpb.hmda_r_o_16_17'),
      p_year1: L.mapbox.tileLayer('cfpb.hmda_p_o_15_16'),
      p_year2: L.mapbox.tileLayer('cfpb.hmda_p_o_16_17')
    };

    // Add each layer and immediately hide it.
    _( map.layers ).forEach( function( layer ) {
      map.base.addLayer( layer );
      layer.setOpacity(0);
    });

    // Un-hide the top layer.
    map.layers.p_year2.setOpacity(1);

    $('#map .controls input').on( 'change', function( ev ){
      $( this ).parent().addClass('selected').siblings().removeClass('selected');
      map.showLayer();
    });

    map.getSelectedLayer = function() {

      var type = $('#map .type input:checked').val(),
          year = $('#map .year input:checked').val();
      return type + '_' +year;

    };

    map.showLayer = function() {

      var selectedLayer = map.getSelectedLayer(),
          otherLayers = _.omit( map.layers, selectedLayer );

      function fadeIn( layer, cb ) {

        var opacity = 0;

        // Place the selected layer on top.
        layer.setZIndex(1);
        _( otherLayers ).forEach( function( otherLayer ) {
          otherLayer.setZIndex(0);
        });

        var timer = setInterval(function() {
          if ( opacity >= 1 ) {
            clearInterval(timer);
            cb();
          }
          opacity += 0.02;
          layer.setOpacity(opacity);
        }, 10);

      }

      fadeIn(map.layers[ selectedLayer ], function() {
        _( otherLayers ).forEach( function( layer ) {
          layer.setOpacity(0);
        });
      });
      
    };

    map.fixLegend = function() {

      $('#map .my-legend .legend-title').html('Percentage Change');
      $('#map .my-legend .legend-source').hide();

    };

    map.init = function() {

      this.base.scrollWheelZoom.disable();

      $('#map-title').removeClass('hidden');

      // Fix the darn legend.
      this.base.on( 'ready', function(){

        map.fixLegend();
        $('#map-title').removeClass('hidden');

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
                if( onYouTubeIframeAPIReady() ){
                  onYouTubeIframeAPIReady();
                }
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

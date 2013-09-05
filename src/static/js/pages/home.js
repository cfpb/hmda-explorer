$(function(){

  'use strict';

  var map = L.mapbox.map('map', 'cfpb.Final'),
  //var map = L.mapbox.map('map', 'crux.hmda'),
      video;

  // Disable map scrolling.
  map.scrollWheelZoom.disable();

  // Circle nav on the homepage.
  $('.homepage .hero a').on( 'click', function( ev ){

    var target = $( this ).attr('href');
    ev.preventDefault();
    $('html, body').animate({ scrollTop: $( target ).position().top }, 200);

  });

  // Methods to open and close the youtube video overlay on the homepage.
  video = (function(){

    var $vid = $('#youtube'),
        $embed = $('#youtube > iframe'),
        $exit = $('#youtube .exit'),
        pos = $('.video').position().top + ( $('section.video').height() / 2 );

    return {

      isOpen: false,

      init: function() {
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

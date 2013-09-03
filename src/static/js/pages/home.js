$(function(){

  'use strict';

  var map = L.mapbox.map('map', 'cfpb.831v2'),
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
        $embed = $('#youtube iframe'),
        $exit = $('#youtube .exit'),
        pos = $('.video').position().top + ( $('section.video').height() / 2 );

    return {

      isOpen: false,

      $embed: $('#youtube > #ZnQBUZLd3Bo'), // Specific ID of YouTube iFrame

      $exit: $('#youtube .exit'),

      pos: $('section.video').position().top + ( $('section.video').height() / 2 ),

      init: function() {
        this.$embed.hide();
      },

      open: function(){
        $vid.css( 'top', pos + 'px' )
            .removeClass('hidden')
            .animate({ 'height': '100%', 'margin-top': -pos + 'px' }, 300, 'swing', function(){
              setTimeout( function(){
                this.$embed.show();
                // this.$vid.append( this.$embed );
                this.$exit.show();
              }.bind( this ), 500 );
            }.bind( this ) );
        this.$embed.css( 'height', $(window).height() - 60 + 'px')
              .css( 'width', $(window).width() - 60 + 'px');
        this.isOpen = true;
      },

      close: function(){
        this.$embed.hide();
        this.$exit.hide();
        this.$vid.addClass('closing');
        setTimeout( function(){
          $vid.css({ 'height': 0, 'margin-top': 0 }).addClass('hidden').removeClass('closing');
        }, 500 );
        this. isOpen = false;
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

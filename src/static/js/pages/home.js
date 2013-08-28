$(function(){

  'use strict';

  // var map = L.mapbox.map('map', 'cfpb.ProjectQu'),
  var map = L.mapbox.map('map', 'crux.hmda'),
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

    return {

      $vid: $('#youtube'),

      $embed: $('#youtube iframe'),

      $exit: $('#youtube .exit'),

      pos: $('section.video').position().top + ( $('section.video').height() / 2 ),

      init: function() {
        this.$embed.remove();
      },

      open: function(){
        this.$vid.css( 'top', this.pos + 'px' )
            .removeClass('hidden')
            .animate({ 'height': '100%', 'margin-top': -this.pos + 'px' }, 300, 'swing', function(){
              setTimeout( function(){
                this.$vid.append( this.$embed );
                this.$exit.show();
              }.bind( this ), 500 );
            }.bind( this ) );
        this.$embed.css( 'height', $(window).height() - 60 + 'px')
              .css( 'width', $(window).width() - 60 + 'px');
      },

      close: function(){
        this.$embed.remove();
        this.$exit.hide();
        this.$vid.addClass('closing');
        setTimeout( function(){
          this.$vid.css({ 'height': 0, 'margin-top': 0 }).addClass('hidden').removeClass('closing');
        }.bind( this ), 500 );
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
  $( 'section.video .exit' ).on( 'click', function( ev ) {

      ev.preventDefault();
      video.close();

  });

});

$(function(){

  'use strict';

  // Set up da map
  var map = L.mapbox.map('map', 'crux.hmda');
  map.scrollWheelZoom.disable();

  // Circle nav on the homepage
  $('.homepage hero a').on( 'click', function( ev ){

    var target = $( this ).attr('href');
    ev.preventDefault();
    $('html, body').animate({ scrollTop: $( target ).position().top }, 200);

  });

});

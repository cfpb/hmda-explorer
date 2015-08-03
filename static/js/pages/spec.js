$(function(){

  'use strict';

  var source;

  $.ajax({
    async: false,
    url: 'static/js/hbs/spec.html',
    dataType: 'html',
    success: function(data) {
      source = data;
    }
  });

  var template = Handlebars.compile(source);

  $.getJSON('static/json/technical_data_specification.json', function(data) {
    $('#spec').html(template(data));
  });

});
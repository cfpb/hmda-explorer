$(function(){

  'use strict';

  var source;

  $.ajax({
    async: false,
    url: 'static/js/hbs/list-of-fields.html',
    dataType: 'html',
    success: function(data) {
      source = data;
    }
  });

  var template = Handlebars.compile(source);

  $.getJSON('static/json/field_viz.json', function(data) {
    $('#fields').html(template(data));
  });

});
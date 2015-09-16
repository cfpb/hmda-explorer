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

  $.getJSON('static/json/technical_data_specification.json', function(data) {
    $('#fields').html(template(data));
  });

});
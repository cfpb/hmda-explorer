$(function(){

  'use strict';

  var source;

  $.ajax({
    async: false,
    url: 'static/js/hbs/codesheet.html',
    dataType: 'html',
    success: function(data) {
      source = data;
    }
  });

  var template = Handlebars.compile(source);

  $.getJSON('static/json/technical_data_specification.json', function(data) {
    $('#codesheet').html(template(data));
  });

});
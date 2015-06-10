$(function(){

  'use strict';

  $.getJSON('static/json/technical_data_specification.json', function(result){
    console.log(result);
  });

});
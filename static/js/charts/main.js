/* Add Commas to numbers (English style) */

function addCommas(nStr)
{
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
  x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
}

$('.charts .help').tooltip({
  placement: 'right',
  container: 'body',
  title: function getTooltipTitle(){
    return $( this ).attr('title') || $( this ).next('.help-text').html();
  }
}).on('shown.bs.tooltip', function () {
  $('.tooltip').css({
    'margin-left': '15px',
    'margin-top': '11px',
    'width': '250px'
  });
}).on('hide.bs.tooltip', function () {
  $('.tooltip').css({
    'margin-left': '0',
    'margin-top': '0',
    'width': 'auto'
  });
});

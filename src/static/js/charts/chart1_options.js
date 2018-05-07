var chart1_options = {
  chart: {
    renderTo: 'hmda_chart_1',
    alignTicks: true,
    height: 400,
    plotBackgroundColor: '#FFFFFF',
    plotBorderWidth: null,
    plotShadow: false,
    spacingTop: 20,
    /* Zero spacing messes up IE */
    spacingRight: 10,
    spacingBottom: 1,
    spacingLeft: 1,
    marginTop: 20,
    marginBottom: 80,
    type: 'column'
  },
  exporting: {
    enabled: false
  },
  title: {
    text: 'U.S. TOTAL',
    align: 'center',
    verticalAlign: 'bottom',
    floating: false,
    x: 30,
    y: -20,
    style: {
      color: '#000000',
      fontSize: '14pt',
      fontFamily: '"Avenir Next LT W01 Demi", "Avenir Next Demi", "Avenir Next", "Arial"',
      fontWeight: '600'
    }

  },
  credits: {
    text: 'Data are for first-lien, owner-occupied, 1-4 family and manufactured homes.',
    enabled: false
  },
  colors: [
    '#c9d5e2', '#7796b7', '#003071'
  ],
  legend: {
    enabled: false
  },
  tooltip: {
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    borderColor: '#999999',
    borderRadius: 0,
    borderWidth: 0,
    shadow: false,
    style: {
      color: '#ffffff',
      fontSize: '10pt',
      fontFamily: '',
      fontWeight: '',
      padding: 8,
      lineHeight: '12pt'
    },

    formatter: function() {
      //var format = '<span style="font-size: 12pt;>Series Name:' + this.series.name  + '<br> Point Name: ' + this.point.name  + 'this.x: ' + this.x  + '$' + addCommas(this.y) + '</span>';

      var tooltip_suffix = '';
      if (this.point.name != 'None') {

        tooltip_suffix = this.point.name;
      }
      var format = '<span style="font-size: 12pt;><span style="font-weight: 700;">' + addCommas(this.y) + '</span> ' + this.series.name + ' in ' + this.x + '</span>';
      return format;
    }
  },
  plotOptions: {
    /* Settings for all series */
    series: {
      /* Global settings for all series types */
      allowPointSelect: true,
      animation: false,
      borderWidth: 0,
      cursor: 'pointer',
      marker: {
        radius: 10
      },
      showInLegend: true,
      shadow: false,
      point: {
        events: {
          click: function() {
            return false;
          }
        }
      }
    },
    column: {
      dataLabels: {
        enabled: false
      },
      grouping: true,
      groupPadding: 0.10,
      pointPadding: 0.00,
      stacking: null,
      events: {
        legendItemClick: function() {
          return false;
        }
      },
      column: {
          colorByPoint: true
      }
    },
    allowPointSelect: false
  },
  xAxis: {
    categories: [
      '2015',
      '2016',
      '2017'
    ],
    gridLineWidth: 0,
    labels: {
      style: {
        color: '#212121',
        fontSize: '10pt',
        fontFamily: '"Avenir Next LT W01 Regular", "Avenir Next", "Arial"',
        fontWeight: '400'
      },
      enabled: true,
      y: 20
    },
    lineWidth: 0,
    title: {
      text: null,
      margin: 12,
      style: {
        color: '#101820',
        fontSize: '12pt',
        fontFamily: '"Avenir Next LT W01 Regular", "Avenir Next", "Arial"',
        fontWeight: '400'
      },
      x: -5
    },
    tickLength: 0,
    startOnTick: true,
    endOnTick: true,
    minPadding: 0,
    maxPadding: 0
  },
  yAxis: {
    title: {
      text: 'Number of originations',
      margin: 10,
      style: {
        color: '#101820',
        fontSize: '12pt',
        fontFamily: '"Avenir Next LT W01 Regular", "Avenir Next", "Arial"',
        fontWeight: '400'
      },
      enabled: false
    },
    labels: {
      style: {
        color: '#212121',
        fontSize: '9pt',
        fontFamily: '"Avenir Next LT W01 Regular", "Avenir Next", "Arial"',
        fontWeight: '400'
      },
      format: '{value:,.0f}',
      enabled: true
    },
    gridLineWidth: 1
  },
  series: [
    {
      name: 'Home purchase originations',
      data: [3199645,3544594,3686505]
    },
    {
      name: 'Refinancing originations',
      data: [2841018,3370884,2200834]
    },
        {
      name: 'Home improvement originations',
      data: [183124,239511,227067]
    }
  ]
};

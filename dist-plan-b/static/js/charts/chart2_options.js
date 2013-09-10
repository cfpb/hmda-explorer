var chart2_options = {
    chart: {
        renderTo: 'hmda_chart_2',
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
      '#acdc91', '#43af2a', '#81AFAF', '#005E5D', '#796E65', '#D7D2CB'
    ],

    legend: {
        align: 'right',
        backgroundColor: '#FFFFFF',
        borderWidth: 0,
        borderRadius: 0,
        borderColor: '#FFFFFF',
        floating: false,
        itemStyle: {
            color: '#212121',
            fontSize: '12pt',
            lineHeight: '12pt',
            fontFamily: '"Avenir Next LT W01 Medium Cn", "Avenir Next Light", "Avenir Next", "Arial Condensed", "Arial"',
            fontWeight: '',
            paddingBottom: '8pt'

        },
        layout: 'vertical',
        margin: 10,
        padding: 10,
        shadow: false,
        symbolPadding: 5,
        symbolWidth: 20,
        verticalAlign: 'middle',
        x: 0,
        y: 0,
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
            var format = '<span style="font-size: 12pt;><span style="font-weight: 700;">' + addCommas(this.y) + '</span> ' + this.series.name + '<br>originations in ' + this.x + '</span>';
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
            shadow: false
        },
        pie: {
            dataLabels: {
                enabled: false
            },
            /* Turn off the legend clicking */
            point: {
                events: {
                    legendItemClick: function() {
                        return false; // <== returning false will cancel the default action
                    }
                }
            },
            size: '90%' /* Used in IE 7/8 (VML) so pie graph is not clipped */
        },
        column: {

            dataLabels: {
                enabled: false
            },

            grouping: true,
            groupPadding: 0.10,
            pointPadding: 0.00,
            /* determined by height of the div */

            stacking: null,
            events: {
                legendItemClick: function() {
                    return false;
                }
            }
        },
        bar: {

            dataLabels: {
                enabled: false
            },

            groupPadding: 0.10,
            pointPadding: 0.00,

            stacking: null
        },
        line: {
            lineWidth: 8,
            marker: {
                enabled: false
            }
        },
        area: {
            lineWidth: 8,
            stacking: null,
            marker: {
                enabled: false
            }
        },
        allowPointSelect: false
    },

    xAxis: {

        categories: [

            '2010',

            '2011',

            '2012'

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
            //overflow: 'justify'
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
    yAxis: [{
            title: {
                text: 'Number of originations per year',
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
                    fontSize: '10pt',
                    fontFamily: '"Avenir Next LT W01 Regular", "Avenir Next", "Arial"',
                    fontWeight: '400'
                },




                format: '{value:,.0f}',


                enabled: true
                //formatter: function() { return this.value; },
                //overflow: 'justify'
            },
            gridLineWidth: 1
        },

        {
            opposite: true,
            /* secondary_axis_max */



            title: {
                text: null
            },

            labels: {
                style: {
                    color: '#212121',
                    fontSize: '10pt',
                    fontFamily: '"Avenir Next LT W01 Regular", "Avenir Next", "Arial"',
                    fontWeight: '400'
                },




                format: ' {value:,.0f} ',


                enabled: true
                //formatter: function() { return this.value; },
                //overflow: 'justify'
            },
            gridLineWidth: 0
        }
    ],


    series: [


        {
            name: 'Conventional',
            data: [5038561, 4493378, 6432249]
        },
        {
            name: 'FHA-insured',
            data: [1428357, 1057843, 1278827]

        },
        {
            name: 'FSA/RHS',
            data: [87858, 113815, 132204]

        },


        {
            name: 'VA-guaranteed',
            data: [310522, 372783, 558690]

        }

    ]
};

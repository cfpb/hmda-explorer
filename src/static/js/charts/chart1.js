$(document).ready(function() {

    if ($('#hmda_chart_1').length !== 0) {
        var applicationsOriginationsChart = new Highcharts.Chart(chart1_options);
    }
    if ($('#hmda_chart_1_msa').length !== 0) {
        $('#hmda_chart_1_msa').chosen({ width: '100%' });
    }

    var chart1DataObj = {
      "U.S. Total":{"name":"U.S. Total","data":[[2680340,2804466,3199645],[4384836,1994390,2841018],[173880,133993,183124]]},
      "Alabama":{"name":"Alabama","data":[[37211,37575,43184],[57542,27950,33704],[1934,1467,1731]]},
      "Alaska":{"name":"Alaska","data":[[7780,8182,8864],[9268,3749,5334],[319,239,351]]},
      "Arizona":{"name":"Arizona","data":[[68567,73811,88279],[109292,52007,78919],[2175,2288,3235]]},
      "Arkansas":{"name":"Arkansas","data":[[24532,23868,27109],[31018,14468,16436],[1798,1155,1448]]},
      "California":{"name":"California","data":[[263944,266715,296757],[668962,338095,521443],[17127,18506,29705]]},
      "Colorado":{"name":"Colorado","data":[[76634,82199,92206],[115087,56058,99126],[2937,2703,5068]]},
      "Connecticut":{"name":"Connecticut","data":[[28088,27027,29294],[56507,20769,28104],[2873,1810,2323]]},
      "Delaware":{"name":"Delaware","data":[[7924,8430,9842],[14625,5851,8520],[483,299,416]]},
      "District of Columbia":{"name":"District of Columbia","data":[[6378,6599,6847],[10764,4566,7111],[357,235,332]]},
      "Florida":{"name":"Florida","data":[[151416,179002,218508],[213706,94038,127945],[5151,4434,6758]]},
      "Georgia":{"name":"Georgia","data":[[79235,89356,109688],[131648,58554,83317],[2801,2251,3273]]},
      "Hawaii":{"name":"Hawaii","data":[[7723,8195,9269],[17505,7256,11208],[1119,650,1206]]},
      "Idaho":{"name":"Idaho","data":[[17436,19647,24703],[24746,11360,16824],[755,560,946]]},
      "Illinois":{"name":"Illinois","data":[[105827,110077,122507],[185709,80938,117719],[5687,4237,6208]]},
      "Indiana":{"name":"Indiana","data":[[60930,64330,75027],[96461,42935,57412],[5071,3972,4746]]},
      "Iowa":{"name":"Iowa","data":[[29891,31175,34983],[44341,20163,27009],[2517,2021,2471]]},
      "Kansas":{"name":"Kansas","data":[[26288,26596,30055],[34460,15884,21464],[2099,1393,1796]]},
      "Kentucky":{"name":"Kentucky","data":[[35550,35920,41143],[54771,24494,31420],[2904,1837,2245]]},
      "Louisiana":{"name":"Louisiana","data":[[37384,38276,41772],[43173,23753,28691],[2334,1950,2203]]},
      "Maine":{"name":"Maine","data":[[9863,10631,11826],[18088,7861,9699],[1678,1023,1299]]},
      "Maryland":{"name":"Maryland","data":[[52185,54123,62188],[106942,43360,67267],[2721,1865,2717]]},
      "Massachusetts":{"name":"Massachusetts","data":[[60129,60036,65569],[118908,44203,71564],[8092,5084,7123]]},
      "Michigan":{"name":"Michigan","data":[[83190,88485,101678],[155535,73216,94806],[4639,4243,5972]]},
      "Minnesota":{"name":"Minnesota","data":[[59681,60829,72009],[96378,38263,60437],[3966,2568,3773]]},
      "Mississippi":{"name":"Mississippi","data":[[17305,17495,19398],[24926,13886,15224],[1302,928,933]]},
      "Missouri":{"name":"Missouri","data":[[53599,55595,65183],[91756,39600,54953],[3564,2472,3556]]},
      "Montana":{"name":"Montana","data":[[9778,10343,11507],[14130,5814,8372],[787,577,828]]},
      "Nebraska":{"name":"Nebraska","data":[[17867,18641,21845],[26873,11319,15602],[1429,1048,1470]]},
      "Nevada":{"name":"Nevada","data":[[26177,29954,36748],[37187,20177,32021],[586,856,1726]]},
      "New Hampshire":{"name":"New Hampshire","data":[[11617,12183,14488],[22417,8830,12445],[1177,722,910]]},
      "New Jersey":{"name":"New Jersey","data":[[62685,61937,70189],[126985,48448,73313],[5036,3207,4180]]},
      "New Mexico":{"name":"New Mexico","data":[[14284,14328,16292],[24863,11131,13578],[804,607,824]]},
      "New York":{"name":"New York","data":[[105240,101598,110880],[114009,51503,67321],[8639,5478,6434]]},
      "North Carolina":{"name":"North Carolina","data":[[88757,96394,112598],[138067,60644,79870],[4753,3408,4046]]},
      "North Dakota":{"name":"North Dakota","data":[[8910,9070,9104],[8362,3932,5957],[870,507,759]]},
      "Ohio":{"name":"Ohio","data":[[96095,100058,113406],[168108,71758,88074],[6118,4590,5861]]},
      "Oklahoma":{"name":"Oklahoma","data":[[35123,36313,36698],[33354,17930,20662],[2288,1748,2263]]},
      "Oregon":{"name":"Oregon","data":[[38247,42266,52230],[65621,29164,45340],[2457,1821,3488]]},
      "Pennsylvania":{"name":"Pennsylvania","data":[[93936,96520,108426],[165484,71156,89520],[13294,9961,11324]]},
      "Rhode Island":{"name":"Rhode Island","data":[[7895,7755,9210],[15842,5945,9449],[709,525,630]]},
      "South Carolina":{"name":"South Carolina","data":[[44895,48805,58554],[57011,25824,35193],[2059,1578,1680]]},
      "South Dakota":{"name":"South Dakota","data":[[8734,8484,9521],[10505,4319,6133],[773,410,602]]},
      "Tennessee":{"name":"Tennessee","data":[[60885,64310,74642],[80864,39581,52642],[3320,2718,3241]]},
      "Texas":{"name":"Texas","data":[[255840,269161,289594],[247071,123297,170860],[10169,8997,10355]]},
      "Utah":{"name":"Utah","data":[[33034,37499,45806],[48680,24287,40738],[1771,1758,2899]]},
      "Vermont":{"name":"Vermont","data":[[4309,4264,4831],[9416,3755,5047],[1037,625,683]]},
      "Virginia":{"name":"Virginia","data":[[86359,83058,94978],[155650,63887,94062],[5118,2967,4252]]},
      "Washington":{"name":"Washington","data":[[74817,80331,95132],[128437,55661,88813],[4124,3108,5125]]},
      "West Virginia":{"name":"West Virginia","data":[[12561,12677,13318],[17412,8877,9364],[2068,1259,1453]]},
      "Wisconsin":{"name":"Wisconsin","data":[[49168,51009,59315],[102564,46015,64104],[5821,3651,4238]]},
      "Wyoming":{"name":"Wyoming","data":[[6725,7118,7224],[7676,3585,4961],[502,331,365]]},
      "Puerto Rico":{"name":"Puerto Rico","data":[[10708,9386,9705],[18608,10673,8544],[831,590,535]]}
    };
    
    var SeriesToggle = function( el ) {

          originations = [],
          showSeries,
          hideSeries;

      for ( var i = 0; i < applicationsOriginationsChart.series.length; i++ ) {
          originations.push( applicationsOriginationsChart.series[i] );
      }

      this.init = function() {
        this.$el = $( el );
        showSeries( originations );
      };

      showSeries = function( series ) {
        series = series instanceof Array ? series : [series];
        _( series ).forEach(function( series ){
          series.show();
        });
      };

      hideSeries = function( series ) {
        series = series instanceof Array ? series : [series];
        _( series ).forEach(function( series ){
          series.hide();
        });
      };
    };

    var $msa = $('#hmda_chart_1_msa');
    $msa.change(function() {
        var msaID = $msa.val();
        var msaName = chart1DataObj[msaID].name.replace("&apos;", "’").toUpperCase();
        //console.log(msaName);
        // Update the chart name from the chart data object:
        applicationsOriginationsChart.setTitle({
            text: msaName
        });
        for (var i = 0; i < 3; i++) {
            applicationsOriginationsChart.series[i].setData(chart1DataObj[msaID].data[i]);
        }
    });

});

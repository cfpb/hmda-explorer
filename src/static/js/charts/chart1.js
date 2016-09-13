$(document).ready(function() {

    if ($('#hmda_chart_1').length !== 0) {
        var applicationsOriginationsChart = new Highcharts.Chart(chart1_options);
    }
    if ($('#hmda_chart_1_msa').length !== 0) {
        $('#hmda_chart_1_msa').chosen({ width: '100%' });
    }

    var chart1DataObj = {
      "U.S. Total":{"name":"U.S. Total","data":[[2680340,2803706,3199645],[4384836,1949833,2841018],[173880,133601,183124]]},
      "Alabama":{"name":"Alabama","data":[[37211,37566,43184],[57542,27250,33704],[1934,1461,1731]]},
      "Alaska":{"name":"Alaska","data":[[7780,8182,8864],[9268,3691,5334],[319,239,351]]},
      "Arizona":{"name":"Arizona","data":[[68567,73785,88279],[109292,50557,78919],[2175,2278,3235]]},
      "Arkansas":{"name":"Arkansas","data":[[24532,23867,27109],[31018,14170,16436],[1798,1153,1448]]},
      "California":{"name":"California","data":[[263944,266607,296757],[668962,333257,521443],[17127,18440,29705]]},
      "Colorado":{"name":"Colorado","data":[[76634,82160,92206],[115087,54962,99126],[2937,2692,5068]]},
      "Connecticut":{"name":"Connecticut","data":[[28088,27008,29294],[56507,20169,28104],[2873,1804,2323]]},
      "Delaware":{"name":"Delaware","data":[[7924,8428,9842],[14625,5674,8520],[483,298,416]]},
      "District of Columbia":{"name":"District of Columbia","data":[[6378,6598,6847],[10764,4498,7111],[357,232,332]]},
      "Florida":{"name":"Florida","data":[[151416,178949,218508],[213706,90408,127945],[5151,4415,6758]]},
      "Georgia":{"name":"Georgia","data":[[79235,89335,109688],[131648,57128,83317],[2801,2242,3273]]},
      "Hawaii":{"name":"Hawaii","data":[[7723,8195,9269],[17505,7256,11208],[1119,650,1206]]},
      "Idaho":{"name":"Idaho","data":[[17436,19645,24703],[24746,11069,16824],[755,560,946]]},
      "Illinois":{"name":"Illinois","data":[[105827,110033,122507],[185709,79098,117719],[5687,4227,6208]]},
      "Indiana":{"name":"Indiana","data":[[60930,64313,75027],[96461,41665,57412],[5071,3963,4746]]},
      "Iowa":{"name":"Iowa","data":[[29891,31173,34983],[44341,19845,27009],[2517,2019,2471]]},
      "Kansas":{"name":"Kansas","data":[[26288,26591,30055],[34460,15512,21464],[2099,1388,1796]]},
      "Kentucky":{"name":"Kentucky","data":[[35550,35906,41143],[54771,23958,31420],[2904,1836,2245]]},
      "Louisiana":{"name":"Louisiana","data":[[37384,38271,41772],[43173,23153,28691],[2334,1941,2203]]},
      "Maine":{"name":"Maine","data":[[9863,10628,11826],[18088,7663,9699],[1678,1020,1299]]},
      "Maryland":{"name":"Maryland","data":[[52185,54121,62188],[106942,42331,67267],[2721,1852,2717]]},
      "Massachusetts":{"name":"Massachusetts","data":[[60129,59960,65569],[118908,43055,71564],[8092,5070,7123]]},
      "Michigan":{"name":"Michigan","data":[[83190,88479,101678],[155535,70736,94806],[4639,4226,5972]]},
      "Minnesota":{"name":"Minnesota","data":[[59681,60820,72009],[96378,37502,60437],[3966,2561,3773]]},
      "Mississippi":{"name":"Mississippi","data":[[17305,17495,19398],[24926,13624,15224],[1302,926,933]]},
      "Missouri":{"name":"Missouri","data":[[53599,55583,65183],[91756,38656,54953],[3564,2469,3556]]},
      "Montana":{"name":"Montana","data":[[9778,10342,11507],[14130,5673,8372],[787,576,828]]},
      "Nebraska":{"name":"Nebraska","data":[[17867,18637,21845],[26873,11152,15602],[1429,1048,1470]]},
      "Nevada":{"name":"Nevada","data":[[26177,29954,36748],[37187,19543,32021],[586,854,1726]]},
      "New Hampshire":{"name":"New Hampshire","data":[[11617,12169,14488],[22417,8562,12445],[1177,722,910]]},
      "New Jersey":{"name":"New Jersey","data":[[62685,61913,70189],[126985,46990,73313],[5036,3192,4180]]},
      "New Mexico":{"name":"New Mexico","data":[[14284,14323,16292],[24863,10879,13578],[804,606,824]]},
      "New York":{"name":"New York","data":[[105240,101597,110880],[114009,51503,67321],[8639,5478,6434]]},
      "North Carolina":{"name":"North Carolina","data":[[88757,96368,112598],[138067,59274,79870],[4753,3403,4046]]},
      "North Dakota":{"name":"North Dakota","data":[[8910,9070,9104],[8362,3906,5957],[870,507,759]]},
      "Ohio":{"name":"Ohio","data":[[96095,100056,113406],[168108,70278,88074],[6118,4585,5861]]},
      "Oklahoma":{"name":"Oklahoma","data":[[35123,36310,36698],[33354,17510,20662],[2288,1742,2263]]},
      "Oregon":{"name":"Oregon","data":[[38247,42256,52230],[65621,28574,45340],[2457,1819,3488]]},
      "Pennsylvania":{"name":"Pennsylvania","data":[[93936,96497,108426],[165484,69337,89520],[13294,9944,11324]]},
      "Rhode Island":{"name":"Rhode Island","data":[[7895,7740,9210],[15842,5769,9449],[709,523,630]]},
      "South Carolina":{"name":"South Carolina","data":[[44895,48789,58554],[57011,25165,35193],[2059,1569,1680]]},
      "South Dakota":{"name":"South Dakota","data":[[8734,8484,9521],[10505,4264,6133],[773,409,602]]},
      "Tennessee":{"name":"Tennessee","data":[[60885,64308,74642],[80864,38869,52642],[3320,2713,3241]]},
      "Texas":{"name":"Texas","data":[[255840,269111,289594],[247071,118654,170860],[10169,8931,10355]]},
      "Utah":{"name":"Utah","data":[[33034,37488,45806],[48680,23929,40738],[1771,1755,2899]]},
      "Vermont":{"name":"Vermont","data":[[4309,4264,4831],[9416,3673,5047],[1037,623,683]]},
      "Virginia":{"name":"Virginia","data":[[86359,83052,94978],[155650,62836,94062],[5118,2963,4252]]},
      "Washington":{"name":"Washington","data":[[74817,80302,95132],[128437,54782,88813],[4124,3099,5125]]},
      "West Virginia":{"name":"West Virginia","data":[[12561,12676,13318],[17412,8769,9364],[2068,1259,1453]]},
      "Wisconsin":{"name":"Wisconsin","data":[[49168,50968,59315],[102564,45276,64104],[5821,3642,4238]]},
      "Wyoming":{"name":"Wyoming","data":[[6725,7118,7224],[7676,3505,4961],[502,331,365]]},
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

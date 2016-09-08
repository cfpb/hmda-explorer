$(document).ready(function() {

    if ($('#hmda_chart_1').length !== 0) {
        var applicationsOriginationsChart = new Highcharts.Chart(chart1_options);
    }
    if ($('#hmda_chart_1_msa').length !== 0) {
        $('#hmda_chart_1_msa').chosen({ width: '100%' });
    }

    var chart1DataObj = {
      "U.S. Total":{"name":"U.S. Total","data":[[2680340,2803706,3440141],[4384836,1949833,3036314],[173880,133601,213702]]},
      "Alabama":{"name":"Alabama","data":[[37211,37566,47885],[57542,27250,36341],[1934,1461,2011]]},
      "Alaska":{"name":"Alaska","data":[[7780,8182,9527],[9268,3691,5712],[319,239,463]]},
      "Arizona":{"name":"Arizona","data":[[68567,73785,89742],[109292,50557,81881],[2175,2278,3394]]},
      "Arkansas":{"name":"Arkansas","data":[[24532,23867,33129],[31018,14170,18883],[1798,1153,1899]]},
      "California":{"name":"California","data":[[263944,266607,300505],[668962,333257,531119],[17127,18440,30344]]},
      "Colorado":{"name":"Colorado","data":[[76634,82160,97038],[115087,54962,103397],[2937,2692,5440]]},
      "Connecticut":{"name":"Connecticut","data":[[28088,27008,34123],[56507,20169,32407],[2873,1804,3231]]},
      "Delaware":{"name":"Delaware","data":[[7924,8428,10095],[14625,5674,8869],[483,298,472]]},
      "District of Columbia":{"name":"District of Columbia","data":[[6378,6598,7112],[10764,4498,7567],[357,232,370]]},
      "Florida":{"name":"Florida","data":[[151416,178949,225003],[213706,90408,131950],[5151,4415,7235]]},
      "Georgia":{"name":"Georgia","data":[[79235,89335,116305],[131648,57128,88187],[2801,2242,3734]]},
      "Hawaii":{"name":"Hawaii","data":[[7723,8195,10174],[17505,7256,12265],[1119,650,1379]]},
      "Idaho":{"name":"Idaho","data":[[17436,19645,26061],[24746,11069,18046],[755,560,1004]]},
      "Illinois":{"name":"Illinois","data":[[105827,110033,135243],[185709,79098,127882],[5687,4227,7428]]},
      "Indiana":{"name":"Indiana","data":[[60930,64313,86538],[96461,41665,66574],[5071,3963,6287]]},
      "Iowa":{"name":"Iowa","data":[[29891,31173,42485],[44341,19845,31579],[2517,2019,3242]]},
      "Kansas":{"name":"Kansas","data":[[26288,26591,34307],[34460,15512,24255],[2099,1388,2320]]},
      "Kentucky":{"name":"Kentucky","data":[[35550,35906,49254],[54771,23958,36403],[2904,1836,2764]]},
      "Louisiana":{"name":"Louisiana","data":[[37384,38271,44519],[43173,23153,31932],[2334,1941,2749]]},
      "Maine":{"name":"Maine","data":[[9863,10628,14537],[18088,7663,11973],[1678,1020,2011]]},
      "Maryland":{"name":"Maryland","data":[[52185,54121,63887],[106942,42331,70013],[2721,1852,3064]]},
      "Massachusetts":{"name":"Massachusetts","data":[[60129,59960,67512],[118908,43055,73854],[8092,5070,7642]]},
      "Michigan":{"name":"Michigan","data":[[83190,88479,108552],[155535,70736,100154],[4639,4226,6689]]},
      "Minnesota":{"name":"Minnesota","data":[[59681,60820,79060],[96378,37502,64518],[3966,2561,4145]]},
      "Mississippi":{"name":"Mississippi","data":[[17305,17495,24090],[24926,13624,18719],[1302,926,1343]]},
      "Missouri":{"name":"Missouri","data":[[53599,55583,72348],[91756,38656,59793],[3564,2469,4284]]},
      "Montana":{"name":"Montana","data":[[9778,10342,14058],[14130,5673,9687],[787,576,899]]},
      "Nebraska":{"name":"Nebraska","data":[[17867,18637,25871],[26873,11152,18371],[1429,1048,1955]]},
      "Nevada":{"name":"Nevada","data":[[26177,29954,37243],[37187,19543,32496],[586,854,1760]]},
      "New Hampshire":{"name":"New Hampshire","data":[[11617,12169,15212],[22417,8562,12856],[1177,722,1057]]},
      "New Jersey":{"name":"New Jersey","data":[[62685,61913,71793],[126985,46990,76121],[5036,3192,4761]]},
      "New Mexico":{"name":"New Mexico","data":[[14284,14323,18042],[24863,10879,15108],[804,606,1026]]},
      "New York":{"name":"New York","data":[[105240,101597,122103],[114009,51503,77987],[8639,5478,8961]]},
      "North Carolina":{"name":"North Carolina","data":[[88757,96368,115286],[138067,59274,82469],[4753,3403,4299]]},
      "North Dakota":{"name":"North Dakota","data":[[8910,9070,11012],[8362,3906,6923],[870,507,875]]},
      "Ohio":{"name":"Ohio","data":[[96095,100056,128442],[168108,70278,99771],[6118,4585,7291]]},
      "Oklahoma":{"name":"Oklahoma","data":[[35123,36310,41673],[33354,17510,22995],[2288,1742,2666]]},
      "Oregon":{"name":"Oregon","data":[[38247,42256,52979],[65621,28574,46191],[2457,1819,3553]]},
      "Pennsylvania":{"name":"Pennsylvania","data":[[93936,96497,119973],[165484,69337,102081],[13294,9944,15541]]},
      "Rhode Island":{"name":"Rhode Island","data":[[7895,7740,9396],[15842,5769,9675],[709,523,674]]},
      "South Carolina":{"name":"South Carolina","data":[[44895,48789,64899],[57011,25165,39096],[2059,1569,2017]]},
      "South Dakota":{"name":"South Dakota","data":[[8734,8484,13035],[10505,4264,7992],[773,409,820]]},
      "Tennessee":{"name":"Tennessee","data":[[60885,64308,83523],[80864,38869,57741],[3320,2713,3798]]},
      "Texas":{"name":"Texas","data":[[255840,269111,312828],[247071,118654,186938],[10169,8931,13087]]},
      "Utah":{"name":"Utah","data":[[33034,37488,47412],[48680,23929,42291],[1771,1755,3070]]},
      "Vermont":{"name":"Vermont","data":[[4309,4264,5629],[9416,3673,5644],[1037,623,875]]},
      "Virginia":{"name":"Virginia","data":[[86359,83052,97458],[155650,62836,97919],[5118,2963,4885]]},
      "Washington":{"name":"Washington","data":[[74817,80302,97182],[128437,54782,90723],[4124,3099,5309]]},
      "West Virginia":{"name":"West Virginia","data":[[12561,12676,16486],[17412,8769,11572],[2068,1259,2113]]},
      "Wisconsin":{"name":"Wisconsin","data":[[49168,50968,65159],[102564,45276,70986],[5821,3642,4923]]},
      "Wyoming":{"name":"Wyoming","data":[[6725,7118,8002],[7676,3505,5425],[502,331,439]]},
      "Puerto Rico":{"name":"Puerto Rico","data":[[10708,9386,9715],[18608,10673,8552],[831,590,539]]}
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

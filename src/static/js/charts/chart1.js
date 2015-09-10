$(document).ready(function() {

    if ($('#hmda_chart_1').length !== 0) {
        var applicationsOriginationsChart = new Highcharts.Chart(chart1_options);
    }
    if ($('#hmda_chart_1_msa').length !== 0) {
        $('#hmda_chart_1_msa').chosen({ width: '100%' });
    }

    var chart1DataObj = {
      "U.S. Total":{"name":"U.S. Total","data":[[2323777,2673336,2796876],[5881696,4377314,1946232],[168097,172943,132845]]},
      "Alabama":{"name":"Alabama","data":[[33595,37211,37566],[67363,57542,27250],[1906,1934,1461]]},
      "Alaska":{"name":"Alaska","data":[[6962,7780,8182],[14780,9268,3691],[361,319,239]]},
      "Arizona":{"name":"Arizona","data":[[60346,68567,73785],[138660,109292,50557],[1398,2175,2278]]},
      "Arkansas":{"name":"Arkansas","data":[[22388,24532,23867],[40067,31018,14170],[1637,1798,1153]]},
      "California":{"name":"California","data":[[252498,263944,266607],[916113,668962,333257],[16310,17127,18440]]},
      "Colorado":{"name":"Colorado","data":[[63101,76634,82160],[158697,115087,54962],[2559,2937,2692]]},
      "Connecticut":{"name":"Connecticut","data":[[24320,28088,27008],[77557,56507,20169],[3242,2873,1804]]},
      "Delaware":{"name":"Delaware","data":[[7182,7924,8428],[18051,14625,5674],[460,483,298]]},
      "District of Columbia":{"name":"District of Columbia","data":[[5697,6378,6598],[14688,10764,4498],[334,357,232]]},
      "Florida":{"name":"Florida","data":[[126288,151416,178949],[246986,213706,90408],[3559,5151,4415]]},
      "Georgia":{"name":"Georgia","data":[[67255,79235,89335],[163388,131648,57128],[2333,2801,2242]]},
      "Hawaii":{"name":"Hawaii","data":[[6861,7723,8195],[23496,17505,7256],[1337,1119,650]]},
      "Idaho":{"name":"Idaho","data":[[13987,17436,19645],[33023,24746,11069],[707,755,560]]},
      "Illinois":{"name":"Illinois","data":[[86699,105827,110033],[286458,185709,79098],[6719,5687,4227]]},
      "Indiana":{"name":"Indiana","data":[[53581,60930,64313],[133063,96461,41665],[4533,5071,3963]]},
      "Iowa":{"name":"Iowa","data":[[26027,29891,31173],[65770,44341,19845],[2727,2517,2019]]},
      "Kansas":{"name":"Kansas","data":[[23213,26288,26591],[48639,34460,15512],[2417,2099,1388]]},
      "Kentucky":{"name":"Kentucky","data":[[31056,35550,35906],[74840,54771,23958],[2859,2904,1836]]},
      "Louisiana":{"name":"Louisiana","data":[[34037,37384,38271],[54481,43173,23153],[2479,2334,1941]]},
      "Maine":{"name":"Maine","data":[[8426,9863,10628],[23475,18088,7663],[1587,1678,1020]]},
      "Maryland":{"name":"Maryland","data":[[46372,52185,54121],[147025,106942,42331],[2820,2721,1852]]},
      "Massachusetts":{"name":"Massachusetts","data":[[52280,60129,59960],[191666,118908,43055],[8784,8092,5070]]},
      "Michigan":{"name":"Michigan","data":[[67962,83190,88479],[205987,155535,70736],[3327,4639,4226]]},
      "Minnesota":{"name":"Minnesota","data":[[49849,59681,60820],[142966,96378,37502],[3551,3966,2561]]},
      "Mississippi":{"name":"Mississippi","data":[[15653,17305,17495],[29711,24926,13624],[1220,1302,926]]},
      "Missouri":{"name":"Missouri","data":[[45973,53599,55583],[128229,91756,38656],[3544,3564,2469]]},
      "Montana":{"name":"Montana","data":[[7588,9778,10342],[17760,14130,5673],[888,787,576]]},
      "Nebraska":{"name":"Nebraska","data":[[15810,17867,18637],[40503,26873,11152],[1341,1429,1048]]},
      "Nevada":{"name":"Nevada","data":[[24334,26177,29954],[44193,37187,19543],[322,586,854]]},
      "New Hampshire":{"name":"New Hampshire","data":[[10163,11617,12169],[30701,22417,8562],[1353,1177,722]]},
      "New Jersey":{"name":"New Jersey","data":[[51605,62685,61913],[179955,126985,46990],[5776,5036,3192]]},
      "New Mexico":{"name":"New Mexico","data":[[13135,14284,14323],[30419,24863,10879],[801,804,606]]},
      "New York":{"name":"New York","data":[[93172,105240,101597],[143445,114009,51503],[8428,8639,5478]]},
      "North Carolina":{"name":"North Carolina","data":[[72353,88757,96368],[170758,138067,59274],[3697,4753,3403]]},
      "North Dakota":{"name":"North Dakota","data":[[8362,8910,9070],[11386,8362,3906],[798,870,507]]},
      "Ohio":{"name":"Ohio","data":[[79934,96095,100056],[220639,168108,70278],[4826,6118,4585]]},
      "Oklahoma":{"name":"Oklahoma","data":[[32729,35123,36310],[44437,33354,17510],[2582,2288,1742]]},
      "Oregon":{"name":"Oregon","data":[[31740,38247,42256],[89064,65621,28574],[2335,2457,1819]]},
      "Pennsylvania":{"name":"Pennsylvania","data":[[85901,93936,96497],[216898,165484,69337],[14097,13294,9944]]},
      "Rhode Island":{"name":"Rhode Island","data":[[6411,7895,7740],[21778,15842,5769],[729,709,523]]},
      "South Carolina":{"name":"South Carolina","data":[[36617,44895,48789],[70341,57011,25165],[1906,2059,1569]]},
      "South Dakota":{"name":"South Dakota","data":[[7850,8734,8484],[16269,10505,4264],[860,773,409]]},
      "Tennessee":{"name":"Tennessee","data":[[52302,60885,64308],[100056,80864,38869],[2907,3320,2713]]},
      "Texas":{"name":"Texas","data":[[218337,255840,269111],[284938,247071,118654],[8283,10169,8931]]},
      "Utah":{"name":"Utah","data":[[30717,33034,37488],[77018,48680,23929],[1656,1771,1755]]},
      "Vermont":{"name":"Vermont","data":[[3826,4309,4264],[13217,9416,3673],[1253,1037,623]]},
      "Virginia":{"name":"Virginia","data":[[75982,86359,83052],[209755,155650,62836],[4995,5118,2963]]},
      "Washington":{"name":"Washington","data":[[62253,74817,80302],[184308,128437,54782],[4458,4124,3099]]},
      "West Virginia":{"name":"West Virginia","data":[[11192,12561,12676],[19048,17412,8769],[2081,2068,1259]]},
      "Wisconsin":{"name":"Wisconsin","data":[[41278,49168,50968],[172473,102564,45276],[7458,5821,3642]]},
      "Wyoming":{"name":"Wyoming","data":[[6112,6725,7118],[9549,7676,3505],[533,502,331]]},
      "Puerto Rico":{"name":"Puerto Rico","data":[[12466,10708,9386],[17609,18608,10673],[1024,831,590]]}
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

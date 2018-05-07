$(document).ready(function() {

    if ($('#hmda_chart_1').length !== 0) {
        var applicationsOriginationsChart = new Highcharts.Chart(chart1_options);
    }
    if ($('#hmda_chart_1_msa').length !== 0) {
        $('#hmda_chart_1_msa').chosen({ width: '100%' });
    }

    var chart1DataObj = {
      "U.S. Total":{"name":"U.S. Total","data":[[3199645,3544594,3686505],[2841018,3370884,2200834],[183124,239511,227067]]},
      "Alabama":{"name":"Alabama","data":[[43184,49384,53110],[33704,38669,28455],[1731,2152,2533]]},
      "Alaska":{"name":"Alaska","data":[[8864,8842,8274],[5334,5986,3948],[351,570,404]]},
      "Arizona":{"name":"Arizona","data":[[88279,103395,110732],[78919,98649,67301],[3235,4166,4969]]},
      "Arkansas":{"name":"Arkansas","data":[[27109,30411,31386],[16436,18827,14399],[1448,1846,1757]]},
      "California":{"name":"California","data":[[296757,323285,325177],[521443,651102,369723],[29705,41152,35038]]},
      "Colorado":{"name":"Colorado","data":[[92206,96738,98701],[99126,126810,79559],[5068,7848,7278]]},
      "Connecticut":{"name":"Connecticut","data":[[29294,33424,36287],[28104,30309,19183],[2323,2351,1986]]},
      "Delaware":{"name":"Delaware","data":[[9842,11037,12097],[8520,10354,6720],[416,515,484]]},
      "District of Columbia":{"name":"District of Columbia","data":[[6847,7081,7651],[7111,8298,4293],[332,546,475]]},
      "Florida":{"name":"Florida","data":[[218508,253580,269275],[127945,158338,124601],[6758,9781,10149]]},
      "Georgia":{"name":"Georgia","data":[[109688,126140,133621],[83317,97713,69120],[3273,4605,4822]]},
      "Hawaii":{"name":"Hawaii","data":[[9269,9965,10806],[11208,14448,8323],[1206,1381,1017]]},
      "Idaho":{"name":"Idaho","data":[[24703,28204,28667],[16824,20971,13878],[946,1383,2090]]},
      "Illinois":{"name":"Illinois","data":[[122507,134435,139077],[117719,136924,79759],[6208,7903,7868]]},
      "Indiana":{"name":"Indiana","data":[[75027,83259,88673],[57412,63010,44339],[4746,6510,5647]]},
      "Iowa":{"name":"Iowa","data":[[34983,37992,39009],[27009,31548,19644],[2471,2686,2343]]},
      "Kansas":{"name":"Kansas","data":[[30055,31598,32441],[21464,24273,16396],[1796,2351,2082]]},
      "Kentucky":{"name":"Kentucky","data":[[41143,46395,48348],[31420,35837,25009],[2245,2830,2697]]},
      "Louisiana":{"name":"Louisiana","data":[[41772,42442,40778],[28691,32325,23640],[2203,2608,2388]]},
      "Maine":{"name":"Maine","data":[[11826,14145,14500],[9699,10905,8212],[1299,1392,1261]]},
      "Maryland":{"name":"Maryland","data":[[62188,69720,74138],[67267,78298,47243],[2717,3659,3238]]},
      "Massachusetts":{"name":"Massachusetts","data":[[65569,73347,74014],[71564,86630,49145],[7123,8962,6976]]},
      "Michigan":{"name":"Michigan","data":[[101678,113009,119369],[94806,108675,78826],[5972,7908,8282]]},
      "Minnesota":{"name":"Minnesota","data":[[72009,78008,79530],[60437,68943,43360],[3773,5218,5565]]},
      "Mississippi":{"name":"Mississippi","data":[[19398,22742,24831],[15224,16409,13371],[933,1058,1257]]},
      "Missouri":{"name":"Missouri","data":[[65183,73835,76083],[54953,62974,40335],[3556,4565,4675]]},
      "Montana":{"name":"Montana","data":[[11507,11754,12398],[8372,9586,6566],[828,958,958]]},
      "Nebraska":{"name":"Nebraska","data":[[21845,22586,22299],[15602,18657,11332],[1470,1825,1524]]},
      "Nevada":{"name":"Nevada","data":[[36748,43413,46904],[32021,40252,28805],[1726,2385,2854]]},
      "New Hampshire":{"name":"New Hampshire","data":[[14488,16423,17412],[12445,15137,10315],[910,1092,932]]},
      "New Jersey":{"name":"New Jersey","data":[[70189,80982,86401],[73313,82666,50493],[4180,4929,4628]]},
      "New Mexico":{"name":"New Mexico","data":[[16292,17579,18583],[13578,15906,11375],[824,868,718]]},
      "New York":{"name":"New York","data":[[110880,121252,124813],[67321,73002,57925],[6434,6972,6792]]},
      "North Carolina":{"name":"North Carolina","data":[[112598,128246,134968],[79870,93311,63583],[4046,5544,5297]]},
      "North Dakota":{"name":"North Dakota","data":[[9104,8618,8383],[5957,6711,4028],[759,970,700]]},
      "Ohio":{"name":"Ohio","data":[[113406,128112,135557],[88074,99307,68220],[5861,7485,7399]]},
      "Oklahoma":{"name":"Oklahoma","data":[[36698,38120,39085],[20662,23275,17255],[2263,2498,2137]]},
      "Oregon":{"name":"Oregon","data":[[52230,55504,54459],[45340,57373,40204],[3488,5982,5293]]},
      "Pennsylvania":{"name":"Pennsylvania","data":[[108426,118628,123604],[89520,98132,67421],[11324,12131,11513]]},
      "Rhode Island":{"name":"Rhode Island","data":[[9210,10761,11604],[9449,10468,7296],[630,827,689]]},
      "South Carolina":{"name":"South Carolina","data":[[58554,66715,71489],[35193,42785,30475],[1680,2263,2345]]},
      "South Dakota":{"name":"South Dakota","data":[[9521,9928,10376],[6133,7330,4689],[602,788,743]]},
      "Tennessee":{"name":"Tennessee","data":[[74642,83003,87558],[52642,61264,45814],[3241,4319,4425]]},
      "Texas":{"name":"Texas","data":[[289594,311348,320842],[170860,199581,135320],[10355,13500,14480]]},
      "Utah":{"name":"Utah","data":[[45806,51700,52395],[40738,51616,32316],[2899,3922,4109]]},
      "Vermont":{"name":"Vermont","data":[[4831,5329,5253],[5047,5387,3601],[683,863,707]]},
      "Virginia":{"name":"Virginia","data":[[94978,104462,110817],[94062,108504,62954],[4252,5393,4323]]},
      "Washington":{"name":"Washington","data":[[95132,108089,111891],[88813,114986,77363],[5125,8717,8924]]},
      "West Virginia":{"name":"West Virginia","data":[[13318,13796,14606],[9364,10266,8416],[1453,1546,1426]]},
      "Wisconsin":{"name":"Wisconsin","data":[[59315,65027,67681],[64104,71987,46951],[4238,5937,5104]]},
      "Wyoming":{"name":"Wyoming","data":[[7224,6532,6824],[4961,5999,3905],[365,470,414]]},
      "Puerto Rico":{"name":"Puerto Rico","data":[[9705,9509,8559],[8544,6800,3314],[535,453,385]]}
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

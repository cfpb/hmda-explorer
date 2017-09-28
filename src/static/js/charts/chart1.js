$(document).ready(function() {

    if ($('#hmda_chart_1').length !== 0) {
        var applicationsOriginationsChart = new Highcharts.Chart(chart1_options);
    }
    if ($('#hmda_chart_1_msa').length !== 0) {
        $('#hmda_chart_1_msa').chosen({ width: '100%' });
    }

    var chart1DataObj = {
      "U.S. Total":{"name":"U.S. Total","data":[[2804466,3199645,3544594],[1994390,2841018,3370884],[133993,183124,239511]]},
      "Alabama":{"name":"Alabama","data":[[37575,43184,49384],[27950,33704,38669],[1467,1731,2152]]},
      "Alaska":{"name":"Alaska","data":[[8182,8864,8842],[3749,5334,5986],[239,351,570]]},
      "Arizona":{"name":"Arizona","data":[[73811,88279,103395],[52007,78919,98649],[2288,3235,4166]]},
      "Arkansas":{"name":"Arkansas","data":[[23868,27109,30411],[14468,16436,18827],[1155,1448,1846]]},
      "California":{"name":"California","data":[[266715,296757,323285],[338095,521443,651102],[18506,29705,41152]]},
      "Colorado":{"name":"Colorado","data":[[82199,92206,96738],[56058,99126,126810],[2703,5068,7848]]},
      "Connecticut":{"name":"Connecticut","data":[[27027,29294,33424],[20769,28104,30309],[1810,2323,2351]]},
      "Delaware":{"name":"Delaware","data":[[8430,9842,11037],[5851,8520,10354],[299,416,515]]},
      "District of Columbia":{"name":"District of Columbia","data":[[6599,6847,7081],[4566,7111,8298],[235,332,546]]},
      "Florida":{"name":"Florida","data":[[179002,218508,253580],[94038,127945,158338],[4434,6758,9781]]},
      "Georgia":{"name":"Georgia","data":[[89356,109688,126140],[58554,83317,97713],[2251,3273,4605]]},
      "Hawaii":{"name":"Hawaii","data":[[8195,9269,9965],[7256,11208,14448],[650,1206,1381]]},
      "Idaho":{"name":"Idaho","data":[[19647,24703,28204],[11360,16824,20971],[560,946,1383]]},
      "Illinois":{"name":"Illinois","data":[[110077,122507,134435],[80938,117719,136924],[4237,6208,7903]]},
      "Indiana":{"name":"Indiana","data":[[64330,75027,83259],[42935,57412,63010],[3972,4746,6510]]},
      "Iowa":{"name":"Iowa","data":[[31175,34983,37992],[20163,27009,31548],[2021,2471,2686]]},
      "Kansas":{"name":"Kansas","data":[[26596,30055,31598],[15884,21464,24273],[1393,1796,2351]]},
      "Kentucky":{"name":"Kentucky","data":[[35920,41143,46395],[24494,31420,35837],[1837,2245,2830]]},
      "Louisiana":{"name":"Louisiana","data":[[38276,41772,42442],[23753,28691,32325],[1950,2203,2608]]},
      "Maine":{"name":"Maine","data":[[10631,11826,14145],[7861,9699,10905],[1023,1299,1392]]},
      "Maryland":{"name":"Maryland","data":[[54123,62188,69720],[43360,67267,78298],[1865,2717,3659]]},
      "Massachusetts":{"name":"Massachusetts","data":[[60036,65569,73347],[44203,71564,86630],[5084,7123,8962]]},
      "Michigan":{"name":"Michigan","data":[[88485,101678,113009],[73216,94806,108675],[4243,5972,7908]]},
      "Minnesota":{"name":"Minnesota","data":[[60829,72009,78008],[38263,60437,68943],[2568,3773,5218]]},
      "Mississippi":{"name":"Mississippi","data":[[17495,19398,22742],[13886,15224,16409],[928,933,1058]]},
      "Missouri":{"name":"Missouri","data":[[55595,65183,73835],[39600,54953,62974],[2472,3556,4565]]},
      "Montana":{"name":"Montana","data":[[10343,11507,11754],[5814,8372,9586],[577,828,958]]},
      "Nebraska":{"name":"Nebraska","data":[[18641,21845,22586],[11319,15602,18657],[1048,1470,1825]]},
      "Nevada":{"name":"Nevada","data":[[29954,36748,43413],[20177,32021,40252],[856,1726,2385]]},
      "New Hampshire":{"name":"New Hampshire","data":[[12183,14488,16423],[8830,12445,15137],[722,910,1092]]},
      "New Jersey":{"name":"New Jersey","data":[[61937,70189,80982],[48448,73313,82666],[3207,4180,4929]]},
      "New Mexico":{"name":"New Mexico","data":[[14328,16292,17579],[11131,13578,15906],[607,824,868]]},
      "New York":{"name":"New York","data":[[101598,110880,121252],[51503,67321,73002],[5478,6434,6972]]},
      "North Carolina":{"name":"North Carolina","data":[[96394,112598,128246],[60644,79870,93311],[3408,4046,5544]]},
      "North Dakota":{"name":"North Dakota","data":[[9070,9104,8618],[3932,5957,6711],[507,759,970]]},
      "Ohio":{"name":"Ohio","data":[[100058,113406,128112],[71758,88074,99307],[4590,5861,7485]]},
      "Oklahoma":{"name":"Oklahoma","data":[[36313,36698,38120],[17930,20662,23275],[1748,2263,2498]]},
      "Oregon":{"name":"Oregon","data":[[42266,52230,55504],[29164,45340,57373],[1821,3488,5982]]},
      "Pennsylvania":{"name":"Pennsylvania","data":[[96520,108426,118628],[71156,89520,98132],[9961,11324,12131]]},
      "Rhode Island":{"name":"Rhode Island","data":[[7755,9210,10761],[5945,9449,10468],[525,630,827]]},
      "South Carolina":{"name":"South Carolina","data":[[48805,58554,66715],[25824,35193,42785],[1578,1680,2263]]},
      "South Dakota":{"name":"South Dakota","data":[[8484,9521,9928],[4319,6133,7330],[410,602,788]]},
      "Tennessee":{"name":"Tennessee","data":[[64310,74642,83003],[39581,52642,61264],[2718,3241,4319]]},
      "Texas":{"name":"Texas","data":[[269161,289594,311348],[123297,170860,199581],[8997,10355,13500]]},
      "Utah":{"name":"Utah","data":[[37499,45806,51700],[24287,40738,51616],[1758,2899,3922]]},
      "Vermont":{"name":"Vermont","data":[[4264,4831,5329],[3755,5047,5387],[625,683,863]]},
      "Virginia":{"name":"Virginia","data":[[83058,94978,104462],[63887,94062,108504],[2967,4252,5393]]},
      "Washington":{"name":"Washington","data":[[80331,95132,108089],[55661,88813,114986],[3108,5125,8717]]},
      "West Virginia":{"name":"West Virginia","data":[[12677,13318,13796],[8877,9364,10266],[1259,1453,1546]]},
      "Wisconsin":{"name":"Wisconsin","data":[[51009,59315,65027],[46015,64104,71987],[3651,4238,5937]]},
      "Wyoming":{"name":"Wyoming","data":[[7118,7224,6532],[3585,4961,5999],[331,365,470]]},
      "Puerto Rico":{"name":"Puerto Rico","data":[[9386,9705,9509],[10673,8544,6800],[590,535,453]]}
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

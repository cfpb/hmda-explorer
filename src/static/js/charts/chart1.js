$(document).ready(function() {

    if ($('#hmda_chart_1').length !== 0) {
        var applicationsOriginationsChart = new Highcharts.Chart(chart1_options);
    }
    if ($('#hmda_chart_1_msa').length !== 0) {
        $('#hmda_chart_1_msa').chosen({ width: '100%' });
    }

    var chart1DataObj = {
      "Alabama":{"name":"Alabama","data":[[38726,42679,43799],[77229,68332,33640],[7215,7627,7537]]},
      "Alaska":{"name":"Alaska","data":[[7456,8451,8825],[16521,10807,4328],[910,1105,1037]]},
      "Arizona":{"name":"Arizona","data":[[77439,83557,87022],[167220,136725,60289],[2913,4704,5497]]},
      "Arkansas":{"name":"Arkansas","data":[[27333,30174,29530],[46891,37464,17708],[5059,5487,5373]]},
      "California":{"name":"California","data":[[313630,320477,316077],[1054421,804839,393548],[23669,28649,33976]]},
      "Colorado":{"name":"Colorado","data":[[75189,90089,96155],[182732,138258,65165],[5308,6810,7075]]},
      "Connecticut":{"name":"Connecticut","data":[[26786,31058,29933],[82915,62239,23251],[5660,5442,4491]]},
      "Delaware":{"name":"Delaware","data":[[9416,10392,10689],[22127,18201,6937],[1325,1574,1316]]},
      "District of Columbia":{"name":"District of Columbia","data":[[6657,7324,7677],[17250,13579,5725],[935,974,1027]]},
      "Florida":{"name":"Florida","data":[[160643,190454,220864],[290611,262732,108114],[10795,14015,15621]]},
      "Georgia":{"name":"Georgia","data":[[77182,89499,99870],[192738,163628,73491],[7687,9417,10037]]},
      "Hawaii":{"name":"Hawaii","data":[[9064,10365,10872],[28085,22460,9116],[3519,3756,2389]]},
      "Idaho":{"name":"Idaho","data":[[17303,21099,23360],[38513,30267,13264],[1372,1743,1578]]},
      "Illinois":{"name":"Illinois","data":[[98109,119223,124800],[313889,212561,92817],[12750,12388,12516]]},
      "Indiana":{"name":"Indiana","data":[[58714,66486,69967],[142915,106960,47582],[9262,10982,10980]]},
      "Iowa":{"name":"Iowa","data":[[32020,37680,39476],[73265,51745,24684],[6325,6461,6877]]},
      "Kansas":{"name":"Kansas","data":[[26554,30009,30551],[53683,39946,19041],[4687,4627,3922]]},
      "Kentucky":{"name":"Kentucky","data":[[35756,41106,41350],[82331,62640,28557],[6963,7166,5934]]},
      "Louisiana":{"name":"Louisiana","data":[[38618,42701,43622],[62180,51711,29460],[6838,7437,7359]]},
      "Maine":{"name":"Maine","data":[[10740,12543,13446],[27826,21900,9360],[2949,3277,2884]]},
      "Maryland":{"name":"Maryland","data":[[51602,58163,60095],[160027,120784,48203],[7758,8878,8781]]},
      "Massachusetts":{"name":"Massachusetts","data":[[62102,71177,70121],[210677,135510,50740],[15805,18122,15465]]},
      "Michigan":{"name":"Michigan","data":[[75808,91804,97218],[225029,174860,80178],[11357,13589,13749]]},
      "Minnesota":{"name":"Minnesota","data":[[57726,68782,69851],[157435,110197,44610],[6955,8496,7975]]},
      "Mississippi":{"name":"Mississippi","data":[[18319,20251,20351],[36443,31837,18588],[5210,5600,5023]]},
      "Missouri":{"name":"Missouri","data":[[55900,63729,65377],[141713,106556,46565],[7322,8201,7296]]},
      "Montana":{"name":"Montana","data":[[9048,11882,12365],[20704,17333,7138],[1700,1792,1463]]},
      "Nebraska":{"name":"Nebraska","data":[[18600,20927,21868],[44929,31038,13899],[3552,4038,3987]]},
      "Nevada":{"name":"Nevada","data":[[32060,32490,35438],[53673,48169,23363],[795,1352,1935]]},
      "New Hampshire":{"name":"New Hampshire","data":[[11939,13546,14192],[34024,25695,9993],[2135,2348,2055]]},
      "New Jersey":{"name":"New Jersey","data":[[59410,70912,70616],[199635,144807,54660],[10332,10462,8482]]},
      "New Mexico":{"name":"New Mexico","data":[[15685,16885,16835],[35471,30361,13196],[1882,2143,2117]]},
      "New York":{"name":"New York","data":[[104290,119098,116378],[158456,128776,60646],[22360,23955,21792]]},
      "North Carolina":{"name":"North Carolina","data":[[84511,102649,110864],[196342,164644,70677],[8554,10769,9027]]},
      "North Dakota":{"name":"North Dakota","data":[[9811,10470,10608],[12434,9495,4779],[1851,2077,1760]]},
      "Ohio":{"name":"Ohio","data":[[87473,104989,108882],[236850,187736,80123],[11818,13973,12947]]},
      "Oklahoma":{"name":"Oklahoma","data":[[38104,41262,42932],[51008,40321,22264],[9470,10247,10347]]},
      "Oregon":{"name":"Oregon","data":[[37424,44664,48448],[103395,79689,34273],[4072,4269,4050]]},
      "Pennsylvania":{"name":"Pennsylvania","data":[[97105,106853,109109],[241476,190373,82677],[30990,31199,28617]]},
      "Rhode Island":{"name":"Rhode Island","data":[[7659,9198,9090],[24771,18760,7252],[1481,1527,1418]]},
      "South Carolina":{"name":"South Carolina","data":[[43957,53162,57091],[81869,69062,30498],[4627,5255,4873]]},
      "South Dakota":{"name":"South Dakota","data":[[8984,9951,9703],[17925,12081,5152],[1742,1652,1218]]},
      "Tennessee":{"name":"Tennessee","data":[[59675,69028,73962],[113252,94875,47482],[7759,8709,8776]]},
      "Texas":{"name":"Texas","data":[[253420,299180,314290],[318285,283729,136947],[22446,28271,27642]]},
      "Utah":{"name":"Utah","data":[[37013,39204,44340],[85838,57171,28078],[2480,3049,3615]]},
      "Vermont":{"name":"Vermont","data":[[4999,5669,5602],[15730,11649,4639],[2016,1975,1542]]},
      "Virginia":{"name":"Virginia","data":[[86912,98244,93307],[233213,179593,73563],[14645,16308,15413]]},
      "Washington":{"name":"Washington","data":[[71040,85860,91719],[209376,151961,64956],[7332,8759,8294]]},
      "West Virginia":{"name":"West Virginia","data":[[13158,14697,14704],[21101,19702,10042],[4326,4231,3420]]},
      "Wisconsin":{"name":"Wisconsin","data":[[49203,57849,59604],[192562,119614,55116],[11963,11061,9170]]},
      "Wyoming":{"name":"Wyoming","data":[[7174,7920,8358],[10915,8983,4240],[1025,997,855]]},
      "Puerto Rico":{"name":"Puerto Rico","data":[[14076,11783,10405],[18931,19933,11707],[7609,8359,8416]]}
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

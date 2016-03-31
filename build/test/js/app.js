(function() {
  var data = chinacitieswithrunner;

  var map = new mapviz.map(document.getElementById('map'), {
    zoom: 6,
    // bgTileUrl: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
  });

  // var runner = new mapviz.Runner({
  //   field: ["total_dis", "total_person"], // calculate perPerson'distance
  //   size: 30,
  //   level: 7,
  //   color: "blue",
  //   location: "cp",
  //   classification:"JeNks"
  // });
  // runner.data(data);
  // map.add(runner);

  // var pie = new mapviz.Pie({
  //   field: ["M", "F", "N_gender"],
  //   color:["red", "blue", "yellow"],
  //   size: 10,
  //   level: 7,
  //   location: "cp",
  //   classification:"JeNks"
  // });
  // pie.data(data);
  // map.add(pie);

  var choropleth = new mapviz.Choropleth({
    field: ["total_dis", "total_person"],
    colorScheme: "YlOrRd",
    level:7,
    classification:"JeNks",
    legend: {
      on: true,
      orientation: "horizontal",
      size: 40
    }
  });
  choropleth.data(data);
  map.add(choropleth);

  //   var custom = new mapviz.Custom({
  //     // url: "https://github.com/apple-touch-icon-57x57.png",
  //     field: ["total_dis"],
  //     size: 20,
  //     level: 7,
  //     location: "cp",
  //     classification: "Jenks"
  //   });
  //   custom.data(data);
  //   map.add(custom);

  // var heatmap = new mapviz.Heatmap({
  //   "radius": 2,
  //   "maxOpacity": 0.6,
  //   "scaleRadius": true,
  //   "useLocalExtrema": true,
  //   latField: 'lat',
  //   lngField: 'lng',
  //   valueField: 'count',
  //   field: "total_dis",
  //   location: "cp"
  // });
  // heatmap.data(data);
  // map.add(heatmap);

})();

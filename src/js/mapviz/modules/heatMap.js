var _ = require("lodash");
var L = require("leaflet");
var IModule = require("imodule");
var isExisted = require("isExisted");
var HeatmapOverlay = require("leaflet-heatmap");

var defaults = {
  "radius": 1,
  "maxOpacity": 0.6,
  "scaleRadius": true,
  "useLocalExtrema": true,
  latField: 'lat',
  lngField: 'lng',
  valueField: 'count',
  field: "total_dis",
  location: "cp"
};

function Heatmap(userOpts) {
  var config = _.defaults(userOpts || {}, defaults);
  var dataLayer;

  this.show = function() {
    var map = this.map;
    var data = this.data;
    isExisted(data, map);

    var heatMapData = {
      max: 0,
      data: []
    };

    data.features.map(function(item, index) {
      if (typeof item.properties[config.field] === "undefined") {
        throw new Error("no " + config.field + " exist, please check!");
        return;
      };
      if (typeof item.properties[config.location] === "undefined") {
        throw new Error("no " + config.location + " exist, please check!");
        return;
      };

      var tempData = {
        lat: item.properties[config.location][1],
        lng: item.properties[config.location][0],
        count: item.properties[config.field]
      };

      heatMapData.data.push(tempData);
    });

    var max = _.max(data.features, function(item) {
      return item.properties[config.field];
    });
    heatMapData.max = max.properties[config.field];

    var heatmapLayer = new HeatmapOverlay(config);
    map.addLayer(heatmapLayer);
    // heatmapLayer.onAdd(map);
    heatmapLayer.setData(heatMapData);

    dataLayer = heatmapLayer;
    return this;
  };

  this.remove = function() {
    this.map.removeLayer(dataLayer);
  };
};

Heatmap.prototype = IModule;
module.exports = Heatmap;

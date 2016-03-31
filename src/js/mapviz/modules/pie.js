var _ = require('lodash');
var L = require('leaflet');
var collision = require("collision");
var pieIcon = require("pieIcon");
var setClass = require("classify");
var getSize = require("getSize");
var isExisted = require("isExisted");
var IModule = require('imodule');

var defaults = {
  field: ["M", "F"],
  color: ["#eee", "#fff"],
  size: 10,
  level: 7,
  location: "cp",
  classification: "Jenks",
  legend: true
};

function Pie(userOpts) {
  var opts = _.defaults(userOpts || {}, defaults);
  var collisionLayer = collision();
  var dataLayer = collisionLayer;

  this.show = function() {
    var map = this.map;
    var data = this.data;
    isExisted(data, map);

    if (!(opts.field instanceof Array) || !opts.field.length) {
      throw new Error("field must be Array and cannot be Null");
      return;
    };
    if (opts.field.length != opts.color.length) {
      throw new Error("Please make colors match the field!");
      return;

    };
    var field = opts.field;

    var arrTemp = new Array();
    data.features.map(function(item, index) {
      var temp = 0;
      field.map(function(f) {
        var fieldResult = item.properties[f];
        if (typeof fieldResult === "undefined") {
          throw new Error("no " + fieldResult + " exist, please check!");
          return;
        };
        temp += fieldResult;
      });
      arrTemp.push(temp);
    });

    var classArr = setClass(arrTemp, opts.level, opts.classification);

    data.features.map(function(item, index) {
      var location = opts.location.toString();
      var loc = item.properties[location];
      if (typeof loc === "undefined") {
        throw new Error("Location is wrong!");
        return;
      };

      var temp = 0;
      var pieData = new Array();
      field.map(function(f) {
        var fieldResult = item.properties[f];
        var pieTemp = {};
        pieTemp.name = f.toString();
        pieTemp.value = fieldResult;
        pieData.push(pieTemp);
        // pieData.push(fieldResult);
        temp += fieldResult;
      });
      if (temp) {
        var size = getSize(temp, classArr, opts.size, opts.level);
        var marker = L.marker(L.GeoJSON.coordsToLatLng(loc), {
          icon: pieIcon({
            data: pieData,
            color: opts.color,
            size: size
          })
        });
        collisionLayer.addLayer(marker);
      }
    });
    collisionLayer.addTo(map);

    return this;
  };

  this.remove = function() {
    this.map.removeLayer(dataLayer);
  };
}

Pie.prototype = IModule;
module.exports = Pie;

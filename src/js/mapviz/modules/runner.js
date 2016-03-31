var _ = require("lodash");
var L = require("leaflet");
var IModule = require("imodule");
var RunnerIcon = require("runnerIcon");
var collision = require("collision");
var setClass = require("classify");
var getSize = require("getSize");
var isExisted = require("isExisted");

var defaults = {
  field: ["total_dis", "total_person"],
  size: 10,
  level: 7,
  color: "#e6f402",
  location: "cp",
  classification: "Jenks"
};

function Runner(userOpts) {
  var opts = _.defaults(userOpts || {}, defaults);
  var runnerCollisionLayer = collision();
  var dataLayer = runnerCollisionLayer;

  this.show = function() {
    var map = this.map;
    var data = this.data;
    isExisted(data, map);

    var flag = 0; // flag for one or two field(s)
    if (!(opts.field instanceof Array)) {
      throw new Error("field must be Array!");
      return;
    };
    if (opts.field.length == 1) {
      var field = opts.field[0];
      flag = 1;
    } else if (opts.field.length == 2) {
      var field1 = opts.field[0];
      var field2 = opts.field[1];
      flag = 2;
    } else {
      throw new Error("Just get one or two field(s), please check!");
      return;
    }

    var arrTemp = new Array();
    data.features.map(function(item, index) {
      if (flag == 1) {
        var fieldResult = item.properties[field];
        if (typeof fieldResult === "undefined") {
          throw new Error("no " + field + " exist, please check!");
          return;
        };
        arrTemp.push(fieldResult);
      } else if (flag == 2) {
        var temp;
        var fieldResult1 = item.properties[field1];
        var fieldResult2 = item.properties[field2];
        if (typeof fieldResult1 === "undefined") {
          throw new Error("no " + field1 + " exist, please check!");
          return;
        };
        if (typeof fieldResult2 === "undefined") {
          throw new Error("no " + field2 + " exist, please check!");
          return;
        };
        if (fieldResult1 && fieldResult2) {
          temp = parseFloat(fieldResult1) / parseFloat(fieldResult2);
        } else {
          temp = 0;
        };
        arrTemp.push(temp);
      }
    });
    var classArr = setClass(arrTemp, opts.level, opts.classification);

    data.features.map(function(item, index) {
      var location = opts.location.toString();
      var loc = item.properties[location];
      if (typeof loc === "undefined") {
        throw new Error("Location is wrong!");
        return;
      };
      if (flag == 1) {
        var tempRes = parseFloat(item.properties[field]);
      } else if (flag == 2) {
        if (item.properties[field2] && item.properties[field1]) {
          var tempRes = parseFloat(item.properties[field1]) / parseFloat(item.properties[field2]);
        } else {
          var tempRes = 0;
        }
      };

      if (tempRes) {
        var size = getSize(tempRes, classArr, opts.size, opts.level);
        var marker = L.marker(L.GeoJSON.coordsToLatLng(loc), {
          icon: RunnerIcon({
            size: size,
            color: opts.color
          })
        });
        runnerCollisionLayer.addLayer(marker);
      };
    });
    runnerCollisionLayer.addTo(map);

    return this;
  };

  this.remove = function() {
    this.map.removeLayer(dataLayer);
  };
}

Runner.prototype = IModule;

module.exports = Runner;

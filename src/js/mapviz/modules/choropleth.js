var L = require("leaflet");
var _ = require("lodash");
var setClass = require("classify");
var getIndex = require("getSize");
var isExisted = require("isExisted");
var colorSchemes = require("colorSchemes");
var legend = require("legend");

var IModule = require("imodule");

var defaults = {
  field: ["total_dis", "total_person"],
  colorScheme: "",
  level: 7,
  classification: "Jenks",
  legend: {
    on: false,
    orientation: "horizontal",
    size: 30
  }
};

function Choropleth(userOpts) {
  var opts = _.defaults(userOpts || {}, defaults);
  var dataLayer;

  this.show = function() {
    var map = this.map;
    var data = this.data;
    isExisted(data, map);

    var chinaMap = L.geoJson(data, {
      style: {
        fillColor: "#fff"
      },
      color: "#67a9cf",
      fillOpacity: 1,
      weight: 1
    }).addTo(map);
    dataLayer = chinaMap;

    if (typeof colorSchemes[opts.colorScheme] === "undefined") {
      throw new Error("ColorSchemes does not exist!");
      return;
    };
    if (typeof colorSchemes[opts.colorScheme][opts.level] === "undefined") {
      throw new Error("ColorSchemes'level does not exist!");
      return;
    };
    var color = colorSchemes[opts.colorScheme][opts.level];

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
    };

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

// building legend
    if (opts.legend.on) {

      var domain = new Array();
      var max = min = arrTemp[0];
      arrTemp.map(function(d) {
        if (d >= max) {
          max = d;
        };
        if (d <= min) {
          min = d;
        };
      });
      domain.push(min);
      domain.push(max);
      legend(opts.legend.orientation, opts.legend.size, domain, classArr, color);
    };

    for (var lyr in chinaMap._layers) {
      var ly = chinaMap._layers[lyr];
      var item = ly.feature;

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
        var colorIndex = getIndex(tempRes, classArr, 1, opts.level) - 1;

        // var i = 0;
        // for (; i < opts.level; i++) {
        //   if (tempRes <= classArr[i])
        //     break;
        // };
      };

      if (colorIndex < 0 || colorIndex >= color.length) {
        console.log(colorIndex, tempRes);
        throw new Error("Index was outside the bounds of the Colorarray");
        return;
      };

      ly.setStyle({
        fillColor: color[colorIndex]
      })
    };

    return this;
  };
  this.remove = function() {
    this.map.removeLayer(dataLayer);
  };
};

Choropleth.prototype = IModule;
module.exports = Choropleth;

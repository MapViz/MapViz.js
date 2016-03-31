var _ = require("lodash");
var L = require("leaflet");
var IModule = require("imodule");


//field for display the Popup
var defaults = {};

function baseMap(userOpts) {
  var opts = _.defaults(userOpts || {}, defaults);

  var dataLayer;

  this.show = function() {

    if (!this.map || !this.data) {
      throw new Error("There is No data or map");
      return;
    }
    var map = this.map;
    var data = this.data;

    dataLayer = L.geoJson(data, {
      style: {
        fillColor: "#67a9cf"
      },
      onEachFeature: function(feature, layer) {
        var name = feature.properties.name;
        var male = feature.properties.M.toString();
        var female = feature.properties.F.toString();
        var n_gender = feature.properties.N_gender.toString();
        var pop = "<p> 地名: " + name + " <br />";
        pop += "男性: " + male + " <br />";
        pop += "女性: " + female + " <br />";
        pop += "未注明: " + n_gender + " <br />";
        layer.bindPopup(pop);
      },
      color: "#fff",
      fillOpacity: 1,
      weight: 1
    }).addTo(map);

    return this;
  };

  this.remove = function() {
    this.map.removeLayer(dataLayer);
  };
};

baseMap.prototype = IModule;
module.exports = baseMap;

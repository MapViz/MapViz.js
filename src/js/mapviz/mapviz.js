var L = require("leaflet");
var _ = require("lodash");

var defaults = {
  center: [36, 116],
  // bgTileUrl: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
  zoom: 4,
  maxZoom: 20
};

function init(element, options){
  if (!element) {
    throw new Error('Error initializing  element that is not a DOM element');
  };

  if (typeof element === "string") {
    element = document.getElementById(element);
  };

  options = _.defaults(options || {}, defaults);
  this.map = L.map(element).setView(options.center, options.zoom);
  if (options.bgTileUrl) {
    L.tileLayer(options.bgTileUrl).addTo(this.map);
  }

  var modules = [];
  this.add = function(module){
    if (!module || !module.isMapVizModule) {
      throw new Error('module must be a  module.');
    };

    module.addTo(this);
    modules.push(module);
    return module;
  };

  this.getModules = function() {
      return _.clone(modules);
  };
};

module.exports = init;

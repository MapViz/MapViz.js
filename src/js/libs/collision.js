var rbush = require("rbush");

var RunnerCollision = L.LayerGroup.extend({
  controls: {
    _rbush: [],
    _layers: [],
    _visibleLayers: []
      // _margin: 10
      // _cachedIconRects: [],
  },
  initialize: function(options) {
    L.LayerGroup.prototype.initialize.call(this, options);
    this.controls._rbush = null;
    // this.controls._margin = options.margin || 0;
  },
  addLayer: function(layer) {
    this.controls._layers.push(layer);
    // console.log(this._map);
    if (this._map) {
      this.conflictDetect(layer);
    }
  },
  removeLayer: function(layer) {
    L.LayerGroup.prototype.removeLayer.call(this, layer);
  },
  onAdd: function(map) {
    this._map = map;
    this._onZoomEnd();
    map.on("zoomend", this._onZoomEnd, this);
    map.on("dragend", this._onDragEnd, this);
  },
  onRemove: function(map) {
    map.off('zoomend', this._onZoomEnd, this);
    L.LayerGroup.prototype.onRemove.call(this, map);
  },
  clearLayers: function() {
    this.controls._rbush = rbush();
    this.controls._layers = [];
    this.controls._visibleLayers = [];
    // this.controls._cachedIconRects = [];
    L.LayerGroup.prototype.clearLayers.call(this);
  },
  _onZoomEnd: function() {
    for (var i in this.controls._visibleLayers) {
      L.LayerGroup.prototype.removeLayer.call(this, this.controls._visibleLayers[i]);
    }

    this.controls._visibleLayers = [];
    this.controls._rbush = rbush();

    for (var i in this.controls._layers) {
      this.conflictDetect(this.controls._layers[i]);
    }
  },
  _onDragEnd: function() {
    for (var i in this.controls._visibleLayers) {
      L.LayerGroup.prototype.removeLayer.call(this, this.controls._visibleLayers[i]);
    }
    for (var i in this.controls._visibleLayers) {
      var layer = this.controls._visibleLayers[i];
      if (this.isInView(layer.getLatLng())) {
        L.LayerGroup.prototype.addLayer.call(this, layer);
      }
    }
  },
  getIconBox: function(position, layer) {
    /*L.icon and L.Icon.extend
    1. typeof layer.options.icon.options.size == "undefined"
       use iconSize Array
    2. typeof layer.options.icon.options.iconSize == "undefined"
       use size field
    */
    if (typeof layer.options.icon.options.size == "undefined") {
      var radius1 = parseFloat(layer.options.icon.options.iconSize[0]) / 2;
      var radius2 = parseFloat(layer.options.icon.options.iconSize[1]) / 2;

      return [
        position[0] - radius1,
        position[1] - radius2,
        position[0] + radius1,
        position[1] + radius2
      ];

    } else if (typeof layer.options.icon.options.iconSize == "undefined") {
      var radius = parseFloat(layer.options.icon.options.size) / 2;

      return [
        position[0] - radius,
        position[1] - radius,
        position[0] + radius,
        position[1] + radius
      ];
    } else {
      throw new Error("please check layer's icon size field");
      return;
    }
    // return [
    //   position[0] - this.controls._margin,
    //   position[1] - this.controls._margin,
    //   position[0] + this.controls._margin,
    //   position[1] + this.controls._margin
    // ];

  },
  isInView: function(point) {
    if (this._map) {
      var curView = this._map.getBounds();
      var nw = curView.getNorthWest();
      var se = curView.getSouthEast();

      var isLatValid = (point.lat >= se.lat && point.lat <= nw.lat);
      var isLngValid = (point.lng >= nw.lng && point.lng <= se.lng);

      if (isLatValid && isLngValid) {
        return true;
      } else {
        return false;
      }
    }
  },
  conflictDetect: function(layer) {
    var bush = this.controls._rbush;

    var position = this._map.latLngToLayerPoint(layer.getLatLng());
    var iconRect = this.getIconBox([position.x, position.y], layer);
    var conflict = bush.search(iconRect).length > 0;
    // console.log(layer, "conflict is ", conflict);
    if (!conflict) {
      this.controls._visibleLayers.push(layer);
      if (this.isInView(layer.getLatLng())) {
        L.LayerGroup.prototype.addLayer.call(this, layer);
      }
      bush.load([iconRect]);
    }
  }
});

var collision = function(options) {
  return new RunnerCollision(options);
}

module.exports = collision;

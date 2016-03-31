var d3 = require("d3");
var RunnerIcon = L.Icon.extend({
  options: {
    size: null,
    color: "#e6f402",
    className: "leaflet-svg-icon",
  },
  createIcon: function(oldIcon) {
    var div = (oldIcon && (oldIcon.tagName == "DIV")) ? oldIcon : document.createElement("div");
    div.width = this.options.size ? this.options.size : 40;
    div.height = this.options.size ? this.options.size : 40;
    var iconAnc = [parseInt(div.width) / 2, parseInt(div.height) / 2]
    this.options.iconAnchor = iconAnc;
    this._setIconStyles(div, "icon");
    return div;
  },
  createShadow: function(oldIcon) {
    return null;
  },
  _setIconStyles: function(div, type) {
    var d = "M17.109,5.454c-0.242-0.289-0.673-0.327-0.962-0.086l-1.894,1.591l-0.871-2.158  			c-0.031-0.081-0.078-0.149-0.132-0.209c-0.178-0.396-0.487-0.736-0.913-0.933c-0.185-0.084-0.376-0.129-0.567-0.151  			c-0.042-0.022-0.08-0.051-0.128-0.066L8.309,2.513C8.122,2.462,7.934,2.495,7.78,2.585C7.597,2.647,7.44,2.78,7.365,2.973  			L6.11,6.2C5.974,6.551,6.148,6.947,6.5,7.085c0.35,0.136,0.747-0.039,0.884-0.391l1.06-2.725l1.518,0.422  			c-0.037,0.06-0.077,0.116-0.107,0.18L7.909,8.789C7.881,8.851,7.866,8.914,7.846,8.978l-2.365,3.965l-3.958,1.324  			c-0.448,0.335-0.543,0.966-0.212,1.414c0.333,0.449,0.966,0.544,1.413,0.213l4.05-1.395c0.124-0.09,0.214-0.208,0.282-0.335  			C7.107,14.11,7.165,14.067,7.204,14l1.41-2.364l2.503,2.133l-2.678,3.018c-0.369,0.416-0.332,1.057,0.086,1.425  			c0.417,0.371,1.056,0.332,1.427-0.086l3.342-3.765c0.104-0.116,0.166-0.25,0.208-0.39c0.025-0.076,0.025-0.155,0.031-0.234  			c0-0.04,0.015-0.076,0.012-0.113c-0.009-0.276-0.121-0.544-0.347-0.735l-2.303-1.964c0.166-0.158,0.307-0.346,0.409-0.567  			l1.492-3.231L13.274,8.4c0.02,0.113,0.058,0.224,0.138,0.317c0.072,0.086,0.164,0.143,0.262,0.183  			c0.01,0.005,0.022,0.006,0.034,0.009c0.062,0.022,0.125,0.043,0.19,0.046c0.077,0.007,0.155-0.003,0.234-0.025  			c0.002-0.001,0.003-0.001,0.003-0.001c0.021-0.005,0.042-0.001,0.063-0.01c0.111-0.042,0.196-0.113,0.269-0.196l2.718-2.307  			C17.474,6.173,17.352,5.743,17.109,5.454z";

    var color = "fill:" + this.options.color.toString() + ";";
    var svg = d3.select(div).append("svg")
      .attr("width", div.width)
      .attr("height", div.height)
      .attr("viewBox", "0 0 18.467 18.467")
      .append("g")
    var path = svg.append("path")
      .attr("d", d)
      .attr("style", color)
    var circle = svg.append("circle")
      .attr("cx", "13.671")
      .attr("cy", "1.905")
      .attr("r", "1.905")
      .attr("style", color)

    L.Icon.prototype._setIconStyles.apply(this, arguments);
  }
});

var runnerIcon = function(options) {
  return new RunnerIcon(options);
};

module.exports = runnerIcon;

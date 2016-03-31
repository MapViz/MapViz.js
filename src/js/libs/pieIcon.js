var d3 = require("d3");

var PieIcon = L.Icon.extend({
  options: {
    data: null, //Array for pie layout
    size: null,
    color: null,
    className: "leaflet-svg-icon",
  },
  createIcon: function(oldIcon) {
    var div = (oldIcon && (oldIcon.tagName == "DIV")) ? oldIcon : document.createElement("div");
    div.width = this.options.size ? this.options.size : 40;
    div.height = this.options.size ? this.options.size : 40;
    var iconAnc = [parseInt(div.width) / 2, parseInt(div.height) / 2];
    this.options.iconAnchor = iconAnc;
    this._setIconStyles(div, "icon");
    return div;
  },
  createShadow: function(oldIcon) {
    return null;
  },
  _setIconStyles: function(div, type) {
    var outerRadius = this.options.size / 2;
    var innerRadius = 0;
    if (this.options.color) {
      var color = this.options.color;
    } else {
      throw new Error("Please check the color!");
      return;
    };
    var tooltip = d3.select("body")
                    .append("div")
                    .attr("class","tooltip")
                    .style("opacity",0.0);

    var svg = d3.select(div)
      .append("svg")
      .attr("width", div.width)
      .attr("height", div.height);

    var pie = d3.layout.pie()
      .value(function(d) {
        return d.value;
      });
    // var pie = d3.layout.pie()
    var pieData = pie(this.options.data);

    var arc = d3.svg.arc() // generate arc
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);
    var arcs = svg.selectAll("g")
      .data(pieData)
      .enter()
      .append("g")
      .attr("transform", "translate(" + (div.width / 2) + "," + (div.height / 2) + ")");
    arcs.append("path")
      .attr("fill", function(d, i) {
        return color[i];
      })
      .attr("d", function(d) {
        return arc(d);
      })
      .on("mouseover", function(d, i) {
        d3.select(this)
          .transition()
          .duration(1000)
          .ease("circle")
          .attr("transform", function(d) {
            //centroid返回的是弧形的重心与弧心的相对位置
            return "translate(" + arc.centroid(d) + ")";
          });

          //for tooltip
          tooltip.html(" Name: " + d.data.name + "<br />" +
                       " Value: " + d.data.value)
                 .style("left", (d3.event.pageX) + "px")
                 .style("top", (d3.event.pageY + 20) + "px")
                 .style("opacity",1.0)
                 .transition()
                 .duration(4500)
                 .style("opacity",0.0);

      })
      .on("mouseout", function(d, i) {
        d3.select(this)
          .transition()
          .duration(500)
          .attr("transform", function(d) {
            return "translate(" + [0, 0] + ")";
          });

          // tooltip.style("opacity",0.0);
      });
    // .transition()
    // .duration(2000)
    // .ease("linear")
    // .attr("fill", function(d, i) {
    //   // return color(i + 1);
    //   return color[i];
    // });


    // arcs.append("text")
    //   .attr("transform", function(d) {
    //     return "translate(" + arc.centroid(d) + ")";
    //   })
    //   .attr("text-anchor", "middle")
    //   .text(function(d) {
    //     return d.data.name;
    //   });

    L.Icon.prototype._setIconStyles.apply(this, arguments);
  }
});

pieIcon = function(options) {
  return new PieIcon(options);
};

module.exports = pieIcon;

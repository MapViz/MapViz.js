var d3 = require("d3");
// https://www.npmjs.com/package/d3-svg-legend
// when [require('d3-svg-legend')], we attach to d3 as d3.legend
require("d3-svg-legend");

/*
  userOpts:{
  on: "true",
  orientation: "vertical" or "horizontal",

}
*/

var legend = function(orientation, size, domain, cell, color) {
  orientation = orientation ? orientation: "horizontal";
  size = size ? size : 30;

  var linear = d3.scale.linear()
    .domain(domain)
    .range([color[0], color[cell.length - 2]]);
  var legendLinear = d3.legend.color()
    .shapeWidth(size).cells(cell)
    .orient(orientation).scale(linear);

  var coordinates = {
    x: 0,
    y: 0
  }

  var svg = d3.select("body")
    // .insert("div", ":first-child")
    .append("div")
    .attr("class", "mapviz-legend")
    .append("svg")
    .attr("class", "svgBackGroud");
  var legendGroup = svg.append("g")
    .attr("class", "legendLinear")
    .attr("transform", "translate(" + coordinates.x + "," + coordinates.y + ")")
    .call(legendLinear);

  var extentBox = d3.select(".legendLinear").node().getBBox();
  var margin = 10;
  extentBox.height += margin * 2;
  extentBox.width += margin * 2;
  extentBox.x -= margin;
  extentBox.y -= margin;

  var drag = d3.behavior.drag()
    .on("drag", function(d) {
      d.x += d3.event.dx;
      d.y += d3.event.dy;
      // d3.select(this).attr("transform", function(d) {
      //   return "translate(" + d.x + "," + d.y + ")";
      // });
      d3.select(this)
        .style("left", d.x + "px")
        .style("top", d.y + "px")

    })
    .on("dragstart", function() {
      d3.event.sourceEvent.stopPropagation();
    });


  d3.select(".svgBackGroud")
    .attr("height", extentBox.height)
    .attr("width", extentBox.width)
  d3.select(".mapviz-legend")
    .datum(coordinates)
    .attr('x', function(d) {
      return d.x;
    })
    .attr('y', function(d) {
      return d.y;
    })
    .attr("height", extentBox.height)
    .attr("width", extentBox.width)
    .call(drag);

};
module.exports = legend;

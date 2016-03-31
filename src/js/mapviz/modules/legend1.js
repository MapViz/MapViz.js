var d3 = require("d3");
// https://www.npmjs.com/package/d3-svg-legend
// when [require('d3-svg-legend')], we attach to d3 as d3.legend
require("d3-svg-legend");

/*
  userOpts:{
  orientation: "vertical" or "horizontal",

}
*/

var legend = function(orientation, max, min, color) {
  var linear = d3.scale.linear()
    .domain([0, 10])
    .range(["rgb(46, 73, 123)", "rgb(71, 187, 94)"]);

  var coordinates = {
    x: 0,
    y: 0
  };

  var svg = d3.select("svg");

  var mutLegendGroup = svg.append("g")
    .attr("class", "legendLinear")
    .attr("transform", "translate(" + coordinates.x + "," + coordinates.y + ")");


      var legendLinear = d3.legend.color()
        .shapeWidth(30)
        .cells(10)
        .orient('horizontal')
        .scale(linear);
      d3.select(".legendLinear")
        .call(legendLinear);

  var margin = 10;
  var dim = d3.select(".legendLinear").node().getBBox()
  console.log(d3.select(".legendLinear").node().getBBox());
  dim.height += margin * 2;
  dim.width += margin * 2;
  dim.y -= margin;
  dim.x -= margin;

  var drag = d3.behavior.drag()
    .on("drag", function(d) {
      d.x += d3.event.dx;
      d.y += d3.event.dy;
      d3.select(this).attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")";
        })
    })
    .on("dragstart", function() {
      d3.event.sourceEvent.stopPropagation();
    });


  var mutLegendBG = mutLegendGroup
    .append("rect")
    .datum(coordinates)
    .attr('x', function(d) {
      return d.x;
    })
    .attr('y', function(d) {
      return d.y;
    })
    .attr("class", "mutLegendBG")
    .attr("fill", "white")
    .attr("stroke", "black")
    .attr("stroke-width", "1px")
    .attr(dim)
    .call(drag);


};
module.exports = legend;

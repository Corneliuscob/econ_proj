console.log("test");
var margin = {
  top: 50,
  right: 100,
  bottom: 40,
  left: 100
},

padding = {top: 0, right: 0, bottom: 30, left: 50},
width = 920 - margin.left - margin.right,
height = 400 - margin.top - margin.bottom;

var y = d3.scale.linear()
.range([height, 0]);
  
var x = d3.scale.ordinal()
.rangeRoundBands([0, width], .1);


var xAxisScale = d3.scale.linear()
.domain([-1  ,20])
.range([ 0, width]);


var xAxis = d3.svg.axis()
.scale(xAxisScale)
.orient("bottom")
// .tickFormat(d3.format("d"));
.ticks(20);

var yAxis = d3.svg.axis()
.scale(y)
.orient("left");

var svg = d3.select("#chart").append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("./data/cashFLow.csv", type, function(error, data) {
x.domain(data.map(function(d) {
  return d.Year;
}));
y.domain(d3.extent(data, function(d) {
  return d.Celsius;
})).nice();


svg.selectAll(".bar")
  .data(data)
  .enter().append("rect")
  .attr("class", function(d) {

      if (d.Celsius < 0){
          return "bar negative";
      } else {
          return "bar positive";
      }

  })
  .attr("data-yr", function(d){
      return d.Year;
  })
  .attr("data-c", function(d){
      return d.Celsius;
  })
  .attr("title", function(d){
      return (d.Year + ": " + d.Celsius + " °C")
  })
  .attr("y", function(d) {

      if (d.Celsius > 0){
          return y(d.Celsius);
      } else {
          return y(0);
      }

  })
  //rectangle box width
  .attr("width", x.rangeBand())
  // Centers the X axis text 
  .attr("x", function(d) {
    return x(d.Year) + (x.rangeBand() / 2) - (this.getBBox().width / 2);
  })

  
  .attr("height", function(d) {
      return Math.abs(y(d.Celsius) - y(0));
  })
  .on("mouseover", function(d){
      // alert("Year: " + d.Year + ": " + d.Celsius + " Celsius");

      d3.select("#degrree")
          .text("$" + d.Celsius );

      d3.select("#_yr")
      .text("Year: " + d.Year);
  });
// Y axis 


svg.append("g")
  .call(yAxis)
  .attr("class", "y axis")
  .append("text")
  .text("Cash Flow")
  .attr("transform", "translate(15, 10), rotate(-90)")
// X axis
svg.append("g")
  .attr("class", "X axis")
  .attr("transform", "translate(" + (0.2) + "," + height + ")")
  .call(xAxis)
  .selectAll("text")
  .style("text-anchor", "middle")
  .attr("dx", "-.01em")
  // .attr("text-anchor", "middle")
  .attr("dy", ".9em");

  // .attr("transform", "rotate(-90)" );

// svg.append("g")
//   .attr("class", "x axis")
//   .append("line")
//   .attr("y1", y(0))
//   .attr("y2", y(0))
//   .attr("x2", width);

svg.append("g")
  .attr("class", "infowin")
  .attr("transform", "translate(50, 5)")
  .append("text")
  .attr("id", "_yr");

svg.append("g")
  .attr("class", "infowin")
  .attr("transform", "translate(120, 5)")
  .append("text")
  .attr("id","degrree");

});


function type(d) {
d.Celsius = +d.Celsius;
return d;
}
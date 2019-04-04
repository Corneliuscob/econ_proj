var data = [
    {
		"year": "1",
		"pos": "1572444",
		"neg": "-1280605.52"
	},
	{
		"year": "2",
		"pos": "1603892.88",
		"neg": "-1301882.5104000003"
	},
	{
		"year": "3",
		"pos": "1635970.7376000001",
		"neg": "-1326178.9006080001"
	},
	{
		"year": "4",
		"pos": "1668690.1523519999",
		"neg": "-1350961.2186201601"
	},
	{
		"year": "5",
		"pos": "1702063.9553990401",
		"neg": "-1376239.1829925636"
	},
	{
		"year": "6",
		"pos": "1736105.2345070208",
		"neg": "-1402022.7066524145"
	},
	{
		"year": "7",
		"pos": "1770827.3391971611",
		"neg": "-1428321.9007854627"
	},
	{
		"year": "8",
		"pos": "1806243.8859811043",
		"neg": "-1455147.0788011719"
	},
	{
		"year": "9",
		"pos": "1842368.7637007264",
		"neg": "-1482508.7603771952"
	},
	{
		"year": "10",
		"pos": "1879216.1389747411",
		"neg": "-1510417.6755847393"
	},
	{
		"year": "11",
		"pos": "1916800.4617542357",
		"neg": "-1538884.7690964339"
	},
	{
		"year": "12",
		"pos": "1955136.47098932",
		"neg": "-1567921.2044783626"
	},
	{
		"year": "13",
		"pos": "1994239.2004091069",
		"neg": "-1644050.3685679298"
	},
	{
		"year": "14",
		"pos": "2034123.9844172888",
		"neg": "-1674259.8759392886"
	},
	{
		"year": "15",
		"pos": "2074806.4641056345",
		"neg": "-1705073.5734580741"
	},
	{
		"year": "16",
		"pos": "2116302.5933877476",
		"neg": "-1736503.5449272359"
	},
	{
		"year": "17",
		"pos": "2158628.6452555023",
		"neg": "-1768562.1158257807"
	},
	{
		"year": "18",
		"pos": "2201801.2181606125",
		"neg": "-1801261.8581422963"
	},
	{
		"year": "19",
		"pos": "2245837.2425238248",
		"neg": "-1834615.5953051425"
	},
	{
		"year": "20",
		"pos": "2290753.9873743015",
		"neg": "-1868636.407211245"
	},
	{
		"year": ""
	}
];
var data2 = [
	{
		"year": "1",
		"sum": "291838.48"
	},
	{
		"year": "2",
		"sum": "302010.36959999963"
	},
	{
		"year": "3",
		"sum": "309791.836992"
	},
	{
		"year": "4",
		"sum": "317728.93373183976"
	},
	{
		"year": "5",
		"sum": "325824.77240647655"
	},
	{
		"year": "6",
		"sum": "334082.52785460628"
	},
	{
		"year": "7",
		"sum": "342505.43841169844"
	},
	{
		"year": "8",
		"sum": "351096.80717993248"
	},
	{
		"year": "9",
		"sum": "359860.00332353124"
	},
	{
		"year": "10",
		"sum": "345036.55339000182"
	},
	{
		"year": "11",
		"sum": "377915.69265780179"
	},
	{
		"year": "12",
		"sum": "262215.26651095739"
	},
	{
		"year": "13",
		"sum": "350188.83184117707"
	},
	{
		"year": "14",
		"sum": "359864.10847800015"
	},
	{
		"year": "15",
		"sum": "369732.89064756036"
	},
	{
		"year": "16",
		"sum": "379799.04846051172"
	},
	{
		"year": "17",
		"sum": "390066.52942972165"
	},
	{
		"year": "18",
		"sum": "400539.36001831619"
	},
	{
		"year": "19",
		"sum": "411221.64721868234"
	},
	{
		"year": "20",
		"sum": "490617.5801630565"
	},
	{
		"year": ""
	}
];
var margin = {top: 20, right: 20, bottom: 70, left: 80},
width = 900 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;
d3.select("#chart").append("button")
.attr("type","button")
.attr("class","btn btn-outline btn-xl js-scroll-trigger")
.text("Change Layout")
.style("position","relative")
.style("left","5px")
.style("top","5px")
.on("click",redraw)
//series data for barchart
var series = d3.stack()
    .keys(["pos", "neg"])
    .offset(d3.stackOffsetDiverging)
    (data);
 //create svg elemet 
var divElem = d3.select("#chart").append("div").attr("id","classy")
var svg = divElem.append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
//create x axis
var x = d3.scaleBand()
    .domain(data.map(function(d) { return d.year; }))
    .rangeRound([margin.left, width - margin.right])
    .padding(0.1);
//create y axis 
var y = d3.scaleLinear()
    .domain([d3.min(series, stackMin), d3.max(series, stackMax)])
    .rangeRound([height - margin.bottom, margin.top]);
//dont knowthis
var z = d3.scaleOrdinal(d3.schemeSet1);

svg.append("g")
  .selectAll("g")
  .data(series)
  .enter().append("g")
    .attr("fill", function(d) { return z(d.key); })
  .selectAll("rect")
  .data(function(d) { return d; })
  .enter().append("rect")
    .attr("width", x.bandwidth)
    .attr("x", function(d) { return x(d.data.year); })
    .attr("y", function(d) { return y(d[1]); })
    .attr("height", function(d) { return y(d[0]) - y(d[1]); })

svg.append("g")
    .attr("transform", "translate(0," + y(0) + ")")
    .call(d3.axisBottom(x));

svg.append("g")
    .attr("transform", "translate(" + margin.left + ",0)")
    .call(d3.axisLeft(y));



var layout = 0, dur=0

dur = 1500

function stackMin(serie) {
  return d3.min(serie, function(d) { return d[0]; });
}

function stackMax(serie) {
  return d3.max(serie, function(d) { return d[1]; });
}
function redraw() {
    if (layout=!layout) {
       console.log("test");
       //series data for barchart
        var series2 = d3.stack()
        .keys(["sum"])
        .offset(d3.stackOffsetDiverging)
        (data2);
        //remove old svg 
        var divElem = d3.select("#classy").remove("div");
        //create svg elemet 
        var divElem = d3.select("#chart").append("div").attr("id","classy")
        var svg = divElem.append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        //create x axis
        var x = d3.scaleBand()
        .domain(data.map(function(d) { return d.year; }))
        .rangeRound([margin.left, width - margin.right])
        .padding(0.1);
        //create y axis 
        var y = d3.scaleLinear()
        .domain([d3.min(series2, stackMin), d3.max(series2, stackMax)])
        .rangeRound([height - margin.bottom, margin.top]);
        //dont knowthis
        var z = d3.scaleOrdinal(d3.schemeSet1);

        svg.append("g")
        .selectAll("g")
        .data(series2)
        .enter().append("g")
        .attr("fill", function(d) { return z(d.key); })
        .selectAll("rect")
        .data(function(d) { return d; })
        .enter().append("rect")
        .attr("width", x.bandwidth)
        .attr("x", function(d) { return x(d.data.year); })
        .attr("y", function(d) { return y(d[1]); })
        .attr("height", function(d) { return y(d[0]) - y(d[1]); })

        svg.append("g")
        .attr("transform", "translate(0," + y(0) + ")")
        .call(d3.axisBottom(x));

        svg.append("g")
        .attr("transform", "translate(" + margin.left + ",0)")
        .call(d3.axisLeft(y));

        console.log( 0!=0);
    }
    else {
        //remove svg
        var divElem = d3.select("#classy").remove("div");
        //create svg elemet 
        var divElem = d3.select("#chart").append("div").attr("id","classy")
        var svg = divElem.append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        //create x axis
        var x = d3.scaleBand()
        .domain(data.map(function(d) { return d.year; }))
        .rangeRound([margin.left, width - margin.right])
        .padding(0.1);
        //create y axis 
        var y = d3.scaleLinear()
        .domain([d3.min(series, stackMin), d3.max(series, stackMax)])
        .rangeRound([height - margin.bottom, margin.top]);
        //dont knowthis
        var z = d3.scaleOrdinal(d3.schemeSet1);

        svg.append("g")
        .selectAll("g")
        .data(series)
        .enter().append("g")
        .attr("fill", function(d) { return z(d.key); })
        .selectAll("rect")
        .data(function(d) { return d; })
        .enter().append("rect")
        .attr("width", x.bandwidth)
        .attr("x", function(d) { return x(d.data.year); })
        .attr("y", function(d) { return y(d[1]); })
        .attr("height", function(d) { return y(d[0]) - y(d[1]); })

        svg.append("g")
        .attr("transform", "translate(0," + y(0) + ")")
        .call(d3.axisBottom(x));

        svg.append("g")
        .attr("transform", "translate(" + margin.left + ",0)")
        .call(d3.axisLeft(y));
    }

} 

var data = [
    {
		"year": "1",
		"pos": "1572444",
		"neg": "-1280605"
	},
	{
		"year": "2",
		"pos": "1603892",
		"neg": "-1301882"
	},
	{
		"year": "3",
		"pos": "1635970",
		"neg": "-1326178"
	},
	{
		"year": "4",
		"pos": "1668690",
		"neg": "-1350961"
	},
	{
		"year": "5",
		"pos": "1702063",
		"neg": "-1376239"
	},
	{
		"year": "6",
		"pos": "1736105",
		"neg": "-1402022"
	},
	{
		"year": "7",
		"pos": "1770827",
		"neg": "-1428321"
	},
	{
		"year": "8",
		"pos": "1806243",
		"neg": "-1455147"
	},
	{
		"year": "9",
		"pos": "1842368",
		"neg": "-1482508"
	},
	{
		"year": "10",
		"pos": "1879216",
		"neg": "-1534179"
	},
	{
		"year": "11",
		"pos": "1916800",
		"neg": "-1538884"
	},
	{
		"year": "12",
		"pos": "1955136",
		"neg": "-1692921"
	},
	{
		"year": "13",
		"pos": "1994239",
		"neg": "-1644050"
	},
	{
		"year": "14",
		"pos": "2034123",
		"neg": "-1674259"
	},
	{
		"year": "15",
		"pos": "2074806",
		"neg": "-1705073"
	},
	{
		"year": "16",
		"pos": "2116302",
		"neg": "-1736503"
	},
	{
		"year": "17",
		"pos": "2158628",
		"neg": "-1768562"
	},
	{
		"year": "18",
		"pos": "2201801",
		"neg": "-1801261"
	},
	{
		"year": "19",
		"pos": "2245837",
		"neg": "-1834615"
	},
	{
		"year": "20",
		"pos": "2290753",
		"neg": "-1868636"
	},

];
var data2 = [
	{
		"year": "1",
		"sum": "291838"
	},
	{
		"year": "2",
		"sum": "302010"
	},
	{
		"year": "3",
		"sum": "309791"
	},
	{
		"year": "4",
		"sum": "317728"
	},
	{
		"year": "5",
		"sum": "325824"
	},
	{
		"year": "6",
		"sum": "334082"
	},
	{
		"year": "7",
		"sum": "342505"
	},
	{
		"year": "8",
		"sum": "351096"
	},
	{
		"year": "9",
		"sum": "359860"
	},
	{
		"year": "10",
		"sum": "345036"
	},
	{
		"year": "11",
		"sum": "377915"
	},
	{
		"year": "12",
		"sum": "262215"
	},
	{
		"year": "13",
		"sum": "350188"
	},
	{
		"year": "14",
		"sum": "359864"
	},
	{
		"year": "15",
		"sum": "369732"
	},
	{
		"year": "16",
		"sum": "379799"
	},
	{
		"year": "17",
		"sum": "390066"
	},
	{
		"year": "18",
		"sum": "400539"
	},
	{
		"year": "19",
		"sum": "411221"
	},
	{
		"year": "20",
		"sum": "490617"
	},
	{
		"year": ""
	}
];
var margin = {top: 20, right: 20, bottom: 70, left: 80},
width = 900 - margin.left - margin.right,
height = 550 - margin.top - margin.bottom;
d3.select("#chart").append("button")
.attr("type","button")
.attr("class","btn-asset btn-outline btn-xl js-scroll-trigger")
.attr("style","margin-bottom:20px;")
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
	.on("mouseover", function(d){
		// alert("Year: " + d.Year + ": " + d.Celsius + " Celsius");
		d3.select("#_yr")
			.text("Year: " + d.data.year+ ";\n Revenue ($): " + d.data.pos + ";\n Cost ($):" + d.data.neg);
		d3.select("#degrree")
			.text(d.Celsius + "°C");
	});
	

svg.append("g")
    .attr("transform", "translate(0," + y(0) + ")")
    .call(d3.axisBottom(x));

svg.append("g")
    .attr("transform", "translate(" + margin.left + ",0)")
    .call(d3.axisLeft(y))
	.attr("class", "y axis")
svg.append("g")	
	.append("text")
	.text("Costs and Revenues")
	.attr("transform", "translate(" + "12"  + ",15)" )
	.attr("style","margin-top:10px;");
svg.append("g")	
.append("text")
.text("Dollars ($)")
.attr("transform", "translate(" + "12"  + ",225), rotate(-90)" )
.attr("style","margin-top:10px;");
svg.append("g")	
.append("text")
.text("Year")
.attr("transform", "translate(" + "375"  + ",400)" )
.attr("style","margin-top:10px;");
svg.append("g")
.attr("class", "infowin")
.attr("transform", "translate(50, 475)")
.append("text")
.attr("id", "_yr");


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
		.on("mouseover", function(d){
			// alert("Year: " + d.Year + ": " + d.Celsius + " Celsius");
			d3.select("#_yr")
				.text("Year: " + d.data.year+ "; BTCF ($):" + d.data.sum);
			d3.select("#degrree")
				.text(d.Celsius + "°C");
		});

        svg.append("g")
        .attr("transform", "translate(0," + y(0) + ")")
        .call(d3.axisBottom(x));

        svg.append("g")
        .attr("transform", "translate(" + margin.left + ",0)")
        .call(d3.axisLeft(y));
		svg.append("g")	
		.append("text")
		.text("Before Tax Cash Flow")
		.attr("transform", "translate(" + "12"  + ",15)" )
		.attr("style","margin-top:10px;");
		svg.append("g")	
		.append("text")
		.text("Dollars ($)")
		.attr("transform", "translate(" + "12"  + ",225), rotate(-90)" )
		.attr("style","margin-top:10px;");
		svg.append("g")	
		.append("text")
		.text("Year")
		.attr("transform", "translate(" + "375"  + ",425)" )
		.attr("style","margin-top:10px;");
		svg.append("g")
		.attr("class", "infowin")
		.attr("transform", "translate(50, 475)")
		.append("text")
		.attr("id", "_yr");
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
		.on("mouseover", function(d){
			// alert("Year: " + d.Year + ": " + d.Celsius + " Celsius");
			d3.select("#_yr")
				.text("Year: " + d.data.year+ ";\n Revenue ($): " + d.data.pos + ";\n Cost ($):" + d.data.neg);
			d3.select("#degrree")
				.text(d.Celsius + "°C");
		});

        svg.append("g")
        .attr("transform", "translate(0," + y(0) + ")")
        .call(d3.axisBottom(x));

        svg.append("g")
        .attr("transform", "translate(" + margin.left + ",0)")
		.call(d3.axisLeft(y));
		svg.append("g")	
		.append("text")
		.text("Costs and Revenues")
		.attr("transform", "translate(" + "12"  + ",15)" )
		.attr("style","margin-top:10px;");
		svg.append("g")	
		.append("text")
		.text("Dollars ($)")
		.attr("transform", "translate(" + "12"  + ",225), rotate(-90)" )
		.attr("style","margin-top:10px;");
		svg.append("g")	
		.append("text")
		.text("Year")
		.attr("transform", "translate(" + "375"  + ",400)" )
		.attr("style","margin-top:10px;");
		svg.append("g")
		.attr("class", "infowin")
		.attr("transform", "translate(50, 475)")
		.append("text")
		.attr("id", "_yr");		

    }

} 

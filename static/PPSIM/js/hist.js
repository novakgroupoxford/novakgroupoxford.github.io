function setupHist(data, x_data, y_data, x_or_y, draw_type) {
  var margin = 20,
      n_bins = 21;
}

function drawHist(data, x_data, y_data){

  var data = data.filter(global_filter)
  var margin = 20;
  var n_bins = 50;

  var xheight = document.getElementById('xhist').getBoundingClientRect().height - margin,
  xwidth = document.getElementById('xhist').getBoundingClientRect().width - margin;

  var xhist = d3.select(".xhist").append("svg")
    .attr("id", "x_histogram")
    .attr("width", xwidth)
    .attr("height", xheight);

  var xhist_x = d3.scale.linear()
    .domain(d3.extent(data, function (d) {
        return data_map(d,x_data);
    }))
    .range([3 * margin, xwidth-margin]);

  var xhist_hist = d3.layout.histogram()
    .bins(n_bins)(data.map(function(d){return data_map(d,x_data);}));

  var xhist_y = d3.scale.linear()
    .domain([0, d3.max(xhist_hist, function (d) {return d.y;})])
    .range([xheight-margin, margin]);

  xhist.append("g").attr("class", "x axis").attr("transform", "translate(" + 0 + "," + xhist_y.range()[0] + ")");
  var xhist_xAxis = d3.svg.axis().scale(xhist_x).orient("bottom").tickPadding(2);
  var xhist_yAxis = d3.svg.axis().scale(xhist_y).orient("left").tickPadding(2);
  xhist.selectAll("g.x.axis").call(xhist_xAxis);

  var xbrush = d3.svg.brush()
   .x(xhist_x)
   .on("brush", xbrushmove)
   .on("brushend", xbrushend)
   .extent(xhist_x.domain());

  xhist.append("g")
   .attr("class", "brush")
   .attr("transform", "translate(0," +  margin + ")")
   .call(xbrush)
  .selectAll('rect')
   .attr('height', xheight - 2 * margin)

  // brushHandles(xhist);

  function xbrushmove(){
    var x_extent = {
          "x_min" : xbrush.extent()[0],
          "x_max" : xbrush.extent()[1],
        };
    d3.select(".xhist").selectAll("g.bar").classed("selected " + x_data, function(d){
      var is_selected = x_extent.x_min <= d.x && d.x <= x_extent.x_max;
      return is_selected;
    })
  };
  function xbrushend(){
    var margin = 20;

    var height = document.getElementById('scatterdiv').getBoundingClientRect().height - margin,
        width = document.getElementById('scatterdiv').getBoundingClientRect().width - margin;
    x.domain(xbrush.extent());

    var xAxis = d3.svg.axis().scale(x).orient("bottom").tickPadding(2);
    d3.select("#scatterplot").selectAll("g.x.axis")
      .transition()
      .duration(1000)
      .call(xAxis)
      .ease("cubic-in-out");

      // update points
    d3.select("#scatterplot").selectAll("g.node")
      // this is how we set the position of the items. Translate is an incredibly useful function for rotating and positioning items
      .transition()
      .duration(1000)
      .attr('transform', function (d) {
          return "translate(" + x(data_map(d,x_data)) + "," + y(data_map(d,y_data)) + ")";
      })
      .ease("cubic-in-out");

    hideNodes(x_data, y_data);
  };

  var xbarwidth = xwidth / n_bins;

  var xhist_bar = xhist.selectAll(".bar")
    .data(xhist_hist)
  .enter().append("g")
    .attr("class", "bar")
    .attr("transform", function(d) { return "translate(" + xhist_x(d.x) + "," + xhist_y(d.y) + ")"; });

  xhist_bar.append("rect")
      .attr("x", 1)
      .attr("width", xbarwidth)
      .attr("height", function(d) { return xheight - margin - xhist_y(d.y); });

  xhist.append("text")
      .attr("class", "label")
      .attr("font-size", "14pt")
      .attr("font-weight", "700")
      .attr("text-anchor", "middle")
      .attr("x", xwidth * 0.50)
      .attr("y", xheight * 0.50)
      .text(axlabels[x_data])

  xbrushmove();

  var yheight = document.getElementById('yhist').getBoundingClientRect().height - margin,
  ywidth = document.getElementById('yhist').getBoundingClientRect().width - margin;

  var yhist = d3.select(".yhist").append("svg")
    .attr("class", "label")
    .attr("id", "y_histogram")
    .attr("width", ywidth)
    .attr("height", yheight);


  var yhist_y = d3.scale.linear()
      .domain(d3.extent(data, function (d) {
          return data_map(d,y_data);
      }))
      // Note that settings.height goes first due to the weird SVG coordinate system
      .range([yheight-margin, margin]);

  var yhist_hist = d3.layout.histogram()
    .bins(n_bins)(data.map(function(d){return data_map(d,y_data);}));

  var yhist_x = d3.scale.linear()
    .domain([0, d3.max(yhist_hist, function (d) {return d.y;})])
    .range([3 * margin, ywidth-margin]);

  yhist.append("g").attr("class", "y axis").attr("transform", "translate(" + (yhist_x.range()[0]) + ",0)");
  var yhist_yAxis = d3.svg.axis().scale(yhist_y).orient("left").tickPadding(2);
  yhist.selectAll("g.y.axis").call(yhist_yAxis);

  var ybrush = d3.svg.brush()
   .y(yhist_y)
   .on("brush", ybrushmove)
   .on("brushend", ybrushend)
   .extent(yhist_y.domain());

  yhist.append("g")
   .attr("class", "brush")
   .attr("transform", "translate(" + (yhist_x.range()[0]) + ",0)")
   .call(ybrush)
  .selectAll('rect')
    .attr('width', ywidth - 4 * margin);

    function ybrushmove(){
      var y_extent = {
            "y_min" : ybrush.extent()[0],
            "y_max" : ybrush.extent()[1],
          };
      d3.select(".yhist").selectAll("g.bar").classed("selected " + y_data, function(d){
        var is_selected = y_extent.y_min <= d.x && d.x <= y_extent.y_max;
        return is_selected;
      })
    };

    function ybrushend(){
      var margin = 20;

      var height = document.getElementById('scatterdiv').getBoundingClientRect().height - margin,
          width = document.getElementById('scatterdiv').getBoundingClientRect().width - margin;
      y.domain(ybrush.extent());

      var yAxis = d3.svg.axis().scale(y).orient("left").tickPadding(2);
      d3.select("#scatterplot").selectAll("g.y.axis")
        .transition()
        .duration(1000)
        .call(yAxis)
        .ease("cubic-in-out");

        // update points
      d3.select("#scatterplot").selectAll("g.node")
        // this is how we set the position of the items. Translate is an incredibly useful function for rotating and positioning items
        .transition()
        .duration(1000)
        .attr('transform', function (d) {
            return "translate(" + x(data_map(d,x_data)) + "," + y(data_map(d,y_data)) + ")";
        })
        .ease("cubic-in-out");

    hideNodes(x_data, y_data);
    };


  var ybarheight = yheight / n_bins;

  var yhist_bar = yhist.selectAll("bar")
    .data(yhist_hist)
  .enter().append("g")
    .attr("class", "bar")
    .attr("transform", function(d) { return "translate(" + 3 * margin + "," + (yhist_y(d.x) - ybarheight)   + ")"; });

  yhist_bar.append("rect")
      .attr("x", 1)
      .attr("width", function(d) { return yhist_x(d.y) - 3 * margin; })
      .attr("height", ybarheight);

  yhist.append("g")
    .attr("class", "labelbox")
    .attr("transform", "translate("  + 0.60 * ywidth +  "," +  yheight * 0.50 + ")")
  .append("text")
    .attr("class", "label")
    .attr("text-anchor", "middle")
    .attr("font-size", "14pt")
    .attr("font-weight", "700")
    // .attr("x", yheigth * 0.5)
    // .attr("y", ywidth * 0.50)
    .text(axlabels[y_data])
    .attr("transform", "rotate(-90)")

  ybrushmove();

}

function updateHist(data, x_data, y_data){

  var data = data.filter(global_filter);

  var margin = 20;
  var n_bins = 21;


  var xheight = document.getElementById('xhist').getBoundingClientRect().height - margin,
  xwidth = document.getElementById('xhist').getBoundingClientRect().width - margin;

  var xhist = d3.selectAll("#x_histogram");

  var xhist_x = d3.scale.linear()
    .domain(d3.extent(data, function (d) {
        return data_map(d,x_data);
    }))
    .range([3 * margin, xwidth-margin]);

  var xhist_hist = d3.layout.histogram()
    .bins(n_bins)(data.map(function(d){return data_map(d,x_data);}));

  var xhist_y = d3.scale.linear()
    .domain([0, d3.max(xhist_hist, function (d) {return d.y;})])
    .range([xheight-margin, margin]);

  var xhist_xAxis = d3.svg.axis().scale(xhist_x).orient("bottom").tickPadding(2);

  var xbrush = d3.svg.brush()
   .x(xhist_x)
   .on("brush", xbrushmove)
   .on("brushend", xbrushend)
   .extent(xhist_x.domain());

  xhist.selectAll("g.brush").call(xbrush);
  xhist.selectAll("g.bar.selected").attr("class", "bar");

  function xbrushmove(){
    var x_extent = {
          "x_min" : xbrush.extent()[0],
          "x_max" : xbrush.extent()[1],
        };
    d3.select(".xhist").selectAll("g.bar").classed("selected " + x_data, function(d){
      var is_selected = x_extent.x_min <= d.x && d.x <= x_extent.x_max;
      return is_selected;
    })
  };
  function xbrushend(){
    var margin = 20;

    var height = document.getElementById('scatterdiv').getBoundingClientRect().height - margin,
        width = document.getElementById('scatterdiv').getBoundingClientRect().width - margin;
    x.domain(xbrush.extent());

    var xAxis = d3.svg.axis().scale(x).orient("bottom").tickPadding(2);
    d3.select("#scatterplot").selectAll("g.x.axis")
      .transition()
      .duration(1000)
      .call(xAxis)
      .ease("cubic-in-out");

      // update points
    d3.select("#scatterplot").selectAll("g.node")
      // this is how we set the position of the items. Translate is an incredibly useful function for rotating and positioning items
      .transition()
      .duration(1000)
      .attr('transform', function (d) {
          return "translate(" + x(data_map(d,x_data)) + "," + y(data_map(d,y_data)) + ")";
      })
      .ease("cubic-in-out");

    hideNodes(x_data, y_data);
  };

  xhist.selectAll("g.bar")
    .data(xhist_hist)
    .transition()
    .duration(1000)
    .attr("transform", function(d) { return "translate(" + xhist_x(d.x) + "," + xhist_y(d.y) + ")"; })
    .ease("cubic-in-out");

  xhist.selectAll("g.x.axis")
    .transition()
    .duration(1000)
    .call(xhist_xAxis)
    .ease("cubic-in-out");

  xhist.selectAll("g.bar").select("rect")
    .transition()
    .duration(1000)
    .attr("height", function(d) { return xheight - margin - xhist_y(d.y); })
    .ease("cubic-in-out");

  xhist.selectAll("text.label")
    .transition()
    .duration(1000)
    .text(x_data)
    .ease("cubic-in-out")

  xbrushmove();

  var margin = 20;

  var yheight = document.getElementById('yhist').getBoundingClientRect().height - margin,
  ywidth = document.getElementById('yhist').getBoundingClientRect().width - margin;

  var yhist = d3.selectAll("#y_histogram");

  var yhist_y = d3.scale.linear()
      .domain(d3.extent(data, function (d) {
          return data_map(d,y_data);
      }))
      // Note that settings.height goes first due to the weird SVG coordinate system
      .range([yheight-margin, margin]);

  var ybarheight = yheight / n_bins;

  var yhist_hist = d3.layout.histogram()
    .bins(n_bins)(data.map(function(d){return data_map(d,y_data);}));

  var yhist_x = d3.scale.linear()
    .domain([0, d3.max(yhist_hist, function (d) {return d.y;})])
    .range([3 * margin, ywidth-margin]);

  var yhist_yAxis = d3.svg.axis().scale(yhist_y).orient("left").tickPadding(2);

  var ybrush = d3.svg.brush()
   .y(yhist_y)
   .on("brush", ybrushmove)
   .on("brushend", ybrushend)
   .extent(yhist_y.domain());

  yhist.selectAll("g.brush").call(ybrush);
  yhist.selectAll("g.bar.selected").attr("class", "bar");

  function ybrushmove(){
    var y_extent = {
          "y_min" : ybrush.extent()[0],
          "y_max" : ybrush.extent()[1],
        };
    d3.select(".yhist").selectAll("g.bar").classed("selected " + y_data, function(d){
      var is_selected = y_extent.y_min <= d.x && d.x <= y_extent.y_max;
      return is_selected;
    })
  };

  function ybrushend(){
    var margin = 20;

    var height = document.getElementById('scatterdiv').getBoundingClientRect().height - margin,
        width = document.getElementById('scatterdiv').getBoundingClientRect().width - margin;
    y.domain(ybrush.extent());

    var yAxis = d3.svg.axis().scale(y).orient("left").tickPadding(2);
    d3.select("#scatterplot").selectAll("g.y.axis")
      .transition()
      .duration(1000)
      .call(yAxis)
      .ease("cubic-in-out");

      // update points
    d3.select("#scatterplot").selectAll("g.node")
      // this is how we set the position of the items. Translate is an incredibly useful function for rotating and positioning items
      .transition()
      .duration(1000)
      .attr('transform', function (d) {
          return "translate(" + x(data_map(d,x_data)) + "," + y(data_map(d,y_data)) + ")";
      })
      .ease("cubic-in-out");

    hideNodes(x_data, y_data);
  };

  yhist.selectAll("g.bar")
    .data(yhist_hist)
    .transition()
    .duration(1000)
    .attr("transform", function(d) { return "translate(" + 3 * margin + "," + (yhist_y(d.x) - ybarheight) + ")"; })
    .ease("cubic-in-out");

  yhist.selectAll("g.y.axis")
    .transition()
    .duration(1000)
    .call(yhist_yAxis)
    .ease("cubic-in-out");

  yhist.selectAll("g.bar").select("rect")
    .transition()
    .duration(1000)
    .attr("width", function(d) { return yhist_x(d.y) - 3 * margin; })
    .ease("cubic-in-out");

  yhist.selectAll("text.label")
    .transition()
    .duration(1000)
    .text(y_data)
    .ease("cubic-in-out")

  ybrushmove();
  hideNodes(x_data, y_data)
}

function hideNodes(x_data, y_data){
  d3.selectAll("g.node").attr("class", function(d){
    var x_smaller = x.domain()[0] > data_map(d,x_data);
    var x_larger =  data_map(d,x_data) > x.domain()[1];
    var y_smaller = y.domain()[0] > data_map(d,y_data);
    var y_larger =  data_map(d,y_data) > y.domain()[1];
    if(x_smaller || x_larger || y_smaller || y_larger){
      return "node hidden";
    } else{
      return "node";
    }
  })
}

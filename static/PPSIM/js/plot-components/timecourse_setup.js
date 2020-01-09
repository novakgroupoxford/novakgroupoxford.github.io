function setup_scatter(svg, d, set){

  var scatter = svg.append("g")
      .attr("id", "scatter")
      .attr("transform", "translate(" + set.margins.left +  "," + set.margins.top + ")");

  var x = set.axes.x;
  var y = set.axes.y;

  scatter.append("g").attr("class", "x axis").attr("transform", "translate(0," + y.range()[0] + ")");
  scatter.append("g").attr("class", "y axis");

  scatter.append("text")
    .attr("fill", "#000")
    .attr("text-anchor", "end")
    .attr("x", set.width / 2)
    .attr("y", set.plot_h + 10)
    .attr("stroke", "1px")
    .attr("font-size", ".6em")
    .attr("font-family", set.fonts.variable)
    .text("time (min)");

  var xAxis = d3.svg.axis().scale(x).orient("bottom").tickPadding(2);
  var yAxis = d3.svg.axis().scale(y).orient("left").tickPadding(2);

  // this is where we select the axis we created a few lines earlier. See how we select the axis item. in our svg we appended a g element with a x/y and axis class. To pull that back up, we do this svg select, then 'call' the appropriate axis object for rendering.
  scatter.selectAll("g.y.axis").call(yAxis);
  scatter.selectAll("g.x.axis").call(xAxis);

  scatter.selectAll(".axis")
    .attr("fill", "none")
    .attr("stroke", "#000")
    .attr("stroke-width", "1px");

  scatter.selectAll(".tick")
    .attr("fill", "#000");

  scatter.selectAll(".tick").selectAll("text")
    .attr("stroke", "none")
    .attr("font-size", ".6em")
    .attr("font-family", set.fonts.variable);

  scatter.selectAll("scatter_plot")
    .data(d)
  .enter()
    .append("g")
    .attr("class", "empty")
    .filter(function(d){ return set.filter(d); })
    .attr("class","scatter_plot")
    .attr("id", function(d){ return d.name; });

  scatter.selectAll("g.empty").remove();
}

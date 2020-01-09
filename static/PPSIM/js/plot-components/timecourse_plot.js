

function plot_timecourse_scatter(svg, condition, set){

  svg.selectAll("g.scatter_plot")
    .append("g")
    .attr("id", function(d,i){return "scatter_plot_" + condition + "_" + d.id ;})
    .attr("class", "scatter_plot_" + condition)
    .selectAll(".timepoints_scatter_" + condition)
    .data(function(d) {
      o = [];
      for(var i=0; i < d[condition + "_data_rn"].length; i++){
        o.push({y : d[condition + "_data_rn"][i], err : d[condition + "_err_rn"][i]});
      }
      // console.log(o);
      return o;
    })
  .enter().append("g")
    .attr("class", "tpt")
    .attr("transform", function(d,i){ return "translate(" + set.axes.x(set.tpts[i]) + "," + set.axes.y(isNaN(d.y) ? 0 : d.y) +")"; })
    .append("g")
    .attr("transform", "rotate(45)")
    .append("path")
    .attr("d", d3.svg.symbol().size(10).type("cross"))
    .style("fill", function(d,i) { return isNaN(d.y) ? "rgba(255, 255, 255, 0)": set.colors[condition]; });

  svg.selectAll(".scatter_plot_" + condition).selectAll("g.tpt")
    .append("g")
    .attr("class", "errorbar")
    .append("svg:line")
    .attr("x1", function(d,i){ return 0; })
    .attr("x2", function(d,i){ return 0; })
    .attr("y1", function(d,i){ return set.axes.y_err(isNaN(d.err)?0:d.err); })
    .attr("y2", function(d,i){ return set.axes.y_err(isNaN(d.err)?0:-d.err); })
    .attr("stroke-width", 1)
    .attr("stroke",  function(d,i) { return isNaN(d.err) ? "rgba(255, 255, 255, 0)": set.colors[condition]; });

  svg.selectAll(".scatter_plot_" + condition).selectAll("g.tpt").selectAll("g.errorbar")
    .append("svg:line")
    .attr("x1", function(d,i){ return set.axes.x_err(-1); })
    .attr("x2", function(d,i){ return set.axes.x_err(1); })
    .attr("y1", function(d,i){ return set.axes.y_err(isNaN(d.err)?0:d.err); })
    .attr("y2", function(d,i){ return set.axes.y_err(isNaN(d.err)?0:d.err); })
    .attr("stroke-width", 1)
    .attr("stroke",  function(d,i) { return isNaN(d.err) ? "rgba(255, 255, 255, 0)": set.colors[condition]; });

  svg.selectAll(".scatter_plot_" + condition).selectAll("g.tpt").selectAll("g.errorbar")
    .append("svg:line")
    .attr("x1", function(d,i){ return set.axes.x_err(-1); })
    .attr("x2", function(d,i){ return set.axes.x_err(1); })
    .attr("y1", function(d,i){ return set.axes.y_err(isNaN(d.err)?0:-d.err); })
    .attr("y2", function(d,i){ return set.axes.y_err(isNaN(d.err)?0:-d.err); })
    .attr("stroke-width", 1)
    .attr("stroke",  function(d,i) { return isNaN(d.err) ? "rgba(255, 255, 255, 0)": set.colors[condition]; });

}


function plot_timecourse_line(svg, condition, set){
  var id = condition + "_sim";

  var simline = d3.svg.line()
      // .y(function(d){ return d[condition + "_sim"].map(function(x){ return yAxis(x); }) ; })
      .x(function(d,i){ return set.axes.x(set.sim_tpts[i]); })
      .y(function(d,i){ return set.axes.y(isNaN(d)?0:d); })
      // .y(function(d){ console.log( map_ax(d.id, yAxis));return map_ax(d.id, yAxis); })
      .interpolate("basis");

  svg.selectAll("g.scatter_plot")
    .append("path")
    .attr("id", function(d,i){return "line_plot_" + condition + "_" + d.id ;})
    .attr("d", function(d){ return simline(d[condition + "_sim_rn"]); })
    .attr("fill", "none")
    .attr("stroke-width", 1)
    .attr("stroke", function(d,i) {return set.colors[condition]; });

}

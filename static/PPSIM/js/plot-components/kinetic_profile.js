function make_kinetic_profile_generic(svg, d, condition, source, set){
  var id = "timecourse_" + condition + "_" + source;

  return svg.selectAll("g.peptidegroup")
            .append("g")
            .attr("id", function(d,i){return id + "_" + d.name + "_" + "p" + d.phosphosite + d.position ;})
            .attr("transform", "translate(" + set.pos.kinetic_profile.x[source] + "," + set.pos.kinetic_profile.y[condition] + ")")
            .selectAll(".timepoints_" + condition)
              .data(function(d,i) { return d[condition + "_" + source]; })
            .enter().append("circle")
              .attr("cx", function(d, i) { return i * set.pos.kinetic_profile.cx; })
              .attr("cy", function(d, i) { return 0; })
              .attr("r", function(d, i) {
                if (isNaN(d)){
                  return Math.sqrt(0.00001) * set.pos.kinetic_profile.rscale;
                }
                else {
                  return Math.sqrt(d) * set.pos.kinetic_profile.rscale;
                }})
              .attr("fill", set.colors[condition]);
}

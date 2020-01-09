function make_abundance_box_labels(svg, set){
  return svg.selectAll("g.peptidegroup")
        .append("g")
        .attr("class", "cmbox_labels")
        .attr("id", function(d,i){return "cmboxLabels_" + d.name + "_" + "p" + d.phosphosite + d.position ;})
        .attr("transform", "translate(" + set.pos.cmbox.text.x + "," + set.pos.cmbox.text.y + ")")
        .selectAll(".abundance")
          .data(function(d,i) { return d.cms; })
        .enter().append("text")
          .attr("x", set.pos.cmbox.bar.xi)
          .attr("y", function(d, i) { return set.pos.cmbox.text.yi(d,i); })
          .text(function(d,i) { return d.toPrecision(3); })
          .attr("font-family", set.fonts.variable)
          .attr("font-weight", "400")
          .attr("font-size", "6pt")
          .attr("fill", function(d, i){ return set.colors.cmbox(d,i); });
}

function make_cm_box(svg, set){
  return svg.selectAll("g.peptidegroup")
        .append("g")
        .attr("class", "cmbox")
        .attr("id", function(d,i){return "cmbox_" + d.name + "_" + "p" + d.phosphosite + d.position ;})
        .attr("transform", "translate(" + set.pos.cmbox.bar.x + "," + set.pos.cmbox.bar.y + ")")
        .selectAll(".cms")
          .data(function(d,i) { return d.cms; })
        .enter().append("rect")
          .attr("x", set.pos.cmbox.bar.xi)
          .attr("y", function(d, i) { return set.pos.cmbox.bar.yi(d,i); })
          .attr("height",7.5)
          .attr("width", function(d, i) {return d * set.pos.cmbox.bar.wscale; })
          .attr("fill", function(d, i){ return set.colors.cmbox(d,i); });
}

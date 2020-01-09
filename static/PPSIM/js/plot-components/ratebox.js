function make_rate_box_labels(svg, set){
  return svg.selectAll("g.peptidegroup")
        .append("g")
        .attr("class", "ratebox_labels")
        .attr("id", function(d,i){return "rateboxLabels_" + d.name + "_" + "p" + d.phosphosite + d.position ;})
        .attr("transform", "translate(" + set.pos.ratebox.text.x + "," + set.pos.ratebox.text.y + ")")
        .selectAll(".rates")
          .data(function(d,i) { return d.rates; })
        .enter().append("text")
          .attr("x", set.pos.ratebox.text.xi)
          .attr("y", function(d, i) { return i * set.pos.ratebox.text.yi +1; })
          .text(function(d,i) { return d; })
          .attr("font-family", set.fonts.variable)
          .attr("font-weight", "400")
          .attr("font-size", "6pt")
          .attr("fill", function(d, i){ return set.colors.ratebox(d,i); });
}

function make_rate_box(svg, set){
  return svg.selectAll("g.peptidegroup")
        .append("g")
        .attr("class", "ratebox_labels")
        .attr("id", function(d,i){return "rateboxLabels_" + d.name + "_" + "p" + d.phosphosite + d.position ;})
        .attr("transform", "translate(" + set.pos.ratebox.bar.x + "," + set.pos.ratebox.bar.y + ")")
        .selectAll(".rates")
          .data(function(d,i) { return d.rates; })
        .enter().append("rect")
          .attr("x", set.pos.ratebox.bar.xi)
          .attr("y", function(d, i) { return i * set.pos.ratebox.bar.yi -5; })
          .attr("height", set.pos.ratebox.bar.yi)
          .attr("width", function(d, i) {
              return d * set.pos.ratebox.bar.wscale; })
          .attr("fill", function(d, i){ return set.colors.ratebox(d,i); });
}

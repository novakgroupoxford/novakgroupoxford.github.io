function write_sequence(svg, set){
  return svg.selectAll("g.peptidegroup")
        .append("g")
        .attr("class", "sequence")
        .attr("id", function(d,i){return "sequence_" + d.name + "_" + "p" + d.phosphosite + d.position ;})
        .attr("transform", "translate(" + set.pos.sequence.x + "," + set.pos.sequence.y + ")")
      .selectAll(".aminoacids")
        .data(function(d,i) { return d.sequence.split(""); })
      .enter().append("text")
        .attr("x", function(d, i) {
          return i * set.pos.sequence.w; })
        .attr("y", function(d, i) { return 0; })
        .attr("font-family", set.fonts.mono)
        .attr("font-size", set.fonts.sequence_size)
        .attr("font-weight", function(d,i) { return get_weight(d,i); })
        .attr("fill", function(d,i) { return get_color(d,i); })
        .text(function(d) { return d; });
}

function sequence_score(svg, lookup, key, set){
  return svg.selectAll("g.peptidegroup")
        .append("g")
        .attr("class", "sequence_score")
        .attr("id", function(d,i){return "sequenceScore_" + d.name + "_" + "p" + d.phosphosite + d.position ;})
        .attr("transform", "translate(" + set.pos.sequence_score.x + "," + set.pos.sequence_score.y + ")")
      .selectAll(".aminoacids_score")
        .data(function(d,i) { return d.sequence.split(""); })
      .enter().append("rect")
        .attr("x", function(d, i) {
          return i * set.pos.sequence_score.w; })
        .attr("y", function(d, i) { return 0; })
        .attr("width", set.pos.sequence_score.w)
        .attr("height", set.pos.sequence_score.h)
        .attr("fill", function(d,i) { return color[key](lookup[key][d][i]); });
}

function sequence_pI(svg, set){
  return svg.selectAll("g.peptidegroup")
        .append("g")
        .attr("class", "sequence_pI")
        .attr("id", function(d,i){return "sequencePI_" + d.name + "_" + "p" + d.phosphosite + d.position ;})
        .attr("transform", "translate(" + set.pos.sequence_pI.x + "," + set.pos.sequence_pI.y + ")")
      .selectAll(".aminoacids_pi")
        .data(function(d,i) { return d.pI; })
      .enter().append("rect")
        .attr("x", function(d, i) {
          return i * set.pos.sequence_pI.w; })
        .attr("y", function(d, i) { return 0; })
        .attr("width", set.pos.sequence_pI.w)
        .attr("height", set.pos.sequence_pI.h)
        .attr("fill", function(d,i) { return color.pI(d); });
}

function make_sequence(svg, key, set){
  write_sequence(svg, set);
  sequence_score(svg, lookup, key, set);
  sequence_pI(svg, set);
}

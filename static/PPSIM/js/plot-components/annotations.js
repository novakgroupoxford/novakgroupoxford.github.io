function write_gene_names(svg, set){
  return svg.selectAll("g.peptidegroup")
        .append("text")
        .attr("id", function(d,i){return "gene_name_" + d.name + "_" + "p" + d.phosphosite + d.position ;})
        .attr("x", set.pos.name.x)
        .attr("y", set.pos.name.y)
        .attr("font-family", set.fonts.variable)
        .attr("font-weight", "700")
        .attr("font-size", "10pt")
        .text(function(d) { return d.name; });
}

function write_phospho_site(svg, set){
  return svg.selectAll("g.peptidegroup")
        .append("text")
        .attr("id", function(d,i){return "phosphosite_" + d.name + "_" + "p" + d.phosphosite + d.position ;})
        .attr("x", set.pos.site.x)
        .attr("y", set.pos.site.y)
        .attr("font-family", set.fonts.variable)
        .attr("font-weight", "400")
        .attr("font-size", "10pt")
        .text(function(d) { return "p" + d.phosphosite + d.position; });
}

function write_fraction(svg, set){
  return svg.selectAll("g.peptidegroup")
        .append("text")
        .attr("id", function(d,i){return "fraction_" + d.name + "_" + "p" + d.phosphosite + d.position ;})
        .attr("x", set.pos.fraction.x)
        .attr("y", set.pos.fraction.y)
        .attr("font-family", set.fonts.variable)
        .attr("font-weight", "200")
        .attr("font-size", "6pt")
        .text(function(d) {
          if (d.fraction == "S"){return "supernatant";}
          else{return "pellet";}
        });
}

function write_goterm(svg, set){
  return svg.selectAll("g.peptidegroup")
        .append("g")
        .attr("id", function(d,i){return "goterms_" + d.name + "_" + "p" + d.phosphosite + d.position ;})
        .attr("transform", "translate(" + set.pos.goterm.g.x + "," + set.pos.goterm.g.y + ")")
        .selectAll(".goterms")
          .data(function(d,i) { return d.goterms; })
        .enter().append("text")
          .attr("x", set.pos.goterm.item.x)
          .attr("y", set.pos.goterm.item.y)
          .text(function(d,i) { return d; })
          .attr("font-family", set.fonts.variable)
          .attr("font-weight", "400")
          .attr("font-size", "6pt")
          .attr("fill", "#696969");
}

function write_legend(svg, set){
  svg.selectAll("g.peptidegroup")
    .append("text")
    .attr("x", set.pos.cmbox.text.x)
    .attr("y", set.pos.cmbox.text.y - 10)
    .text("Relative abundance")
    .attr("font-family", set.fonts.variable)
    .attr("font-weight", "700")
    .attr("font-size", "6pt")
    .attr("fill", "#696969");

  svg.selectAll("g.peptidegroup")
    .append("text")
    .attr("x", set.pos.cmbox.text.x)
    .attr("y", set.pos.kinetic_profile.y.b55 - 10)
    .text("Kinetic profile")
    .attr("font-family", set.fonts.variable)
    .attr("font-weight", "700")
    .attr("font-size", "6pt")
    .attr("fill", "#696969");

  svg.selectAll("g.peptidegroup")
    .append("text")
    .attr("x", set.pos.ratebox.text.x)
    .attr("y", set.pos.ratebox.text.y - 10)
    .text("Fitting parameters")
    .attr("font-family", set.fonts.variable)
    .attr("font-weight", "700")
    .attr("font-size", "6pt")
    .attr("fill", "#696969");

  svg.selectAll("g.peptidegroup")
    .append("text")
    .attr("x", set.pos.sequence_score.x -30)
    .attr("y", set.pos.sequence_score.y +4)
    .text("f-score")
    .attr("font-family", set.fonts.variable)
    .attr("font-weight", "700")
    .attr("font-size", "6pt")
    .attr("fill", "#696969");

  svg.selectAll("g.peptidegroup")
    .append("text")
    .attr("x", set.pos.sequence_pI.x -10)
    .attr("y", set.pos.sequence_pI.y +5)
    .text("pI")
    .attr("font-family", set.fonts.variable)
    .attr("font-weight", "700")
    .attr("font-size", "6pt")
    .attr("fill", "#696969");
}

function write_legend_ensa(svg, set){
  svg.selectAll("g.peptidegroup")
    .append("text")
    .attr("x", set.pos.cmbox.text.x)
    .attr("y", set.pos.cmbox.text.y - 10)
    .text("Relative abundance")
    .attr("font-family", set.fonts.variable)
    .attr("font-weight", "700")
    .attr("font-size", "6pt")
    .attr("fill", "#696969");

  svg.selectAll("g.peptidegroup")
    .append("text")
    .attr("x", set.pos.cmbox.text.x)
    .attr("y", set.pos.kinetic_profile.y.b55 - 10)
    .text("Kinetic profile")
    .attr("font-family", set.fonts.variable)
    .attr("font-weight", "700")
    .attr("font-size", "6pt")
    .attr("fill", "#696969");
}

function make_annotations(svg, set){
  write_gene_names(svg, set);
  write_phospho_site(svg, set);
  write_fraction(svg, set);
  // write_goterm(svg);
}

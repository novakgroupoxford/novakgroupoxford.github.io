function compose(name){
  var d = d3.select("g.node#node__"+name).data();

  // break if selection is undefined
  if(d[0] == undefined){
    return console.log(name + " is not a valid Peptide_ID");
  } else {
    console.log(name);
  }

  // set filter to name
  set.filter = function(d){ return d.id == name; };

  // remove all existing divs with an id = name
  d3.selectAll(".cardprofile_" + name).remove();

  d3.select("div.cards").insert("div", ":first-child").attr("class", "plot_container card cardprofile cardprofile_" + name).attr("id", "card__" + name)
      .append("div")
      .attr("class", "card_header")
      .append("div")
      .attr("class", "button")
      .append("a")
      .attr("title", "download svg")
      .attr("href", "#")
      .attr("id","timecourseplot_" + "download_button_" + name)
      .attr("class","download_button")
      .attr("download", name + ".svg")
      .append("i")
      .attr("class", "fa fa-cloud-download");

  d3.select("div.profiles").insert("div", ":first-child").attr("class", "profile_container profile cardprofile cardprofile_" + name).attr("id", "profile__" + name)
      .append("div")
      .attr("class", "profile_header")
      .append("div")
      .attr("class", "button")
      .append("a")
      .attr("title", "download svg")
      .attr("href", "#")
      .attr("id","profileplot_" + "download_button_" + name)
      .attr("class","download_button")
      .attr("download", name + ".svg")
      .append("i")
      .attr("class", "fa fa-cloud-download");

  // create a destroy button
  d3.select("div.plot_container#card__" + name).select("div.card_header")
      .append("div")
      .attr("class", "button")
      .append("i")
      .attr("title", "close card")
      .attr("id", "remove__" + name)
      .attr("class", "remove_button fa fa-times");

  d3.select("div.profile_container#profile__" + name).select("div.profile_header")
      .append("div")
      .attr("class", "button")
      .append("i")
      .attr("title", "close profile")
      .attr("id", "remove__" + name)
      .attr("class", "remove_button fa fa-times");

  d3.selectAll('.remove_button').on('click',function(){
   //Remove the currently clicked element from the selection.
   var name = d3.select(this).attr("id").split("__")[1];
   d3.selectAll("div.cardprofile_" + name).remove();
   d3.selectAll("#node__" + name).select("circle")
     .attr("fill", '#696969')
     .attr("r", 8)
     .transition()
     .duration(1000)
     .attr("r", 4)
     .ease("elastic");
  });

  // create a button that links to pubmed
  d3.select("div.plot_container#card__" + name).select("div.card_header")
    .append("div")
    .attr("class", "button")
    .append("a")
    .attr("title", "look-up on pubmed")
    .attr("target", "_blank")
    .attr("href", "https://www.ncbi.nlm.nih.gov/gene/?term=" + name.split("_")[0] + "[sym]")
    .attr("id","lookup_button_" + name)
    .attr("class","lookup_button")
    .append("i")
    .attr("class", "lookup_button fa fa-question");

  d3.select("div.profile_container#profile__" + name).select("div.profile_header")
    .append("div")
    .attr("class", "button")
    .append("a")
    .attr("title", "look-up on pubmed")
    .attr("target", "_blank")
    .attr("href", "https://www.ncbi.nlm.nih.gov/gene/?term=" + name.split("_")[0] + "[sym]")
    .attr("id","lookup_button_" + name)
    .attr("class","lookup_button")
    .append("i")
    .attr("class", "lookup_button fa fa-question");

  var card_svg = d3.select("div#card__" + name)
    .append("svg")
    .attr("id", "timecourseplot_" + name)
    .attr("width", set.width + set.margins.left + set.margins.right)
    .attr("height", set.height + set.margins.top + set.margins.bottom)
  .append("g")
    .attr("transform", "translate(" + set.margins.left + "," + set.margins.top + ")");

  setup_scatter(card_svg, d, set);
  plot_timecourse_line(card_svg, "b55", set);
  plot_timecourse_line(card_svg, "ctrl", set);
  plot_timecourse_line(card_svg, "gwl", set);
  plot_timecourse_scatter(card_svg, "b55", set);
  plot_timecourse_scatter(card_svg, "ctrl", set);
  plot_timecourse_scatter(card_svg, "gwl", set);
  bind_data(card_svg, d);
  make_annotations(card_svg, set);
  make_sequence(card_svg, "f", set);
  make_kinetic_profile_generic(card_svg, d, "b55", "sim_red", set);
  make_kinetic_profile_generic(card_svg, d, "ctrl", "sim_red", set);
  make_kinetic_profile_generic(card_svg, d, "gwl", "sim_red", set);
  make_rate_box_labels(card_svg, set);
  make_rate_box(card_svg, set);
  make_abundance_box_labels(card_svg, set);
  make_cm_box(card_svg, set);
  write_legend(card_svg, set);
  make_downloadable("timecourseplot_", name);


  var profile_svg = d3.select("div#profile__" + name)
    .append("svg")
    .attr("id", "profileplot_" + name)
    .attr("width", set_profile.width + set_profile.margins.left + set_profile.margins.right)
    .attr("height", set_profile.height + set_profile.margins.top + set_profile.margins.bottom)
  .append("g")
    .attr("transform", "translate(" + set_profile.margins.left + "," + set_profile.margins.top + ")");

  bind_data(profile_svg, d);
  make_annotations(profile_svg, set_profile);
  make_sequence(profile_svg, "f", set_profile);
  make_kinetic_profile_generic(profile_svg, d, "b55", "sim_red", set_profile);
  make_kinetic_profile_generic(profile_svg, d, "ctrl", "sim_red", set_profile);
  make_kinetic_profile_generic(profile_svg, d, "gwl", "sim_red", set_profile);
  make_rate_box_labels(profile_svg, set_profile);
  make_rate_box(profile_svg, set_profile);
  make_abundance_box_labels(profile_svg, set_profile);
  make_cm_box(profile_svg, set_profile);
  // write_legend(profile_svg, set_profile);
  make_downloadable("profileplot_", name);

  mouse_gestures();
};

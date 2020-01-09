var toggle_category = [
  {
    "id" : "#cardsview",
    "class" : "cards",
  },
  {
    "id" : "#profileview",
    "class" : "profiles",
  },
  {
    "id" : "#doc",
    "class" : "documentation"
  },
  {
    "id" : "#listview",
    "class" : "peptidelist"
  },
  {
    "id" : "#settingsview",
    "class" : "settings"
  }
];

// var search_for = "Peptide";
var search_for = "peptides";

var arrayUnique = function(a) {
    return a.reduce(function(p, c) {
        if (p.indexOf(c) < 0) p.push(c);
        return p;
    }, []);
};

function get_ids(){
  var nodes = d3.selectAll("g.node");
  var ids = {
    "peptides" : [],
    "gene_names" : [],
    "motif" : []
  };
  for(i=0; i < nodes[0].length; i++){
      ids.peptides.push( nodes[0][i].id.split("__")[1] )
      ids.gene_names.push( nodes[0][i].id.split("__")[1].split("_")[0] )
      ids.motif.push( nodes[0][i].__data__.sequence )
  };
  ids.gene_names = arrayUnique(ids.gene_names);
  return ids;
}

function setToggle(toggle_category, id){
  d3.select(id).on("click", function(){
    for(i=0; i<toggle_category.length; i++){
      if(toggle_category[i].id == id){
        d3.select(toggle_category[i].id).attr("class", "hdritem hdritem-active");
        d3.select("." + toggle_category[i].class).attr("class", toggle_category[i].class + " detailspage active");
      } else {
        d3.select(toggle_category[i].id).attr("class", "hdritem");
        d3.select("." + toggle_category[i].class).attr("class", toggle_category[i].class + " detailspage hidden");
      };
    }
  })
}

function activateToggles(){
  d3.select("#destroyall").on("click", function(){
    d3.selectAll(".cardprofile").remove()
    var d = d3.selectAll("g.node").data();
    d3.select("#scatterplot").remove();
    d3.select("#x_histogram").remove();
    d3.select("#y_histogram").remove();
    drawScatter(d, x_data, y_data);
    drawHist(d, x_data, y_data);
  });

  d3.select("form.filterdset").selectAll("input#nonzero_ind").on("click", function(){
    global_filter = filter_nonzero_ind;
    d3.select("#scatterplot").remove();
    d3.select("#x_histogram").remove();
    d3.select("#y_histogram").remove();
    d3.csv(path_prefix + "/data/fitted_annotated.csv",
        function(d) { return parse_data(d); },
        function(d) {
          drawScatter(d, x_data, y_data);
          makeList()
          drawHist(d, x_data, y_data);
          updateTypeahead();
        });
  })

  d3.select("form.filterdset").selectAll("input#greater_or_zero").on("click", function(){
    global_filter = filter_greater_or_zero;
    d3.select("#scatterplot").remove();
    d3.select("#x_histogram").remove();
    d3.select("#y_histogram").remove();
    d3.csv(path_prefix + "/data/fitted_annotated.csv",
        function(d) { return parse_data(d); },
        function(d) {
          drawScatter(d, x_data, y_data);
          makeList()
          drawHist(d, x_data, y_data);
          updateTypeahead();
        });
  })

  d3.select("form.filterdset").selectAll("input#greater_zero").on("click", function(){
    global_filter = filter_greater_zero;
    d3.select("#scatterplot").remove();
    d3.select("#x_histogram").remove();
    d3.select("#y_histogram").remove();
    d3.csv(path_prefix + "/data/fitted_annotated.csv",
        function(d) { return parse_data(d); },
        function(d) {
          drawScatter(d, x_data, y_data);
          makeList()
          drawHist(d, x_data, y_data);
          updateTypeahead();
        });
  })

  d3.select("form.filterdset").selectAll("input#nonzero_sub").on("click", function(){
    global_filter = filter_nonzero_sub;
    d3.select("#scatterplot").remove();
    d3.select("#x_histogram").remove();
    d3.select("#y_histogram").remove();
    d3.csv(path_prefix + "/data/fitted_annotated.csv",
        function(d) { return parse_data(d); },
        function(d) {
          drawScatter(d, x_data, y_data);
          makeList()
          drawHist(d, x_data, y_data);
          updateTypeahead();
        });
  })

  d3.select("form.filterdset").selectAll("input#all").on("click", function(){
    global_filter = filter_none;
    d3.select("#scatterplot").remove();
    d3.select("#x_histogram").remove();
    d3.select("#y_histogram").remove();
    d3.csv(path_prefix + "/data/fitted_annotated.csv",
        function(d) { return parse_data(d); },
        function(d) {
          drawScatter(d, x_data, y_data);
          makeList()
          drawHist(d, x_data, y_data);
          updateTypeahead();
        });
  })

  d3.select("form.filterdset").selectAll("input#all").on("click", function(){
    global_filter = filter_none;
    d3.select("#scatterplot").remove();
    d3.select("#x_histogram").remove();
    d3.select("#y_histogram").remove();
    d3.csv(path_prefix + "/data/fitted_annotated.csv",
        function(d) { return parse_data(d); },
        function(d) {
          drawScatter(d, x_data, y_data);
          makeList()
          drawHist(d, x_data, y_data);
          updateTypeahead();
        });
  })

  d3.select("form.dropdown-content").selectAll("input#spep").on("click", function(){
    search_for = "peptides";
    updateTypeahead();
  })

  d3.select("form.dropdown-content").selectAll("input#sgn").on("click", function(){
    search_for = "gene_names";
    updateTypeahead();
  })

  d3.select("form.dropdown-content").selectAll("input#smo").on("click", function(){
    search_for = "motif";
    updateTypeahead();
  })

  for(i=0; i<toggle_category.length; i++){
    setToggle(toggle_category, toggle_category[i].id)
  };
}

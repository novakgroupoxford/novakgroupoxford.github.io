var x_data = "l_b55";
var y_data = "l_ind";

function filter_none(d){return true;};
function filter_substrates(d){return d.is_substrate != 0;};
function filter_nonzero_sub(d){return data_map(d, "k_b55") > 0;}
function filter_nonzero_ind(d){return data_map(d, "k_ind") > 0;}
function filter_greater_zero(d){return data_map(d, "k_b55") > 0 && data_map(d, "k_ind") > 0;}
function filter_greater_or_zero(d){return data_map(d, "k_b55") > 0 || data_map(d, "k_ind") > 0;}

var global_filter = filter_greater_or_zero;

function all_grey(d){ return '#696969';}
function substrates(d){
  if(d.is_substrate == 1){
    return "#0595b5";
  } else if (d.is_substrate == -1) {
    return "#cd0000";
  } else {
    return '#696969';
  }
}
var color_dot = substrates;

function standard_opacity(d){ return 0.8;};
var opacity_scale;
function objective_opacity(d){ return opacity_scale(data_map(d, "o"));};

var opacity_dot = standard_opacity;

to_plot = [
  "MYBBP1A_pS1314_S",
  "NUSAP1_pT244_S",
  "NUMA1_pT2015_S",
  "VIPAS39_pT132_S",
  "TOPBP1_pS805_S",
  "TBC1D23_pT514_S",
  "KIF22_pT463_S",
  "PRC1_pT470_S",
  "SKA3_pT384_S",
  "TPX2_pT369_S",
  "MAP7_pS254_S",
  "MACF1_pT7343_S"
];

function makeOverview(){
  // d3.csv(path_prefix + "data/fitted.csv",
  d3.csv(path_prefix + "/data/fitted_annotated.csv",
      function(d) { return parse_data(d); },
      function(d) {
        // make_square();
        drawHist(d, x_data, y_data);
        drawScatter(d, x_data, y_data);
        makeList();
        for(i=0; i<to_plot.length;i++){
          compose(to_plot[i]);
        }
        updateTypeahead();
        d3.select(window).on('resize', function(){
          d3.select("#scatterplot").remove();
          d3.select("#x_histogram").remove();
          d3.select("#y_histogram").remove();
          drawHist(d, x_data, y_data);
          drawScatter(d, x_data, y_data);
        });
      })
}

function goToCardsview(){
  //if neither in profile or cards view, activate cards view
  var cards_active = d3.select("#cardsview").classed("hdritem-active");
  var profile_active = d3.select("#profileview").classed("hdritem-active");
  if(!cards_active && !profile_active){
    for(i=0; i<toggle_category.length; i++){
      if(toggle_category[i].id == "#cardsview"){
        d3.select(toggle_category[i].id).attr("class", "hdritem hdritem-active");
        d3.select("." + toggle_category[i].class).attr("class", toggle_category[i].class + " detailspage active");
      } else {
        d3.select(toggle_category[i].id).attr("class", "hdritem");
        d3.select("." + toggle_category[i].class).attr("class", toggle_category[i].class + " detailspage hidden");
      };
    }
  }
}

function makeList(){
  d3.select("#peptidelist").selectAll("div").remove();
  var d = d3.selectAll("g.node").data(),
  peptidelist = d3.select("#peptidelist");
  for(i=0; i<d.length; i++){
    peptidelist.append("div")
      .attr("class", "peptide-list-item")
      .attr("id", "peptide-list-item__" + d[i].id)
      .append("p")
      .text(d[i].id)
  }
  mouse_gestures();
}


function make_square(){
  var dims = ["k_b55", "k_ind", "ra_b55", "ra_gwl", "net_charge"];
  for(var i = 0; i<dims.length; i++){
    var square = d3.select(".grid").append("div").attr("class", "grid-row")
    for(var j = 0; j<dims.length; j++){
      square.append("div")
        .attr("class", "grid-component")
        .attr("id", dims[i] + "__" + dims[j])
        .attr("title", dims[i] + " vs. " + dims[j]);
      if(i==j){
        // d3.select("#" + dims[i] + "__" + dims[j])
        //   .append("p")
        //   .attr("class", "grid-label")
        //   .text(dims[i]);
      };
    }
  }
  d3.selectAll(".grid-component").on("click", function(){
    x_data = d3.select(this).attr("id").split("__")[0];
    y_data = d3.select(this).attr("id").split("__")[1];
    var d = d3.selectAll("g.node").data();
    updateScatter(d, x_data,y_data);
    updateHist(d, x_data,y_data);
  });
}

function data_map(d, key){
  dmap = {
    "k_b55" : d.rates[0],
    "k_ind" : d.rates[1],
    "l_b55" : d.rates[0] !== 0 ? -1/Math.log(d.rates[0]) : 0,
    "l_ind" : d.rates[1] !== 0 ? -1/Math.log(d.rates[1]) : 0,
    "o"    : d.rates[2],
    "ra_b55" : d.cms[0],
    "ra_gwl" : d.cms[2],
    "sum_pI" : d.sum_pI,
    "net_charge" : d.net_charge,
  }
  return dmap[key];
}

var axlabels = {
  "k_ind" : "k_ind",
  "k_b55" : "k_b55",
  "l_ind" : "-1 / log(k_ind)",
  "l_b55" : "-1 / log(k_b55)",
}
function scatterplotBrushing(x_data, y_data, draw_type){

  brush = d3.svg.brush()
   .x(x)
   .y(y)
   .on("brush", brushmove)
   .on("brushend", brushend);

  if(draw_type == "draw"){
    d3.select("#scatterplot").append("g")
     .attr("class", "brush")
     .call(brush)
    .selectAll('rect');
  } else if (draw_type == "update") {
    console.log("calling brush")
    d3.select("#scatterplot").select("g.brush").call(brush);
  }

  function brushmove(){
   var extent = {
         "x_min" : brush.extent()[0][0],
         "y_min" : brush.extent()[0][1],
         "x_max" : brush.extent()[1][0],
         "y_max" : brush.extent()[1][1],
       };
   d3.selectAll("g.node").classed("selected", function(d){
     var is_selected = extent.x_min <= data_map(d,x_data) && data_map(d,x_data) <= extent.x_max && extent.y_min <= data_map(d,y_data) && data_map(d,y_data) <= extent.y_max;
     return is_selected;
   });

   goToCardsview();
  };

  function brushend(){
   d3.selectAll("g.node.selected").each(function(d){compose(d.id);});
  d3.select("#scatterplot").selectAll("rect.extent")
    .attr("width", "0")
    .attr("height", "0");
  };

}

function setupPlot(data, x_data, y_data, draw_type){
  var data = data.filter(global_filter)
  var margin = 20,
      height = document.getElementById('scatterdiv').getBoundingClientRect().height - margin,
      width = document.getElementById('scatterdiv').getBoundingClientRect().width - margin;

  if(draw_type == "draw"){

    x = d3.scale.linear()
      .domain(d3.extent(data, function (d) {
          return data_map(d,x_data);
      }))
      .range([3 * margin, width- margin]);

    y = d3.scale.linear()
      .domain(d3.extent(data, function (d) {
          return data_map(d,y_data);
      }))
      .range([height-margin, margin]);

    var scatterplot = d3.select(".scatter").append("svg")
      .attr("id", "scatterplot")
      .attr("width", width)
      .attr("height", height);
    scatterplot.append("g").attr("class", "x axis").attr("transform", "translate(" + 0 + "," + y.range()[0] + ")");
    scatterplot.append("g").attr("class", "y axis").attr("transform", "translate(" + (x.range()[0]) + ",0)");
    var xAxis = d3.svg.axis().scale(x).orient("bottom").tickPadding(2);
    var yAxis = d3.svg.axis().scale(y).orient("left").tickPadding(2);
    scatterplot.selectAll("g.y.axis").call(yAxis);
    scatterplot.selectAll("g.x.axis").call(xAxis);

  } else if (draw_type == "update") {

    x.domain(d3.extent(data, function (d) { return data_map(d,x_data); }));
    y.domain(d3.extent(data, function (d) { return data_map(d,y_data); }));

    var scatterplot = d3.select("#scatterplot");
    var xAxis = d3.svg.axis().scale(x).orient("bottom").tickPadding(2);
    var yAxis = d3.svg.axis().scale(y).orient("left").tickPadding(2);

    scatterplot.selectAll("g.y.axis")
      .transition()
      .duration(1000)
      .call(yAxis)
      .ease("cubic-in-out");
    scatterplot.selectAll("g.x.axis")
      .transition()
      .duration(1000)
      .call(xAxis)
      .ease("cubic-in-out");
  }
  return scatterplot;
}

function updateScatter(data, x_data, y_data){

  var scatterplot = setupPlot(data, x_data, y_data, "update");

  var peptideGroup = scatterplot.selectAll("g.node")
    .transition()
    .duration(1000)
    .attr('transform', function (d) {
        return "translate(" + x(data_map(d,x_data)) + "," + y(data_map(d,y_data)) + ")";
    })
    .attr("fill", function(d){ return color_dot(d); })
    .ease("cubic-in-out");

  peptideGroup.selectAll("g.node").selectAll("circle.dot")
    .attr("fill", function(d){ return color_dot(d); });

  d3.selectAll(".grid-component-active")
    .attr("class",  "grid-component");

  d3.select("#" + x_data + "__" + y_data).attr("class", "grid-component grid-component-active");
  scatterplotBrushing(x_data, y_data, "update");
  // mouse_gestures();

}

function drawScatter(data,x_data, y_data){

  opacity_scale = d3.scale.log()
    .domain(d3.extent(data, function (d) { return data_map(d,"o"); }))
    .range([1, 0]);

  var scatterplot = setupPlot(data, x_data, y_data, "draw");
  scatterplotBrushing(x_data, y_data, "draw");

  var peptide = scatterplot.selectAll("g.node").data(data, function (d) { return d.id; });
  var peptideGroup = peptide
  .enter()
    .append("g")
    .filter(function(d){ return global_filter(d); })
    .attr("class", "node")
    .attr('transform', function (d) {
        return "translate(" + x(data_map(d,x_data)) + "," + y(data_map(d,y_data)) + ")";
    })
    .attr("id", function(d) { return "node__" + d.id; });

  peptideGroup.append("circle")
      .attr("r", 4)
      .attr("class", "dot")
      .attr("fill", function(d){ return color_dot(d); })
      .attr("opacity", function(d){ return opacity_dot(d); });

  d3.select("#" + x_data + "__" + y_data).attr("class", "grid-component grid-component-active");
  mouse_gestures();

}

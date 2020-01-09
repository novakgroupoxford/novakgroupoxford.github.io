
d3.selection.prototype.moveToFront = function() {
  return this.each(function(){
  this.parentNode.appendChild(this);
  console.log("moveToFront")
  });
};

function activateNode(scope){
  if(d3.select(scope).classed("highlight")){
    console.log("already highlighted")
  } else {
  d3.select(scope)
    .attr("class", "node highlight")
    .select("circle")
    .moveToFront()
    .attr("r", 4)
    .transition()
    .duration(500)
    .attr("r", 10)
    .attr("fill", "rgb(255, 77, 0)");
  }
}

function inactivateNode(scope){
  d3.selectAll(scope)
    .attr("class", "node")
  .selectAll("circle")
    .attr("r", 10)
    .transition()
    .duration(500)
    .attr("r", 4)
    .attr("fill", function(d){ return color_dot(d);});
}

function activateCardprofile(scope){
  var type = scope.split("__")[0].split("#")[1],
      id = scope.split("__")[1];
  d3.select(scope)
    .attr("class", type + "_container " + type + " cardprofile cardprofile_" + id)
    .transition()
    .duration(1000)
    .attr("class", type + "_container " + type + " " + type + "-active" +" cardprofile cardprofile_" + id);
}

function inactivateCardprofile(scope){
  var type = scope.split("__")[0].split("#")[1],
      id = scope.split("__")[1];
  d3.select(scope)
    .attr("class", type + "_container " + type + " " + type + "-active" +" cardprofile cardprofile_" + id)
    .transition()
    .duration(1000)
    .attr("class", type + "_container " + type + " cardprofile cardprofile_" + id);
}

function activateListitem(scope){
  var type = scope.split("__")[0].split("#")[1],
      id = scope.split("__")[1];
  d3.select(scope)
    .attr("class", type + "_container " + type)
    .transition()
    .duration(1000)
    .attr("class", type + "_container " + type + " " + type + "-active");
}

function inactivateListitem(scope){
  var type = scope.split("__")[0].split("#")[1],
      id = scope.split("__")[1];
  d3.select(scope)
    .attr("class", type + "_container " + type + " " + type + "-active")
    .transition()
    .duration(1000)
    .attr("class", type + "_container " + type);
}

function defineTooltip(){
  // Define the div for the tooltip
  var div = d3.select("body").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);
  return div;
}

function renderTooltip(id){
  if(d3.select("g#node__" + id).classed("highlight")){
    console.log("already highlighted")
  } else {
  var div = defineTooltip();
  div.transition()
    .duration(200)
    .style("opacity", .9);
  div.append
  div.html(id)
    .style("left", (d3.event.pageX + 5) + "px")
    .style("top", (d3.event.pageY + -10) + "px")
  }
}

function mouse_gestures(){

  // if firefox
  if(typeof InstallTrigger !== "undefined"){
    var mouse_g =  {
      "active" : "mouseover",
      "inactive" : "mouseout"
    }
  } else {
    var mouse_g =  {
      "active" : "mouseenter",
      "inactive" : "mouseleave"
    }
  }

  d3.selectAll("g.node")
    .on(mouse_g.active, function(d){
      console.log(mouse_g.active)
      var id = d3.select(this).node().id.split("__")[1];
      renderTooltip(id);
      d3.select("g#node__" + id).moveToFront();
      activateNode("g#node__" + id);
      activateCardprofile("div#card__" + id);
      activateCardprofile("div#profile__" + id);
    })
    .on(mouse_g.inactive, function(){
      console.log(mouse_g.inactive)
      var id = d3.select(this).node().parentNode.id.split("__")[1];
      inactivateNode("g.node.highlight");
      inactivateCardprofile("div#card__" + id);
      inactivateCardprofile("div#profile__" + id);
      d3.selectAll("div.tooltip").remove();
    })
    .on("click", function(){
      var id = d3.select(this).attr("id").split("__")[1];
      compose(id);
      goToCardsview();
    })

  d3.selectAll("div.cardprofile")
    .on(mouse_g.active, function(){
      console.log(mouse_g.active)
      var id = d3.select(this).attr("id").split("__")[1];
      activateNode("g#node__" + id);
      activateCardprofile("div#card__" + id);
      activateCardprofile("div#profile__" + id);
    })
    .on(mouse_g.inactive, function(){
      console.log(mouse_g.inactive)
      var id = d3.select(this).attr("id").split("__")[1];
      inactivateNode("g#node__" + id);
      inactivateCardprofile("div#card__" + id);
      inactivateCardprofile("div#profile__" + id);
    });

  d3.selectAll("div.peptide-list-item")
    .on("click", function(){
      var id = d3.select(this).attr("id").split("__")[1];
      compose(id);
      goToCardsview();
    })
    .on(mouse_g.active, function(){
      console.log(mouse_g.active)
      var id = d3.select(this).attr("id").split("__")[1];
      activateNode("g#node__" + id);
      activateListitem("div#peptide-list-item__" + id);
      activateCardprofile("div#profile__" + id);
    })
    .on(mouse_g.inactive, function(){
      console.log(mouse_g.inactive)
      var id = d3.select(this).attr("id").split("__")[1];
      inactivateNode("g#node__" + id);
      inactivateListitem("div#peptide-list-item__" + id);
      inactivateCardprofile("div#profile__" + id);
    });
}

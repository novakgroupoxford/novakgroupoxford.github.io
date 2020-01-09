function running_avg(arr){
  a = [];
  for (var i = 0; i < arr.length; i++){
    if (i === 0){
      a[i] = (arr[i] + arr[i+1])/2;
    }
    else if (i == arr.length -1) {
      a[i] = (arr[i] + arr[i-1])/2;
    }
    else {
      a[i] = (arr[i-1] + arr[i] + arr[i+1])/3;
    }
  }
  return a;
}

function calculate_pI(sequence, lookup_pI){
  pI = sequence.split("").map(function(a){return lookup_pI[a];});
  pI = running_avg(pI);
  return pI;
}

var color = {
  "z" : d3.scale.pow().exponent(0.2)
        .domain([-4.098530258, 0, 8.840987639])
        .range(['#cd0000','#ffffff','#0595b5']),
 "f" : d3.scale.sqrt()
       .domain([-0.202288953, 0, 0.348691099])
       .range(['#cd0000','#ffffff','#0595b5']),
 "pI" : d3.scale.sqrt()
       .domain([2.77, 6.026666666666666, 10.76])
       .range(['#cd0000','#ffffff','#0595b5']),
};

function get_color(d, i){
  if (d == "R" || d == "K" || d == "H"){
    return "#696969";
  }
  else if (d =="D" || d == "E"){
    return "#696969";
  }
  else if (i == 25){
    return "#00000";
  }
  else {
    return "#696969";
  }
}

function get_weight(d, i){
  if (d == "R" || d == "K" || d == "H"){
    return "700";
  }
  else if (d =="D" || d == "E"){
    return "700";
  }
  else if (i == 25){
    return "700";
  }
  else {
    return "200";
  }
}

function bind_data(svg, d){
  svg.selectAll(".Peptides")
        .data(d)
      .enter()
        .append("g")
        .attr("class", "empty")
        .filter(function(d){ return set.filter(d); })
        .attr("class", "peptidegroup")
        .attr("id", function(d,i){return d.name + "_" + "p" + d.phosphosite + d.position;})
        .attr("transform", function(d,i) {
            return "translate(0," + (i * set.pos.linewidth) + ")";
          });

  svg.selectAll("g.empty").remove();

}

function polar(r,theta){
  var x = r * Math.cos(theta);
  var y = r * Math.sin(theta);
  return {"x" : x, "y" : y};
}

var petalline = d3.svg.line()
    // .interpolate("linear") // there are many different interpolators
    .interpolate("basis") // there are many different interpolators
    .x(function (d) {
        return d.x;
    })
    .y(function (d) {
        return d.y;
    });

var starline = d3.svg.line()
    // .interpolate("linear") // there are many different interpolators
    .interpolate("linear") // there are many different interpolators
    .x(function (d) {
        return d.x;
    })
    .y(function (d) {
        return d.y;
    });

function petal(type, radius) {
  var r = Math.sqrt(radius) * 100;
  types = {
    blue : petalline([polar(0,0), polar(2 * r /3,-5 * Math.PI/6), polar(r,-2 * Math.PI/3),
                     polar(2 * r /3,-3 * Math.PI/6), polar(0,0)]),
    red : petalline([polar(0,0), polar(2 * r /3,-1 * Math.PI/6), polar(r,0),
                     polar(2 * r /3,1 * Math.PI/6), polar(0,0)]),
    grey : petalline([polar(0,0), polar(2 * r / 3,3 * Math.PI/6), polar(r,2 * Math.PI/3),
                     polar(2 * r / 3,5 * Math.PI/6), polar(0,0)])
  };
  return types[type];
}

function star(type, radius) {
  var r = Math.sqrt(radius) * 20;
  types = {
    yellow : starline([polar(0,0), polar(2 * r /3,-5 * Math.PI/6), polar(r,-2 * Math.PI/3),
                     polar(2 * r /3,-3 * Math.PI/6), polar(0,0)]),
    blue : starline([polar(0,0), polar(2 * r /3,-1 * Math.PI/6), polar(r,0),
                     polar(2 * r /3,1 * Math.PI/6), polar(0,0)]),
    green : starline([polar(0,0), polar(2 * r / 3,3 * Math.PI/6), polar(r,2 * Math.PI/3),
                     polar(2 * r / 3,5 * Math.PI/6), polar(0,0)])
  };
  return types[type];
}

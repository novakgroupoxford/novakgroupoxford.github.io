var set = {
  filter : function(d){ return true;},
  fonts : {
    variable : "Lato",
    mono : "Ubuntu Mono",
    sequence_size : "10pt",
  },
  height : 200 * 50,
  width : 1200,
  margins : {
    top : 20,
    right : 20,
    left : 20,
    bottom : 20,
  },
  pos : {
    linewidth : 50,
    name : {x : 20, y: 0},
    site : {x : 20 * 5, y : 0},
    fraction : {x : 20 * 5, y : 10},
    goterm : {
      g : {x : 20 * 5, y : 25},
      item : {x : 0, y : 0},
    },
    sequence : {x : 8 * 20, y : 0, w: 7.5},
    sequence_score : {x : 8 * 20, y : 5, h : 5, w : 7.5},
    sequence_pI : {x : 8 * 20, y : 12, h : 5, w : 7.5},
    kinetic_profile : {
      x : {
        "data" : 20 * 23,
        "sim_red" : 20 * 23,
      },
      y : {
        "b55" : -10,
        "ctrl": 5,
        "gwl" : 20,
      },
      cx : 11,
      rscale : 5,
    },
    ratebox : {
      text : {
        x : 20,
        y : 10,
        xi : 0,
        yi : 7.5,
      },
      bar : {
        x : 20 * 2.4,
        y : 10,
        xi : 0,
        yi : 7.5,
        wscale : 100,
      },
    },
    cmbox : {
      text : {
        x : 27.5 * 20,
        y : -7.5,
        xi : 0,
        yi : function(d, i) { return i < 3 ? (i * 7.5 +1) : (i * 7.5 + 6); },
      },
      bar : {
        x : 27.5 * 20 + 24,
        y : -7.5,
        xi : 0,
        yi : function(d, i) { return i < 3 ? (i * 7.5 -5) : (i * 7.5); },
        wscale : 20,
      },
    },
  },
  colors : {
    "b55" : "#ffc900",
    "ctrl": "#5fbdff",
    "gwl" : "#5fbd00",
    ratebox : function(d, i){
      if (i === 0) {
        return "#0595b5";
        }
      else if (i === 1) {
        return "#cd0000";
        }
      else {
        return "#3c3c3c";
        }
      },
    cmbox : function(d,i){
      if (i === 0) {
        return set.colors.b55;
        }
      else if (i === 1) {
        return set.colors.ctrl;
        }
      else if (i === 2) {
        return set.colors.gwl;
        }
      else {
        return "#d9d9d9";
        }
      },
    },
  tpts : [0, 2.5, 5, 7.5, 10, 20, 30, 45],
  };

set.axes = {
  x : d3.scale.linear()
      .domain([0,50])
      .range([0, set.width - set.margins.left - set.margins.right]),
  y : d3.scale.linear()
      .domain([0,2])
      .range([set.height - set.margins.top - set.margins.bottom, 0]),
};

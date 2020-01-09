var set = {
  filter : function(d){ return true;},
  fonts : {
    variable : "Arial",
    mono : "Ubuntu Mono",
    sequence_size : "5.9pt",
  },
  height : 350,
  plot_h : 250,
  width : 250,
  plot_w : 250,
  margins : {
    top : 20,
    right : 20,
    left : 20,
    bottom : 20,
  },
  pos : {
    linewidth : 50,
    name : {x : 30, y: 30},
    site : {x : 20 * 5, y : 30},
    fraction : {x : 30 , y : 40},
    goterm : {
      g : {x : 30, y : 48},
      item : {x : 0, y : 0},
    },
    sequence : {x : 20, y : 280, w : 5.9},
    sequence_score : {x : 20, y : 285, h : 3.5, w : 5.9},
    sequence_pI : {x : 20, y : 290, h : 3.5, w : 5.9},
    kinetic_profile : {
      x : {
        "data" : 160,
        "sim_red" : 160,
      },
      y : {
        "b55" : 105,
        "ctrl": 115,
        "gwl" : 125,
      },
      cx : 9,
      rscale : 4,
    },
    ratebox : {
      text : {
        x : 30,
        y : 65,
        xi : 0,
        yi : 7.5,
      },
      bar : {
        x : 58,
        y : 65,
        xi : 0,
        yi : 7.5,
        wscale : 100,
      },
    },
    cmbox : {
      text : {
        x : 156,
        y : 65,
        xi : 0,
        yi : function(d, i) { return i < 3 ? (i * 7.5 +1) : (i * 7.5 + 6); },
      },
      bar : {
        x : 156 + 24,
        y : 65,
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
  sim_tpts : [0, 2.5, 5, 7.5, 10, 12.5, 15, 17.5, 20, 22.5, 25, 27.5, 30, 32.5, 35, 37.5, 40, 42.5, 45],
  };

set.axes = {
  x : d3.scale.linear()
      .domain([0,50])
      .range([0, set.plot_w - set.margins.left - set.margins.right]),
  y : d3.scale.linear()
      .domain([0,2])
      .range([set.plot_w - set.margins.top - set.margins.bottom, 0]),
  y_err : d3.scale.linear()
      .domain([0,2])
      .range([0, set.plot_w - set.margins.top - set.margins.bottom]),
  x_err : d3.scale.linear()
      .domain([-1,1])
      .range([-2.5,2.5])
};

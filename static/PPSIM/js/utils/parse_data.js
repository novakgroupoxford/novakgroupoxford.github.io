function parse_data(d) {
  var data = {
    "exp" : {
      "ctrl" : [+d.Control_0, +d.Control_2_5, +d.Control_5, +d.Control_7_5, +d.Control_10, +d.Control_20, +d.Control_30, +d.Control_45],
      "b55" : [+d.B55_0, +d.B55_2_5, +d.B55_5, +d.B55_7_5, +d.B55_10, +d.B55_20, +d.B55_30, +d.B55_45 ],
      "gwl" : [+d.GWL_0, +d.GWL_2_5, +d.GWL_5, +d.GWL_7_5, +d.GWL_10, +d.GWL_20, +d.GWL_30, +d.GWL_45 ]
    },
    "err" : {
      "ctrl" : [+d.error_Control_0, +d.error_Control_2_5, +d.error_Control_5, +d.error_Control_7_5, +d.error_Control_10, +d.error_Control_20, +d.error_Control_30, +d.error_Control_45],
      "b55" : [+d.error_B55_0, +d.error_B55_2_5, +d.error_B55_5, +d.error_B55_7_5, +d.error_B55_10, +d.error_B55_20, +d.error_B55_30, +d.error_B55_45 ],
      "gwl" : [+d.error_GWL_0, +d.error_GWL_2_5, +d.error_GWL_5, +d.error_GWL_7_5, +d.error_GWL_10, +d.error_GWL_20, +d.error_GWL_30, +d.error_GWL_45 ]
    },
    "sim" : {
      "ctrl" : [+d.Sim_Control0_0, +d.Sim_Control2_5, +d.Sim_Control5_0, +d.Sim_Control7_5, +d.Sim_Control10_0, +d.Sim_Control12_5, +d.Sim_Control15_0, +d.Sim_Control17_5, +d.Sim_Control20_0, +d.Sim_Control22_5, +d.Sim_Control25_0, +d.Sim_Control27_5, +d.Sim_Control30_0,+d.Sim_Control32_5, +d.Sim_Control35_0, +d.Sim_Control37_5, +d.Sim_Control40_0, +d.Sim_Control42_5,+d.Sim_Control45_0,],
      "b55" :[+d.Sim_B550_0, +d.Sim_B552_5, +d.Sim_B555_0, +d.Sim_B557_5, +d.Sim_B5510_0, +d.Sim_B5512_5, +d.Sim_B5515_0, +d.Sim_B5517_5, +d.Sim_B5520_0, +d.Sim_B5522_5, +d.Sim_B5525_0, +d.Sim_B5527_5, +d.Sim_B5530_0,+d.Sim_B5532_5, +d.Sim_B5535_0, +d.Sim_B5537_5, +d.Sim_B5540_0, +d.Sim_B5542_5,+d.Sim_B5545_0,],
      "gwl" : [+d.Sim_GWL0_0, +d.Sim_GWL2_5, +d.Sim_GWL5_0, +d.Sim_GWL7_5, +d.Sim_GWL10_0, +d.Sim_GWL12_5, +d.Sim_GWL15_0, +d.Sim_GWL17_5, +d.Sim_GWL20_0, +d.Sim_GWL22_5, +d.Sim_GWL25_0, +d.Sim_GWL27_5, +d.Sim_GWL30_0,+d.Sim_GWL32_5, +d.Sim_GWL35_0, +d.Sim_GWL37_5, +d.Sim_GWL40_0, +d.Sim_GWL42_5,+d.Sim_GWL45_0,]
    }
  };
  var cm_ctrl = 1;
  var cm_b55 = (+d.CM_Con_L_B55_H_ + 1.0/(+d.CM_Con_H_B55_L_))/2;
  var cm_gwl = (+d.CM_Con_L_GWL_H_ + 1.0/(+d.CM_Con_H_GWL_L_))/2;
  var name = d.Gene_names.split(";")[0];
  var pos = +d.Position;
  var site = d.Sequence.split("")[+d.Position - 1];
  var frac = d.RecordsIndex.split("_")[1];
  var pi = calculate_pI(d.Sequence_window, lookup_pI)
  var net_charge = d.NetCharge
  var sumpi = 0

  pi.forEach(function(i){ sumpi += i})

  return {
    id :  name + "_" + "p" + site + pos + "_" + frac,
    name: name,
    sequence: d.Sequence_window,
    is_substrate: +d.IsSubstrate,
    ctrl_data: data.exp.ctrl,
    ctrl_data_rn: data.exp.ctrl.map(function(x){ return x * cm_ctrl; }),
    ctrl_err: data.err.ctrl,
    ctrl_err_rn: data.err.ctrl.map(function(x){ return x * cm_ctrl; }),
    ctrl_sim: data.sim.ctrl,
    ctrl_sim_red: [data.sim.ctrl[0], data.sim.ctrl[1], data.sim.ctrl[2], data.sim.ctrl[3], data.sim.ctrl[4], data.sim.ctrl[8], data.sim.ctrl[12], data.sim.ctrl[18]],
    ctrl_sim_rn: data.sim.ctrl.map(function(x){ return x * cm_ctrl; }),
    b55_data: data.exp.b55,
    b55_data_rn: data.exp.b55.map(function(x){ return x * cm_b55; }),
    b55_err: data.err.b55,
    b55_err_rn: data.err.b55.map(function(x){ return x * cm_ctrl; }),
    b55_sim: data.sim.b55,
    b55_sim_rn: data.sim.b55.map(function(x){ return x * cm_b55; }),
    b55_sim_red: [data.sim.b55[0], data.sim.b55[1], data.sim.b55[2], data.sim.b55[3], data.sim.b55[4], data.sim.b55[8], data.sim.b55[12], data.sim.b55[18]],
    gwl_data: data.exp.gwl,
    gwl_data_rn: data.exp.gwl.map(function(x){ return x * cm_gwl; }),
    gwl_err: data.err.gwl,
    gwl_err_rn: data.err.gwl.map(function(x){ return x * cm_ctrl; }),
    gwl_sim: data.sim.gwl,
    gwl_sim_rn: data.sim.gwl.map(function(x){ return x * cm_gwl; }),
    gwl_sim_red: [data.sim.gwl[0], data.sim.gwl[1], data.sim.gwl[2], data.sim.gwl[3], data.sim.gwl[4], data.sim.gwl[8], data.sim.gwl[12], data.sim.gwl[18]],
    rates: [+d.k_ds, +d.k_bg, +d.o],
    position: pos,
    phosphosite: site,
    fraction: frac,
    cms: [cm_b55, cm_ctrl, cm_gwl],
    // goterms: [d.Molecular_function.split("(")[0]],
    net_charge: +net_charge,
    pI: pi,
    sum_pI: sumpi
  };
}

function sum(A){
  var s = 0
  A.each(function(d){ s += d; })
}

function parse_ensa(d) {
  var data = {
    "exp" : {
      "ctrl" : [+d.Control_0, +d.Control_2_5, +d.Control_5, +d.Control_7_5, +d.Control_10, +d.Control_20, +d.Control_30, +d.Control_45],
      "b55" : [+d.B55_0, +d.B55_2_5, +d.B55_5, +d.B55_7_5, +d.B55_10, +d.B55_20, +d.B55_30, +d.B55_45 ],
      "gwl" : [+d.GWL_0, +d.GWL_2_5, +d.GWL_5, +d.GWL_7_5, +d.GWL_10, +d.GWL_20, +d.GWL_30, +d.GWL_45 ]
    },
    "err" : {
      "ctrl" : [+d.error_Control_0, +d.error_Control_2_5, +d.error_Control_5, +d.error_Control_7_5, +d.error_Control_10, +d.error_Control_20, +d.error_Control_30, +d.error_Control_45],
      "b55" : [+d.error_B55_0, +d.error_B55_2_5, +d.error_B55_5, +d.error_B55_7_5, +d.error_B55_10, +d.error_B55_20, +d.error_B55_30, +d.error_B55_45 ],
      "gwl" : [+d.error_GWL_0, +d.error_GWL_2_5, +d.error_GWL_5, +d.error_GWL_7_5, +d.error_GWL_10, +d.error_GWL_20, +d.error_GWL_30, +d.error_GWL_45 ]
    },
    "sim" : {
      "ctrl" : [+d.Sim_Control0_0, +d.Sim_Control2_5, +d.Sim_Control5_0, +d.Sim_Control7_5, +d.Sim_Control10_0, +d.Sim_Control12_5, +d.Sim_Control15_0, +d.Sim_Control17_5, +d.Sim_Control20_0, +d.Sim_Control22_5, +d.Sim_Control25_0, +d.Sim_Control27_5, +d.Sim_Control30_0,+d.Sim_Control32_5, +d.Sim_Control35_0, +d.Sim_Control37_5, +d.Sim_Control40_0, +d.Sim_Control42_5,+d.Sim_Control45_0,],
      "b55" :[+d.Sim_B550_0, +d.Sim_B552_5, +d.Sim_B555_0, +d.Sim_B557_5, +d.Sim_B5510_0, +d.Sim_B5512_5, +d.Sim_B5515_0, +d.Sim_B5517_5, +d.Sim_B5520_0, +d.Sim_B5522_5, +d.Sim_B5525_0, +d.Sim_B5527_5, +d.Sim_B5530_0,+d.Sim_B5532_5, +d.Sim_B5535_0, +d.Sim_B5537_5, +d.Sim_B5540_0, +d.Sim_B5542_5,+d.Sim_B5545_0,],
      "gwl" : [+d.Sim_GWL0_0, +d.Sim_GWL2_5, +d.Sim_GWL5_0, +d.Sim_GWL7_5, +d.Sim_GWL10_0, +d.Sim_GWL12_5, +d.Sim_GWL15_0, +d.Sim_GWL17_5, +d.Sim_GWL20_0, +d.Sim_GWL22_5, +d.Sim_GWL25_0, +d.Sim_GWL27_5, +d.Sim_GWL30_0,+d.Sim_GWL32_5, +d.Sim_GWL35_0, +d.Sim_GWL37_5, +d.Sim_GWL40_0, +d.Sim_GWL42_5,+d.Sim_GWL45_0,]
    }
  };
  var cm_ctrl = 1;
  var cm_b55 = (+d.CM_Con_L_B55_H_ + 1.0/(+d.CM_Con_H_B55_L_))/2;
  var cm_gwl = (+d.CM_Con_L_GWL_H_ + 1.0/(+d.CM_Con_H_GWL_L_))/2;
  var name = d.Gene_names.split(";")[0];
  var pos = +d.Position;
  var site = d.Sequence.split("")[+d.Position - 1];
  var frac = d.RecordsIndex.split("_")[1];

  return {
    id :  name + "_" + "p" + site + pos + "_" + frac,
    name: name,
    sequence: d.Sequence_window,
    ctrl_data: data.exp.ctrl,
    ctrl_data_rn: data.exp.ctrl.map(function(x){ return x * cm_ctrl; }),
    ctrl_err: data.err.ctrl,
    ctrl_err_rn: data.err.ctrl.map(function(x){ return x * cm_ctrl; }),
    ctrl_sim: data.sim.ctrl,
    ctrl_sim_red: [data.sim.ctrl[0], data.sim.ctrl[1], data.sim.ctrl[2], data.sim.ctrl[3], data.sim.ctrl[4], data.sim.ctrl[8], data.sim.ctrl[12], data.sim.ctrl[18]].map(function(d) { return d / cm_ctrl;}),
    ctrl_sim_rn: data.sim.ctrl.map(function(x){ return x * cm_ctrl; }),
    b55_data: data.exp.b55,
    b55_data_rn: data.exp.b55.map(function(x){ return x * cm_b55; }),
    b55_err: data.err.b55,
    b55_err_rn: data.err.b55.map(function(x){ return x * cm_ctrl; }),
    b55_sim: data.sim.b55,
    b55_sim_rn: data.sim.b55.map(function(x){ return x * cm_b55; }),
    b55_sim_red: [data.sim.b55[0], data.sim.b55[1], data.sim.b55[2], data.sim.b55[3], data.sim.b55[4], data.sim.b55[8], data.sim.b55[12], data.sim.b55[18]].map(function(d) { return d / cm_b55;}),
    gwl_data: data.exp.gwl,
    gwl_data_rn: data.exp.gwl.map(function(x){ return x * cm_gwl; }),
    gwl_err: data.err.gwl,
    gwl_err_rn: data.err.gwl.map(function(x){ return x * cm_ctrl; }),
    gwl_sim: data.sim.gwl,
    gwl_sim_rn: data.sim.gwl.map(function(x){ return x * cm_gwl; }),
    gwl_sim_red: [data.sim.gwl[0], data.sim.gwl[1], data.sim.gwl[2], data.sim.gwl[3], data.sim.gwl[4], data.sim.gwl[8], data.sim.gwl[12], data.sim.gwl[18]].map(function(d) { return d / cm_gwl;}),
    // rates: [+d.k_ds, +d.k_bg, +d.o],
    position: pos,
    phosphosite: site,
    fraction: frac,
    cms: [cm_b55, cm_ctrl, cm_gwl],
    // goterms: [d.Molecular_function.split("(")[0]],
    pI: calculate_pI(d.Sequence_window, lookup_pI),
  };
}

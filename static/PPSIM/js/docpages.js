var page_toggles = [
  {
    "btnid" : "#howto_button",
    "pid" : "#howto",
  },
  {
    "btnid" : "#dataset_button",
    "pid" : "#dataset",
  },
  {
    "btnid" : "#model_button",
    "pid" : "#model",
  }
];

function setpageToggle(page_toggle, id){
  d3.select(id).on("click", function(){
    for(i=0; i<page_toggles.length; i++){
      if(page_toggles[i].btnid == id){
        d3.select(page_toggles[i].btnid).attr("class", "active");
        d3.select(page_toggles[i].pid).attr("class", "docpage");
      } else {
        d3.select(page_toggles[i].btnid).attr("class", "");
        d3.select(page_toggles[i].pid).attr("class", "docpage hidden");
      };
    }
  })
}

function activatepageToggles(){
  for(i=0; i<page_toggles.length; i++){
    setpageToggle(page_toggles, page_toggles[i].btnid)
  };
}

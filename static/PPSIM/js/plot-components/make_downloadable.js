function make_downloadable(type, name){
  //get svg element.
  var svg_node = document.getElementById(type + name);

  //get svg source.
  var serializer = new XMLSerializer();
  var source = serializer.serializeToString(svg_node);

  //add name spaces.
  if(!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)){
  source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
  }
  if(!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)){
  source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
  }

  //add xml declaration
  source = '<?xml version="1.0" standalone="no"?>\r\n' + source;

  //convert svg source to URI data scheme.
  var url = "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(source);

  //set url value to a element's href attribute.
  document.getElementById(type + "download_button_"+name).href = url;
  // document.getElementById("download_button_" + name).download = name + ".svg";
  //you can download svg file by right click menu.
}

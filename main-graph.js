//Constants
var width = 960;
var height = 500;
var root;

var force = d3.layout.force()
    .size([width, height])
    .on("tick", tick);

var svg = d3.select("body").select("svg")
    .attr("width", width)
    .attr("height", height);

var link = svg.selectAll(".link");
var node = svg.selectAll(".node");

d3.json("readme.json", function(json) {
  root = json;
  update();
});

function update() {
  var nodes = GraphHelper.flatten(root),
      links = d3.layout.tree().links(nodes);

  force
      .nodes(nodes)
      .links(links)
      .linkDistance(linkDistance)
      .charge(charge)
      .start();

    // Update the links…
  link = link.data(links, function(d) { return d.target.id; });
  // Exit any old links.
  link.exit().remove();
  // Enter any new links.
  link.enter().insert("line", ".node")
      .attr("class", "link")
      .attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });
  
  // Update the nodes…
  node = node.data(nodes, function(d) { return d.id; }).style("fill", color);
  // Exit any old nodes.
  node.exit().remove();
  // Enter any new nodes.
  node.enter().append("circle")
      .attr("class", "node")
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })
      .attr("r", size)
      .style("fill", color)       // this code works OK
      .on("click", click)
      .on("mouseover", function(){ // when I use .style("fill", "red") here, it works 
        d3.select(this)
          .style("fill", "url(#img1)");
     })
      .on("mouseout", function(){ 
        d3.select(this)
          .style("fill", color);
     });
}

function linkDistance(node) {
  return GraphHelper.linkDistance(node.source);
}

function charge(node) {
  return GraphHelper.charge(node);
}

//Returns size
function size(node) {
  return GraphHelper.size(node);
}

// Toggle children on click.
function click(node) {
  if (node.children) {
    node._children = node.children; //_children is a temp variable that holds the node's chidren
    node.children = null;
  } else {
    node.children = node._children;
    node._children = null;
  }

  update();

}

function tick() {
  link.attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

  node.attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; });
}

// Color leaf nodes orange, and packages white or blue.
function color(d) {
  return d._children ? "#3182bd" : d.children ? "#c6dbef" : "#fd8d3c";
}

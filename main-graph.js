//Constants
var width = 1000;
var height = 1000;
var root;

var force = d3.layout.force()
    .size([width, height])
    .on("tick", tick);

var svg = d3.select(("svg"))
    .attr("width", width)
    .attr("height", height);

var links = svg.selectAll(".link");
var nodes = svg.selectAll(".node");


d3.json("data.json", function(json) {
  root = json;
  update()
  click(root)
});

function update() {
  var nodeData = GraphHelper.flatten(root),
      linkData = d3.layout.tree().links(nodeData);

  console.log(nodeData);

  force
      .nodes(nodeData)
      .links(linkData)
      .linkDistance(GraphHelper.linkDistance)
      .charge(GraphHelper.charge)
      .start();

  links = links.data(linkData, function(d) { return d.target.id; });
  // Exit any old links.
  links.exit().remove();
  // Enter any new links.
  links.enter().insert("line", ".node")
      .attr("class", "link")
      .attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

  nodes = nodes.data(nodeData, function(d) { return d.id; })
      .style("fill", color);

  nodes.exit().remove();

  var groupsAdded = nodes.enter().append("g")
      .style("fill", color)
      .attr("class", "node");

  groupsAdded.append("circle")
      .attr("class", "circle")
      .attr("cx", function(d) { return 0; })
      .attr("cy", function(d) { return 0; })
      .attr("r", GraphHelper.circleSize)
      .on("click", click);

  groupsAdded.append("text")
      .attr("class", "title")
      .attr("dx", GraphHelper.titlePositionX)
      .attr("dy", GraphHelper.titlePositionY)
      .style("fill", "black")
      .text(function(d) { return d.name });

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
  links.attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

  nodes.attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; });

  nodes.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; }); 
}

// Color leaf nodes orange, and packages white or blue.
function color(d) {
  return d._children ? "#3182bd" : d.children ? "#c6dbef" : "#fd8d3c";
}

function pickImage(node) {
  if (node.name == 'Home') return "url(#image)";
  return color(node);
}



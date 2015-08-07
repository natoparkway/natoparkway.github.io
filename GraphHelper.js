var GraphHelper = (function () {

	function countChildren(node) {
		return Math.max(countShownChildren(node), countHiddenChildren(node));
	}

	function countShownChildren(node) {
	  if (!node.children) return 1;
	  var numChildren = 0;

	  node.children.forEach(function(child) {
	    numChildren += countChildren(child);
	  })

  	return numChildren;
	}

	function countHiddenChildren(node) {
	  if (!node._children) return 1;
	  var numChildren = 0

	  node._children.forEach(function(child) {
	    numChildren += countChildren(child);
	  })

  	return numChildren;
	}

	var charge = function(node) {
		return countChildren(node) * -1000;
	}

	var circleSize = function(node) {
		return countChildren(node) * 30;
	}

	var flatten = function(root) {
	  var nodes = [], i = 0;
	  function recurse(node) {
	    if (node.children) node.children.forEach(recurse);
	    if (!node.id) node.id = ++i;
	    nodes.push(node);
	  }
	  recurse(root);
	  return nodes;
	}

	var linkDistance = function(node) {
		return countChildren(node.source) * 50;
	}

	var titlePositionX = function(node) {
		var text = node.name;
		return -0.5 * Utils.getTextMetrics(text).width;
	}

	var titlePositionY = function(node) {
		var text = node.name;
		return 0.5 * Utils.getTextMetrics(text).height;
	}
  
  return {
    flatten: flatten,
    charge: charge,
    circleSize: circleSize,
    linkDistance: linkDistance,
    titlePositionX: titlePositionX,
    titlePositionY: titlePositionY
  };

})();

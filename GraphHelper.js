var GraphHelper = (function () {

	function countChildren(node) {
	  if (!node.children) return 1;
	  var numChildren = 0

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

	var size = function(node) {
		return countChildren(node) * 10;
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
		return countChildren(node) * 30;
	}
  
  return {
    flatten: flatten,
    charge: charge,
    size: size,
    linkDistance: linkDistance
  };

})();

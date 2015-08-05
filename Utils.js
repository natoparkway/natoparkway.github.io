Utils = (function () {
	function getTextMetrics(text) {
	    // reuse canvas object for better performance
	    var canvas = getTextMetrics.canvas || (getTextMetrics.canvas = document.createElement("canvas"));
	    var context = canvas.getContext("2d");
	    context.font = "36px Junction";
	    var metrics = context.measureText(text);
	    metrics.height = 20;
	    return metrics;
	};

	return {
		getTextMetrics: getTextMetrics
	};

})();
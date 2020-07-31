var $ = require("./shims/jquery");


function doResize (options) {

  var h;
  var w;
  var marginTop = 0;
  var marginLeft = 0;
  var relativeWidth = options.parent.width();
  var relativeHeight = options.parent.height();
  var relativeRatio = relativeWidth / relativeHeight;
  var cssProps = {};

  if (!options.ratio) {

    // absolute resizing

    w = relativeWidth * options.width;
    h = relativeHeight * options.height;

  } else {

    // relative resizing

    // change height/width depending on ratio
    if (relativeRatio > options.ratio) {

      w = relativeWidth;
      h = (relativeWidth / options.ratio);

      // center element within `parent`
      if (options.center) {
        marginTop = (h - relativeHeight) / 2;
      }

    } else {

      w = (relativeHeight * options.ratio);
      h = relativeHeight;

      // center element within `parent`
      if (options.center) {
        marginLeft = (w - relativeWidth) / 2;
      }

    }

  }

  var css = {
    marginLeft: "-" + marginLeft + "px",
    marginTop: "-" + marginTop + "px",
    width: w + "px",
    height: h + "px"
  };

  options.el.css(css);

}


// ElemenetResizer object

var ElementResizer = function (eventname) {
  this.eventname = eventname || 'winresize:done';
};

ElementResizer.prototype.resize = function (opts) {

  var defaults = {
    el: null,           // Required. jQuery DOM element. Element to resize
    parent: null,       // Required. jQuery DOM element. A container element to resize `el` relative to

    height: 1,          // Number. Percentage height of the parent object to size the element (ex: 0.5 for 50%)
    width: 1,           // Number. Percentage width of the parent object to size the element (ex: 0.5 for 50%)

    ratio: null,        // Number. Keep the element at a speicifc aspect ratio while filling the height/width
    center: false       // Boolean. Center the element wihtin the parent div. Useful in conjunction with `ratio`
  };

  var options = $.extend(defaults, opts);

  doResize(options);

  window.addEventListener(this.eventname, function () {
    doResize(options)
  });

};

module.exports = ElementResizer;

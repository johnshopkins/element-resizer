function isWindow(obj) {
  return obj != null && obj === obj.window;
}

function doResize (options) {

  var h;
  var w;
  var relativeWidth;
  var relativeHeight;
  var marginTop = 0;
  var marginLeft = 0;

  if (isWindow(options.parent)) {
    // use document element
    options.parent = document.documentElement;
  }

  relativeWidth = options.parent.clientWidth;
  relativeHeight = options.parent.clientHeight;

  var relativeRatio = relativeWidth / relativeHeight;

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

  options.el.style.marginLeft = '-' + marginLeft + 'px';
  options.el.style.marginTop = '-' + marginTop + 'px';
  options.el.style.width = w + 'px';
  options.el.style.height = h + 'px';

}


// ElemenetResizer object

var ElementResizer = function (eventname) {
  this.eventname = eventname || 'winresize:done';
};

ElementResizer.prototype.resize = function (opts) {

  var options = {
    el: null,           // Required. Node. Element to resize
    parent: null,       // Required. Node. A container element to resize `el` relative to

    height: 1,          // Number. Percentage height of the parent object to size the element (ex: 0.5 for 50%)
    width: 1,           // Number. Percentage width of the parent object to size the element (ex: 0.5 for 50%)

    ratio: null,        // Number. Keep the element at a speicifc aspect ratio while filling the height/width
    center: false       // Boolean. Center the element wihtin the parent div. Useful in conjunction with `ratio`
  };

  // merge passed opts and options (defaults)
  for (var key in opts) {
    options[key] = opts[key];
  }

  doResize(options);

  window.addEventListener(this.eventname, function () {
    doResize(options)
  });

};

module.exports = ElementResizer;

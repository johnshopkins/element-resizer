# window resize window

A module to use in conjunction with Backbone and the [window resize watcher](https://github.com/johnshopkins/window-resize-watcher) module. Resizes an element relative to a parent element and takes care of resizing the element again on each screen resize.

### Dependencies

* Backbone
* Underscore

### Usage

```JavaScript
var ElementResizer = require('element-resizer');

$(function() {

  this.resizer = new ElementResizer(Backbone.Events);

  this.resizer.resize({
    el: this.el.getElementsByClassName('halfheight')[0],
    parent: window,
    width: 1,
    height: 0.5,
    center: true
  });

});
```

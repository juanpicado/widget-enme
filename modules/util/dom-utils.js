    "use strict";

    var enviroment = require('./env');
    var prefix = "data-";
    var fn = {

    /**
     *
     * @method
     */
    querySelectorAll: function(selectors) {
        // http://caniuse.com/queryselector
        if (enviroment.ie7() || enviroment.ie6()) {
            //todo
        } else {
          return document.querySelectorAll(selectors);
        }
    },

    // Cross-browser implementation of element.addEventListener()
    listen : function(evnt, elem, func) {
        if (elem.addEventListener)  // W3C DOM
            elem.addEventListener(evnt,func,false);
        else if (elem.attachEvent) { // IE DOM
            var r = elem.attachEvent("on"+evnt, func);
            return r;
        }
    },

    /**
     *
     * @method
     */
    querySelector: function(selectors) {
        // http://caniuse.com/queryselector
        if (enviroment.ie7() || enviroment.ie6()) {
            //todo
        } else {
          return document.querySelector(selectors);
        }
    },

    /**
     *
     * @method
     */
    widgetInfo: function(widget) {
        var o = {
            id: widget.getAttribute(prefix + 'id'),
            url: widget.getAttribute(prefix + 'url')
        };
        return o;
    }
    };

    module.exports =  fn;

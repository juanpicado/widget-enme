define(["modules/util/env"], function (enviroment) {

    "use strict";

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

    return fn;
});
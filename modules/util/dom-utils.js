define(["modules/util/env"], function (enviroment) {

    "use strict";

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
        }
    };

    return fn;
});
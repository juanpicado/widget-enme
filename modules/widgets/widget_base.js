"use strict";

    var iframe = require('../util/iframe'),
    jsonp = require('../util/jsonp'),
    css = "",
    services = require('../util/services');
    var fn =  {

        /**
         *
         * @method
         */
        getDocument: function(widget) {
            var _iframe = iframe.createIframeBody(widget);
            return _iframe;
        },

        /**
         *
         * @method
         */
        getCss: function(url) {
            var css = document.createElement("link");
            css.rel = "stylesheet";
            css.type = "text/css";
            css.href = url;
            return css;
        },

        /**
         *
         * @method
         */
        getBody: function(widget, _module) {
            jsonp.get(widget.url, _module, widget.widget.properties.id, null);
        }
    };

module.exports = fn;



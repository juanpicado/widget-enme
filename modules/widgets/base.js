define(['modules/util/iframe', 'modules/util/env'], function (iframe, env) {

    "use strict";

    var fn = {

        /**
         * Create the iframe body
         * @method
         */
        createIframeBody: function(widget) {
            var iframe;
                try {
                    iframe = document.createElement('<iframe name="' + widget.name + '"></iframe>');
                } catch (f) {
                    iframe = document.createElement("iframe");
                }
            iframe.scrolling = "no";
            iframe.allowtransparency = "true";
            iframe.setAttribute("frameBorder", 0);
            iframe.setAttribute("allowTransparency", !0);
            return iframe;
        }
    };

    return fn;
});
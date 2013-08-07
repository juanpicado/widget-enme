define([
    "modules/util/services",
    "modules/util/jsonp",
    'modules/util/iframe'
    ],function (
        services,
        jsonp,
        iframe) {
    var p = iframe,
    b = jsonp,
    css = "",
    s = services,
    fn =  {

        /**
         *
         * @method
         */
        getDocument: function(widget) {
            var _iframe = p.createIframeBody(widget);
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
        getBody: function(widget, module) {
            b.get(widget.url, module, widget.widget.properties.id, null);
        }
    };

    return fn;
});
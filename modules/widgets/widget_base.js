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
        getDocument: function(widget) {
            var _iframe = p.createIframeBody(widget);
        },

        getCss: function() {

        },

        getBody: function(widget, module) {
            b.get(widget.url, module, widget.widget.properties.id, null);
        }
    };

    return fn;
});
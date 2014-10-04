"use strict";

var  base = require('./../widget_base');
var _module = "form_tp";
var detail = require('./../detail');
var fn = {
    render: function(widget, onRender) {
        var documentIframe = base.getDocument(widget);
        var cssNode = base.getCss(detail.cssStyle);
        documentIframe.style.cssText = '',
            documentIframe.height = detail.box_dimensions.DEFAULT_HEIGHT,
            documentIframe.style.border = "none",
            documentIframe.style.maxWidth = "450px",
            documentIframe.style.width = window.innerWidth - 20 + "px";
            documentIframe.style.minWidth = detail.box_dimensions.MIN_WIDTH + "px";
        window.__enme_widget.callbacks["_" + _module +"_" + widget.widget.properties.id] = function(data) {
            widget.body = data;
            onRender(widget, documentIframe, cssNode);
        };
        base.getBody(widget, _module);
    }
};

module.exports = fn;

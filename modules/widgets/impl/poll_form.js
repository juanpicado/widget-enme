"use strict";

 var form = require('./../form'),
     base = require('./../widget_base');
 var _module = "form_poll";
 var poll_form = {
    render: function(widget, onRender) {
        var documentIframe = base.getDocument(widget);
        var cssNode = base.getCss(form.cssStyle);
        documentIframe.style.cssText = '',
        documentIframe.height = form.box_dimensions.DEFAULT_HEIGHT,
        documentIframe.style.border = "none",
        documentIframe.style.maxWidth = "450px",
        documentIframe.style.width = window.innerWidth - 20 + "px";
        documentIframe.style.minWidth = form.box_dimensions.MIN_WIDTH + "px";
        window.__enme_widget.callbacks["_" + _module +"_" + widget.widget.properties.id] = function(data) {
            widget.body = data;
            onRender(widget, documentIframe, cssNode);
        };
        base.getBody(widget, _module);
    }
 };


module.exports = poll_form;

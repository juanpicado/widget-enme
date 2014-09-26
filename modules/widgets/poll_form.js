"use strict";

 var form = require('./form'),
     base = require('./base');
console.log("------->", base);
 var _module = "form_poll";
 var poll_form = {
    render: function(widget, onRender) {
        var documentIframe = base.getDocument(widget);
        var cssNode = base.getCss(form.cssStyle);
        documentIframe.style.cssText = '',
        documentIframe.width = form.box_dimensions.DEFAULT_WIDTH,
        documentIframe.height = form.box_dimensions.DEFAULT_HEIGHT,
        documentIframe.style.border = "none",
        documentIframe.style.maxWidth = "100%",
        documentIframe.style.minWidth = form.box_dimensions.MIN_WIDTH + "px";
        //__enme_widget.callbacks[]
        window.__enme_widget.callbacks["_" + _module +"_" + widget.widget.properties.id] = function(data) {
            widget.body = data;
            onRender(widget, documentIframe, cssNode);
        };
        base.getBody(widget, module);
    }
 };


module.exports = poll_form;

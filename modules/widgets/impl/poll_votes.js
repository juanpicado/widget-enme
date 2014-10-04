"use strict";

var  base = require('./../widget_base');
var  Chart = require('./../../vendor/Chart');
var domUtils = require('../../util/dom-utils');
var _module = "vote_poll";
var _ = require('underscore');
var detail = require('./../results');
var fn = {
    render: function(widget, onRender) {
        var documentIframe = base.getDocument(widget);
        var cssNode = base.getCss(detail.cssStyle);
        documentIframe.style.cssText = '',
            documentIframe.style.width = window.innerWidth - 20 + "px";
            documentIframe.height = detail.box_dimensions.DEFAULT_HEIGHT,
            documentIframe.style.border = "none",
            documentIframe.style.maxWidth = "450px",
            documentIframe.style.minWidth = detail.box_dimensions.MIN_WIDTH + "px";
        window.__enme_widget.callbacks["_" + _module +"_" + widget.widget.properties.id] = function(data) {
            widget.body = data;
            onRender(widget, documentIframe, cssNode, function(_document) {
                var stats = domUtils.querySelector('.range_stats', _document);
                var canvas = domUtils.createCanvas(_document, {});
                var ctx = canvas.getContext("2d");
                var chart_data = data.aditionalInfo;
                var _data = [];
                _.each(chart_data, function(a,b) {
                    var item = {
                        value : a.answer_votes,
                        color : a.answer.color,
                        label : a.answer.answers
                    };
                    _data.push(item);
                });
                var myPieChart = new Chart(ctx).Pie(_data , {});
                stats.appendChild(canvas);

            });
        };
        base.getBody(widget, _module);
    }
};

module.exports = fn;

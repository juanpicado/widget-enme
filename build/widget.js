(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
    "use strict";

    var env = require('./env');
    var prefix = "data-";
    var fn = {

    /**
     *
     * @method
     */
    querySelectorAll: function(selectors) {
        // http://caniuse.com/queryselector
        if (env.ie7() || env.ie6()) {
            //todo
        } else {
          return document.querySelectorAll(selectors);
        }
    },

    // Cross-browser implementation of element.addEventListener()
    listen : function(evnt, elem, func) {
        if (elem.addEventListener) { // W3C DOM
            elem.addEventListener(evnt, func, false);
        } else if (elem.attachEvent) { // IE DOM
            var r = elem.attachEvent("on"+evnt, func);
            return r;
        }
    },

    /**
     *
     * @param options
     */
    createCanvas : function(doc, options) {
        var canvas = doc.createElement("canvas");
        canvas.width = doc.body.clientWidth - 20;
        canvas.height = 200;
        return canvas;
    },

    /**
     *
     * @method
     */
    querySelector: function(selectors, doc) {
        // http://caniuse.com/queryselector
        if (env.ie7() || env.ie6()) {
            //todo
        } else {
          return doc ? doc.querySelector(selectors) : document.querySelector(selectors);
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

    module.exports =  fn;

},{"./env":2}],2:[function(require,module,exports){
(function (global){

"use strict";

    var f = global.navigator.userAgent;

    var fn = {

        retina: function() {
            return (global.devicePixelRatio || Math.round(global.screen.availWidth / document.documentElement.clientWidth)) > 1
        },

        anyIE: function() {
            return /MSIE \d/.test(f);
        },

        ie6: function () {
            return /MSIE 6/.test(f)
        },

        ie7: function() {
            return /MSIE 7/.test(f)
        },

        touch: function() {
            return "ontouchstart" in global || /Opera Mini/.test(f) || navigator.msMaxTouchPoints > 0
        },

        cssTransitions: function(){
            var a = document.body.style;
            return a.transition !== undefined || a.webkitTransition !== undefined || a.mozTransition !== undefined || a.oTransition !== undefined || a.msTransition !== undefined;
        }

};

module.exports = fn;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],3:[function(require,module,exports){
    "use strict";
    var fn = {

        /**
         * Create the iframe body
         * @method
         */
        createIframeBody: function(widget) {
            var iframe,
            name = "enme-widget-";
                try {
                    iframe = document.createElement('<iframe name="' + name + widget.properties.id + '"></iframe>');
                } catch (f) {
                    iframe = document.createElement("iframe");
                }
            iframe.scrolling = "no";
            iframe.allowtransparency = "true";
            iframe.setAttribute("frameBorder", 0);
            iframe.setAttribute("allowTransparency", !0);
            iframe.style.width = window.innerWidth - 20 + "px";
            return iframe;
        }
    };

module.exports = fn;

},{}],4:[function(require,module,exports){
"use strict";

    var body = {
        get: function(url, _module, id, instance) {
            var script = document.createElement('script');
            var name = "__enme_widget.callbacks._" + _module +"_" + id;
            script.src = url + '?id=' + id + '&callback=' + name;
            document.getElementsByTagName('head')[0].appendChild(script);
        }
    };

module.exports = body;

},{}],5:[function(require,module,exports){
(function (global){
/*global __enme_widget:false*/

"use strict";

var services = function(){
    var domain = global.__enme_widget.host;
    return {
        poll_form : domain + "api/jsonp/poll/embedded",
        tp_poll_form : domain + "api/jsonp/tweetpoll/embedded",
        tp_poll_votes : domain + "api/jsonp/tweetpollresult/embedded",
        hashtag_profile : domain + "api/jsonp/hashtag/embedded",
        user_profile : domain + "api/jsonp/profile/embedded",
        poll_results : domain + "api/jsonp/pollresult/embedded",
        tp_poll_results : domain + "api/jsonp/poll/embedded"
    }
};

module.exports = services;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],6:[function(require,module,exports){
/*!
 * Chart.js
 * http://chartjs.org/
 *
 * Copyright 2013 Nick Downie
 * Released under the MIT license
 * https://github.com/nnnick/Chart.js/blob/master/LICENSE.md
 */

//Define the global Chart Variable as a class.
var Chart = function(context){

    var chart = this;


    //Easing functions adapted from Robert Penner's easing equations
    //http://www.robertpenner.com/easing/

    var animationOptions = {
        linear : function (t){
            return t;
        },
        easeInQuad: function (t) {
            return t*t;
        },
        easeOutQuad: function (t) {
            return -1 *t*(t-2);
        },
        easeInOutQuad: function (t) {
            if ((t/=1/2) < 1) return 1/2*t*t;
            return -1/2 * ((--t)*(t-2) - 1);
        },
        easeInCubic: function (t) {
            return t*t*t;
        },
        easeOutCubic: function (t) {
            return 1*((t=t/1-1)*t*t + 1);
        },
        easeInOutCubic: function (t) {
            if ((t/=1/2) < 1) return 1/2*t*t*t;
            return 1/2*((t-=2)*t*t + 2);
        },
        easeInQuart: function (t) {
            return t*t*t*t;
        },
        easeOutQuart: function (t) {
            return -1 * ((t=t/1-1)*t*t*t - 1);
        },
        easeInOutQuart: function (t) {
            if ((t/=1/2) < 1) return 1/2*t*t*t*t;
            return -1/2 * ((t-=2)*t*t*t - 2);
        },
        easeInQuint: function (t) {
            return 1*(t/=1)*t*t*t*t;
        },
        easeOutQuint: function (t) {
            return 1*((t=t/1-1)*t*t*t*t + 1);
        },
        easeInOutQuint: function (t) {
            if ((t/=1/2) < 1) return 1/2*t*t*t*t*t;
            return 1/2*((t-=2)*t*t*t*t + 2);
        },
        easeInSine: function (t) {
            return -1 * Math.cos(t/1 * (Math.PI/2)) + 1;
        },
        easeOutSine: function (t) {
            return 1 * Math.sin(t/1 * (Math.PI/2));
        },
        easeInOutSine: function (t) {
            return -1/2 * (Math.cos(Math.PI*t/1) - 1);
        },
        easeInExpo: function (t) {
            return (t==0) ? 1 : 1 * Math.pow(2, 10 * (t/1 - 1));
        },
        easeOutExpo: function (t) {
            return (t==1) ? 1 : 1 * (-Math.pow(2, -10 * t/1) + 1);
        },
        easeInOutExpo: function (t) {
            if (t==0) return 0;
            if (t==1) return 1;
            if ((t/=1/2) < 1) return 1/2 * Math.pow(2, 10 * (t - 1));
            return 1/2 * (-Math.pow(2, -10 * --t) + 2);
        },
        easeInCirc: function (t) {
            if (t>=1) return t;
            return -1 * (Math.sqrt(1 - (t/=1)*t) - 1);
        },
        easeOutCirc: function (t) {
            return 1 * Math.sqrt(1 - (t=t/1-1)*t);
        },
        easeInOutCirc: function (t) {
            if ((t/=1/2) < 1) return -1/2 * (Math.sqrt(1 - t*t) - 1);
            return 1/2 * (Math.sqrt(1 - (t-=2)*t) + 1);
        },
        easeInElastic: function (t) {
            var s=1.70158;var p=0;var a=1;
            if (t==0) return 0;  if ((t/=1)==1) return 1;  if (!p) p=1*.3;
            if (a < Math.abs(1)) { a=1; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (1/a);
            return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*1-s)*(2*Math.PI)/p ));
        },
        easeOutElastic: function (t) {
            var s=1.70158;var p=0;var a=1;
            if (t==0) return 0;  if ((t/=1)==1) return 1;  if (!p) p=1*.3;
            if (a < Math.abs(1)) { a=1; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (1/a);
            return a*Math.pow(2,-10*t) * Math.sin( (t*1-s)*(2*Math.PI)/p ) + 1;
        },
        easeInOutElastic: function (t) {
            var s=1.70158;var p=0;var a=1;
            if (t==0) return 0;  if ((t/=1/2)==2) return 1;  if (!p) p=1*(.3*1.5);
            if (a < Math.abs(1)) { a=1; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (1/a);
            if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*1-s)*(2*Math.PI)/p ));
            return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*1-s)*(2*Math.PI)/p )*.5 + 1;
        },
        easeInBack: function (t) {
            var s = 1.70158;
            return 1*(t/=1)*t*((s+1)*t - s);
        },
        easeOutBack: function (t) {
            var s = 1.70158;
            return 1*((t=t/1-1)*t*((s+1)*t + s) + 1);
        },
        easeInOutBack: function (t) {
            var s = 1.70158;
            if ((t/=1/2) < 1) return 1/2*(t*t*(((s*=(1.525))+1)*t - s));
            return 1/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2);
        },
        easeInBounce: function (t) {
            return 1 - animationOptions.easeOutBounce (1-t);
        },
        easeOutBounce: function (t) {
            if ((t/=1) < (1/2.75)) {
                return 1*(7.5625*t*t);
            } else if (t < (2/2.75)) {
                return 1*(7.5625*(t-=(1.5/2.75))*t + .75);
            } else if (t < (2.5/2.75)) {
                return 1*(7.5625*(t-=(2.25/2.75))*t + .9375);
            } else {
                return 1*(7.5625*(t-=(2.625/2.75))*t + .984375);
            }
        },
        easeInOutBounce: function (t) {
            if (t < 1/2) return animationOptions.easeInBounce (t*2) * .5;
            return animationOptions.easeOutBounce (t*2-1) * .5 + 1*.5;
        }
    };

    //Variables global to the chart
    var width = context.canvas.width;
    var height = context.canvas.height;


    //High pixel density displays - multiply the size of the canvas height/width by the device pixel ratio, then scale.
    if (window.devicePixelRatio) {
        context.canvas.style.width = width + "px";
        context.canvas.style.height = height + "px";
        context.canvas.height = height * window.devicePixelRatio;
        context.canvas.width = width * window.devicePixelRatio;
        context.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    this.PolarArea = function(data,options){

        chart.PolarArea.defaults = {
            scaleOverlay : true,
            scaleOverride : false,
            scaleSteps : null,
            scaleStepWidth : null,
            scaleStartValue : null,
            scaleShowLine : true,
            scaleLineColor : "rgba(0,0,0,.1)",
            scaleLineWidth : 1,
            scaleShowLabels : true,
            scaleLabel : "<%=value%>",
            scaleFontFamily : "'Arial'",
            scaleFontSize : 12,
            scaleFontStyle : "normal",
            scaleFontColor : "#666",
            scaleShowLabelBackdrop : true,
            scaleBackdropColor : "rgba(255,255,255,0.75)",
            scaleBackdropPaddingY : 2,
            scaleBackdropPaddingX : 2,
            segmentShowStroke : true,
            segmentStrokeColor : "#fff",
            segmentStrokeWidth : 2,
            animation : true,
            animationSteps : 100,
            animationEasing : "easeOutBounce",
            animateRotate : true,
            animateScale : false,
            onAnimationComplete : null
        };

        var config = (options)? mergeChartConfig(chart.PolarArea.defaults,options) : chart.PolarArea.defaults;

        return new PolarArea(data,config,context);
    };

    this.Radar = function(data,options){

        chart.Radar.defaults = {
            scaleOverlay : false,
            scaleOverride : false,
            scaleSteps : null,
            scaleStepWidth : null,
            scaleStartValue : null,
            scaleShowLine : true,
            scaleLineColor : "rgba(0,0,0,.1)",
            scaleLineWidth : 1,
            scaleShowLabels : false,
            scaleLabel : "<%=value%>",
            scaleFontFamily : "'Arial'",
            scaleFontSize : 12,
            scaleFontStyle : "normal",
            scaleFontColor : "#666",
            scaleShowLabelBackdrop : true,
            scaleBackdropColor : "rgba(255,255,255,0.75)",
            scaleBackdropPaddingY : 2,
            scaleBackdropPaddingX : 2,
            angleShowLineOut : true,
            angleLineColor : "rgba(0,0,0,.1)",
            angleLineWidth : 1,
            pointLabelFontFamily : "'Arial'",
            pointLabelFontStyle : "normal",
            pointLabelFontSize : 12,
            pointLabelFontColor : "#666",
            pointDot : true,
            pointDotRadius : 3,
            pointDotStrokeWidth : 1,
            datasetStroke : true,
            datasetStrokeWidth : 2,
            datasetFill : true,
            animation : true,
            animationSteps : 60,
            animationEasing : "easeOutQuart",
            onAnimationComplete : null
        };

        var config = (options)? mergeChartConfig(chart.Radar.defaults,options) : chart.Radar.defaults;

        return new Radar(data,config,context);
    };

    this.Pie = function(data,options){
        chart.Pie.defaults = {
            segmentShowStroke : true,
            segmentStrokeColor : "#fff",
            segmentStrokeWidth : 2,
            animation : true,
            animationSteps : 100,
            animationEasing : "easeOutBounce",
            animateRotate : true,
            animateScale : false,
            onAnimationComplete : null
        };

        var config = (options)? mergeChartConfig(chart.Pie.defaults,options) : chart.Pie.defaults;

        return new Pie(data,config,context);
    };

    this.Doughnut = function(data,options){

        chart.Doughnut.defaults = {
            segmentShowStroke : true,
            segmentStrokeColor : "#fff",
            segmentStrokeWidth : 2,
            percentageInnerCutout : 50,
            animation : true,
            animationSteps : 100,
            animationEasing : "easeOutBounce",
            animateRotate : true,
            animateScale : false,
            onAnimationComplete : null
        };

        var config = (options)? mergeChartConfig(chart.Doughnut.defaults,options) : chart.Doughnut.defaults;

        return new Doughnut(data,config,context);

    };

    this.Line = function(data,options){

        chart.Line.defaults = {
            scaleOverlay : false,
            scaleOverride : false,
            scaleSteps : null,
            scaleStepWidth : null,
            scaleStartValue : null,
            scaleLineColor : "rgba(0,0,0,.1)",
            scaleLineWidth : 1,
            scaleShowLabels : true,
            scaleLabel : "<%=value%>",
            scaleFontFamily : "'Arial'",
            scaleFontSize : 12,
            scaleFontStyle : "normal",
            scaleFontColor : "#666",
            scaleShowGridLines : true,
            scaleGridLineColor : "rgba(0,0,0,.05)",
            scaleGridLineWidth : 1,
            bezierCurve : true,
            pointDot : true,
            pointDotRadius : 4,
            pointDotStrokeWidth : 2,
            datasetStroke : true,
            datasetStrokeWidth : 2,
            datasetFill : true,
            animation : true,
            animationSteps : 60,
            animationEasing : "easeOutQuart",
            onAnimationComplete : null
        };
        var config = (options) ? mergeChartConfig(chart.Line.defaults,options) : chart.Line.defaults;

        return new Line(data,config,context);
    }

    this.Bar = function(data,options){
        chart.Bar.defaults = {
            scaleOverlay : false,
            scaleOverride : false,
            scaleSteps : null,
            scaleStepWidth : null,
            scaleStartValue : null,
            scaleLineColor : "rgba(0,0,0,.1)",
            scaleLineWidth : 1,
            scaleShowLabels : true,
            scaleLabel : "<%=value%>",
            scaleFontFamily : "'Arial'",
            scaleFontSize : 12,
            scaleFontStyle : "normal",
            scaleFontColor : "#666",
            scaleShowGridLines : true,
            scaleGridLineColor : "rgba(0,0,0,.05)",
            scaleGridLineWidth : 1,
            barShowStroke : true,
            barStrokeWidth : 2,
            barValueSpacing : 5,
            barDatasetSpacing : 1,
            animation : true,
            animationSteps : 60,
            animationEasing : "easeOutQuart",
            onAnimationComplete : null
        };
        var config = (options) ? mergeChartConfig(chart.Bar.defaults,options) : chart.Bar.defaults;

        return new Bar(data,config,context);
    }

    var clear = function(c){
        c.clearRect(0, 0, width, height);
    };

    var PolarArea = function(data,config,ctx){
        var maxSize, scaleHop, calculatedScale, labelHeight, scaleHeight, valueBounds, labelTemplateString;


        calculateDrawingSizes();

        valueBounds = getValueBounds();

        labelTemplateString = (config.scaleShowLabels)? config.scaleLabel : null;

        //Check and set the scale
        if (!config.scaleOverride){

            calculatedScale = calculateScale(scaleHeight,valueBounds.maxSteps,valueBounds.minSteps,valueBounds.maxValue,valueBounds.minValue,labelTemplateString);
        }
        else {
            calculatedScale = {
                steps : config.scaleSteps,
                stepValue : config.scaleStepWidth,
                graphMin : config.scaleStartValue,
                labels : []
            }
            populateLabels(labelTemplateString, calculatedScale.labels,calculatedScale.steps,config.scaleStartValue,config.scaleStepWidth);
        }

        scaleHop = maxSize/(calculatedScale.steps);

        //Wrap in an animation loop wrapper
        animationLoop(config,drawScale,drawAllSegments,ctx);

        function calculateDrawingSizes(){
            maxSize = (Min([width,height])/2);
            //Remove whatever is larger - the font size or line width.

            maxSize -= Max([config.scaleFontSize*0.5,config.scaleLineWidth*0.5]);

            labelHeight = config.scaleFontSize*2;
            //If we're drawing the backdrop - add the Y padding to the label height and remove from drawing region.
            if (config.scaleShowLabelBackdrop){
                labelHeight += (2 * config.scaleBackdropPaddingY);
                maxSize -= config.scaleBackdropPaddingY*1.5;
            }

            scaleHeight = maxSize;
            //If the label height is less than 5, set it to 5 so we don't have lines on top of each other.
            labelHeight = Default(labelHeight,5);
        }
        function drawScale(){
            for (var i=0; i<calculatedScale.steps; i++){
                //If the line object is there
                if (config.scaleShowLine){
                    ctx.beginPath();
                    ctx.arc(width/2, height/2, scaleHop * (i + 1), 0, (Math.PI * 2), true);
                    ctx.strokeStyle = config.scaleLineColor;
                    ctx.lineWidth = config.scaleLineWidth;
                    ctx.stroke();
                }

                if (config.scaleShowLabels){
                    ctx.textAlign = "center";
                    ctx.font = config.scaleFontStyle + " " + config.scaleFontSize + "px " + config.scaleFontFamily;
                    var label =  calculatedScale.labels[i];
                    //If the backdrop object is within the font object
                    if (config.scaleShowLabelBackdrop){
                        var textWidth = ctx.measureText(label).width;
                        ctx.fillStyle = config.scaleBackdropColor;
                        ctx.beginPath();
                        ctx.rect(
                            Math.round(width/2 - textWidth/2 - config.scaleBackdropPaddingX),     //X
                            Math.round(height/2 - (scaleHop * (i + 1)) - config.scaleFontSize*0.5 - config.scaleBackdropPaddingY),//Y
                            Math.round(textWidth + (config.scaleBackdropPaddingX*2)), //Width
                            Math.round(config.scaleFontSize + (config.scaleBackdropPaddingY*2)) //Height
                        );
                        ctx.fill();
                    }
                    ctx.textBaseline = "middle";
                    ctx.fillStyle = config.scaleFontColor;
                    ctx.fillText(label,width/2,height/2 - (scaleHop * (i + 1)));
                }
            }
        }
        function drawAllSegments(animationDecimal){
            var startAngle = -Math.PI/2,
                angleStep = (Math.PI*2)/data.length,
                scaleAnimation = 1,
                rotateAnimation = 1;
            if (config.animation) {
                if (config.animateScale) {
                    scaleAnimation = animationDecimal;
                }
                if (config.animateRotate){
                    rotateAnimation = animationDecimal;
                }
            }

            for (var i=0; i<data.length; i++){

                ctx.beginPath();
                ctx.arc(width/2,height/2,scaleAnimation * calculateOffset(data[i].value,calculatedScale,scaleHop),startAngle, startAngle + rotateAnimation*angleStep, false);
                ctx.lineTo(width/2,height/2);
                ctx.closePath();
                ctx.fillStyle = data[i].color;
                ctx.fill();

                if(config.segmentShowStroke){
                    ctx.strokeStyle = config.segmentStrokeColor;
                    ctx.lineWidth = config.segmentStrokeWidth;
                    ctx.stroke();
                }
                startAngle += rotateAnimation*angleStep;
            }
        }
        function getValueBounds() {
            var upperValue = Number.MIN_VALUE;
            var lowerValue = Number.MAX_VALUE;
            for (var i=0; i<data.length; i++){
                if (data[i].value > upperValue) {upperValue = data[i].value;}
                if (data[i].value < lowerValue) {lowerValue = data[i].value;}
            };

            var maxSteps = Math.floor((scaleHeight / (labelHeight*0.66)));
            var minSteps = Math.floor((scaleHeight / labelHeight*0.5));

            return {
                maxValue : upperValue,
                minValue : lowerValue,
                maxSteps : maxSteps,
                minSteps : minSteps
            };


        }
    }

    var Radar = function (data,config,ctx) {
        var maxSize, scaleHop, calculatedScale, labelHeight, scaleHeight, valueBounds, labelTemplateString;

        //If no labels are defined set to an empty array, so referencing length for looping doesn't blow up.
        if (!data.labels) data.labels = [];

        calculateDrawingSizes();

        var valueBounds = getValueBounds();

        labelTemplateString = (config.scaleShowLabels)? config.scaleLabel : null;

        //Check and set the scale
        if (!config.scaleOverride){

            calculatedScale = calculateScale(scaleHeight,valueBounds.maxSteps,valueBounds.minSteps,valueBounds.maxValue,valueBounds.minValue,labelTemplateString);
        }
        else {
            calculatedScale = {
                steps : config.scaleSteps,
                stepValue : config.scaleStepWidth,
                graphMin : config.scaleStartValue,
                labels : []
            }
            populateLabels(labelTemplateString, calculatedScale.labels,calculatedScale.steps,config.scaleStartValue,config.scaleStepWidth);
        }

        scaleHop = maxSize/(calculatedScale.steps);

        animationLoop(config,drawScale,drawAllDataPoints,ctx);

        //Radar specific functions.
        function drawAllDataPoints(animationDecimal){
            var rotationDegree = (2*Math.PI)/data.datasets[0].data.length;

            ctx.save();
            //translate to the centre of the canvas.
            ctx.translate(width/2,height/2);

            //We accept multiple data sets for radar charts, so show loop through each set
            for (var i=0; i<data.datasets.length; i++){
                ctx.beginPath();

                ctx.moveTo(0,animationDecimal*(-1*calculateOffset(data.datasets[i].data[0],calculatedScale,scaleHop)));
                for (var j=1; j<data.datasets[i].data.length; j++){
                    ctx.rotate(rotationDegree);
                    ctx.lineTo(0,animationDecimal*(-1*calculateOffset(data.datasets[i].data[j],calculatedScale,scaleHop)));

                }
                ctx.closePath();


                ctx.fillStyle = data.datasets[i].fillColor;
                ctx.strokeStyle = data.datasets[i].strokeColor;
                ctx.lineWidth = config.datasetStrokeWidth;
                ctx.fill();
                ctx.stroke();


                if (config.pointDot){
                    ctx.fillStyle = data.datasets[i].pointColor;
                    ctx.strokeStyle = data.datasets[i].pointStrokeColor;
                    ctx.lineWidth = config.pointDotStrokeWidth;
                    for (var k=0; k<data.datasets[i].data.length; k++){
                        ctx.rotate(rotationDegree);
                        ctx.beginPath();
                        ctx.arc(0,animationDecimal*(-1*calculateOffset(data.datasets[i].data[k],calculatedScale,scaleHop)),config.pointDotRadius,2*Math.PI,false);
                        ctx.fill();
                        ctx.stroke();
                    }

                }
                ctx.rotate(rotationDegree);

            }
            ctx.restore();


        }
        function drawScale(){
            var rotationDegree = (2*Math.PI)/data.datasets[0].data.length;
            ctx.save();
            ctx.translate(width / 2, height / 2);

            if (config.angleShowLineOut){
                ctx.strokeStyle = config.angleLineColor;
                ctx.lineWidth = config.angleLineWidth;
                for (var h=0; h<data.datasets[0].data.length; h++){

                    ctx.rotate(rotationDegree);
                    ctx.beginPath();
                    ctx.moveTo(0,0);
                    ctx.lineTo(0,-maxSize);
                    ctx.stroke();
                }
            }

            for (var i=0; i<calculatedScale.steps; i++){
                ctx.beginPath();

                if(config.scaleShowLine){
                    ctx.strokeStyle = config.scaleLineColor;
                    ctx.lineWidth = config.scaleLineWidth;
                    ctx.moveTo(0,-scaleHop * (i+1));
                    for (var j=0; j<data.datasets[0].data.length; j++){
                        ctx.rotate(rotationDegree);
                        ctx.lineTo(0,-scaleHop * (i+1));
                    }
                    ctx.closePath();
                    ctx.stroke();

                }

                if (config.scaleShowLabels){
                    ctx.textAlign = 'center';
                    ctx.font = config.scaleFontStyle + " " + config.scaleFontSize+"px " + config.scaleFontFamily;
                    ctx.textBaseline = "middle";

                    if (config.scaleShowLabelBackdrop){
                        var textWidth = ctx.measureText(calculatedScale.labels[i]).width;
                        ctx.fillStyle = config.scaleBackdropColor;
                        ctx.beginPath();
                        ctx.rect(
                            Math.round(- textWidth/2 - config.scaleBackdropPaddingX),     //X
                            Math.round((-scaleHop * (i + 1)) - config.scaleFontSize*0.5 - config.scaleBackdropPaddingY),//Y
                            Math.round(textWidth + (config.scaleBackdropPaddingX*2)), //Width
                            Math.round(config.scaleFontSize + (config.scaleBackdropPaddingY*2)) //Height
                        );
                        ctx.fill();
                    }
                    ctx.fillStyle = config.scaleFontColor;
                    ctx.fillText(calculatedScale.labels[i],0,-scaleHop*(i+1));
                }

            }
            for (var k=0; k<data.labels.length; k++){
                ctx.font = config.pointLabelFontStyle + " " + config.pointLabelFontSize+"px " + config.pointLabelFontFamily;
                ctx.fillStyle = config.pointLabelFontColor;
                var opposite = Math.sin(rotationDegree*k) * (maxSize + config.pointLabelFontSize);
                var adjacent = Math.cos(rotationDegree*k) * (maxSize + config.pointLabelFontSize);

                if(rotationDegree*k == Math.PI || rotationDegree*k == 0){
                    ctx.textAlign = "center";
                }
                else if(rotationDegree*k > Math.PI){
                    ctx.textAlign = "right";
                }
                else{
                    ctx.textAlign = "left";
                }

                ctx.textBaseline = "middle";

                ctx.fillText(data.labels[k],opposite,-adjacent);

            }
            ctx.restore();
        };
        function calculateDrawingSizes(){
            maxSize = (Min([width,height])/2);

            labelHeight = config.scaleFontSize*2;

            var labelLength = 0;
            for (var i=0; i<data.labels.length; i++){
                ctx.font = config.pointLabelFontStyle + " " + config.pointLabelFontSize+"px " + config.pointLabelFontFamily;
                var textMeasurement = ctx.measureText(data.labels[i]).width;
                if(textMeasurement>labelLength) labelLength = textMeasurement;
            }

            //Figure out whats the largest - the height of the text or the width of what's there, and minus it from the maximum usable size.
            maxSize -= Max([labelLength,((config.pointLabelFontSize/2)*1.5)]);

            maxSize -= config.pointLabelFontSize;
            maxSize = CapValue(maxSize, null, 0);
            scaleHeight = maxSize;
            //If the label height is less than 5, set it to 5 so we don't have lines on top of each other.
            labelHeight = Default(labelHeight,5);
        };
        function getValueBounds() {
            var upperValue = Number.MIN_VALUE;
            var lowerValue = Number.MAX_VALUE;

            for (var i=0; i<data.datasets.length; i++){
                for (var j=0; j<data.datasets[i].data.length; j++){
                    if (data.datasets[i].data[j] > upperValue){upperValue = data.datasets[i].data[j]}
                    if (data.datasets[i].data[j] < lowerValue){lowerValue = data.datasets[i].data[j]}
                }
            }

            var maxSteps = Math.floor((scaleHeight / (labelHeight*0.66)));
            var minSteps = Math.floor((scaleHeight / labelHeight*0.5));

            return {
                maxValue : upperValue,
                minValue : lowerValue,
                maxSteps : maxSteps,
                minSteps : minSteps
            };


        }
    }

    var Pie = function(data,config,ctx){
        var segmentTotal = 0;

        //In case we have a canvas that is not a square. Minus 5 pixels as padding round the edge.
        var pieRadius = Min([height/2,width/2]) - 5;

        for (var i=0; i<data.length; i++){
            segmentTotal += data[i].value;
        }


        animationLoop(config,null,drawPieSegments,ctx);

        function drawPieSegments (animationDecimal){
            var cumulativeAngle = -Math.PI/2,
                scaleAnimation = 1,
                rotateAnimation = 1;
            if (config.animation) {
                if (config.animateScale) {
                    scaleAnimation = animationDecimal;
                }
                if (config.animateRotate){
                    rotateAnimation = animationDecimal;
                }
            }
            for (var i=0; i<data.length; i++){
                var segmentAngle = rotateAnimation * ((data[i].value/segmentTotal) * (Math.PI*2));
                ctx.beginPath();
                ctx.arc(width/2,height/2,scaleAnimation * pieRadius,cumulativeAngle,cumulativeAngle + segmentAngle);
                ctx.lineTo(width/2,height/2);
                ctx.closePath();
                ctx.fillStyle = data[i].color;
                ctx.fill();

                if(config.segmentShowStroke){
                    ctx.lineWidth = config.segmentStrokeWidth;
                    ctx.strokeStyle = config.segmentStrokeColor;
                    ctx.stroke();
                }
                cumulativeAngle += segmentAngle;
            }
        }
    }

    var Doughnut = function(data,config,ctx){
        var segmentTotal = 0;

        //In case we have a canvas that is not a square. Minus 5 pixels as padding round the edge.
        var doughnutRadius = Min([height/2,width/2]) - 5;

        var cutoutRadius = doughnutRadius * (config.percentageInnerCutout/100);

        for (var i=0; i<data.length; i++){
            segmentTotal += data[i].value;
        }


        animationLoop(config,null,drawPieSegments,ctx);


        function drawPieSegments (animationDecimal){
            var cumulativeAngle = -Math.PI/2,
                scaleAnimation = 1,
                rotateAnimation = 1;
            if (config.animation) {
                if (config.animateScale) {
                    scaleAnimation = animationDecimal;
                }
                if (config.animateRotate){
                    rotateAnimation = animationDecimal;
                }
            }
            for (var i=0; i<data.length; i++){
                var segmentAngle = rotateAnimation * ((data[i].value/segmentTotal) * (Math.PI*2));
                ctx.beginPath();
                ctx.arc(width/2,height/2,scaleAnimation * doughnutRadius,cumulativeAngle,cumulativeAngle + segmentAngle,false);
                ctx.arc(width/2,height/2,scaleAnimation * cutoutRadius,cumulativeAngle + segmentAngle,cumulativeAngle,true);
                ctx.closePath();
                ctx.fillStyle = data[i].color;
                ctx.fill();

                if(config.segmentShowStroke){
                    ctx.lineWidth = config.segmentStrokeWidth;
                    ctx.strokeStyle = config.segmentStrokeColor;
                    ctx.stroke();
                }
                cumulativeAngle += segmentAngle;
            }
        }



    }

    var Line = function(data,config,ctx){
        var maxSize, scaleHop, calculatedScale, labelHeight, scaleHeight, valueBounds, labelTemplateString, valueHop,widestXLabel, xAxisLength,yAxisPosX,xAxisPosY, rotateLabels = 0;

        calculateDrawingSizes();

        valueBounds = getValueBounds();
        //Check and set the scale
        labelTemplateString = (config.scaleShowLabels)? config.scaleLabel : "";
        if (!config.scaleOverride){

            calculatedScale = calculateScale(scaleHeight,valueBounds.maxSteps,valueBounds.minSteps,valueBounds.maxValue,valueBounds.minValue,labelTemplateString);
        }
        else {
            calculatedScale = {
                steps : config.scaleSteps,
                stepValue : config.scaleStepWidth,
                graphMin : config.scaleStartValue,
                labels : []
            }
            populateLabels(labelTemplateString, calculatedScale.labels,calculatedScale.steps,config.scaleStartValue,config.scaleStepWidth);
        }

        scaleHop = Math.floor(scaleHeight/calculatedScale.steps);
        calculateXAxisSize();
        animationLoop(config,drawScale,drawLines,ctx);

        function drawLines(animPc){
            for (var i=0; i<data.datasets.length; i++){
                ctx.strokeStyle = data.datasets[i].strokeColor;
                ctx.lineWidth = config.datasetStrokeWidth;
                ctx.beginPath();
                ctx.moveTo(yAxisPosX, xAxisPosY - animPc*(calculateOffset(data.datasets[i].data[0],calculatedScale,scaleHop)))

                for (var j=1; j<data.datasets[i].data.length; j++){
                    if (config.bezierCurve){
                        ctx.bezierCurveTo(xPos(j-0.5),yPos(i,j-1),xPos(j-0.5),yPos(i,j),xPos(j),yPos(i,j));
                    }
                    else{
                        ctx.lineTo(xPos(j),yPos(i,j));
                    }
                }
                ctx.stroke();
                if (config.datasetFill){
                    ctx.lineTo(yAxisPosX + (valueHop*(data.datasets[i].data.length-1)),xAxisPosY);
                    ctx.lineTo(yAxisPosX,xAxisPosY);
                    ctx.closePath();
                    ctx.fillStyle = data.datasets[i].fillColor;
                    ctx.fill();
                }
                else{
                    ctx.closePath();
                }
                if(config.pointDot){
                    ctx.fillStyle = data.datasets[i].pointColor;
                    ctx.strokeStyle = data.datasets[i].pointStrokeColor;
                    ctx.lineWidth = config.pointDotStrokeWidth;
                    for (var k=0; k<data.datasets[i].data.length; k++){
                        ctx.beginPath();
                        ctx.arc(yAxisPosX + (valueHop *k),xAxisPosY - animPc*(calculateOffset(data.datasets[i].data[k],calculatedScale,scaleHop)),config.pointDotRadius,0,Math.PI*2,true);
                        ctx.fill();
                        ctx.stroke();
                    }
                }
            }

            function yPos(dataSet,iteration){
                return xAxisPosY - animPc*(calculateOffset(data.datasets[dataSet].data[iteration],calculatedScale,scaleHop));
            }
            function xPos(iteration){
                return yAxisPosX + (valueHop * iteration);
            }
        }
        function drawScale(){
            //X axis line
            ctx.lineWidth = config.scaleLineWidth;
            ctx.strokeStyle = config.scaleLineColor;
            ctx.beginPath();
            ctx.moveTo(width-widestXLabel/2+5,xAxisPosY);
            ctx.lineTo(width-(widestXLabel/2)-xAxisLength-5,xAxisPosY);
            ctx.stroke();


            if (rotateLabels > 0){
                ctx.save();
                ctx.textAlign = "right";
            }
            else{
                ctx.textAlign = "center";
            }
            ctx.fillStyle = config.scaleFontColor;
            for (var i=0; i<data.labels.length; i++){
                ctx.save();
                if (rotateLabels > 0){
                    ctx.translate(yAxisPosX + i*valueHop,xAxisPosY + config.scaleFontSize);
                    ctx.rotate(-(rotateLabels * (Math.PI/180)));
                    ctx.fillText(data.labels[i], 0,0);
                    ctx.restore();
                }

                else{
                    ctx.fillText(data.labels[i], yAxisPosX + i*valueHop,xAxisPosY + config.scaleFontSize+3);
                }

                ctx.beginPath();
                ctx.moveTo(yAxisPosX + i * valueHop, xAxisPosY+3);

                //Check i isnt 0, so we dont go over the Y axis twice.
                if(config.scaleShowGridLines && i>0){
                    ctx.lineWidth = config.scaleGridLineWidth;
                    ctx.strokeStyle = config.scaleGridLineColor;
                    ctx.lineTo(yAxisPosX + i * valueHop, 5);
                }
                else{
                    ctx.lineTo(yAxisPosX + i * valueHop, xAxisPosY+3);
                }
                ctx.stroke();
            }

            //Y axis
            ctx.lineWidth = config.scaleLineWidth;
            ctx.strokeStyle = config.scaleLineColor;
            ctx.beginPath();
            ctx.moveTo(yAxisPosX,xAxisPosY+5);
            ctx.lineTo(yAxisPosX,5);
            ctx.stroke();

            ctx.textAlign = "right";
            ctx.textBaseline = "middle";
            for (var j=0; j<calculatedScale.steps; j++){
                ctx.beginPath();
                ctx.moveTo(yAxisPosX-3,xAxisPosY - ((j+1) * scaleHop));
                if (config.scaleShowGridLines){
                    ctx.lineWidth = config.scaleGridLineWidth;
                    ctx.strokeStyle = config.scaleGridLineColor;
                    ctx.lineTo(yAxisPosX + xAxisLength + 5,xAxisPosY - ((j+1) * scaleHop));
                }
                else{
                    ctx.lineTo(yAxisPosX-0.5,xAxisPosY - ((j+1) * scaleHop));
                }

                ctx.stroke();

                if (config.scaleShowLabels){
                    ctx.fillText(calculatedScale.labels[j],yAxisPosX-8,xAxisPosY - ((j+1) * scaleHop));
                }
            }


        }
        function calculateXAxisSize(){
            var longestText = 1;
            //if we are showing the labels
            if (config.scaleShowLabels){
                ctx.font = config.scaleFontStyle + " " + config.scaleFontSize+"px " + config.scaleFontFamily;
                for (var i=0; i<calculatedScale.labels.length; i++){
                    var measuredText = ctx.measureText(calculatedScale.labels[i]).width;
                    longestText = (measuredText > longestText)? measuredText : longestText;
                }
                //Add a little extra padding from the y axis
                longestText +=10;
            }
            xAxisLength = width - longestText - widestXLabel;
            valueHop = Math.floor(xAxisLength/(data.labels.length-1));

            yAxisPosX = width-widestXLabel/2-xAxisLength;
            xAxisPosY = scaleHeight + config.scaleFontSize/2;
        }
        function calculateDrawingSizes(){
            maxSize = height;

            //Need to check the X axis first - measure the length of each text metric, and figure out if we need to rotate by 45 degrees.
            ctx.font = config.scaleFontStyle + " " + config.scaleFontSize+"px " + config.scaleFontFamily;
            widestXLabel = 1;
            for (var i=0; i<data.labels.length; i++){
                var textLength = ctx.measureText(data.labels[i]).width;
                //If the text length is longer - make that equal to longest text!
                widestXLabel = (textLength > widestXLabel)? textLength : widestXLabel;
            }
            if (width/data.labels.length < widestXLabel){
                rotateLabels = 45;
                if (width/data.labels.length < Math.cos(rotateLabels) * widestXLabel){
                    rotateLabels = 90;
                    maxSize -= widestXLabel;
                }
                else{
                    maxSize -= Math.sin(rotateLabels) * widestXLabel;
                }
            }
            else{
                maxSize -= config.scaleFontSize;
            }

            //Add a little padding between the x line and the text
            maxSize -= 5;


            labelHeight = config.scaleFontSize;

            maxSize -= labelHeight;
            //Set 5 pixels greater than the font size to allow for a little padding from the X axis.

            scaleHeight = maxSize;

            //Then get the area above we can safely draw on.

        }
        function getValueBounds() {
            var upperValue = Number.MIN_VALUE;
            var lowerValue = Number.MAX_VALUE;
            for (var i=0; i<data.datasets.length; i++){
                for (var j=0; j<data.datasets[i].data.length; j++){
                    if ( data.datasets[i].data[j] > upperValue) { upperValue = data.datasets[i].data[j] };
                    if ( data.datasets[i].data[j] < lowerValue) { lowerValue = data.datasets[i].data[j] };
                }
            };

            var maxSteps = Math.floor((scaleHeight / (labelHeight*0.66)));
            var minSteps = Math.floor((scaleHeight / labelHeight*0.5));

            return {
                maxValue : upperValue,
                minValue : lowerValue,
                maxSteps : maxSteps,
                minSteps : minSteps
            };


        }


    }

    var Bar = function(data,config,ctx){
        var maxSize, scaleHop, calculatedScale, labelHeight, scaleHeight, valueBounds, labelTemplateString, valueHop,widestXLabel, xAxisLength,yAxisPosX,xAxisPosY,barWidth, rotateLabels = 0;

        calculateDrawingSizes();

        valueBounds = getValueBounds();
        //Check and set the scale
        labelTemplateString = (config.scaleShowLabels)? config.scaleLabel : "";
        if (!config.scaleOverride){

            calculatedScale = calculateScale(scaleHeight,valueBounds.maxSteps,valueBounds.minSteps,valueBounds.maxValue,valueBounds.minValue,labelTemplateString);
        }
        else {
            calculatedScale = {
                steps : config.scaleSteps,
                stepValue : config.scaleStepWidth,
                graphMin : config.scaleStartValue,
                labels : []
            }
            populateLabels(labelTemplateString, calculatedScale.labels,calculatedScale.steps,config.scaleStartValue,config.scaleStepWidth);
        }

        scaleHop = Math.floor(scaleHeight/calculatedScale.steps);
        calculateXAxisSize();
        animationLoop(config,drawScale,drawBars,ctx);

        function drawBars(animPc){
            ctx.lineWidth = config.barStrokeWidth;
            for (var i=0; i<data.datasets.length; i++){
                ctx.fillStyle = data.datasets[i].fillColor;
                ctx.strokeStyle = data.datasets[i].strokeColor;
                for (var j=0; j<data.datasets[i].data.length; j++){
                    var barOffset = yAxisPosX + config.barValueSpacing + valueHop*j + barWidth*i + config.barDatasetSpacing*i + config.barStrokeWidth*i;

                    ctx.beginPath();
                    ctx.moveTo(barOffset, xAxisPosY);
                    ctx.lineTo(barOffset, xAxisPosY - animPc*calculateOffset(data.datasets[i].data[j],calculatedScale,scaleHop)+(config.barStrokeWidth/2));
                    ctx.lineTo(barOffset + barWidth, xAxisPosY - animPc*calculateOffset(data.datasets[i].data[j],calculatedScale,scaleHop)+(config.barStrokeWidth/2));
                    ctx.lineTo(barOffset + barWidth, xAxisPosY);
                    if(config.barShowStroke){
                        ctx.stroke();
                    }
                    ctx.closePath();
                    ctx.fill();
                }
            }

        }
        function drawScale(){
            //X axis line
            ctx.lineWidth = config.scaleLineWidth;
            ctx.strokeStyle = config.scaleLineColor;
            ctx.beginPath();
            ctx.moveTo(width-widestXLabel/2+5,xAxisPosY);
            ctx.lineTo(width-(widestXLabel/2)-xAxisLength-5,xAxisPosY);
            ctx.stroke();


            if (rotateLabels > 0){
                ctx.save();
                ctx.textAlign = "right";
            }
            else{
                ctx.textAlign = "center";
            }
            ctx.fillStyle = config.scaleFontColor;
            for (var i=0; i<data.labels.length; i++){
                ctx.save();
                if (rotateLabels > 0){
                    ctx.translate(yAxisPosX + i*valueHop,xAxisPosY + config.scaleFontSize);
                    ctx.rotate(-(rotateLabels * (Math.PI/180)));
                    ctx.fillText(data.labels[i], 0,0);
                    ctx.restore();
                }

                else{
                    ctx.fillText(data.labels[i], yAxisPosX + i*valueHop + valueHop/2,xAxisPosY + config.scaleFontSize+3);
                }

                ctx.beginPath();
                ctx.moveTo(yAxisPosX + (i+1) * valueHop, xAxisPosY+3);

                //Check i isnt 0, so we dont go over the Y axis twice.
                ctx.lineWidth = config.scaleGridLineWidth;
                ctx.strokeStyle = config.scaleGridLineColor;
                ctx.lineTo(yAxisPosX + (i+1) * valueHop, 5);
                ctx.stroke();
            }

            //Y axis
            ctx.lineWidth = config.scaleLineWidth;
            ctx.strokeStyle = config.scaleLineColor;
            ctx.beginPath();
            ctx.moveTo(yAxisPosX,xAxisPosY+5);
            ctx.lineTo(yAxisPosX,5);
            ctx.stroke();

            ctx.textAlign = "right";
            ctx.textBaseline = "middle";
            for (var j=0; j<calculatedScale.steps; j++){
                ctx.beginPath();
                ctx.moveTo(yAxisPosX-3,xAxisPosY - ((j+1) * scaleHop));
                if (config.scaleShowGridLines){
                    ctx.lineWidth = config.scaleGridLineWidth;
                    ctx.strokeStyle = config.scaleGridLineColor;
                    ctx.lineTo(yAxisPosX + xAxisLength + 5,xAxisPosY - ((j+1) * scaleHop));
                }
                else{
                    ctx.lineTo(yAxisPosX-0.5,xAxisPosY - ((j+1) * scaleHop));
                }

                ctx.stroke();
                if (config.scaleShowLabels){
                    ctx.fillText(calculatedScale.labels[j],yAxisPosX-8,xAxisPosY - ((j+1) * scaleHop));
                }
            }


        }
        function calculateXAxisSize(){
            var longestText = 1;
            //if we are showing the labels
            if (config.scaleShowLabels){
                ctx.font = config.scaleFontStyle + " " + config.scaleFontSize+"px " + config.scaleFontFamily;
                for (var i=0; i<calculatedScale.labels.length; i++){
                    var measuredText = ctx.measureText(calculatedScale.labels[i]).width;
                    longestText = (measuredText > longestText)? measuredText : longestText;
                }
                //Add a little extra padding from the y axis
                longestText +=10;
            }
            xAxisLength = width - longestText - widestXLabel;
            valueHop = Math.floor(xAxisLength/(data.labels.length));

            barWidth = (valueHop - config.scaleGridLineWidth*2 - (config.barValueSpacing*2) - (config.barDatasetSpacing*data.datasets.length-1) - ((config.barStrokeWidth/2)*data.datasets.length-1))/data.datasets.length;

            yAxisPosX = width-widestXLabel/2-xAxisLength;
            xAxisPosY = scaleHeight + config.scaleFontSize/2;
        }
        function calculateDrawingSizes(){
            maxSize = height;

            //Need to check the X axis first - measure the length of each text metric, and figure out if we need to rotate by 45 degrees.
            ctx.font = config.scaleFontStyle + " " + config.scaleFontSize+"px " + config.scaleFontFamily;
            widestXLabel = 1;
            for (var i=0; i<data.labels.length; i++){
                var textLength = ctx.measureText(data.labels[i]).width;
                //If the text length is longer - make that equal to longest text!
                widestXLabel = (textLength > widestXLabel)? textLength : widestXLabel;
            }
            if (width/data.labels.length < widestXLabel){
                rotateLabels = 45;
                if (width/data.labels.length < Math.cos(rotateLabels) * widestXLabel){
                    rotateLabels = 90;
                    maxSize -= widestXLabel;
                }
                else{
                    maxSize -= Math.sin(rotateLabels) * widestXLabel;
                }
            }
            else{
                maxSize -= config.scaleFontSize;
            }

            //Add a little padding between the x line and the text
            maxSize -= 5;


            labelHeight = config.scaleFontSize;

            maxSize -= labelHeight;
            //Set 5 pixels greater than the font size to allow for a little padding from the X axis.

            scaleHeight = maxSize;

            //Then get the area above we can safely draw on.

        }
        function getValueBounds() {
            var upperValue = Number.MIN_VALUE;
            var lowerValue = Number.MAX_VALUE;
            for (var i=0; i<data.datasets.length; i++){
                for (var j=0; j<data.datasets[i].data.length; j++){
                    if ( data.datasets[i].data[j] > upperValue) { upperValue = data.datasets[i].data[j] };
                    if ( data.datasets[i].data[j] < lowerValue) { lowerValue = data.datasets[i].data[j] };
                }
            };

            var maxSteps = Math.floor((scaleHeight / (labelHeight*0.66)));
            var minSteps = Math.floor((scaleHeight / labelHeight*0.5));

            return {
                maxValue : upperValue,
                minValue : lowerValue,
                maxSteps : maxSteps,
                minSteps : minSteps
            };


        }
    }

    function calculateOffset(val,calculatedScale,scaleHop){
        var outerValue = calculatedScale.steps * calculatedScale.stepValue;
        var adjustedValue = val - calculatedScale.graphMin;
        var scalingFactor = CapValue(adjustedValue/outerValue,1,0);
        return (scaleHop*calculatedScale.steps) * scalingFactor;
    }

    function animationLoop(config,drawScale,drawData,ctx){
        var animFrameAmount = (config.animation)? 1/CapValue(config.animationSteps,Number.MAX_VALUE,1) : 1,
            easingFunction = animationOptions[config.animationEasing],
            percentAnimComplete =(config.animation)? 0 : 1;



        if (typeof drawScale !== "function") drawScale = function(){};

        requestAnimFrame(animLoop);

        function animateFrame(){
            var easeAdjustedAnimationPercent =(config.animation)? CapValue(easingFunction(percentAnimComplete),null,0) : 1;
            clear(ctx);
            if(config.scaleOverlay){
                drawData(easeAdjustedAnimationPercent);
                drawScale();
            } else {
                drawScale();
                drawData(easeAdjustedAnimationPercent);
            }
        }
        function animLoop(){
            //We need to check if the animation is incomplete (less than 1), or complete (1).
            percentAnimComplete += animFrameAmount;
            animateFrame();
            //Stop the loop continuing forever
            if (percentAnimComplete <= 1){
                requestAnimFrame(animLoop);
            }
            else{
                if (typeof config.onAnimationComplete == "function") config.onAnimationComplete();
            }

        }

    }

    //Declare global functions to be called within this namespace here.


    // shim layer with setTimeout fallback
    var requestAnimFrame = (function(){
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    function calculateScale(drawingHeight,maxSteps,minSteps,maxValue,minValue,labelTemplateString){
        var graphMin,graphMax,graphRange,stepValue,numberOfSteps,valueRange,rangeOrderOfMagnitude,decimalNum;

        valueRange = maxValue - minValue;

        rangeOrderOfMagnitude = calculateOrderOfMagnitude(valueRange);

        graphMin = Math.floor(minValue / (1 * Math.pow(10, rangeOrderOfMagnitude))) * Math.pow(10, rangeOrderOfMagnitude);

        graphMax = Math.ceil(maxValue / (1 * Math.pow(10, rangeOrderOfMagnitude))) * Math.pow(10, rangeOrderOfMagnitude);

        graphRange = graphMax - graphMin;

        stepValue = Math.pow(10, rangeOrderOfMagnitude);

        numberOfSteps = Math.round(graphRange / stepValue);

        //Compare number of steps to the max and min for that size graph, and add in half steps if need be.
        while(numberOfSteps < minSteps || numberOfSteps > maxSteps) {
            if (numberOfSteps < minSteps){
                stepValue /= 2;
                numberOfSteps = Math.round(graphRange/stepValue);
            }
            else{
                stepValue *=2;
                numberOfSteps = Math.round(graphRange/stepValue);
            }
        };

        var labels = [];
        populateLabels(labelTemplateString, labels, numberOfSteps, graphMin, stepValue);

        return {
            steps : numberOfSteps,
            stepValue : stepValue,
            graphMin : graphMin,
            labels : labels

        }

        function calculateOrderOfMagnitude(val){
            return Math.floor(Math.log(val) / Math.LN10);
        }


    }

    //Populate an array of all the labels by interpolating the string.
    function populateLabels(labelTemplateString, labels, numberOfSteps, graphMin, stepValue) {
        if (labelTemplateString) {
            //Fix floating point errors by setting to fixed the on the same decimal as the stepValue.
            for (var i = 1; i < numberOfSteps + 1; i++) {
                labels.push(tmpl(labelTemplateString, {value: (graphMin + (stepValue * i)).toFixed(getDecimalPlaces(stepValue))}));
            }
        }
    }

    //Max value from array
    function Max( array ){
        return Math.max.apply( Math, array );
    };
    //Min value from array
    function Min( array ){
        return Math.min.apply( Math, array );
    };
    //Default if undefined
    function Default(userDeclared,valueIfFalse){
        if(!userDeclared){
            return valueIfFalse;
        } else {
            return userDeclared;
        }
    };
    //Is a number function
    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
    //Apply cap a value at a high or low number
    function CapValue(valueToCap, maxValue, minValue){
        if(isNumber(maxValue)) {
            if( valueToCap > maxValue ) {
                return maxValue;
            }
        }
        if(isNumber(minValue)){
            if ( valueToCap < minValue ){
                return minValue;
            }
        }
        return valueToCap;
    }
    function getDecimalPlaces (num){
        var numberOfDecimalPlaces;
        if (num%1!=0){
            return num.toString().split(".")[1].length
        }
        else{
            return 0;
        }

    }

    function mergeChartConfig(defaults,userDefined){
        var returnObj = {};
        for (var attrname in defaults) { returnObj[attrname] = defaults[attrname]; }
        for (var attrname in userDefined) { returnObj[attrname] = userDefined[attrname]; }
        return returnObj;
    }

    //Javascript micro templating by John Resig - source at http://ejohn.org/blog/javascript-micro-templating/
    var cache = {};

    function tmpl(str, data){
        // Figure out if we're getting a template, or if we need to
        // load the template - and be sure to cache the result.
        var fn = !/\W/.test(str) ?
            cache[str] = cache[str] ||
                tmpl(document.getElementById(str).innerHTML) :

            // Generate a reusable function that will serve as a template
            // generator (and which will be cached).
            new Function("obj",
                    "var p=[],print=function(){p.push.apply(p,arguments);};" +

                    // Introduce the data as local variables using with(){}
                    "with(obj){p.push('" +

                    // Convert the template into pure JavaScript
                    str
                        .replace(/[\r\t\n]/g, " ")
                        .split("<%").join("\t")
                        .replace(/((^|%>)[^\t]*)'/g, "$1\r")
                        .replace(/\t=(.*?)%>/g, "',$1,'")
                        .split("\t").join("');")
                        .split("%>").join("p.push('")
                        .split("\r").join("\\'")
                    + "');}return p.join('');");

        // Provide some basic currying to the user
        return data ? fn( data ) : fn;
    };
}


module.exports = Chart;

},{}],7:[function(require,module,exports){
(function (global){
/**
 * Copyright 2014 encuestame
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

'use strict';

if (typeof global.__enme_widget != "undefined" && global.__enme_widget.host) {
    (function(document) {

        var _widget = {};
        _widget.callbacks = {};
        _widget.host  = global.__enme_widget.host;
        _widget.initialized = false;
        global.__enme_widget = _widget;
            var base = require('./widgets/base'),
            util = require('./util/dom-utils'),
            render = require('./widgets/render'),
            _ = require('underscore');

            var widgets_selectors = {
                'a.enme-poll-form': base.createPollForm,
                'a.enme-poll-vote': base.createPollVote,
                'a.enme-tp-form'  : base.createTpForm,
                'a.enme-tp-vote'  : base.createTpVote,
                'a.enme-profile'  : base.createProfile,
                'a.enme-hashtag'  : base.createHashtag
            };

            var initialize_widgets = function() {
                if (!_widget.initialized) {
                    render.findWidgets(widgets_selectors, function (data) {
                        _.each(data, function (a, b) {
                            a._module(a);
                        });
                    });
                    _widget.initialized = true;
                }
            };

            util.listen("load", window, function() {
                initialize_widgets();
            });

            _widget.init = initialize_widgets;


    })(document);
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./util/dom-utils":1,"./widgets/base":8,"./widgets/render":18,"underscore":21}],8:[function(require,module,exports){
"use strict";

var poll_form = require('./impl/poll_form'),
    poll_votes = require('./impl/poll_votes'),
    tweetpoll_form = require('./impl/tweetpoll_form'),
    tweetpoll_votes = require('./impl/tweetpoll_votes'),
    hashtag = require('./impl/hashtag'),
    profile = require('./impl/profile'),
    services = require('../util/services');


var fn = {

    /**
     *
     * @method createPollFormm
     */
    createPollForm: function(widget) {
        return poll_form.render({
            widget : widget,
            url : services().poll_form
        }, function(widget, iframe, css) {
            var node = widget.widget.node;
            document.body.appendChild(iframe);
            node.parentElement.insertBefore(iframe, node);
            var _i_document = iframe.contentDocument;
            _i_document.head.appendChild(css);
           css.onload = function () {
               _i_document.body.innerHTML = widget.body.body;
               iframe.height = "";
               iframe.height = iframe.contentWindow.document.body.scrollHeight;
           }
        });
    },

    /**
     *
     * @method
     */
    createPollVote: function(widget) {
        return poll_votes.render({
            widget : widget,
            url : services().poll_results
        }, function(widget, iframe, css, afterRender) {
            var node = widget.widget.node;
            document.body.appendChild(iframe);
            node.parentElement.insertBefore(iframe, node);
            var _i_document = iframe.contentDocument;
            _i_document.body.innerHTML = widget.body.body;
            css.onload = function () {
                afterRender(_i_document);
                iframe.height = "";
                iframe.height = iframe.contentWindow.document.body.scrollHeight;
            };
            _i_document.head.appendChild(css);
        });
    },

    /**
     *
     * @method
     */
    createTpForm: function(widget) {
        return tweetpoll_form.render({
            widget : widget,
            url : services().tp_poll_form
        }, function(widget, iframe, css) {
            var node = widget.widget.node;
            document.body.appendChild(iframe);
            node.parentElement.insertBefore(iframe, node);
            var _i_document = iframe.contentDocument;
            _i_document.body.innerHTML = widget.body.body;
            _i_document.head.appendChild(css);
        });
    },

    /**
     *
     * @method
     */
    createTpVote: function(widget) {
        return tweetpoll_votes.render({
            widget : widget,
            url : services().tp_poll_votes
        }, function(widget, iframe, css, afterRender) {
            var node = widget.widget.node;
            document.body.appendChild(iframe);
            node.parentElement.insertBefore(iframe, node);
            var _i_document = iframe.contentDocument;
            _i_document.body.innerHTML = widget.body.body;
            css.onload = function () {
                afterRender(_i_document);
                iframe.height = "";
                iframe.height = iframe.contentWindow.document.body.scrollHeight;
            };
            _i_document.head.appendChild(css);
        });
    },

    /**
     *
     * @method
     */
    createProfile: function(widget) {
        return profile.render({
            widget : widget,
            url : services().user_profile
        }, function(widget, iframe, css) {
            var node = widget.widget.node;
            document.body.appendChild(iframe);
            node.parentElement.insertBefore(iframe, node);
            var _i_document = iframe.contentDocument;
            _i_document.body.innerHTML = widget.body.body;
            _i_document.head.appendChild(css);
        });
    },

    /**
     *
     * @method
     */
    createHashtag: function(widget) {

    }
};
module.exports = fn;

},{"../util/services":5,"./impl/hashtag":11,"./impl/poll_form":12,"./impl/poll_votes":13,"./impl/profile":14,"./impl/tweetpoll_form":15,"./impl/tweetpoll_votes":16}],9:[function(require,module,exports){
(function (global){
/**
 * Copyright 2014 encuestame
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

'use strict';

var domain = global.__enme_widget.host;
var fn = {
    box_dimensions: {
        DEFAULT_HEIGHT: "230",
        DEFAULT_WIDTH: "520",
        NARROW_WIDTH: "320",
        MIN_WIDTH: "220",
        MIN_HEIGHT: "200",
        WIDE_MEDIA_PADDING: 81,
        NARROW_MEDIA_PADDING: 16,
        WIDE_MEDIA_PADDING_CL: 60,
        NARROW_MEDIA_PADDING_CL: 12
    },
    cssStyle: domain + "resources/dev/embebed/detail.css"
};

module.exports = fn;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],10:[function(require,module,exports){
(function (global){
'use strict';

var domain = global.__enme_widget.host;
   var fn = {
        box_dimensions: {
          DEFAULT_HEIGHT: "300",
          DEFAULT_WIDTH: "520",
          NARROW_WIDTH: "320",
          MIN_WIDTH: "220",
          MIN_HEIGHT: "200",
          WIDE_MEDIA_PADDING: 81,
          NARROW_MEDIA_PADDING: 16,
          WIDE_MEDIA_PADDING_CL: 60,
          NARROW_MEDIA_PADDING_CL: 12
    },
  cssStyle: domain + "resources/dev/embebed/form.css"
};

module.exports = fn;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],11:[function(require,module,exports){
"use strict";

var form = require('./../form'),
    base = require('./../widget_base');
var fn = {

};

module.exports = fn;

},{"./../form":10,"./../widget_base":20}],12:[function(require,module,exports){
(function (global){
"use strict";

 var form = require('./../form'),
     base = require('./../widget_base'),
    _module = "form_poll";

 var poll_form = {
    render : function(widget, onRender) {
        var iframeDom = base.getDocument(widget);
        var cssNode = base.getCss(form.cssStyle);
        iframeDom.height = form.box_dimensions.DEFAULT_HEIGHT;
        iframeDom.style.cssText = '';
        iframeDom.style.border = "none";
        iframeDom.style.maxWidth = "450px";
        iframeDom.style.width = window.innerWidth - 20 + "px";
        iframeDom.style.minWidth = form.box_dimensions.MIN_WIDTH + "px";
        global.__enme_widget.callbacks["_" + _module +"_" + widget.widget.properties.id] = function(data) {
            widget.body = data;
            onRender(widget, iframeDom, cssNode);
        };
        base.getBody(widget, _module);
    }
 };


module.exports = poll_form;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./../form":10,"./../widget_base":20}],13:[function(require,module,exports){
(function (global){
"use strict";

var  base = require('./../widget_base');
var  Chart = require('./../../vendor/Chart');
var domUtils = require('../../util/dom-utils');
var _module = "vote_poll";
var _ = require('underscore');
var detail = require('./../results');
var fn = {
    render: function(widget, onRender) {
        var iframeDom = base.getDocument(widget);
        var cssNode = base.getCss(detail.cssStyle);
        iframeDom.style.cssText = '';
        iframeDom.style.width = window.innerWidth - 20 + "px";
        iframeDom.height = detail.box_dimensions.DEFAULT_HEIGHT;
        iframeDom.style.border = "none";
        iframeDom.style.maxWidth = "450px";
        iframeDom.style.minWidth = detail.box_dimensions.MIN_WIDTH + "px";

        global.__enme_widget.callbacks["_" + _module +"_" + widget.widget.properties.id] = function(data) {
            widget.body = data;
            onRender(widget, iframeDom, cssNode, function(_document) {
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../util/dom-utils":1,"./../../vendor/Chart":6,"./../results":19,"./../widget_base":20,"underscore":21}],14:[function(require,module,exports){
(function (global){
"use strict";

var  base = require('./../widget_base');
var _module = "profile_w";
var detail = require('./../detail');
var fn = {
    render: function(widget, onRender) {
        var iframeDom = base.getDocument(widget);
        var cssNode = base.getCss(detail.cssStyle);
        iframeDom.style.cssText = '';
        iframeDom.style.width = window.innerWidth - 20 + "px";
        iframeDom.height = detail.box_dimensions.DEFAULT_HEIGHT;
        iframeDom.style.border = "none";
        iframeDom.style.maxWidth = "450px";
        iframeDom.style.minWidth = detail.box_dimensions.MIN_WIDTH + "px";
        global.__enme_widget.callbacks["_" + _module +"_" + widget.widget.properties.id] = function(data) {
            widget.body = data;
            onRender(widget, iframeDom, cssNode);
        };
        base.getBody(widget, _module);
    }
};

module.exports = fn;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./../detail":9,"./../widget_base":20}],15:[function(require,module,exports){
(function (global){
"use strict";

var  base = require('./../widget_base');
var _module = "form_tp";
var detail = require('./../detail');
var fn = {
    render: function(widget, onRender) {
        var iframeDom = base.getDocument(widget);
        var cssNode = base.getCss(detail.cssStyle);
        iframeDom.style.cssText = '';
        iframeDom.height = detail.box_dimensions.DEFAULT_HEIGHT;
        iframeDom.style.border = "none";
        iframeDom.style.maxWidth = "450px";
        iframeDom.style.width = window.innerWidth - 20 + "px";
        iframeDom.style.minWidth = detail.box_dimensions.MIN_WIDTH + "px";
        global.__enme_widget.callbacks["_" + _module +"_" + widget.widget.properties.id] = function(data) {
            widget.body = data;
            onRender(widget, iframeDom, cssNode);
        };
        base.getBody(widget, _module);
    }
};

module.exports = fn;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./../detail":9,"./../widget_base":20}],16:[function(require,module,exports){
(function (global){
"use strict";

var  base = require('./../widget_base');
var  Chart = require('./../../vendor/Chart');
var domUtils = require('../../util/dom-utils');
var _module = "vote_tp";
var _ = require('underscore');
var detail = require('./../results');
var fn = {
    render: function(widget, onRender) {
        var iframeDom = base.getDocument(widget);
        var cssNode = base.getCss(detail.cssStyle);
        iframeDom.style.cssText = '';
        iframeDom.style.width = window.innerWidth - 20 + "px";
        iframeDom.height = detail.box_dimensions.DEFAULT_HEIGHT;
        iframeDom.style.border = "none";
        iframeDom.style.maxWidth = "450px";
        iframeDom.style.minWidth = detail.box_dimensions.MIN_WIDTH + "px";
        global.__enme_widget.callbacks["_" + _module +"_" + widget.widget.properties.id] = function(data) {
            widget.body = data;
            onRender(widget, iframeDom, cssNode, function(_document) {
                var stats = domUtils.querySelector('.range_stats', _document);
                var canvas = domUtils.createCanvas(_document, {});
                var ctx = canvas.getContext("2d");
                var chart_data = data.aditionalInfo;
                var _data = [];
                _.each(chart_data, function(a,b) {
                    var item = {
                      value : a.votes,
                      color : a.color,
                      label : a.question_label
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../util/dom-utils":1,"./../../vendor/Chart":6,"./../results":19,"./../widget_base":20,"underscore":21}],17:[function(require,module,exports){
"use strict";

var form = require('./../form'),
    base = require('./../widget_base');
var fn = {

};
module.exports = fn;

},{"./../form":10,"./../widget_base":20}],18:[function(require,module,exports){

"use strict";

var domUtils = require('../util/dom-utils');
var _ = require('underscore');
var fn = {

    /**
     *
     * @method
     */
    findWidgets: function(widgets_list, exec) {
        var list_wi = [];
        _.each(widgets_list, function(a,b,c) {
            var list = domUtils.querySelectorAll(b);
            for (var i = 0; i < list.length; i++) {
                var item_widget = list[i];
                list_wi.push({
                    node: item_widget,
                    properties: domUtils.widgetInfo(item_widget),
                    _module: a
                });
            }
        });
        exec(list_wi);
    },

    /**
     *
     * @method
     */
    load: function(){

    }
};

module.exports = fn;

},{"../util/dom-utils":1,"underscore":21}],19:[function(require,module,exports){
(function (global){
/**
 * Copyright 2014 encuestame
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

'use strict';

var domain = global.__enme_widget.host;
var fn = {
    box_dimensions: {
        DEFAULT_HEIGHT: "230",
        DEFAULT_WIDTH: "520",
        NARROW_WIDTH: "320",
        MIN_WIDTH: "180",
        MIN_HEIGHT: "200",
        WIDE_MEDIA_PADDING: 81,
        NARROW_MEDIA_PADDING: 16,
        WIDE_MEDIA_PADDING_CL: 60,
        NARROW_MEDIA_PADDING_CL: 12
    },
    cssStyle: domain + "resources/dev/embebed/results.css"
};

module.exports = fn;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],20:[function(require,module,exports){
/**
 * Copyright 2014 encuestame
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

"use strict";

    var iframe = require('../util/iframe'),
    jsonp = require('../util/jsonp'),
    css = "";
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



},{"../util/iframe":3,"../util/jsonp":4}],21:[function(require,module,exports){
//     Underscore.js 1.7.0
//     http://underscorejs.org
//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    concat           = ArrayProto.concat,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.7.0';

  // Internal function that returns an efficient (for current engines) version
  // of the passed-in callback, to be repeatedly applied in other Underscore
  // functions.
  var createCallback = function(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
      case 1: return function(value) {
        return func.call(context, value);
      };
      case 2: return function(value, other) {
        return func.call(context, value, other);
      };
      case 3: return function(value, index, collection) {
        return func.call(context, value, index, collection);
      };
      case 4: return function(accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
    }
    return function() {
      return func.apply(context, arguments);
    };
  };

  // A mostly-internal function to generate callbacks that can be applied
  // to each element in a collection, returning the desired result — either
  // identity, an arbitrary callback, a property matcher, or a property accessor.
  _.iteratee = function(value, context, argCount) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return createCallback(value, context, argCount);
    if (_.isObject(value)) return _.matches(value);
    return _.property(value);
  };

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles raw objects in addition to array-likes. Treats all
  // sparse array-likes as if they were dense.
  _.each = _.forEach = function(obj, iteratee, context) {
    if (obj == null) return obj;
    iteratee = createCallback(iteratee, context);
    var i, length = obj.length;
    if (length === +length) {
      for (i = 0; i < length; i++) {
        iteratee(obj[i], i, obj);
      }
    } else {
      var keys = _.keys(obj);
      for (i = 0, length = keys.length; i < length; i++) {
        iteratee(obj[keys[i]], keys[i], obj);
      }
    }
    return obj;
  };

  // Return the results of applying the iteratee to each element.
  _.map = _.collect = function(obj, iteratee, context) {
    if (obj == null) return [];
    iteratee = _.iteratee(iteratee, context);
    var keys = obj.length !== +obj.length && _.keys(obj),
        length = (keys || obj).length,
        results = Array(length),
        currentKey;
    for (var index = 0; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      results[index] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };

  var reduceError = 'Reduce of empty array with no initial value';

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`.
  _.reduce = _.foldl = _.inject = function(obj, iteratee, memo, context) {
    if (obj == null) obj = [];
    iteratee = createCallback(iteratee, context, 4);
    var keys = obj.length !== +obj.length && _.keys(obj),
        length = (keys || obj).length,
        index = 0, currentKey;
    if (arguments.length < 3) {
      if (!length) throw new TypeError(reduceError);
      memo = obj[keys ? keys[index++] : index++];
    }
    for (; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      memo = iteratee(memo, obj[currentKey], currentKey, obj);
    }
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  _.reduceRight = _.foldr = function(obj, iteratee, memo, context) {
    if (obj == null) obj = [];
    iteratee = createCallback(iteratee, context, 4);
    var keys = obj.length !== + obj.length && _.keys(obj),
        index = (keys || obj).length,
        currentKey;
    if (arguments.length < 3) {
      if (!index) throw new TypeError(reduceError);
      memo = obj[keys ? keys[--index] : --index];
    }
    while (index--) {
      currentKey = keys ? keys[index] : index;
      memo = iteratee(memo, obj[currentKey], currentKey, obj);
    }
    return memo;
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var result;
    predicate = _.iteratee(predicate, context);
    _.some(obj, function(value, index, list) {
      if (predicate(value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    if (obj == null) return results;
    predicate = _.iteratee(predicate, context);
    _.each(obj, function(value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, _.negate(_.iteratee(predicate)), context);
  };

  // Determine whether all of the elements match a truth test.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    if (obj == null) return true;
    predicate = _.iteratee(predicate, context);
    var keys = obj.length !== +obj.length && _.keys(obj),
        length = (keys || obj).length,
        index, currentKey;
    for (index = 0; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      if (!predicate(obj[currentKey], currentKey, obj)) return false;
    }
    return true;
  };

  // Determine if at least one element in the object matches a truth test.
  // Aliased as `any`.
  _.some = _.any = function(obj, predicate, context) {
    if (obj == null) return false;
    predicate = _.iteratee(predicate, context);
    var keys = obj.length !== +obj.length && _.keys(obj),
        length = (keys || obj).length,
        index, currentKey;
    for (index = 0; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      if (predicate(obj[currentKey], currentKey, obj)) return true;
    }
    return false;
  };

  // Determine if the array or object contains a given value (using `===`).
  // Aliased as `include`.
  _.contains = _.include = function(obj, target) {
    if (obj == null) return false;
    if (obj.length !== +obj.length) obj = _.values(obj);
    return _.indexOf(obj, target) >= 0;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      return (isFunc ? method : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matches(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matches(attrs));
  };

  // Return the maximum element (or element-based computation).
  _.max = function(obj, iteratee, context) {
    var result = -Infinity, lastComputed = -Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = obj.length === +obj.length ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value > result) {
          result = value;
        }
      }
    } else {
      iteratee = _.iteratee(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iteratee, context) {
    var result = Infinity, lastComputed = Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = obj.length === +obj.length ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value < result) {
          result = value;
        }
      }
    } else {
      iteratee = _.iteratee(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed < lastComputed || computed === Infinity && result === Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Shuffle a collection, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var set = obj && obj.length === +obj.length ? obj : _.values(obj);
    var length = set.length;
    var shuffled = Array(length);
    for (var index = 0, rand; index < length; index++) {
      rand = _.random(0, index);
      if (rand !== index) shuffled[index] = shuffled[rand];
      shuffled[rand] = set[index];
    }
    return shuffled;
  };

  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (obj.length !== +obj.length) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // Sort the object's values by a criterion produced by an iteratee.
  _.sortBy = function(obj, iteratee, context) {
    iteratee = _.iteratee(iteratee, context);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iteratee(value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, iteratee, context) {
      var result = {};
      iteratee = _.iteratee(iteratee, context);
      _.each(obj, function(value, index) {
        var key = iteratee(value, index, obj);
        behavior(result, value, key);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, value, key) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key]++; else result[key] = 1;
  });

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iteratee, context) {
    iteratee = _.iteratee(iteratee, context, 1);
    var value = iteratee(obj);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = low + high >>> 1;
      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
    }
    return low;
  };

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (obj.length === +obj.length) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return obj.length === +obj.length ? obj.length : _.keys(obj).length;
  };

  // Split a collection into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(obj, predicate, context) {
    predicate = _.iteratee(predicate, context);
    var pass = [], fail = [];
    _.each(obj, function(value, key, obj) {
      (predicate(value, key, obj) ? pass : fail).push(value);
    });
    return [pass, fail];
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[0];
    if (n < 0) return [];
    return slice.call(array, 0, n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[array.length - 1];
    return slice.call(array, Math.max(array.length - n, 0));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, n == null || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, strict, output) {
    if (shallow && _.every(input, _.isArray)) {
      return concat.apply(output, input);
    }
    for (var i = 0, length = input.length; i < length; i++) {
      var value = input[i];
      if (!_.isArray(value) && !_.isArguments(value)) {
        if (!strict) output.push(value);
      } else if (shallow) {
        push.apply(output, value);
      } else {
        flatten(value, shallow, strict, output);
      }
    }
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, false, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
    if (array == null) return [];
    if (!_.isBoolean(isSorted)) {
      context = iteratee;
      iteratee = isSorted;
      isSorted = false;
    }
    if (iteratee != null) iteratee = _.iteratee(iteratee, context);
    var result = [];
    var seen = [];
    for (var i = 0, length = array.length; i < length; i++) {
      var value = array[i];
      if (isSorted) {
        if (!i || seen !== value) result.push(value);
        seen = value;
      } else if (iteratee) {
        var computed = iteratee(value, i, array);
        if (_.indexOf(seen, computed) < 0) {
          seen.push(computed);
          result.push(value);
        }
      } else if (_.indexOf(result, value) < 0) {
        result.push(value);
      }
    }
    return result;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(flatten(arguments, true, true, []));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    if (array == null) return [];
    var result = [];
    var argsLength = arguments.length;
    for (var i = 0, length = array.length; i < length; i++) {
      var item = array[i];
      if (_.contains(result, item)) continue;
      for (var j = 1; j < argsLength; j++) {
        if (!_.contains(arguments[j], item)) break;
      }
      if (j === argsLength) result.push(item);
    }
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = flatten(slice.call(arguments, 1), true, true, []);
    return _.filter(array, function(value){
      return !_.contains(rest, value);
    });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function(array) {
    if (array == null) return [];
    var length = _.max(arguments, 'length').length;
    var results = Array(length);
    for (var i = 0; i < length; i++) {
      results[i] = _.pluck(arguments, i);
    }
    return results;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    if (list == null) return {};
    var result = {};
    for (var i = 0, length = list.length; i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // Return the position of the first occurrence of an item in an array,
  // or -1 if the item is not included in the array.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i = 0, length = array.length;
    if (isSorted) {
      if (typeof isSorted == 'number') {
        i = isSorted < 0 ? Math.max(0, length + isSorted) : isSorted;
      } else {
        i = _.sortedIndex(array, item);
        return array[i] === item ? i : -1;
      }
    }
    for (; i < length; i++) if (array[i] === item) return i;
    return -1;
  };

  _.lastIndexOf = function(array, item, from) {
    if (array == null) return -1;
    var idx = array.length;
    if (typeof from == 'number') {
      idx = from < 0 ? idx + from + 1 : Math.min(idx, from + 1);
    }
    while (--idx >= 0) if (array[idx] === item) return idx;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = step || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);

    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Reusable constructor function for prototype setting.
  var Ctor = function(){};

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    var args, bound;
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
    args = slice.call(arguments, 2);
    bound = function() {
      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
      Ctor.prototype = func.prototype;
      var self = new Ctor;
      Ctor.prototype = null;
      var result = func.apply(self, args.concat(slice.call(arguments)));
      if (_.isObject(result)) return result;
      return self;
    };
    return bound;
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    return function() {
      var position = 0;
      var args = boundArgs.slice();
      for (var i = 0, length = args.length; i < length; i++) {
        if (args[i] === _) args[i] = arguments[position++];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return func.apply(this, args);
    };
  };

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = function(obj) {
    var i, length = arguments.length, key;
    if (length <= 1) throw new Error('bindAll must be passed function names');
    for (i = 1; i < length; i++) {
      key = arguments[i];
      obj[key] = _.bind(obj[key], obj);
    }
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memoize = function(key) {
      var cache = memoize.cache;
      var address = hasher ? hasher.apply(this, arguments) : key;
      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
      return cache[address];
    };
    memoize.cache = {};
    return memoize;
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){
      return func.apply(null, args);
    }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;

      if (last < wait && last > 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a negated version of the passed-in predicate.
  _.negate = function(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
      var i = start;
      var result = args[start].apply(this, arguments);
      while (i--) result = args[i].call(this, result);
      return result;
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Returns a function that will only be executed before being called N times.
  _.before = function(times, func) {
    var memo;
    return function() {
      if (--times > 0) {
        memo = func.apply(this, arguments);
      } else {
        func = null;
      }
      return memo;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = _.partial(_.before, 2);

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    if (!_.isObject(obj)) return obj;
    var source, prop;
    for (var i = 1, length = arguments.length; i < length; i++) {
      source = arguments[i];
      for (prop in source) {
        if (hasOwnProperty.call(source, prop)) {
            obj[prop] = source[prop];
        }
      }
    }
    return obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj, iteratee, context) {
    var result = {}, key;
    if (obj == null) return result;
    if (_.isFunction(iteratee)) {
      iteratee = createCallback(iteratee, context);
      for (key in obj) {
        var value = obj[key];
        if (iteratee(value, key, obj)) result[key] = value;
      }
    } else {
      var keys = concat.apply([], slice.call(arguments, 1));
      obj = new Object(obj);
      for (var i = 0, length = keys.length; i < length; i++) {
        key = keys[i];
        if (key in obj) result[key] = obj[key];
      }
    }
    return result;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj, iteratee, context) {
    if (_.isFunction(iteratee)) {
      iteratee = _.negate(iteratee);
    } else {
      var keys = _.map(concat.apply([], slice.call(arguments, 1)), String);
      iteratee = function(value, key) {
        return !_.contains(keys, key);
      };
    }
    return _.pick(obj, iteratee, context);
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    if (!_.isObject(obj)) return obj;
    for (var i = 1, length = arguments.length; i < length; i++) {
      var source = arguments[i];
      for (var prop in source) {
        if (obj[prop] === void 0) obj[prop] = source[prop];
      }
    }
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className !== toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
      case '[object RegExp]':
      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return '' + a === '' + b;
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive.
        // Object(NaN) is equivalent to NaN
        if (+a !== +a) return +b !== +b;
        // An `egal` comparison is performed for other numeric values.
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a === +b;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] === a) return bStack[length] === b;
    }
    // Objects with different constructors are not equivalent, but `Object`s
    // from different frames are.
    var aCtor = a.constructor, bCtor = b.constructor;
    if (
      aCtor !== bCtor &&
      // Handle Object.create(x) cases
      'constructor' in a && 'constructor' in b &&
      !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
        _.isFunction(bCtor) && bCtor instanceof bCtor)
    ) {
      return false;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    var size, result;
    // Recursively compare objects and arrays.
    if (className === '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size === b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
        }
      }
    } else {
      // Deep compare objects.
      var keys = _.keys(a), key;
      size = keys.length;
      // Ensure that both objects contain the same number of properties before comparing deep equality.
      result = _.keys(b).length === size;
      if (result) {
        while (size--) {
          // Deep compare each member
          key = keys[size];
          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
        }
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return result;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, [], []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj) || _.isArguments(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) === '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) === '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return _.has(obj, 'callee');
    };
  }

  // Optimize `isFunction` if appropriate. Work around an IE 11 bug.
  if (typeof /./ !== 'function') {
    _.isFunction = function(obj) {
      return typeof obj == 'function' || false;
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj !== +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iteratees.
  _.identity = function(value) {
    return value;
  };

  _.constant = function(value) {
    return function() {
      return value;
    };
  };

  _.noop = function(){};

  _.property = function(key) {
    return function(obj) {
      return obj[key];
    };
  };

  // Returns a predicate for checking whether an object has a given set of `key:value` pairs.
  _.matches = function(attrs) {
    var pairs = _.pairs(attrs), length = pairs.length;
    return function(obj) {
      if (obj == null) return !length;
      obj = new Object(obj);
      for (var i = 0; i < length; i++) {
        var pair = pairs[i], key = pair[0];
        if (pair[1] !== obj[key] || !(key in obj)) return false;
      }
      return true;
    };
  };

  // Run a function **n** times.
  _.times = function(n, iteratee, context) {
    var accum = Array(Math.max(0, n));
    iteratee = createCallback(iteratee, context, 1);
    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() {
    return new Date().getTime();
  };

   // List of HTML entities for escaping.
  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };
  var unescapeMap = _.invert(escapeMap);

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  var createEscaper = function(map) {
    var escaper = function(match) {
      return map[match];
    };
    // Regexes for identifying a key that needs to be escaped
    var source = '(?:' + _.keys(map).join('|') + ')';
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');
    return function(string) {
      string = string == null ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  };
  _.escape = createEscaper(escapeMap);
  _.unescape = createEscaper(unescapeMap);

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return void 0;
    var value = object[property];
    return _.isFunction(value) ? object[property]() : value;
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

  var escapeChar = function(match) {
    return '\\' + escapes[match];
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  // NB: `oldSettings` only exists for backwards compatibility.
  _.template = function(text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escaper, escapeChar);
      index = offset + match.length;

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }

      // Adobe VMs need the match returned to produce the correct offest.
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + 'return __p;\n';

    try {
      var render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled source as a convenience for precompilation.
    var argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function. Start chaining a wrapped Underscore object.
  _.chain = function(obj) {
    var instance = _(obj);
    instance._chain = true;
    return instance;
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(obj) {
    return this._chain ? _(obj).chain() : obj;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result.call(this, func.apply(_, args));
      };
    });
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
      return result.call(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  _.each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result.call(this, method.apply(this._wrapped, arguments));
    };
  });

  // Extracts the result from a wrapped and chained object.
  _.prototype.value = function() {
    return this._wrapped;
  };

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (typeof define === 'function' && define.amd) {
    define('underscore', [], function() {
      return _;
    });
  }
}.call(this));

},{}]},{},[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]);

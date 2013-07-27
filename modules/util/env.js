define(function () {

    "use strict";

    var f = window.navigator.userAgent;

    var fn = {

        retina: function() {
            return (window.devicePixelRatio || Math.round(window.screen.availWidth / document.documentElement.clientWidth)) > 1
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
            return "ontouchstart" in window || /Opera Mini/.test(f) || navigator.msMaxTouchPoints > 0
        },

        cssTransitions: function(){
            var a = document.body.style;
            return a.transition !== undefined || a.webkitTransition !== undefined || a.mozTransition !== undefined || a.oTransition !== undefined || a.msTransition !== undefined;
        }

    };

    return fn;
});
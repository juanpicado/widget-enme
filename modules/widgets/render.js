define(["modules/util/dom-utils"], function(domUtils) {

   "use strict";

   var fn = {

        /**
         *
         * @method
         */
        findWidgets: function(widgets_list, exec) {
            console.log("widgets_list", widgets_list);
            _.each(widgets_list, function(index){
                console.log("s", index, arguments);
                domUtils.querySelectorAll();
            });
        },

        /**
         *
         * @method
         */
        load: function(){

        }
   };

   return fn;
});
define([
    'modules/widgets/form',
    'modules/widgets/widget_base'
    ], function (form, base) {

     var module = "form_poll";
     var poll_form = {
        render: function(widget, onRender) {
            var documentIframe = base.getDocument(widget);
            //__enme_widget.callbacks[]
            __enme_widget.callbacks["_" + module +"_" + widget.widget.properties.id] = function(data){
                widget.body = data;
                console.log("dsadsa", widget);
                onRender(widget);
            };
            base.getBody(widget, module);
        }
     };

    return poll_form;
});
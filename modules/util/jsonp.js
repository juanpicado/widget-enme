define(function () {
    //Do setup work here

    var body = {
        get: function(url, module, id, instance) {
            var script = document.createElement('script');
            var name = "__enme_widget.callbacks._" + module +"_" + id;
            script.src = url + '?id=' + id + '&callback=' + name;
            document.getElementsByTagName('head')[0].appendChild(script);
        }
    };

    return body;
});
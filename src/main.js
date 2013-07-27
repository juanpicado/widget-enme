// require.config({

//   // Sets the js folder as the base directory for all future relative paths
//   baseUrl: "./js",

// });

if (!window.__enme_widget) {
    (function(window, document) {

        window.__enme_widget = window.__enme_widget || {};

        window.__enme_widget = window.__enme_widget || {}, __enme_widget.host = __enme_widget.host || "http://localhost:8080/encuestame/";

        window.__enme_widget.callbacks = {};

        // var domain = "http://localhost:8080/encuestame",
        // poll_form = "/api/jsonp/poll/embedded",
        // tp_poll_form = "/api/jsonp/tweetpoll/embedded",
        // hashtag_profile = "/api/jsonp/hashtag/embedded",
        // user_profile = "/api/jsonp/profile/embedded",
        // poll_results = "/api/jsonp/poll/embedded",
        // tp_poll_results = "/api/jsonp/poll/embedded",
        // tp_poll_results = "/api/jsonp/poll/embedded";


        // __enme_widget.d = function(data) {
        //     console.log("widget data", data);
        // };

        // var script = document.createElement('script');
        // script.src = domain + poll_form + '?id=1&callback=__enme_widget.d'
        // document.getElementsByTagName('head')[0].appendChild(script);


      require([
        "components/requirejs-domready/domReady",
        'modules/widgets/base',
        'modules/widgets/render',
        'components/underscore-amd/underscore'
        ], function(
          domReady,
          base,
          render) {

          'use strict';

          //
          var widgets_selectors = {
              'a.enme-poll-form' : base.createPollForm,
              'a.enme-poll-vote' : base.createPollVote,
              'a.enme-tp-form' : base.createTpForm,
              'a.enme-tp-vote' : base.createTpVote,
              'a.enme-profile' : base.createProfile,
              'a.enme-hashtag'  : base.createHashtag
          };

          // on dom is ready
          domReady(function () {
            render.findWidgets(widgets_selectors, function(data){
                _.each(data, function(a,b){
                    a.module(a);
                });
            });

          });

      });

    })(this, document);
}



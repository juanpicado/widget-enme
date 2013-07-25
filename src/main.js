// require.config({

//   // Sets the js folder as the base directory for all future relative paths
//   baseUrl: "./js",

// });

'use strict';

if (!window.__enme_widget) {
    (function(window, document) {

        window.__enme_widget = window.__enme_widget || {};

        window.__enme_widget = window.__enme_widget || {}, __enme_widget.host = __enme_widget.host || "platform.twitter.com";

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
        "components/underscore/underscore",
        "modules/widgets/poll_form",
        "modules/widgets/poll_votes",
        "modules/widgets/tweetpoll_form",
        "modules/widgets/tweetpoll_votes",
        "modules/widgets/hashtag",
        "modules/util/services",
        "modules/util/jsonp"
        ], function(
          domReady,
          _,
          poll_form,
          poll_votes,
          tweetpoll_form,
          tweetpoll_votes,
          hashtag,
          services,
          jsonp) {

          // on dom is ready
          domReady(function () {

          });

      });

    })(this, document);
}



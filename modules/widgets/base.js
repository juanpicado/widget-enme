define([
    "modules/widgets/poll_form",
    "modules/widgets/poll_votes",
    "modules/widgets/tweetpoll_form",
    "modules/widgets/tweetpoll_votes",
    "modules/widgets/hashtag",
    "modules/util/services",
    'modules/util/env'], function (
        poll_form,
        poll_votes,
        tweetpoll_form,
        tweetpoll_votes,
        hashtag,
        services,
        env) {

    "use strict";

    var fn = {

        /**
         *
         * @method createPollForm
         */
        createPollForm: function(widget) {
            return poll_form.render({
                widget: widget,
                url: services.poll_form
            }, function(widget, iframe, css) {
                var node = widget.widget.node;
                document.body.appendChild(iframe);
                document.body.replaceChild(iframe, node);
                var _i_document = iframe.contentDocument;
                _i_document.body.innerHTML = widget.body.body;
                _i_document.head.appendChild(css);
            });
        },

        /**
         *
         * @method
         */
        createPollVote: function(widget) {

        },

        /**
         *
         * @method
         */
        createTpForm: function(widget) {

        },

        /**
         *
         * @method
         */
        createTpVote: function(widget) {

        },

        /**
         *
         * @method
         */
        createProfile: function(widget) {

        },

        /**
         *
         * @method
         */
        createHashtag: function(widget) {

        }
    };

    return fn;
});
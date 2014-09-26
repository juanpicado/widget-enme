"use strict";

var poll_form = require('./poll_form'),
    poll_votes = require('./poll_votes'),
    tweetpoll_form = require('./tweetpoll_form'),
    tweetpoll_votes = require('./tweetpoll_votes'),
    hashtag = require('./hashtag'),
    services = require('../util/services');


var fn = {

    /**
     *
     * @method createPollForm
     */
    createPollForm: function(widget) {
        return poll_form.render({
            widget : widget,
            url : services.poll_form
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
console.log("base--->", fn);
module.exports = fn;

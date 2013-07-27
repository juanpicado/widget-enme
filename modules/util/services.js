define(function () {
    var domain = __enme_widget.host;
    var services = {
        poll_form : domain + "/api/jsonp/poll/embedded",
        tp_poll_form : domain + "/api/jsonp/tweetpoll/embedded",
        hashtag_profile : domain + "/api/jsonp/hashtag/embedded",
        user_profile : domain + "/api/jsonp/profile/embedded",
        poll_results : domain + "/api/jsonp/poll/embedded",
        tp_poll_results : domain + "/api/jsonp/poll/embedded",
        tp_poll_results : domain + "/api/jsonp/poll/embedded"
    };
    return services;
});
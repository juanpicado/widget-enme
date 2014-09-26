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


if (!global.__enme_widget) {
    (function(document) {

        var _widget = {};
        _widget.host  = "http://localhost:8080/encuestame/";
        _widget.callbacks = {};
        global.__enme_widget = _widget;

//        require([
//            "components/requirejs-domready/domReady",
//            'modules/widgets/base',
//            'modules/widgets/render',
//            'components/underscore-amd/underscore'
//        ], function(
//            domReady,
//            base,
//            render) {
//
//            'use strict';
//
//            //
//
//        });

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

            util.listen("load", window, function() {
                render.findWidgets(widgets_selectors, function(data) {
                    _.each(data, function(a,b){
                        a.module(a);
                    });
                });
            });


    })(document);
}

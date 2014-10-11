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

var assert = chai.assert;

var appendScripts = function(src) {
        var scriptTag = document.createElement('SCRIPT');
        scriptTag.src = src;
        scriptTag.onload = function(){
            console.log("dddsdsads");
        };
        document.body.appendChild(scriptTag);
}

describe('Widget Test', function(){
    this.timeout(10000);
    before( function(done){
        assert.isDefined($, 'jquery is defined');
        var body = $('body');
        var content = $('<div id="content"></div>');
        var tpform = $('<a class="enme-tp-form"> </a>', {});
        var profile = $('<a class="enme-profile"> </a>', {});
        var tpVote = $('<a class="enme-tp-vote"> </a>', {});
        var pollVote = $('<a class="enme-poll-vote"> </a>', {});
        var pollForm = $('<a class="enme-poll-form"> </a>', {});
        content.append(tpform);
        content.append(profile);
        content.append(tpVote);
        content.append(pollVote);
        content.append(pollForm);
        body.append(content);
        var scr = function(d,s,id){
            var js, fjs=d.getElementsByTagName(s)[0],
                h=d.getElementsByTagName('head'),
                p=/^http:/.test(d.location)?'http':'https';
            if(!d.getElementById(id)){
                js=d.createElement(s);
                js.id=id;
                js.src="../build/widget.js";
                h[0].appendChild(js);
                js.onload = function() {
                    __enme_widget.init();
                    setTimeout(function(){
                        done();
                    }, 4000);

                }
                fjs.parentNode.removeChild(fjs);
            }
        };
        scr(document,"script","widget-enme-js")
    });

    after( function(){
        $('#content').html('');
    });

    it('__enme_widget is defined', function() {
            assert.isDefined(__enme_widget, '__enme_widget has been defined');
    })
    it('__enme_widget host', function() {
        assert.isDefined(__enme_widget.host, '__enme_widget has been defined');
    })
    it('widgets rendered', function() {
        assert.equal($('#content').find('iframe').length, 5, '4 widgets in the content div');
    })
});

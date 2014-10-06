/*global require:false, module:false*/

'use strict';

var path = require('path');

var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

var folderMount = function folderMount(connect, point) {
    return connect['static'](path.resolve(point));
};

module.exports = function(grunt) {

    // Grunt project configuration

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        dirs: {
            dist: 'dist',
            build: 'build',
            src : 'modules',
            test: 'tests'
        },

        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',


        // Task configuration

        // clean the distribution folder.

        clean: {
            dist: ['<%= dirs.build %>','<%= dirs.dist %>']
        },

        browserify: {
            client: {
                src: ['<%= dirs.src %>/**/*.js'],
                dest: 'build/widget.js'
            }
        },

        // server

        server: {
            dev: {
                options: {
                    port: 3001,
                    base: './',
                    keepalive: false,
                    middleware: function(connect, options) {
                        return [
                            lrSnippet,
                            folderMount(connect, options.base)
                        ];
                    }
                }
            }
        },

        uglify: {
            options: {
                mangle: true,
                banner: '<%= banner.full %>'
            },
            my_target: {
                files: {
                    '<%= dirs.dist %>/widget.js': ['<%= dirs.build %>/*.js']
                }
            }
        },

        /**
         * JSHint Configuration
         * @property
         */
        jshint: {
            options: {
                jshintrc: './.jshintrc'
            },
            gruntfile: ['Gruntfile.js'],
            js: ['<%= dirs.src %>/util/**/*.js', '<%= dirs.src %>/widgets/**/*.js', '<%= dirs.src %>/widget.js'],
            'test-unit': ['<%= dirs.test %>/spec/**/*.js']
        },
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-browserify');


    // server task
    grunt.renameTask('connect', 'server');
    grunt.registerTask('dev', ['clean', 'jshint', 'browserify']);
    grunt.registerTask('default', ['dev']);

};

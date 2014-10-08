/*global require:false, module:false*/

'use strict';

var server = require('./tests/server/app');

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

        mocha_phantomjs: {
            all: ['tests/**/*.html']
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
    grunt.loadNpmTasks('grunt-mocha-phantomjs');


    // server task
    grunt.renameTask('connect', 'server');
    grunt.registerTask('dev', ['clean', 'jshint', 'browserify', 'mocha_phantomjs', 'uglify']);
    grunt.registerTask('default', ['dev']);

};

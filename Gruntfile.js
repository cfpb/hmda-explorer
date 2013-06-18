module.exports = function(grunt) {

  'use strict';

  grunt.initConfig({

    /**
     * Pull in the package.json file so we can read its metadata.
     */
    pkg: grunt.file.readJSON('package.json'),

    /**
     * Here's a banner with some template variables.
     * We'll be inserting it at the top of minified assets.
     */
    banner: {

      cfpb:
        '/*!                                      \n' +
        '            /$$$$$$          /$$        \n' +
        '           /$$__  $$        | $$        \n' +
        '  /$$$$$$$| $$  \\__//$$$$$$ | $$$$$$$  \n' +
        ' /$$_____/| $$$$   /$$__  $$| $$__  $$  \n' +
        '| $$      | $$_/  | $$  \\ $$| $$  \\ $$\n' +
        '| $$      | $$    | $$  | $$| $$  | $$  \n' +
        '|  $$$$$$$| $$    | $$$$$$$/| $$$$$$$/  \n' +
        ' \\_______/|__/    | $$____/ |_______/  \n' +
        '                  | $$                  \n' +
        '                  | $$                  \n' +
        '                  |__/                  \n\n' +
        '* <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n\n',

      requirejs:
        '/** vim: et:ts=4:sw=4:sts=4\n' +
         '  * @license RequireJS 2.1.6 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.\n' +
         '  * Available via the MIT or new BSD license.\n' +
         '  * see: http://github.com/jrburke/requirejs for details\n' +
         '  */\n\n',

      jquery:
        '/*!\n' +
         '  * jQuery JavaScript Library v1.10.1\n' +
         '  * http://jquery.com/\n' +
         '  *\n' +
         '  * Includes Sizzle.js\n' +
         '  * http://sizzlejs.com/\n' +
         '  *\n' +
         '  * Copyright 2005, 2013 jQuery Foundation, Inc. and other contributors\n' +
         '  * Released under the MIT license\n' +
         '  * http://jquery.org/license\n' +
         '  *\n' +
         '  * Date: 2013-05-30T21:25Z\n' +
         '  */\n\n',

      sizzle:
        '/* Sizzle CSS Selector Engine v1.9.4-pre\n' +
         '  * http://sizzlejs.com/\n' +
         '  *\n' +
         '  * Copyright 2013 jQuery Foundation, Inc. and other contributors\n' +
         '  * Released under the MIT license\n' +
         '  * http://jquery.org/license\n' +
         '  *\n' +
         '  * Date: 2013-05-27\n' +
         '  */\n\n',

      underscore:
        ' //     Underscore.js 1.4.4\n' +
        '  //     http://underscorejs.org\n' +
        '  //     (c) 2009-2013 Jeremy Ashkenas, DocumentCloud Inc.\n' +
        '  //     Underscore may be freely distributed under the MIT license.\n\n',

      backbone:
        ' //     Backbone.js 1.0.0\n' +
        '  //     (c) 2010-2013 Jeremy Ashkenas, DocumentCloud Inc.\n' +
        '  //     Backbone may be freely distributed under the MIT license.\n' +
        '  //     For all details and documentation:\n' +
        '  //     http://backbonejs.org\n\n',

      requirejstext:
        '/**\n' +
         '  * @license RequireJS text 2.0.6 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.\n' +
         '  * Available via the MIT or new BSD license.\n' +
         '  * see: http://github.com/requirejs/text for details\n' +
         '  */\n\n'

    },

    /**
     * LESS: https://github.com/gruntjs/grunt-contrib-less
     * 
     * Compile LESS files to CSS.
     */
    less: {
      main: {
        options: {
          paths: ['src']
        },
        files: {
          'dist/static/css/main.css': ['<%= banner.cfpb %>', 'src/less/main.less']
        }
      }
    },

    /**
     * JSHint: https://github.com/gruntjs/grunt-contrib-jshint
     * 
     * Validate files with JSHint.
     * Below are options that conform to idiomatic.js standards.
     * Feel free to add/remove your favorites: http://www.jshint.com/docs/#options
     */
    jshint: {
      options: {
        camelcase: true,
        curly: true,
        eqeqeq: true,
        forin: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        quotmark: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true,
          $: true,
          Backbone: true,
          _: true,
          module: true,
          require: true,
          define: true
        }
      },
      files: ['Gruntfile.js', 'src/js/**/*.js', '!src/js/vendor/**/*']
    },

    /**
     * Shell: https://github.com/sindresorhus/grunt-shell
     * 
     * Grunt task to run shell commands.
     * For now we're just copying the src file over to dist and
     * zipping the example directory.
     */
    shell: {
      packageExample: {
        command: [
          'cp src/index.html dist/index.html',
          'cp -r src/fonts dist/static',
          'cp src/js/vendor/html5shiv/dist/html5shiv.js dist/static/js/html5shiv.js'
        ].join('&&')
      }
    },

    /**
     * Sed: https://github.com/jharding/grunt-sed
     * 
     * Built on top of replace, grunt-sed is a Grunt plugin for performing search and replace on files.
     */
    sed: {
      replaceScript: {
        path: 'dist/index.html',
        pattern: '<script data-main[^>]*>',
        replacement: '<script src="static/js/main.min.js">'
      }
    },

    /**
     * RequireJS: https://github.com/gruntjs/grunt-contrib-requirejs
     * 
     * Optimize RequireJS projects using r.js.
     */
    requirejs: {
      compile: {
        options: {
          baseUrl: 'src/js',
          name: 'main',
          mainConfigFile: 'src/js/main.js',
          paths: {
            requireLib: 'vendor/requirejs/require',
            jquery: 'vendor/jquery/jquery',
            underscore: 'vendor/underscore-amd/underscore',
            backbone: 'vendor/backbone-amd/backbone',
            text: 'vendor/requirejs-text/text',
            layoutmanager: 'vendor/layoutmanager/backbone.layoutmanager'
          },
          shim: {
            layoutmanager: ['backbone']
          },
          include: ['requireLib'],
          optimize: 'none',
          out: 'dist/static/js/main.js'
        }
      }
    },

    /**
     * Jasmine: https://github.com/gruntjs/grunt-contrib-jasmine
     * 
     * Run jasmine specs headlessly through PhantomJS.
     * jQuery and Jasmine jQuery is included for your pleasure: https://github.com/velesin/jasmine-jquery
     */
    jasmine: {
      test: {
        src: 'dist/static/js/main.js',
        options: {
          specs: 'test/*Spec.js',
          helpers: ['test/helpers/*Helper.js', 'test/helpers/sinon.js']
        }
      }
    },

    /**
     * Uglify: https://github.com/gruntjs/grunt-contrib-uglify
     * 
     * Minify JS files.
     * Make sure to add any other JS libraries/files you'll be using.
     */
    uglify: {
      options: {
        banner: '<%= banner.cfpb %> <%= banner.requirejs %> <%= banner.jquery %> <%= banner.sizzle %> <%= banner.underscore %> <%= banner.backbone %> <%= banner.requirejstext %>'
      },
      main: {
        files: {
          'dist/static/js/main.min.js': ['dist/static/js/main.js']
        }
      }
    },

    /**
     * Connect: https://github.com/gruntjs/grunt-contrib-connect
     * 
     * Start a connect web server.
     */
    connect: {
      demo: {
        options: {
          port: 8000,
          base: 'dist'
        }
      }
    },

    /**
     * Watch: https://github.com/gruntjs/grunt-contrib-watch
     * 
     * Run predefined tasks whenever watched file patterns are added, changed or deleted.
     * Add files to monitor below.
     */
    watch: {
      scripts: {
        files: ['src/**/*'],
        tasks: ['build']
      }
    }

  });

  /**
   * The above tasks are loaded here.
   */
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-sed');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-connect');

  /**
   * Create task aliases by registering new tasks
   */
  grunt.registerTask('test', ['jshint', 'jasmine']);
  grunt.registerTask('build', ['jshint', 'requirejs', 'shell', 'less', 'sed', 'uglify']);

  /**
   * The 'default' task will run whenever `grunt` is run without specifying a task
   */
  grunt.registerTask('default', ['connect', 'watch']);

};

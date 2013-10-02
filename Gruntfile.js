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

      vendors: grunt.file.read('docs/vendor-licenses.txt')

    },

    /**
     * LESS: https://github.com/gruntjs/grunt-contrib-less
     * 
     * Compile LESS files to CSS.
     */
    less: {
      main: {
        options: {
          banner: '<%= banner.cfpb %>',
          paths: ['src/static']
        },
        files: {
          'dist/static/css/main.css': ['src/static/less/main.less']
        }
      },
      ie8: {
        options: {
          banner: '<%= banner.cfpb %>',
          paths: ['src/static']
        },
        files: {
          'dist/static/css/ie8.css': ['src/static/less/ie/ie8.less']
        }
      }
    },

    /**
     * CSSMin: https://github.com/gruntjs/grunt-contrib-cssmin
     * 
     * Compress CSS files.
     */
    cssmin: {
      main: {
        keepSpecialComments: '*',
        files: {
          'dist/static/css/main.min.css': ['<%= banner.cfpb %>', 'dist/static/css/main.css']
        }
      },
      ie8: {
        keepSpecialComments: '*',
        files: {
          'dist/static/css/ie8.min.css': ['src/static/vendor/html5-placeholder-polyfill/dist/placeholder_polyfill.min.css', 'dist/static/css/ie8.css']
        }
      }
    },

    /**
     * HTMLmin: https://github.com/gruntjs/grunt-contrib-htmlmin
     * 
     * Minify HTML.
     */
    htmlmin: {
      dist: {
        options: {
          removeComments: true
        },
        files: {
          'dist/index.html': 'src/index.html',
          'dist/explore.html': 'src/explore.html',
          'dist/learn-more.html': 'src/learn-more.html',
          'dist/api.html': 'src/api.html',
          'dist/index_v1.html': 'src/index_v1.html',
          'dist/learn-more_v1.html': 'src/learn-more_v1.html'
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
        camelcase: false,
        curly: true,
        forin: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        quotmark: true,
        sub: true,
        boss: true,
        strict: true,
        evil: true,
        eqnull: true,
        browser: true,
        plusplus: false,
        globals: {
          jQuery: true,
          $: true,
          Backbone: true,
          _: true,
          module: true,
          require: true,
          define: true,
          console: true,
          EventEmitter: true
        }
      },
      files: ['Gruntfile.js', 'src/static/js/**/*.js', 'test/specs/*.js', '!src/static/js/templates/template.js', '!src/static/js/charts/*.js']
    },

    /**
     * Shell: https://github.com/sindresorhus/grunt-shell
     * 
     * Grunt task to run shell commands.
     * For now we're just copying the src file over to dist and
     * zipping the example directory.
     */
    shell: {
      dist: {
        command: [
          'cp -r src/static/fonts dist/static',
          'cp -r src/static/img dist/static',
          'cp -r src/static/vendor/cfpb-font-icons/static/fonts/* dist/static/fonts',
          'cp src/static/vendor/cfpb-font-icons/static/css/icons-ie7.css dist/static/css/icons-ie7.css',
          'cp src/static/vendor/zeroclipboard/* dist/static/js/zeroclipboard/',
          'cp src/static/vendor/chosen/public/chosen-* dist/static/css'
        ].join('&&')
      },
      planb: {
        command: [
          'cp -r dist/* dist-plan-b/',
          'rm dist-plan-b/api.html dist-plan-b/explore.html dist-plan-b/index_v1.html dist-plan-b/learn-more_v1.html'
        ].join('&&')
      },
      sauce: {
        command: [
          'rm -rf _SpecRunner.html .grunt sauce_connect.log*',
        ].join('&&')
      },
      mogo: {
        command: [
          'java -jar test/mogotest.jar ' + process.env.MOGO_API_KEY + ' www.hmda.test 9005',
        ].join('&&')
      }
    },

    /**
     * JST: https://github.com/gruntjs/grunt-contrib-jst
     * 
     * Precompile Underscore templates to JST file.
     */
    jst: {
      compile: {
        options: {
          namespace: 'PDP.templates',
          processName: function (filename) {
            return filename.split('/').pop().split('.')[0];
          },
          templateSettings: {
            pretty: true
          }
        },
        files: {
          'src/static/js/templates/template.js': ['src/static/js/templates/*.html']
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
        banner: '<%= banner.cfpb %> <%= banner.vendors %>',
        compress: false,
        mangle: false,
        beautify: true
      },
      jquery: {
        files: {
          'dist/static/js/jquery.min.js': [
            'src/static/vendor/jquery/jquery.js',
          ]
        }
      },
      main: {
        files: {
          'dist/static/js/main.min.js': [
            'src/static/vendor/json3/lib/json3.js',
            'src/static/vendor/lodash/lodash.js',
            'src/static/vendor/bootstrap/js/bootstrap-tooltip.js',
            'src/static/vendor/chosen/public/chosen.jquery.js',
            'src/static/js/analytics.js',
            'src/static/js/mobile.js'
          ]
        }
      },
      home: {
        files: {
          'dist/static/js/home.min.js': [
            'src/static/js/pages/home.js',
          ]
        }
      },
      explore: {
        files: {
          'dist/static/js/explore.min.js': [
            'src/static/vendor/eventEmitter/EventEmitter.js',
            'src/static/vendor/tidy-table/jquery.tidy.table.js',
            'src/static/vendor/jquery-ui/ui/jquery.ui.core.js',
            'src/static/vendor/jquery-ui/ui/jquery.ui.widget.js',
            'src/static/vendor/jquery-ui/ui/jquery.ui.mouse.js',
            'src/static/vendor/jquery-ui/ui/jquery.ui.slider.js',
            'src/static/vendor/zeroclipboard/ZeroClipboard.js',
            'src/static/js/templates/template.js',
            'src/static/js/modules/observer.js',
            'src/static/js/modules/utils.js',
            'src/static/js/modules/dom.js',
            'src/static/js/modules/query.js',
            'src/static/js/modules/preview.js',
            'src/static/js/modules/summary-table.js',
            'src/static/js/modules/form.js',
            'src/static/js/modules/app.js',
            'src/static/js/main.js'
          ]
        }
      },
      charts: {
        files: {
          'dist/static/js/charts.min.js': [
            'src/static/vendor/highcharts.com/js/highcharts.src.js',
            'src/static/js/charts/main.js',
            'src/static/js/charts/chart1_options.js',
            'src/static/js/charts/chart1.js',
            'src/static/js/charts/chart2_options.js',
            'src/static/js/charts/chart2.js'
          ]
        }
      },
      all: {
        files: {
          'dist/static/js/all.min.js': [
            'dist/static/js/jquery.min.js',
            'dist/static/js/main.min.js',
            'dist/static/js/explore.min.js'
          ]
        }
      },
      ie8: {
        files: {
          'dist/static/js/ie8.min.js': [
            'src/static/vendor/es5-shim/es5-shim.js',
            'src/static/vendor/html5shiv/dist/html5shiv.js',
            'src/static/vendor/html5shiv/dist/html5shiv-printshiv.js',
            'src/static/vendor/html5-placeholder-polyfill/dist/placeholder_polyfill.jquery.min.combo.js',
            'src/static/js/modules/ie8.js'
          ]
        }
      },
      respond: {
        files: {
          'dist/static/js/respond.min.js': [
            'src/static/vendor/respond/respond.min.js'
          ]
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
          hostname: '*',
          base: 'dist'
        }
      },
      sauce: {
        options: {
          port: 9000
        }
      },
      mogo: {
        options: {
          port: 9005,
          base: 'dist'
        }
      }
    },

    /**
     * Jasmine: https://github.com/gruntjs/grunt-contrib-jasmine
     * 
     * Run jasmine specs headlessly through PhantomJS.
     */
    jasmine: {
      cover: {
         src: [
           'src/static/js/modules/**/*.js',
           '!src/static/js/modules/dom.js',
           '!src/static/js/modules/ie8.js'
          ],
          options: {
            specs: 'test/specs/*.js',
            template: require('grunt-template-jasmine-istanbul'),
            templateOptions: {
              coverage: 'test/coverage/coverage.json',
              report: [
                {
                  type: 'html',
                  options: { dir: 'test/coverage/report/html' }
                },
                {
                  type: 'cobertura',
                  options: { dir: 'test/coverage/report/cobertura'}
                },
                {
                  type: 'text',
                  options: { dir: 'test/coverage/report/text'}
                },
              ]
            },
            helpers: [
              'test/specs/helpers/*.js',
              'dist/static/js/all.min.js'
            ],
            junit: {
              path: 'test/junit'
            },
            timeout: 30000
          }
      },
      sauce: {
         src: [
           'src/static/js/modules/**/*.js',
           '!src/static/js/modules/ie8.js'
          ],
          options: {
            specs: 'test/specs/*.js',
            template: require('grunt-template-jasmine-istanbul'),
            templateOptions: {
              coverage: 'test/coverage/coverage.json',
              report: [
                {
                  type: 'html',
                  options: { dir: 'test/coverage/report/html' }
                },
                {
                  type: 'cobertura',
                  options: { dir: 'test/coverage/report/cobertura'}
                },
                {
                  type: 'text',
                  options: { dir: 'test/coverage/report/text'}
                },
              ]
            },
            helpers: [
              'test/specs/helpers/*.js',
              'dist/static/js/all.min.js'
            ],
            keepRunner: true,
            timeout: 30000
          }
      }
    },

    /**
     * Sauce Labs: https://github.com/axemclion/grunt-saucelabs
     * 
     * A Grunt task for running QUnit, Jasmine, Mocha and YUI tests using Sauce Labs' Cloudified Browsers.
     */
    'saucelabs-jasmine': {
      all: {
        options: {
          urls: ['http://127.0.0.1:9000/_SpecRunner.html'],
          detailedError: true,
          testname: 'HMDA',
          testTimeout: 180000,
          tags: [
            'public-data-platform',
            'hmda'
          ],
          browsers: [
            {
                browserName: 'firefox',
                version: '20',
                platform: 'XP'
            }, {
                browserName: 'chrome',
                platform: 'XP'
            }, {
                browserName: 'chrome',
                platform: 'linux'
            }, {
                browserName: 'internet explorer',
                platform: 'WIN8',
                version: '10'
            }, {
                browserName: 'internet explorer',
                platform: 'WIN7',
                version: '9'
            }, {
                browserName: 'internet explorer',
                platform: 'VISTA',
                version: '9'
            }
          ]
        }
      }
    },

    /**
     * Docco: https://github.com/DavidSouther/grunt-docco
     * 
     * Grunt Docco plugin.
     */
    docco: {
      js: {
        src: ['src/static/js/**/*.js'],
        options: {
          output: 'docs/'
        }
      }
    },

    /**
     * Remove logging: https://github.com/ehynds/grunt-remove-logging
     * 
     * This task removes all console logging statements from your source code.
     */
    removelogging: {
      all: {
        src: 'dist/static/js/all.min.js',
        dest: 'dist/static/js/all.min.js'
      },
      main: {
        src: 'dist/static/js/main.min.js',
        dest: 'dist/static/js/main.min.js'
      },
      home: {
        src: 'dist/static/js/home.min.js',
        dest: 'dist/static/js/home.min.js'
      },
      explore: {
        src: 'dist/static/js/explore.min.js',
        dest: 'dist/static/js/explore.min.js'
      },
      charts: {
        src: 'dist/static/js/charts.min.js',
        dest: 'dist/static/js/charts.min.js'
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
        files: ['src/*.html', 'src/static/less/**/*.less', 'src/static/js/**/*.js', 'test/specs/*.js'],
        tasks: ['build', 'test']
      }
    }

  });

  /**
   * The above tasks are loaded here.
   */
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-cfpb-internal');
  grunt.loadNpmTasks('grunt-docco');
  grunt.loadNpmTasks('grunt-remove-logging');
  grunt.loadNpmTasks('grunt-contrib-jst');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-saucelabs');

  /**
   * Create task aliases by registering new tasks
   */
  grunt.registerTask('test', ['jshint', 'jasmine:cover']);
  grunt.registerTask('sauce', ['connect:sauce', 'jasmine:sauce', 'saucelabs-jasmine', 'shell:sauce']);
  grunt.registerTask('mogo', ['connect:mogo', 'shell:mogo']);
  grunt.registerTask('docs', ['removelogging', 'docco', 'build-cfpb']);
  grunt.registerTask('build', ['htmlmin', 'shell:dist', 'jst', 'uglify', 'less', 'cssmin', 'shell:planb']);

  /**
   * The 'default' task will run whenever `grunt` is run without specifying a task
   */
  grunt.registerTask('default', ['connect:demo', 'watch']);

};

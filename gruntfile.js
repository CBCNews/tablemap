module.exports = function(grunt) {

    /* Define the files and directories that we're working with.  */
    var sourceDirectory             = 'src/';
    var buildDirectory              = 'build/';
    var deployDirectory             = '<PATH TO LOCAL DEV SERVER ROOT>';

    var htmlSource                  = [
                                        'index.html',
                                        'interactive.html'
                                        ];

    var buildAssets                 = [
                                        'data/**',
                                        'fonts/**',
                                        'gfx/**',
                                        'js/**',
                                        'css/**'
                                        ];

    /* Output file defined in tasks below */
    var cssVendorSource             = [ ];
    var cssAppSource                = [ 'src/css/app.scss' ];
    var cssAppMediaQueriesSource    = [ 'src/css/media-queries.scss' ];


    /* Deploy unconcatenated copy of vendor JS */
    var jsVendorCopyThruFiles       = {
       'src/js/vendor/aight.js'                     : 'bower_components/aight/aight.js',
       'src/js/vendor/aight.d3.js'                  : 'bower_components/aight/aight.d3.js',
       'src/js/vendor/d3.js'                        : 'bower_components/d3/d3.js',
       'src/js/vendor/handlebars.js'                : 'bower_components/handlebars/handlebars.js',
       'src/js/vendor/html5shiv.js'                 : 'bower_components/html5shiv/dist/html5shiv.js',
       'src/js/vendor/jquery.js'                    : 'bower_components/jquery/dist/jquery.js',
       'src/js/vendor/miso.ds.deps.ie.0.4.1.js'     : 'bower_components/miso.dataset/dist/miso.ds.deps.ie.0.4.1.js',
       'src/js/vendor/modernizr.js'                 : 'bower_components/modernizr/modernizr.js'
    };


    /* Vendor JS to concatenate, excludes shims, etc. */
    var jsVendorSource              = [
                                        'bower_components/d3/d3.js',
                                        'bower_components/handlebars/handlebars.js',
                                        'bower_components/miso.dataset/dist/miso.ds.deps.ie.0.4.1.js'
                                        ];

    var jsAppSource                 = [ 'src/js/app.js' ];
    var jsAppConfigSource           = [ 'src/js/config.js' ];





    /* Load the required grunt modules using Matchdep  */
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    // Task configurations
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        autoprefixer: {

            single_file: {
                options: {
                    browsers: ['last 2 versions']
                },

                files: {
                    'src/css/app.css': cssAppSource,
                    'src/css/media-queries.css': cssAppMediaQueriesSource,
                }

            }
        },

        sass: {
            app: {
                options: {
                    // style: 'compressed'
                },
                files: {
                    'src/css/app.css': cssAppSource,
                    'src/css/media-queries.css': cssAppMediaQueriesSource
                }
            }
        },

        concat: {
            options: {
                separator: grunt.util.linefeed + grunt.util.linefeed + grunt.util.linefeed + '/************************************************************/' + grunt.util.linefeed,
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            jsVendor: {
                src: jsVendorSource,
                dest: 'src/js/vendor.js'
            },
            cssVendor: {
                src: cssVendorSource,
                dest: 'src/css/vendor.css'
            },
        },

        clean: {
            build: buildDirectory,
        },

        copy: {
            html: {
                expand: true,
                cwd: 'src/',
                src: htmlSource,
                dest: buildDirectory,
            },
            vendorJSFilesThruCopy: {
                files: jsVendorCopyThruFiles
            },
            assets: {
                expand: true,
                cwd: 'src/',
                src: buildAssets,
                dest: buildDirectory,
            },
            deployLocal: {
                expand: true,
                cwd: buildDirectory,
                src: '**',
                dest: deployDirectory,
            }
        },

        browserSync: {
            dev: {
                bsFiles: {
                    src : 'assets/css/style.css'
                },
                options: {
                    proxy: "local.dev",
                    watchTask: true
                }
            }
        },

    });


    /* Define CLI tasks*/

    grunt.registerTask('autoprefix', ['autoprefixer']);
    grunt.registerTask('sassy', ['sass']);
    grunt.registerTask('combine', ['concat']);
    grunt.registerTask('cleaner', ['clean']);
    grunt.registerTask('copyer', ['copy']);
    grunt.registerTask('deployPreview', ['copy:deployLocal']);

    grunt.registerTask('default', ['autoprefixer', 'sass', 'concat', 'clean', 'copy:html', 'copy:vendorJSFilesThruCopy', 'copy:assets' ]);

};

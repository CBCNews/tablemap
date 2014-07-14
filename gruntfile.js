module.exports = function(grunt) {

    /* Define the files and directories that we're working with.  */
    var sourceDirectory             = 'src/';
    var buildDirectory              = 'build/';
    var deployDirectory             = '/Users/michael/Sites/cbc-ca/news2/interactives/map/';

    var htmlSource                  = [
                                        'index.html'
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
    var cssAppSource                = [ 'src/sass/app.scss' ];
    var cssAppMediaQueriesSource    = [ 'src/sass/media-queries.scss' ];


    /* Deploy unconcatenated copy of vendor JS */
    var jsVendorCopyThruFiles       = {

    };


    /* Vendor JS to concatenate, excludes shims, etc. */
    var jsVendorSource              = [

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
        }

    });


    /* Define CLI tasks*/

    grunt.registerTask('autoprefix', ['autoprefixer']);
    grunt.registerTask('sassy', ['sass']);
    grunt.registerTask('combine', ['concat']);
    grunt.registerTask('cleaner', ['clean']);
    grunt.registerTask('copyer', ['copy']);
    grunt.registerTask('deployPreview', ['copy:deployLocal']);

    grunt.registerTask('default', ['sass', 'concat', 'clean', 'copy:html', 'copy:vendorJSFilesThruCopy', 'copy:assets' ]);

};

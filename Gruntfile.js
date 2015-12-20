module.exports = function (grunt) {
    /*eslint camelcase: 0*/
    'use strict';

    // filesets for uglify
    var files = {
        'socrates/public/clientscripts/global.js': [
            'node_modules/jquery/dist/jquery.js',
            'node_modules/guillotine/js/jquery.guillotine.js',
            'node_modules/select2/dist/js/select2.js',
            'node_modules/autonumeric/autonumeric.js',
            'node_modules/bootstrap/dist/js/bootstrap.js',
            'node_modules/bootstrap-datepicker/js/bootstrap-datepicker.js',
            'node_modules/bootstrap-markdown/js/bootstrap-markdown.js',
            'node_modules/moment-timezone/node_modules/moment/moment.js',
            'node_modules/drmonty-smartmenus/js/jquery.smartmenus.js',
            'socrates/build/javascript/jquery.smartmenus.bootstrap-patched.js',
            'node_modules/jquery-validation/dist/jquery.validate.js',
            'node_modules/jquery-validation/dist/additional-methods.js',
            'node_modules/simple-timepicker/dist/simple-timepicker.js',
            'node_modules/urijs/src/URI.js',
            'socrates/locales/frontend_en.js',
            'socrates/frontend/javascript/socrates.js'
        ]
    };

    grunt.initConfig({
        clean: {
            build: ['socrates/build/'],
            public: ['clientscripts'],
            options: {force: true}
        },
        copy: {
            reactJS: {
                src: ['node_modules/react/dist/react.js',
                    'node_modules/react-dom/dist/react-dom.js',
                    'node_modules/babel-core/browser.js'],
                dest: 'clientscripts',
                expand: true,
                flatten: true
            }
        },
        browserify: {
            bundle: {
                src: ['src/*'],
                dest: 'clientscripts/bundle.js'
            }
        },
        uglify: {
            development: {
                options: {
                    mangle: false,
                    beautify: true
                },
                files: files
            },
            production: {
                files: files
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('prepare', ['browserify', 'copy']);
    grunt.registerTask('frontendtests', ['clean', 'prepare', 'jade', 'uglify:production', 'karma:once', 'uglify:development', 'karma:once', 'istanbul_check_coverage:frontend']);
    grunt.registerTask('tests', ['prepare', 'frontendtests', 'mocha_istanbul', 'istanbul_check_coverage:server']);
    grunt.registerTask('deploy_development', ['prepare', 'uglify:development']);
    grunt.registerTask('deploy_production', ['clean', 'prepare', 'uglify:production']);

    // Default task.
    grunt.registerTask('default', ['tests', 'uglify:development']);
};

module.exports = function (grunt) {
    /*eslint camelcase: 0*/
    'use strict';

    grunt.initConfig({
        clean: {
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
        mochaTest: {
            test: {
                options: {
                    reporter: 'dot',
                    require: 'babel/register'
                },
                src: ['test/*.js']
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.registerTask('prepare', ['clean', 'browserify', 'copy']);
    grunt.registerTask('tests', ['prepare', 'mochaTest']);

    // Default task.
    grunt.registerTask('default', ['tests']);
};

module.exports = function( grunt ) {
  grunt.initConfig({
    pkg: grunt.file.readJSON( "package.json" ),

    csslint: {
      files: {
        options: {
          "adjoining-classes": false,
          "gradients": false
        },
        src: [
          "public/**/*.css"
        ]
      }
    },
    jshint: {
      files: [
        "Gruntfile.js",
        "app.js",
        "lib/**/*.js",
        "public/**/*.js",
        "routes/**/*.js"
      ]
    }
  });

  grunt.loadNpmTasks( "grunt-contrib-csslint" );
  grunt.loadNpmTasks( "grunt-contrib-jshint" );

  grunt.registerTask( "default", [ "csslint", "jshint" ]);
};

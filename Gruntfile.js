module.exports = function(grunt) {
	// load plugins
	[
		'grunt-cafe-mocha',
		'grunt-cafe-contrib-jshint',
		'grunt-exec',
	].forEach(function(task){
		grunt.loadNpmTasks(task);
	});

	// configure plugins
	grunt.initConfig({

	});

	// register tasks
	grunt.registerTask('default', ['cafemocha', 'jshint', 'exec']); // As 'default' these will run at CLI with 'grunt' command with no arguments.


};

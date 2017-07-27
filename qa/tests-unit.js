var fortune = require('../lib/fortune.js');
var expect = require('chai').expect;

suite('Fortune cookie tests', function(){

	test('getFortune should return a fortune (string) and not a number', function() {
		//expect(typeof fortune.getFortune === 'strings');
		expect(typeof fortune.getFortune === 'numeric');//why does this not fail!?
	});
});

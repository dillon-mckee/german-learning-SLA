var _ = require('underscore');
var words = require('./words').words
var mongoose = require('mongoose');

var shuffled;
var algo = function(words) {
var percentages = [1, 2, 2, 3, 2]
var wordArr = words.reduce(function(a, b, i) {
  var arr = []
  var times = percentages[i];

  for(var j = 0; j < times; j++) {
    arr.push(b)
  }
  return a.concat(arr);
}, [])

shuffled = _.shuffle(wordArr)
return shuffled;
// if user gets it right.  Look up indexOf word in words then subract from same indexOf
// in percentages
//
};
console.log(algo(words))
module.exports = shuffled

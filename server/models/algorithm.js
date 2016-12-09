var _ = require('underscore');
// var words = require('user').words
var mongoose = require('mongoose');

var shuffled;
var Arr = []
var algo = function(words) {
  for (var i = 0; Arr.length <= 10; i++) {

if (words[i].attempted === false) {
  Arr.push(words[i])
  Arr.push(words[i])
  Arr.push(words[i])
  console.log(Arr)
}

else if (words[i].last === 0 && words[i].attempted === true) {

}

else if (((words[i].correct) / (words[i].last)) == 1 ) {
  words[i].last = 0
  words[i].correct = 0
  //console.log(arr)

}

else if (((words[i].correct) / (words[i].last)) >= .6 ) {
  words[i].last = 0
  words[i].correct = 0
  Arr.push(words[i])
  //console.log(arr)

}

else if (((words[i].correct) / (words[i].last)) >= .3 ) {
  words[i].last = 0
  words[i].correct = 0
  Arr.push(words[i])
  Arr.push(words[i])
//  console.log(arr)

}

else if (((words[i].correct) / (words[i].last)) <= .3 ) {
  words[i].last = 0
  words[i].correct = 0
  Arr.push(words[i])
  Arr.push(words[i])
  Arr.push(words[i])
  // console.log(Arr)

}
// return Arr;
}

// var percentages = [1, 2, 2, 3, 2]
// var wordArr = words.reduce(function(a, b, i) {
//   var arr = []
//   var times = percentages[i];
//
//   for(var j = 0; j < times; j++) {
//     arr.push(b)
//   }
//   return a.concat(arr);
// }, [])

// shuffled = _.shuffle(Arr)
return Arr;
// if user gets it right.  Look up indexOf word in words then subract from same indexOf
// in percentages
//
};
// console.log(algo(words))
module.exports = algo

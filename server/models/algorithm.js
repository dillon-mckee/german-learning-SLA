var _ = require('underscore')
var words = ['apple', 'that', 'then', 'hello', 'goes']

var percentages = [1, 3, 3, 3, 5]

var wordArr = words.reduce(function(a, b, i) {
  var arr = []
  for(var i = 0; i < percentages[i]; i++) {
    arr.push(b)
  }
  return a.concat(arr)
}, [])

// shuffle the array
console.log(_.shuffle(wordArr))

// if user gets it right.  Look up indexOf word in words then subract from same indexOf
// in percentages
//

#cutoff-catcher
### A binary-search-flavored method to finding a cutoff


#### Meta

- Author: Charlie DiGiovanna
- Email: cd17822@gmail.com
- Twitter, Github, npm: [@cd17822](https://twitter.com/cd17822)
- Site: http://www.charlied.me
- Version: 1.0.4


#### Installation

To install `cutoff-catcher` using [npm](https://www.npmjs.org/), run:

```
$ npm install cutoff-catcher
```

#### How it works

By putting in an initial step, `cutoff-catcher` will iterate over the integers by such step until the a condition is satisfied (the input function returns true). Then a binary search beginning at the midpoint of the iterator's position and the previous iterator position will begin until the cutoff between where the condition is and is not satisfied is found. Return format is (error, cutoffPosition).


#### Usage

With `cutoff-catcher` you can do more efficient iterations over a large range of numbers to search for where a certain quality changes. Specify an initial step size and a function to look for a specific quality. Will return an error if it could not find the cutoff in 1,000,000 steps, or the first integer where the test is successful. The following are 3 examples where one could apply the module (1 javascript and 2 coffeescript because coffeescript is life).

Find the smallest value for which the sum from i=1 to n of (2i)^3 <= (20n)^3.

```javascript
var catcher = require('cutoff-catcher');

test = function(x){
  var sum = 0;

  for (var i=0; i<x; i++) {
    sum += Math.pow(2*i, 3);
  }

  return sum > Math.pow(20*x, 3);
}

catcher(1000, test, function(err, cutoff){
  if(err){
    console.log(err);
  }else{
    console.log(cutoff);
  }
});
```

Do a more efficient find for alpha-ordered lists (better for large lists).

```coffeescript
catcher = require 'cutoff-catcher'

dict = ["apple", "grapefruit", "orange", "tomato", "zuchini", "banana", "kiwi", "grape"].sort()

catcher 4, (x) -> dict[x] >= "grape", (err, cutoff) ->
  if err then console.log err
  else console.log dict[cutoff]
```

Find a field attribute cutoff in a list of objects.

```coffeescript
ben = name: 'ben', present: yes
luke = name: 'luke', present: yes
joe = name: 'joe', present: yes
noah = name: 'noah', present: no
gary = name: 'gary', present: no

people = [ben, luke, joe, noah, gary]

test = (x) -> try not people[x].present

catcher 2, test, (err, cutoff) ->
  if err then console.log err
  else console.log people[cutoff].name
```

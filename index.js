/**
 * By putting in an initial step, cutoff-catcher
 * will iterate over the integers by such step until
 * the a condition is satisfied (the input function
 * returns true). Then a binary search beginning at the
 * midpoint of the iterator's position and the previous
 * iterator position will begin until the cutoff
 * between where the condition is and is not satisfied
 * is found.
 *
 * @param {Integer} step - Initial step to iterate by
 * @param {Function} test - Condition to find cutoff by
 * @param {Function} callback - Optional callback with
 *   format (error, cutoffPosition)
 */

module.exports = catcher = function(step, test, callback){
  var found = false;

  for(var i = 0; i < step*1000000; i += step){
    var step_true = test(i);
    var below_true = test(i-1);

    if(step_true && below_true){
      callback(null, sift(i, step, test, callback));
      found = true;
      break;
    }else if(step_true){
      callback(null, i);
      found = true;
      break;
    }
  }

  if(!found){
    callback(new Error("Could not find cutoff in 1,000,000 steps"));
  }
}

sift = function(position, step, test, callback){
  if(step < 2){
    var clean_step = 1;
  }else{
    var clean_step = ~~(step/2);
  }

  var midpoint = position - clean_step;

  var midpoint_true = test(midpoint);
  var below_true = test(midpoint-1);

  if(midpoint_true && below_true){
    return sift(midpoint, clean_step, test, callback);
  }else if(!midpoint_true){
    return sift(position, clean_step, test, callback);
  }else{
    return midpoint;
  }
}

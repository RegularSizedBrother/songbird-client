var assert = require('assert');

function add_two_nums (x, y){
    return x + y;
}

var expected = add_two_nums(7, 3);
assert(expected == 10, 'Seven plus three is ten');
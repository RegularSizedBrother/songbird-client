var assert = require('assert');

function add_two_nums (x, y){
    return x + y;
}

it('7+3 should equal 10', function () {
    add_two_nums(7,3) == 10
})
var assert = require('assert');

const webdriver = require('selenium-webdriver');

const driver = new webdriver.Builder().forBrowser("firefox").build();

driver.navigate().to("http://localhost:3000/");

//driver.navigate().to("http://google.com");

function add_two_nums (x, y){
    return x + y;
}

it('7+3 should equal 10', function () {
    add_two_nums(7,3) == 10
})
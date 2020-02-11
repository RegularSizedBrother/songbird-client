var assert = require('assert');

const webdriver = require('selenium-webdriver');

const driver = new webdriver.Builder().forBrowser("firefox").build();

driver.get("localhost:3000")

it("enters twitter handle into textbox and moves to next page", function() {
    var textbox = driver.findElement(webdriver.By.className('form-control'));

    textbox.sendKeys("JeffBezos");

    textbox.sendKeys(webdriver.Key.RETURN);

    var chart = driver.findElement(webdriver.By.className('recharts-wrapper'));

    assert(chart !== null)
}).timeout(15000)

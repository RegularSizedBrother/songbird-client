var assert = require('assert');

const webdriver = require('selenium-webdriver');

const driver = new webdriver.Builder().forBrowser("firefox").build();

//driver.navigate().to("http://localhost:3000/");

//driver.navigate().to("http://google.com");
driver.get("http://localhost:3000/");

it('Title of page should be React App', function() { 
    title = driver.getTitle();
    console.log(title)
    title == "React App"
}).timeout(10000);

driver.quit();
// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('Login and reports', function() {
  this.timeout(30000)
  let driver
  let vars
  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build()
    vars = {}
  })
  afterEach(async function() {
    // await driver.manage().deleteAllCookies();
    await driver.quit();
  })
  it('Look at report for week 1', async function() {
    await driver.get("https://oscarlang.me/")
    await driver.manage().window().setRect(794, 824)
    {
      const element = await driver.findElement(By.css(".MuiSvgIcon-root"))
      await driver.actions({ bridge: true }).move(element).perform()
    }
    await driver.findElement(By.css(".MuiSvgIcon-root")).click()
    await driver.wait(
        until.elementLocated(By.linkText("Reports")),
        5000
    );
    await driver.findElement(By.linkText("Reports")).click()
    await driver.findElement(By.css(".MuiBackdrop-root")).click()
    await driver.findElement(By.css("#week1")).click();
    await driver.wait(
        until.elementLocated(By.id("available-scripts")),
        5000
    );
    const element = await driver.findElement(By.id("available-scripts"));
    element.getText().then(function(text) {
        assert(text, "Available Scripts");
    });
  })
  it('Login and redirect to homepage', async function() {
    await driver.get("https://oscarlang.me/login");
    await driver.manage().window().setRect(794, 824);
    await driver.findElement(By.id("email")).then(function(el) {
        el.click();
        el.sendKeys("e2e@test.com");
    });
    await driver.findElement(By.id("password")).then(function(el) {
        el.click();
        el.sendKeys("Test1234");
    });
    await driver.findElement(By.id("signin")).click();
    await driver.wait(
        until.elementLocated(By.id("home")),
        5000
    );
    driver.getCurrentUrl().then(function(url) {
        assert.ok(url.endsWith("/"));
    });
  })
  it('Login and create new report on week 6', async function() {
    await driver.get("https://oscarlang.me/")
    await driver.manage().window().setRect(794, 824)
    await driver.findElement(By.css(".MuiSvgIcon-root")).click()
    await driver.wait(
        until.elementLocated(By.linkText("Log in")),
        5000
    );
    await driver.findElement(By.linkText("Log in")).click()
    await driver.findElement(By.css(".MuiBackdrop-root")).click()
    await driver.findElement(By.id("email")).click()
    await driver.findElement(By.id("email")).sendKeys("e2e@test.com")
    await driver.findElement(By.id("password")).click()
    {
      const element = await driver.findElement(By.css(".MuiButton-root"))
      await driver.actions({ bridge: true }).move(element).perform()
    }
    await driver.findElement(By.id("password")).sendKeys("Test1234")
    await driver.findElement(By.css(".MuiButton-root")).click()
    {
      const element = await driver.findElement(By.css(".MuiSvgIcon-root"))
      await driver.actions({ bridge: true }).move(element).perform()
    }
    await driver.findElement(By.css(".MuiSvgIcon-root")).click()
    await driver.wait(
        until.elementLocated(By.linkText("Reports")),
        5000
    );
    await driver.findElement(By.linkText("Reports")).click()
    await driver.findElement(By.css(".MuiBackdrop-root")).click()

    await driver.wait(
        until.elementLocated(By.id("createReport")),
        5000
    );
    await driver.findElement(By.id("createReport")).click()

    await driver.findElement(By.id("week")).click();
    {
        const element = await driver.findElement(By.xpath("//*[normalize-space(text()) = '6']"));
        await driver.actions({ bridge: true }).move(element).click(element).perform();
    }
    await driver.findElement(By.id("text")).click()
    await driver.findElement(By.id("text")).sendKeys("TEST")
    await driver.findElement(By.css(".MuiButton-label")).click();
    await driver.wait(
        until.elementLocated(By.id("textData")),
        5000
    );
    const element = await driver.findElement(By.id("textData"));
    element.getText().then(function(text) {
        assert(text, "TEST");
    });
    await driver.findElement(By.id("deleteReport")).click()
  })
})

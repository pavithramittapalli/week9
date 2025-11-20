const { Builder, By } = require("selenium-webdriver");
const assert = require("assert");
const path = require("path");

async function runTest() {
    let driver = await new Builder().forBrowser("chrome").build();

    try {
        let filePath = "file://" + path.join(__dirname, "index.html");
        await driver.get(filePath);

        await driver.findElement(By.id("num1")).sendKeys("50");
        await driver.findElement(By.id("num2")).sendKeys("10");
        await driver.findElement(By.id("add")).click();

        let result = await driver.findElement(By.id("result")).getText();

        assert.strictEqual(result, "60");
        console.log("✅ Test Passed (Sum = 60)");

    } catch (e) {
        console.error("❌ Test Failed:", e);
    }
}

runTest();

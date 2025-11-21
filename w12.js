const { Builder, By } = require("selenium-webdriver");
const assert = require("assert");
const path = require("path");

async function runTests() {
    let driver = await new Builder().forBrowser("chrome").build();

    try {
        let filePath = "file://" + path.join(__dirname, "index.html");
        await driver.get(filePath);

        async function testCase(id, num1, num2, expected) {
            await driver.findElement(By.id("num1")).clear();
            await driver.findElement(By.id("num2")).clear();

            if (num1 !== null) await driver.findElement(By.id("num1")).sendKeys(num1);
            if (num2 !== null) await driver.findElement(By.id("num2")).sendKeys(num2);

            await driver.findElement(By.id("add")).click();

            let result = await driver.findElement(By.id("result")).getText();
            assert.strictEqual(result, expected.toString());

            console.log(✅ Test Case ${id} Passed (Expected = ${expected}));
        }

        // -------------------------
        // TEST CASES
        // -------------------------

        // TC001: Valid input
        await testCase("TC001", "50", "10", 60);

        // TC002: Both zeros
        await testCase("TC002", "0", "0", 0);

        // TC003: One empty input (null = simulate empty)
        await testCase("TC003", null, "10", 10);

        // TC004: Negative number + positive number
        await testCase("TC004", "-5", "20", 15);

        // TC005: Non-numeric input
        await testCase("TC005", "abc", "10", 10);

        // TC006: Large number test
        await testCase("TC006", "99999", "1", 100000);

        // TC007: Check if essential elements exist
        assert.ok(await driver.findElement(By.id("num1")));
        assert.ok(await driver.findElement(By.id("num2")));
        assert.ok(await driver.findElement(By.id("add")));
        assert.ok(await driver.findElement(By.id("result")));
        console.log("✅ TC007 Passed (All UI elements exist)");

        console.log("\n🎉 ALL TEST CASES PASSED SUCCESSFULLY!");

    } catch (err) {
        console.error("❌ Test Failed:", err);
    } finally {
        await driver.quit();
    }
}

runTests();
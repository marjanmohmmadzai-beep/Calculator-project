import { describe, expect, it } from "vitest";
import { TestDriver } from "testdriverai/vitest/hooks";

describe("Calculator", () => {
  it("should perform addition and clear the result", async (context) => {
    const testdriver = TestDriver(context);

    await testdriver.provision.chrome({ url: "https://www.calculator.net" });

    // 7 + 5 = 12
    await testdriver.find("the '7' button on the calculator keypad").click();
    await testdriver.find("the '+' addition button on the calculator keypad").click();
    await testdriver.find("the '5' button on the calculator keypad").click();
    await testdriver.find("the '=' equals button on the calculator keypad").click();

    const resultAfterAddition = await testdriver.assert("the calculator display shows 12");
    expect(resultAfterAddition).toBeTruthy();

    // Reset with AC
    await testdriver.find("the 'AC' clear button on the calculator keypad").click();

    const resultAfterClear = await testdriver.assert("the calculator display shows 0");
    expect(resultAfterClear).toBeTruthy();
  });
});

import { describe, expect, it } from "vitest";
import { TestDriver } from "testdriverai/vitest/hooks";

describe("Flow Website", () => {
  it("loads the landing page and verifies navigation and download modal", async (context) => {
    const testdriver = TestDriver(context);

    await testdriver.provision.chrome({ url: "https://flow-ten-rho.vercel.app" });

    const heroAssert = await testdriver.assert("the heading 'Write without interruption.' is visible");
    expect(heroAssert).toBeTruthy();

    const downloadBtn = await testdriver.find("Download button in the top navigation bar");
    await downloadBtn.click();

    const modalAssert = await testdriver.assert("the modal with title 'Windows Protected Your PC' is visible");
    expect(modalAssert).toBeTruthy();

    const cancelBtn = await testdriver.find("Cancel button inside the modal");
    await cancelBtn.click();

    const dismissedAssert = await testdriver.assert("the 'Download Flow for Windows' button is visible and the modal is dismissed");
    expect(dismissedAssert).toBeTruthy();

    const featuresLink = await testdriver.find("Features link in the navigation bar");
    await featuresLink.click();

    const featuresAssert = await testdriver.assert("the section heading 'Built for focus.' is visible");
    expect(featuresAssert).toBeTruthy();
  });

  it("opens and closes the Privacy Policy modal from the footer", async (context) => {
    const testdriver = TestDriver(context);

    await testdriver.provision.chrome({ url: "https://flow-ten-rho.vercel.app" });

    await testdriver.pressKeys(["escape"]);
    await testdriver.scroll("down", { amount: 2500 });

    const privacyBtn = await testdriver.find("Privacy Policy button in the footer");
    await privacyBtn.click();

    const privacyAssert = await testdriver.assert("the modal with title 'Privacy Policy' is visible");
    expect(privacyAssert).toBeTruthy();

    const closeBtn = await testdriver.find("Close Document button in the modal");
    await closeBtn.click();

    const closedAssert = await testdriver.assert("the Privacy Policy modal is closed and the footer is visible");
    expect(closedAssert).toBeTruthy();
  });
});

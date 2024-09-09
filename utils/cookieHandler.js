async function handleCookiesPopup(page) {
    const cookieButton = page.locator('#onetrust-accept-btn-handler')
    await page.addLocatorHandler(cookieButton, async () => {
        await cookieButton.click();
    });
}

module.exports = { handleCookiesPopup };

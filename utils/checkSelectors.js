export const objectTry_out = async (page, object, state = 'visible') => {
    const objectKeys = Object.keys(object);
    for (const key of objectKeys) {
        const locator = page.locator(object[key]);
        try {
            await locator.waitFor({ state });
            console.log(`Selector "${key}" is now ${state} on the page.`);
        } catch (error) {
            console.error(`Selector "${key}" did not appear on the page within the timeout period.`);
            throw new Error(`Selector "${key}" was not ${state} within the expected time.`);
        }
    }
};

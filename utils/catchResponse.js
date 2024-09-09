import { expect } from '@playwright/test';

export const catchResponseWithAction = async (page, endpoint, statusCode = 200, action) => {
    // Get the baseURL from the Playwright context
    const baseURL = page.context()._options.baseURL;

    try {
        // Wait for the response and perform the action simultaneously
        const [response] = await Promise.all([
            page.waitForResponse(baseURL.concat(endpoint), { timeout: 30000 }),
            action  // Perform the action that triggers the response
        ]);

        // Check the status code
        expect(response.status()).toBe(statusCode);

        // Parse the response body as JSON
        const result = await response.json();

        // Return the response and result
        return { response, result };

    } catch (error) {
        console.error('Error while fetching response:', error);
        throw error;
    }
};

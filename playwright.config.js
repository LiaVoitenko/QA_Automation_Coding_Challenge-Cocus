const config = {
    testDir: './tests', // Specify the directory where your test files are located
    timeout: 90000, // Global timeout for each test in milliseconds (60 seconds)
    expect: {
        timeout: 60000, // Timeout for expect assertions to wait for a condition to be met (60 seconds)
    },
    waitForTimeout: 15000, // Maximum time to wait for any locator (element) in milliseconds (10 seconds)
    fullyParallel: true, // Run tests in parallel across multiple workers (improves test speed)
    navigationTimeout: 60000, // Maximum time for navigation actions (e.g., page.goto) in milliseconds (60 seconds)
    use: {
        baseURL: 'https://www.jacamo.co.uk',
        headless: false,
        ignoreHTTPSErrors: true,
        launchOptions: {
            args: [
                '--disable-extensions-http-throttling',
                '--incognito',
                '--disable-background-timer-throttling',
                '--disable-popup-blocking',
            ],
        },
        screenshot: 'only-on-failure', // Capture screenshots only when a test fails
        video: 'only-on-failure', // Record video and retain it only when a test fails
        trace: 'on-first-retry', // Capture a trace when the test is retried for the first time
    },
    // retries: 1, // Retry failing tests once before considering them as failed
    reporter: [
        ['list'], // Show a list of test results in the console during the test run
        ['html', { open: '' }], // Generate an HTML report of the test run
        // The HTML report will not automatically open after the tests run
        // You can manually open it with 'npx playwright show-report'
    ],
};

module.exports = config;

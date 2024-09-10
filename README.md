# E-commerce Test Automation Framework

## Overview

This test automation framework is developed for an e-commerce website (e.g., [Jacamo](https://www.jacamo.co.uk/)). The framework is designed to cover critical user journeys such as login, registration, and adding products to the cart. It is built using Playwright and follows best practices in automation, including the Page Object Model (POM) design pattern, logging, and detailed reporting.

## Features Covered

- **Login Tests**: Positive and negative scenarios for user authentication.
- **Registration Tests**: Positive and negative scenarios for user registration.
- **Product Addition**: Positive scenarios for adding products to the shopping cart.

- ## Prerequisites

Ensure that you have the following installed on your machine:

- **Node.js**: Version 14.x or later.
- **npm**: Version 6.x or later (comes with Node.js).

- ## Setup and Installation

1. **Clone the Repository**:

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```
2. **Install Dependencies:**:

   `npm install`

- ## Running the Tests

- **To execute all tests, runs**:`npx playwright test`
- **To run a specific test file or test case**:`npx playwright test tests/<test-file-name>.spec.js`

- ## Viewing Test Reports
  
`npx playwright show-report`

- ## Reports
  
Test execution reports are generated and can be found in the reports directory. These reports provide a comprehensive overview of the test results, including pass/fail status, screenshots and video on failure, and execution time.

- ## Project Structure
  
- tests/: Contains all the test files organized by feature.
- pageObject/: Contains Page Object Models for the various pages of the website.
- utils/: Utility functions and helper scripts.
- selectors/: Stores all the CSS selectors used across the tests.



# E-commerce Test Automation Framework

## Overview

This test automation framework is developed for an e-commerce website (e.g., [Jacamo](https://www.jacamo.co.uk/)). The framework is designed to cover critical user journeys such as login, registration, and adding products to the cart. It is built using Playwright and follows best practices in automation, including the Page Object Model (POM) design pattern, logging, and detailed reporting.

## Features Covered

- **Login Tests**: Positive and negative scenarios for user authentication.
- **Registration Tests**: Positive and negative scenarios for user registration.
- **Product Addition**: Positive scenarios for adding products to the shopping cart.

## Test Coverage and Justification

### Login and Registration

Login and registration are fundamental to any e-commerce application as they are the primary entry points for user interaction. Ensuring that these functionalities work correctly is essential for user experience and security. Both positive (valid data) and negative (invalid data, incorrect credentials) test cases are covered to validate the robustness of these processes.

### Product Addition

The ability to add products to the cart is critical for an e-commerce site. The tests focus on verifying that products can be added with the correct size, and that the cart reflects these changes accurately. Positive test scenarios were prioritized to ensure that this key user action performs reliably.

### Areas for Further Coverage

Given more time, I would have extended the test coverage to include:

- **Checkout Process**: This is a crucial step in the user journey, ensuring that users can complete their purchase seamlessly.
- **Password Reset Functionality**: Important for user account recovery, especially considering security implications.

These features were identified as important, but due to time constraints, they were not included in the initial test suite.

### Features Not Included

1. **Log Out**
   - **Reasoning**: While important, the logout functionality was deemed lower priority for this phase of testing. It is generally a straightforward feature, and more complex user interactions were prioritized.

2. **Applying Promo Codes**
   - **Reasoning**: Promo codes are important for marketing and sales, but due to time constraints, this feature was not included in the initial automation scope. This feature would be valuable for future test coverage.

3. **Browsing the Catalog**
   - **Reasoning**: While browsing is a common user action, the focus was placed on core functionalities like authentication and purchasing. Catalog browsing could be included in a broader scope of testing later on.

### Explanation of Scope

The chosen scope focused on features that have the most significant impact on user experience and business operations. Authentication, registration, and adding products to the cart are fundamental to any e-commerce platform, which is why they were prioritized for automation. Other features like promo codes and catalog browsing were considered but were not included due to time constraints and prioritization of core functionalities.

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

### Console Logs for Demonstration

In this project, you'll notice that I've included `console.log` statements at each significant step in the test scripts, such as:

```javascript
console.log('Navigating to the homepage...');
console.log('Handling the cookies popup...');
console.log('Navigating to the sign-in page...');...

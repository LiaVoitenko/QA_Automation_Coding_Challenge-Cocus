const { expect } = require('@playwright/test');

const STATUS_CODE = {
    200: (response) => {
        expect(response.status()).toBe(200);
        expect(response.statusText()).toBe('OK');
    },
    201: (response) => {
        expect(response.status()).toBe(201);
    },
    404: (response) => {
        expect(response.status()).toBe(404);
    },
    400: (response) => {
        expect(response.status()).toBe(400);
    },
    403: (response) => {
        expect(response.status()).toBe(403);
        // If the response contains additional error details:
        // expect(response.json()).resolves.toHaveProperty('code', 403);
    },
    422: (response) => {
        expect(response.status()).toBe(422);
        // If the response contains additional error details:
        // expect(response.json()).resolves.toHaveProperty('code', 422);
    }
};

module.exports = {
    STATUS_CODE
};

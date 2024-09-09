const { expect } = require('@playwright/test');
const { productsNewIn, product, shoppingCart } = require("../selectors/product");

class ProductPage {
    constructor(page) {
        this.page = page;
        this.firstProduct = page.locator(productsNewIn.firstProduct);
        this.secondProduct = page.locator(productsNewIn.secondProduct);
        this.addToCartButton = page.locator(product.addToBagButton);
        this.selectSizeButton = page.locator(product.selectSizeButton);
        // Size options
        this.sizes = {
            'M': page.getByLabel('M39/'),
            'L': page.getByLabel('L42/'),
            'XL': page.getByLabel('XL45/'),
            '1XL': page.getByLabel('1XL48/'),
            '2XL': page.getByLabel('2XL52/'),
            '3XL': page.getByLabel('3XL56/'),
            '4XL': page.getByLabel('4XL60/'),
            '5XL': page.getByLabel('5XL64/'),
        };
        this.goToBagButton = page.getByRole('link', { name: 'Go to bag' });
        this.continueShoppingButton = page.locator(shoppingCart.continueShopping);
        this.backToCategoryButton = page.locator(product.backToCategory);
    }

    // Method to select a size
    async selectSize(size) {
        const sizeOption = this.sizes[size];
        if (sizeOption) {
            await sizeOption.click();
        } else {
            throw new Error(`Size ${size} is not recognized.`);
        }
    }

    // Method to add product to the cart, including size selection
    async addProductToCart(size = null) {
        await this.addToCartButton.click();

        if (size) {
            await this.selectSize(size);
        } else {
            console.log('No size provided. Attempting to add to cart without selecting size...');
        }

        if (!size && await this.selectSizeButton.isVisible()) {
            await this.selectSizeButton.click();
            await this.sizes['M'].click(); // Default to M if no size was provided
            await this.addToCartButton.click(); // Attempt to add to cart again
        }
    }

    async selectFirstProduct() {
        await this.firstProduct.click();
        await this.page.waitForURL('/shop/p/**');
    }

    async selectSecondProduct() {
        await this.secondProduct.click();
        await this.page.waitForURL('/shop/p/**');
    }

    async goToBag() {
        await this.goToBagButton.click();
        await this.page.waitForURL('/shop/bag**');
    }

    async continueShopping () {
        await this.continueShoppingButton.click();
        await this.continueShoppingButton.waitFor({ state: 'hidden' });
    }
}

module.exports = ProductPage;

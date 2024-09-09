const { expect } = require('@playwright/test');
const {shoppingCart} = require("../selectors/shoppingCart");

class CartPage {
    constructor(page) {
        this.page = page;
        this.OrderSummary = page.locator(shoppingCart.withOrder.OrderSummary);
        this.cartItems = page.locator(shoppingCart.withOrder.productCard);
        this.checkoutButton = page.locator(shoppingCart.withOrder.goToCheckout);
        this.removeItemButton = page.locator(shoppingCart.withOrder.removeButton);
        this.emptyCart = page.locator(shoppingCart.emptyCart);
        this.price = page.locator(shoppingCart.withOrder.price);
        this.size = page.locator(shoppingCart.withOrder.size);
    }

    async verifyCartIsNotEmpty() {
        await expect(this.OrderSummary).toBeVisible();
        await expect(await this.cartItems.count()).toBeGreaterThan(0);
    }

    async verifyProductCount(num) {
        await expect(await this.cartItems.count()).toBe(num);
    }

    async verifyItemInCart(itemName) {
        const item = this.cartItems.filter({ hasText: itemName });
        await item.waitFor({ state: 'attached' });
    }

    async removeItemFromCart(itemName) {
        const item = this.cartItems.filter({ hasText: itemName });
        await item.locator(this.removeItemButton).click();
        await item.waitFor({ state: 'hidden' });
        await expect(item).toBeHidden();
        await this.page.waitForTimeout(500);
    }

    async proceedToCheckout() {
        await this.checkoutButton.click();
        await this.page.waitForURL('/checkout/delivery-method?fromBag=true**');
    }

    async proceedToCheckoutNoLoggedIn() {
        await this.checkoutButton.click();
        await this.page.waitForURL('/auth/realms/user/protocol/openid-connect/auth?client_id**');
    }

    async verifyCartIsEmpty() {
        await expect(this.emptyCart).toBeVisible();
    }

    async verifyItemPrice(expectedPrice) {
        if (!expectedPrice.endsWith('.00')) {
            expectedPrice += '.00';
        }
        expect(await this.price).toHaveText(expectedPrice);
    }

    async verifyItemSize(expectedSize) {
        expect(await this.size).toHaveText(expectedSize);
    }
}

module.exports = CartPage;

const { test, expect } = require('@playwright/test');
const ProductPage = require('../../pageObject/ProductPage');
const CartPage = require('../../pageObject/CartPage');
const { handleCookiesPopup } = require('../../utils/cookieHandler');
const CategoryComponent = require("../../pageObject/CategoryComponent");
const { objectTry_out } = require("../../utils/checkSelectors");
const { shoppingCart } = require("../../selectors/shoppingCart");
const {product} = require("../../selectors/product");

test.describe('Add Product to Cart', () => {
    let category;
    let productPage;
    let cartPage;

    test.beforeEach(async ({ page }) => {
        category = new CategoryComponent(page);
        productPage = new ProductPage(page);
        cartPage = new CartPage(page);

        console.log('Navigating to the homepage...');
        await page.goto('/'); // This will use the baseURL from Playwright config

        console.log('Handling the cookies popup...');
        await handleCookiesPopup(page);

        console.log('Navigating to the "New In" category...');
        await category.goToNewInCategory();
    });

    test('User can add a product to the cart', async ({ page }) => {
        console.log('Selecting the first product...');
        await productPage.selectFirstProduct();

        const itemName = await page.locator(product.name).innerText();
        const itemPrice = await page.locator(product.price).innerText();
        console.log(`Product selected: ${itemName}, Price: ${itemPrice}`);

        console.log('Adding the product to the cart with size L...');
        await productPage.addProductToCart('L');
        await productPage.goToBag();

        console.log('Verifying the cart contents...');
        await objectTry_out(page, shoppingCart.withOrder);
        await cartPage.verifyCartIsNotEmpty();

        console.log(`Verifying the product name in the cart matches: ${itemName}`);
        await cartPage.verifyItemInCart(itemName);

        console.log(`Verifying the product price in the cart matches: ${itemPrice}`);
        await cartPage.verifyItemPrice(itemPrice);

        console.log('Verifying the product size in the cart matches: L');
        await cartPage.verifyItemSize('L42/44');

        console.log('Verifying the cart contains exactly 1 product...');
        await cartPage.verifyProductCount(1);
    });

    test('User can add multiple products to the cart', async ({ page }) => {
        console.log('Selecting the first product...');
        await productPage.selectFirstProduct();

        const itemName = await page.locator(product.name).innerText();
        const itemPrice = await page.locator(product.price).innerText();
        console.log(`First product selected: ${itemName}, Price: ${itemPrice}`);

        console.log('Adding the first product to the cart with size L...');
        await productPage.addProductToCart('L');

        console.log('Continuing shopping...');
        await productPage.continueShopping();

        console.log('Navigating back to the "New In" category...');
        await category.backToCategory('new');

        console.log('Selecting the second product...');
        await productPage.selectSecondProduct();

        const itemSecondName = await page.locator(product.name).innerText();
        const itemSecondPrice = await page.locator(product.price).innerText();
        console.log(`Second product selected: ${itemSecondName}, Price: ${itemSecondPrice}`);

        console.log('Adding the second product to the cart with size L...');
        await productPage.addProductToCart('L');

        console.log('Verifying that both products have been added to the cart...');
        await productPage.goToBag();

        console.log('Verifying the cart contents...');
        await cartPage.verifyCartIsNotEmpty();

        console.log(`Verifying the first product price in the cart matches: ${itemPrice}`);
        await cartPage.verifyItemInCart(itemName);

        console.log(`Verifying the second product price in the cart matches: ${itemSecondPrice}`);
        await cartPage.verifyItemInCart(itemSecondName);

        console.log('Verifying the total price in the cart...');
        const totalPrice = (parseFloat(itemPrice.replace(/[^0-9.-]+/g, '')) + parseFloat(itemSecondPrice.replace(/[^0-9.-]+/g, ''))).toFixed(2);
        await cartPage.verifyItemPrice(`£${totalPrice}`);

        console.log('Verifying the cart contains exactly 2 products...');
        await cartPage.verifyProductCount(2);
    });

    test('User can remove an item from the cart', async ({ page }) => {
        console.log('Selecting the first product...');
        await productPage.selectFirstProduct();
        const itemName = await page.locator(product.name).innerText();
        console.log(`First product selected: ${itemName}`);

        console.log('Adding the first product to the cart with size L...');
        await productPage.addProductToCart('L');

        console.log('Continuing shopping...');
        await productPage.continueShopping();

        console.log('Navigating back to the "New In" category...');
        await category.backToCategory('new');

        console.log('Selecting the second product...');
        await productPage.selectSecondProduct();
        const itemSecondName = await page.locator(product.name).innerText();
        console.log(`Second product selected: ${itemSecondName}`);

        console.log('Adding the second product to the cart with size L...');
        await productPage.addProductToCart('L');

        console.log('Removing the first product from the cart...');
        await productPage.goToBag();
        await cartPage.verifyCartIsNotEmpty();
        await cartPage.removeItemFromCart(itemName);

        console.log('Verifying the remaining product in the cart...');
        await cartPage.verifyItemInCart(itemSecondName);

        console.log('Verifying the cart contains exactly 1 product...');
        await cartPage.verifyProductCount(1);
    });

    test('User can empty the cart', async ({ page }) => {
        console.log('Selecting the first product...');
        await productPage.selectFirstProduct();
        const itemName = await page.locator(product.name).innerText();
        console.log(`First product selected: ${itemName}`);

        console.log('Adding the first product to the cart with size L...');
        await productPage.addProductToCart('L');

        console.log('Verifying that the product has been added to the cart...');
        await productPage.goToBag();
        await objectTry_out(page, shoppingCart.withOrder);

        console.log('Removing the product from the cart...');
        await cartPage.verifyCartIsNotEmpty();
        await cartPage.removeItemFromCart(itemName);

        console.log('Verifying that the cart is empty...');
        await cartPage.verifyCartIsEmpty();
    });
});

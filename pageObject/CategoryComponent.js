const {productsNewIn} = require("../selectors/product");

class CategoryComponent {
    constructor(page) {
        this.page = page;
        this.newInCategory = page.getByRole('link', { name: 'New in', exact: true });
        this.topsCategory = page.getByRole('link', { name: 'Tops' });
        this.lightLayersCategory = page.getByRole('link', { name: 'Light Layers', exact: true });
        this.trainersCategory = page.getByRole('link', { name: 'Trainers', exact: true });
        this.bossCategory = page.locator('#main-body li').filter({ hasText: 'BOSS' }).getByRole('link');
        this.suitingCategory = page.getByRole('link', { name: 'Suiting' });
        this.sportswearCategory = page.getByRole('link', { name: 'Sportswear' });
        this.coatsAndJacketsCategory = page.getByRole('link', { name: 'Coats & Jackets', exact: true });
        this.denimCategory = page.getByRole('link', { name: 'Denim' });
        this.filtersOnProductPage = page.locator(productsNewIn.filters);
    }

    // Category mapping with links
    categoryPaths = {
        new: 'new-in',
        tops: 'tops',
        lightLayers: 'light-layers',
        trainers: 'shoes/trainers',
        boss: 'boss',
        suiting: 'clothing/suits-waistcoats',
        sportswear: 'activewear',
        coatsAndJackets: 'clothing/coats-jackets',
        denim: 'clothing/jeans'
    };

    async goToNewInCategory() {
        await this.newInCategory.click();
        await this.page.waitForURL(`/shop/c/${this.categoryPaths.new}`);
    }

    async goToTopsCategory() {
        await this.topsCategory.click();
        await this.page.waitForURL(`/shop/c/${this.categoryPaths.tops}`);
    }

    async goToLightLayersCategory() {
        await this.lightLayersCategory.click();
        await this.page.waitForURL(`/shop/c/${this.categoryPaths.lightLayers}`);
    }

    async goToTrainersCategory() {
        await this.trainersCategory.click();
        await this.page.waitForURL(`/shop/c/${this.categoryPaths.trainers}`);
    }

    async goToBossCategory() {
        await this.bossCategory.click();
        await this.page.waitForURL(`/shop/c/${this.categoryPaths.boss}`);
    }

    async goToSuitingCategory() {
        await this.suitingCategory.click();
        await this.page.waitForURL(`/shop/c/${this.categoryPaths.suiting}`);
    }

    async goToSportswearCategory() {
        await this.sportswearCategory.click();
        await this.page.waitForURL(`/shop/c/${this.categoryPaths.sportswear}`);
    }

    async goToCoatsAndJacketsCategory() {
        await this.coatsAndJacketsCategory.click();
        await this.page.waitForURL(`/shop/c/${this.categoryPaths.coatsAndJackets}`);
    }

    async goToDenimCategory() {
        await this.denimCategory.click();
        await this.page.waitForURL(`/shop/c/${this.categoryPaths.denim}`);
    }

    async backToCategory(category) {
        const categoryPath = this.categoryPaths[category];

        if (!categoryPath) {
            throw new Error(`Category ${category} is not recognized.`);
        }

        await this.page.goto(`/shop/c/${categoryPath}`);
        await this.page.waitForURL(`/shop/c/${categoryPath}`);
        await this.filtersOnProductPage.waitFor({ state: 'attached' });
    }
}

module.exports = CategoryComponent;

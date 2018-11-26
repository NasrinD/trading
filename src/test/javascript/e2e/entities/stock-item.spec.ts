import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('StockItem e2e test', () => {

    let navBarPage: NavBarPage;
    let stockItemDialogPage: StockItemDialogPage;
    let stockItemComponentsPage: StockItemComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load StockItems', () => {
        navBarPage.goToEntity('stock-item');
        stockItemComponentsPage = new StockItemComponentsPage();
        expect(stockItemComponentsPage.getTitle())
            .toMatch(/tradingsystemMoApp.stockItem.home.title/);

    });

    it('should load create StockItem dialog', () => {
        stockItemComponentsPage.clickOnCreateButton();
        stockItemDialogPage = new StockItemDialogPage();
        expect(stockItemDialogPage.getModalTitle())
            .toMatch(/tradingsystemMoApp.stockItem.home.createOrEditLabel/);
        stockItemDialogPage.close();
    });

    it('should create and save StockItems', () => {
        stockItemComponentsPage.clickOnCreateButton();
        stockItemDialogPage.setAmountInput('5');
        expect(stockItemDialogPage.getAmountInput()).toMatch('5');
        stockItemDialogPage.setMinStockInput('5');
        expect(stockItemDialogPage.getMinStockInput()).toMatch('5');
        stockItemDialogPage.setMaxStockInput('5');
        expect(stockItemDialogPage.getMaxStockInput()).toMatch('5');
        stockItemDialogPage.productSelectLastOption();
        stockItemDialogPage.inventorySelectLastOption();
        stockItemDialogPage.save();
        expect(stockItemDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class StockItemComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-stock-item div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class StockItemDialogPage {
    modalTitle = element(by.css('h4#myStockItemLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    amountInput = element(by.css('input#field_amount'));
    minStockInput = element(by.css('input#field_minStock'));
    maxStockInput = element(by.css('input#field_maxStock'));
    productSelect = element(by.css('select#field_product'));
    inventorySelect = element(by.css('select#field_inventory'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setAmountInput = function(amount) {
        this.amountInput.sendKeys(amount);
    };

    getAmountInput = function() {
        return this.amountInput.getAttribute('value');
    };

    setMinStockInput = function(minStock) {
        this.minStockInput.sendKeys(minStock);
    };

    getMinStockInput = function() {
        return this.minStockInput.getAttribute('value');
    };

    setMaxStockInput = function(maxStock) {
        this.maxStockInput.sendKeys(maxStock);
    };

    getMaxStockInput = function() {
        return this.maxStockInput.getAttribute('value');
    };

    productSelectLastOption = function() {
        this.productSelect.all(by.tagName('option')).last().click();
    };

    productSelectOption = function(option) {
        this.productSelect.sendKeys(option);
    };

    getProductSelect = function() {
        return this.productSelect;
    };

    getProductSelectedOption = function() {
        return this.productSelect.element(by.css('option:checked')).getText();
    };

    inventorySelectLastOption = function() {
        this.inventorySelect.all(by.tagName('option')).last().click();
    };

    inventorySelectOption = function(option) {
        this.inventorySelect.sendKeys(option);
    };

    getInventorySelect = function() {
        return this.inventorySelect;
    };

    getInventorySelectedOption = function() {
        return this.inventorySelect.element(by.css('option:checked')).getText();
    };

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}

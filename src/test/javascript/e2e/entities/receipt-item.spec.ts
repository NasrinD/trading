import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('ReceiptItem e2e test', () => {

    let navBarPage: NavBarPage;
    let receiptItemDialogPage: ReceiptItemDialogPage;
    let receiptItemComponentsPage: ReceiptItemComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load ReceiptItems', () => {
        navBarPage.goToEntity('receipt-item');
        receiptItemComponentsPage = new ReceiptItemComponentsPage();
        expect(receiptItemComponentsPage.getTitle())
            .toMatch(/tradingsystemEmApp.receiptItem.home.title/);

    });

    it('should load create ReceiptItem dialog', () => {
        receiptItemComponentsPage.clickOnCreateButton();
        receiptItemDialogPage = new ReceiptItemDialogPage();
        expect(receiptItemDialogPage.getModalTitle())
            .toMatch(/tradingsystemEmApp.receiptItem.home.createOrEditLabel/);
        receiptItemDialogPage.close();
    });

    it('should create and save ReceiptItems', () => {
        receiptItemComponentsPage.clickOnCreateButton();
        receiptItemDialogPage.setProductBarCodeInput('5');
        expect(receiptItemDialogPage.getProductBarCodeInput()).toMatch('5');
        receiptItemDialogPage.setProductSalesPriceInput('5');
        expect(receiptItemDialogPage.getProductSalesPriceInput()).toMatch('5');
        receiptItemDialogPage.setProductNameInput('productName');
        expect(receiptItemDialogPage.getProductNameInput()).toMatch('productName');
        receiptItemDialogPage.receiptSelectLastOption();
        receiptItemDialogPage.save();
        expect(receiptItemDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ReceiptItemComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-receipt-item div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ReceiptItemDialogPage {
    modalTitle = element(by.css('h4#myReceiptItemLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    productBarCodeInput = element(by.css('input#field_productBarCode'));
    productSalesPriceInput = element(by.css('input#field_productSalesPrice'));
    productNameInput = element(by.css('input#field_productName'));
    receiptSelect = element(by.css('select#field_receipt'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setProductBarCodeInput = function(productBarCode) {
        this.productBarCodeInput.sendKeys(productBarCode);
    };

    getProductBarCodeInput = function() {
        return this.productBarCodeInput.getAttribute('value');
    };

    setProductSalesPriceInput = function(productSalesPrice) {
        this.productSalesPriceInput.sendKeys(productSalesPrice);
    };

    getProductSalesPriceInput = function() {
        return this.productSalesPriceInput.getAttribute('value');
    };

    setProductNameInput = function(productName) {
        this.productNameInput.sendKeys(productName);
    };

    getProductNameInput = function() {
        return this.productNameInput.getAttribute('value');
    };

    receiptSelectLastOption = function() {
        this.receiptSelect.all(by.tagName('option')).last().click();
    };

    receiptSelectOption = function(option) {
        this.receiptSelect.sendKeys(option);
    };

    getReceiptSelect = function() {
        return this.receiptSelect;
    };

    getReceiptSelectedOption = function() {
        return this.receiptSelect.element(by.css('option:checked')).getText();
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

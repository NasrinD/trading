import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Receipt e2e test', () => {

    let navBarPage: NavBarPage;
    let receiptDialogPage: ReceiptDialogPage;
    let receiptComponentsPage: ReceiptComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Receipts', () => {
        navBarPage.goToEntity('receipt');
        receiptComponentsPage = new ReceiptComponentsPage();
        expect(receiptComponentsPage.getTitle())
            .toMatch(/tradingsystemMoApp.receipt.home.title/);

    });

    it('should load create Receipt dialog', () => {
        receiptComponentsPage.clickOnCreateButton();
        receiptDialogPage = new ReceiptDialogPage();
        expect(receiptDialogPage.getModalTitle())
            .toMatch(/tradingsystemMoApp.receipt.home.createOrEditLabel/);
        receiptDialogPage.close();
    });

    it('should create and save Receipts', () => {
        receiptComponentsPage.clickOnCreateButton();
        receiptDialogPage.setDateInput(12310020012301);
        expect(receiptDialogPage.getDateInput()).toMatch('2001-12-31T02:30');
        receiptDialogPage.paymentModeSelectLastOption();
        receiptDialogPage.setRunningTotalInput('5');
        expect(receiptDialogPage.getRunningTotalInput()).toMatch('5');
        receiptDialogPage.cashBoxSelectLastOption();
        receiptDialogPage.customerSelectLastOption();
        receiptDialogPage.save();
        expect(receiptDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ReceiptComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-receipt div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ReceiptDialogPage {
    modalTitle = element(by.css('h4#myReceiptLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    dateInput = element(by.css('input#field_date'));
    paymentModeSelect = element(by.css('select#field_paymentMode'));
    runningTotalInput = element(by.css('input#field_runningTotal'));
    cashBoxSelect = element(by.css('select#field_cashBox'));
    customerSelect = element(by.css('select#field_customer'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setDateInput = function(date) {
        this.dateInput.sendKeys(date);
    };

    getDateInput = function() {
        return this.dateInput.getAttribute('value');
    };

    setPaymentModeSelect = function(paymentMode) {
        this.paymentModeSelect.sendKeys(paymentMode);
    };

    getPaymentModeSelect = function() {
        return this.paymentModeSelect.element(by.css('option:checked')).getText();
    };

    paymentModeSelectLastOption = function() {
        this.paymentModeSelect.all(by.tagName('option')).last().click();
    };
    setRunningTotalInput = function(runningTotal) {
        this.runningTotalInput.sendKeys(runningTotal);
    };

    getRunningTotalInput = function() {
        return this.runningTotalInput.getAttribute('value');
    };

    cashBoxSelectLastOption = function() {
        this.cashBoxSelect.all(by.tagName('option')).last().click();
    };

    cashBoxSelectOption = function(option) {
        this.cashBoxSelect.sendKeys(option);
    };

    getCashBoxSelect = function() {
        return this.cashBoxSelect;
    };

    getCashBoxSelectedOption = function() {
        return this.cashBoxSelect.element(by.css('option:checked')).getText();
    };

    customerSelectLastOption = function() {
        this.customerSelect.all(by.tagName('option')).last().click();
    };

    customerSelectOption = function(option) {
        this.customerSelect.sendKeys(option);
    };

    getCustomerSelect = function() {
        return this.customerSelect;
    };

    getCustomerSelectedOption = function() {
        return this.customerSelect.element(by.css('option:checked')).getText();
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

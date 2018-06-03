import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Debit e2e test', () => {

    let navBarPage: NavBarPage;
    let debitDialogPage: DebitDialogPage;
    let debitComponentsPage: DebitComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Debits', () => {
        navBarPage.goToEntity('debit');
        debitComponentsPage = new DebitComponentsPage();
        expect(debitComponentsPage.getTitle())
            .toMatch(/tradingsystemEmApp.debit.home.title/);

    });

    it('should load create Debit dialog', () => {
        debitComponentsPage.clickOnCreateButton();
        debitDialogPage = new DebitDialogPage();
        expect(debitDialogPage.getModalTitle())
            .toMatch(/tradingsystemEmApp.debit.home.createOrEditLabel/);
        debitDialogPage.close();
    });

    it('should create and save Debits', () => {
        debitComponentsPage.clickOnCreateButton();
        debitDialogPage.setPinInput('5');
        expect(debitDialogPage.getPinInput()).toMatch('5');
        debitDialogPage.setCardNumberInput('5');
        expect(debitDialogPage.getCardNumberInput()).toMatch('5');
        debitDialogPage.setValidityDateInput(12310020012301);
        expect(debitDialogPage.getValidityDateInput()).toMatch('2001-12-31T02:30');
        debitDialogPage.ownerSelectLastOption();
        debitDialogPage.bankSelectLastOption();
        debitDialogPage.save();
        expect(debitDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class DebitComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-debit div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class DebitDialogPage {
    modalTitle = element(by.css('h4#myDebitLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    pinInput = element(by.css('input#field_pin'));
    cardNumberInput = element(by.css('input#field_cardNumber'));
    validityDateInput = element(by.css('input#field_validityDate'));
    ownerSelect = element(by.css('select#field_owner'));
    bankSelect = element(by.css('select#field_bank'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setPinInput = function(pin) {
        this.pinInput.sendKeys(pin);
    };

    getPinInput = function() {
        return this.pinInput.getAttribute('value');
    };

    setCardNumberInput = function(cardNumber) {
        this.cardNumberInput.sendKeys(cardNumber);
    };

    getCardNumberInput = function() {
        return this.cardNumberInput.getAttribute('value');
    };

    setValidityDateInput = function(validityDate) {
        this.validityDateInput.sendKeys(validityDate);
    };

    getValidityDateInput = function() {
        return this.validityDateInput.getAttribute('value');
    };

    ownerSelectLastOption = function() {
        this.ownerSelect.all(by.tagName('option')).last().click();
    };

    ownerSelectOption = function(option) {
        this.ownerSelect.sendKeys(option);
    };

    getOwnerSelect = function() {
        return this.ownerSelect;
    };

    getOwnerSelectedOption = function() {
        return this.ownerSelect.element(by.css('option:checked')).getText();
    };

    bankSelectLastOption = function() {
        this.bankSelect.all(by.tagName('option')).last().click();
    };

    bankSelectOption = function(option) {
        this.bankSelect.sendKeys(option);
    };

    getBankSelect = function() {
        return this.bankSelect;
    };

    getBankSelectedOption = function() {
        return this.bankSelect.element(by.css('option:checked')).getText();
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

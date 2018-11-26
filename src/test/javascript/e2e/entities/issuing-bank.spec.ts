import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('IssuingBank e2e test', () => {

    let navBarPage: NavBarPage;
    let issuingBankDialogPage: IssuingBankDialogPage;
    let issuingBankComponentsPage: IssuingBankComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load IssuingBanks', () => {
        navBarPage.goToEntity('issuing-bank');
        issuingBankComponentsPage = new IssuingBankComponentsPage();
        expect(issuingBankComponentsPage.getTitle())
            .toMatch(/tradingsystemMoApp.issuingBank.home.title/);

    });

    it('should load create IssuingBank dialog', () => {
        issuingBankComponentsPage.clickOnCreateButton();
        issuingBankDialogPage = new IssuingBankDialogPage();
        expect(issuingBankDialogPage.getModalTitle())
            .toMatch(/tradingsystemMoApp.issuingBank.home.createOrEditLabel/);
        issuingBankDialogPage.close();
    });

    it('should create and save IssuingBanks', () => {
        issuingBankComponentsPage.clickOnCreateButton();
        issuingBankDialogPage.setNameInput('name');
        expect(issuingBankDialogPage.getNameInput()).toMatch('name');
        issuingBankDialogPage.setAddressInput('address');
        expect(issuingBankDialogPage.getAddressInput()).toMatch('address');
        issuingBankDialogPage.networkSelectLastOption();
        issuingBankDialogPage.save();
        expect(issuingBankDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class IssuingBankComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-issuing-bank div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class IssuingBankDialogPage {
    modalTitle = element(by.css('h4#myIssuingBankLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    addressInput = element(by.css('input#field_address'));
    networkSelect = element(by.css('select#field_network'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    };

    setAddressInput = function(address) {
        this.addressInput.sendKeys(address);
    };

    getAddressInput = function() {
        return this.addressInput.getAttribute('value');
    };

    networkSelectLastOption = function() {
        this.networkSelect.all(by.tagName('option')).last().click();
    };

    networkSelectOption = function(option) {
        this.networkSelect.sendKeys(option);
    };

    getNetworkSelect = function() {
        return this.networkSelect;
    };

    getNetworkSelectedOption = function() {
        return this.networkSelect.element(by.css('option:checked')).getText();
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

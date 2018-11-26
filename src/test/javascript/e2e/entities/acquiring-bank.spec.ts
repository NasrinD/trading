import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('AcquiringBank e2e test', () => {

    let navBarPage: NavBarPage;
    let acquiringBankDialogPage: AcquiringBankDialogPage;
    let acquiringBankComponentsPage: AcquiringBankComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load AcquiringBanks', () => {
        navBarPage.goToEntity('acquiring-bank');
        acquiringBankComponentsPage = new AcquiringBankComponentsPage();
        expect(acquiringBankComponentsPage.getTitle())
            .toMatch(/tradingsystemMoApp.acquiringBank.home.title/);

    });

    it('should load create AcquiringBank dialog', () => {
        acquiringBankComponentsPage.clickOnCreateButton();
        acquiringBankDialogPage = new AcquiringBankDialogPage();
        expect(acquiringBankDialogPage.getModalTitle())
            .toMatch(/tradingsystemMoApp.acquiringBank.home.createOrEditLabel/);
        acquiringBankDialogPage.close();
    });

    it('should create and save AcquiringBanks', () => {
        acquiringBankComponentsPage.clickOnCreateButton();
        acquiringBankDialogPage.setNameInput('name');
        expect(acquiringBankDialogPage.getNameInput()).toMatch('name');
        acquiringBankDialogPage.setAddressInput('address');
        expect(acquiringBankDialogPage.getAddressInput()).toMatch('address');
        acquiringBankDialogPage.networkSelectLastOption();
        acquiringBankDialogPage.save();
        expect(acquiringBankDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class AcquiringBankComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-acquiring-bank div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class AcquiringBankDialogPage {
    modalTitle = element(by.css('h4#myAcquiringBankLabel'));
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

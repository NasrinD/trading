import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Store e2e test', () => {

    let navBarPage: NavBarPage;
    let storeDialogPage: StoreDialogPage;
    let storeComponentsPage: StoreComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Stores', () => {
        navBarPage.goToEntity('store');
        storeComponentsPage = new StoreComponentsPage();
        expect(storeComponentsPage.getTitle())
            .toMatch(/tradingsystemEmApp.store.home.title/);

    });

    it('should load create Store dialog', () => {
        storeComponentsPage.clickOnCreateButton();
        storeDialogPage = new StoreDialogPage();
        expect(storeDialogPage.getModalTitle())
            .toMatch(/tradingsystemEmApp.store.home.createOrEditLabel/);
        storeDialogPage.close();
    });

    it('should create and save Stores', () => {
        storeComponentsPage.clickOnCreateButton();
        storeDialogPage.setNameInput('name');
        expect(storeDialogPage.getNameInput()).toMatch('name');
        storeDialogPage.setAddressInput('address');
        expect(storeDialogPage.getAddressInput()).toMatch('address');
        storeDialogPage.cashDeskSelectLastOption();
        storeDialogPage.inventorySelectLastOption();
        storeDialogPage.save();
        expect(storeDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class StoreComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-store div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class StoreDialogPage {
    modalTitle = element(by.css('h4#myStoreLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    addressInput = element(by.css('input#field_address'));
    cashDeskSelect = element(by.css('select#field_cashDesk'));
    inventorySelect = element(by.css('select#field_inventory'));

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

    cashDeskSelectLastOption = function() {
        this.cashDeskSelect.all(by.tagName('option')).last().click();
    };

    cashDeskSelectOption = function(option) {
        this.cashDeskSelect.sendKeys(option);
    };

    getCashDeskSelect = function() {
        return this.cashDeskSelect;
    };

    getCashDeskSelectedOption = function() {
        return this.cashDeskSelect.element(by.css('option:checked')).getText();
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

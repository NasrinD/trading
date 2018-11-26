import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('CashBox e2e test', () => {

    let navBarPage: NavBarPage;
    let cashBoxDialogPage: CashBoxDialogPage;
    let cashBoxComponentsPage: CashBoxComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load CashBoxes', () => {
        navBarPage.goToEntity('cash-box');
        cashBoxComponentsPage = new CashBoxComponentsPage();
        expect(cashBoxComponentsPage.getTitle())
            .toMatch(/tradingsystemMoApp.cashBox.home.title/);

    });

    it('should load create CashBox dialog', () => {
        cashBoxComponentsPage.clickOnCreateButton();
        cashBoxDialogPage = new CashBoxDialogPage();
        expect(cashBoxDialogPage.getModalTitle())
            .toMatch(/tradingsystemMoApp.cashBox.home.createOrEditLabel/);
        cashBoxDialogPage.close();
    });

    it('should create and save CashBoxes', () => {
        cashBoxComponentsPage.clickOnCreateButton();
        cashBoxDialogPage.setModelInput('model');
        expect(cashBoxDialogPage.getModelInput()).toMatch('model');
        cashBoxDialogPage.controllerSelectLastOption();
        cashBoxDialogPage.save();
        expect(cashBoxDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CashBoxComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-cash-box div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CashBoxDialogPage {
    modalTitle = element(by.css('h4#myCashBoxLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    modelInput = element(by.css('input#field_model'));
    controllerSelect = element(by.css('select#field_controller'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setModelInput = function(model) {
        this.modelInput.sendKeys(model);
    };

    getModelInput = function() {
        return this.modelInput.getAttribute('value');
    };

    controllerSelectLastOption = function() {
        this.controllerSelect.all(by.tagName('option')).last().click();
    };

    controllerSelectOption = function(option) {
        this.controllerSelect.sendKeys(option);
    };

    getControllerSelect = function() {
        return this.controllerSelect;
    };

    getControllerSelectedOption = function() {
        return this.controllerSelect.element(by.css('option:checked')).getText();
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

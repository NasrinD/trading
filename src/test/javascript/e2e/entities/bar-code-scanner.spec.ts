import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('BarCodeScanner e2e test', () => {

    let navBarPage: NavBarPage;
    let barCodeScannerDialogPage: BarCodeScannerDialogPage;
    let barCodeScannerComponentsPage: BarCodeScannerComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load BarCodeScanners', () => {
        navBarPage.goToEntity('bar-code-scanner');
        barCodeScannerComponentsPage = new BarCodeScannerComponentsPage();
        expect(barCodeScannerComponentsPage.getTitle())
            .toMatch(/tradingsystemMoApp.barCodeScanner.home.title/);

    });

    it('should load create BarCodeScanner dialog', () => {
        barCodeScannerComponentsPage.clickOnCreateButton();
        barCodeScannerDialogPage = new BarCodeScannerDialogPage();
        expect(barCodeScannerDialogPage.getModalTitle())
            .toMatch(/tradingsystemMoApp.barCodeScanner.home.createOrEditLabel/);
        barCodeScannerDialogPage.close();
    });

    it('should create and save BarCodeScanners', () => {
        barCodeScannerComponentsPage.clickOnCreateButton();
        barCodeScannerDialogPage.setModelInput('model');
        expect(barCodeScannerDialogPage.getModelInput()).toMatch('model');
        barCodeScannerDialogPage.controllerSelectLastOption();
        barCodeScannerDialogPage.save();
        expect(barCodeScannerDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class BarCodeScannerComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-bar-code-scanner div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class BarCodeScannerDialogPage {
    modalTitle = element(by.css('h4#myBarCodeScannerLabel'));
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

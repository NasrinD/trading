import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Printer e2e test', () => {

    let navBarPage: NavBarPage;
    let printerDialogPage: PrinterDialogPage;
    let printerComponentsPage: PrinterComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Printers', () => {
        navBarPage.goToEntity('printer');
        printerComponentsPage = new PrinterComponentsPage();
        expect(printerComponentsPage.getTitle())
            .toMatch(/tradingsystemMoApp.printer.home.title/);

    });

    it('should load create Printer dialog', () => {
        printerComponentsPage.clickOnCreateButton();
        printerDialogPage = new PrinterDialogPage();
        expect(printerDialogPage.getModalTitle())
            .toMatch(/tradingsystemMoApp.printer.home.createOrEditLabel/);
        printerDialogPage.close();
    });

    it('should create and save Printers', () => {
        printerComponentsPage.clickOnCreateButton();
        printerDialogPage.setModelInput('model');
        expect(printerDialogPage.getModelInput()).toMatch('model');
        printerDialogPage.controllerSelectLastOption();
        printerDialogPage.save();
        expect(printerDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class PrinterComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-printer div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class PrinterDialogPage {
    modalTitle = element(by.css('h4#myPrinterLabel'));
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

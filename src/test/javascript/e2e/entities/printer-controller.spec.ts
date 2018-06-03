import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('PrinterController e2e test', () => {

    let navBarPage: NavBarPage;
    let printerControllerDialogPage: PrinterControllerDialogPage;
    let printerControllerComponentsPage: PrinterControllerComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load PrinterControllers', () => {
        navBarPage.goToEntity('printer-controller');
        printerControllerComponentsPage = new PrinterControllerComponentsPage();
        expect(printerControllerComponentsPage.getTitle())
            .toMatch(/tradingsystemEmApp.printerController.home.title/);

    });

    it('should load create PrinterController dialog', () => {
        printerControllerComponentsPage.clickOnCreateButton();
        printerControllerDialogPage = new PrinterControllerDialogPage();
        expect(printerControllerDialogPage.getModalTitle())
            .toMatch(/tradingsystemEmApp.printerController.home.createOrEditLabel/);
        printerControllerDialogPage.close();
    });

    it('should create and save PrinterControllers', () => {
        printerControllerComponentsPage.clickOnCreateButton();
        printerControllerDialogPage.save();
        expect(printerControllerDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class PrinterControllerComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-printer-controller div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class PrinterControllerDialogPage {
    modalTitle = element(by.css('h4#myPrinterControllerLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

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

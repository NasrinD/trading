import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('BarCodeScannerController e2e test', () => {

    let navBarPage: NavBarPage;
    let barCodeScannerControllerDialogPage: BarCodeScannerControllerDialogPage;
    let barCodeScannerControllerComponentsPage: BarCodeScannerControllerComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load BarCodeScannerControllers', () => {
        navBarPage.goToEntity('bar-code-scanner-controller');
        barCodeScannerControllerComponentsPage = new BarCodeScannerControllerComponentsPage();
        expect(barCodeScannerControllerComponentsPage.getTitle())
            .toMatch(/tradingsystemMoApp.barCodeScannerController.home.title/);

    });

    it('should load create BarCodeScannerController dialog', () => {
        barCodeScannerControllerComponentsPage.clickOnCreateButton();
        barCodeScannerControllerDialogPage = new BarCodeScannerControllerDialogPage();
        expect(barCodeScannerControllerDialogPage.getModalTitle())
            .toMatch(/tradingsystemMoApp.barCodeScannerController.home.createOrEditLabel/);
        barCodeScannerControllerDialogPage.close();
    });

    it('should create and save BarCodeScannerControllers', () => {
        barCodeScannerControllerComponentsPage.clickOnCreateButton();
        barCodeScannerControllerDialogPage.save();
        expect(barCodeScannerControllerDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class BarCodeScannerControllerComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-bar-code-scanner-controller div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class BarCodeScannerControllerDialogPage {
    modalTitle = element(by.css('h4#myBarCodeScannerControllerLabel'));
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

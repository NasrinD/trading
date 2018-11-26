import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('CashBoxController e2e test', () => {

    let navBarPage: NavBarPage;
    let cashBoxControllerDialogPage: CashBoxControllerDialogPage;
    let cashBoxControllerComponentsPage: CashBoxControllerComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load CashBoxControllers', () => {
        navBarPage.goToEntity('cash-box-controller');
        cashBoxControllerComponentsPage = new CashBoxControllerComponentsPage();
        expect(cashBoxControllerComponentsPage.getTitle())
            .toMatch(/tradingsystemMoApp.cashBoxController.home.title/);

    });

    it('should load create CashBoxController dialog', () => {
        cashBoxControllerComponentsPage.clickOnCreateButton();
        cashBoxControllerDialogPage = new CashBoxControllerDialogPage();
        expect(cashBoxControllerDialogPage.getModalTitle())
            .toMatch(/tradingsystemMoApp.cashBoxController.home.createOrEditLabel/);
        cashBoxControllerDialogPage.close();
    });

    it('should create and save CashBoxControllers', () => {
        cashBoxControllerComponentsPage.clickOnCreateButton();
        cashBoxControllerDialogPage.save();
        expect(cashBoxControllerDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CashBoxControllerComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-cash-box-controller div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CashBoxControllerDialogPage {
    modalTitle = element(by.css('h4#myCashBoxControllerLabel'));
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

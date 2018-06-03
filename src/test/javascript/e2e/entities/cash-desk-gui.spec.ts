import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('CashDeskGUI e2e test', () => {

    let navBarPage: NavBarPage;
    let cashDeskGUIDialogPage: CashDeskGUIDialogPage;
    let cashDeskGUIComponentsPage: CashDeskGUIComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load CashDeskGUIS', () => {
        navBarPage.goToEntity('cash-desk-gui');
        cashDeskGUIComponentsPage = new CashDeskGUIComponentsPage();
        expect(cashDeskGUIComponentsPage.getTitle())
            .toMatch(/tradingsystemEmApp.cashDeskGUI.home.title/);

    });

    it('should load create CashDeskGUI dialog', () => {
        cashDeskGUIComponentsPage.clickOnCreateButton();
        cashDeskGUIDialogPage = new CashDeskGUIDialogPage();
        expect(cashDeskGUIDialogPage.getModalTitle())
            .toMatch(/tradingsystemEmApp.cashDeskGUI.home.createOrEditLabel/);
        cashDeskGUIDialogPage.close();
    });

    it('should create and save CashDeskGUIS', () => {
        cashDeskGUIComponentsPage.clickOnCreateButton();
        cashDeskGUIDialogPage.save();
        expect(cashDeskGUIDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CashDeskGUIComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-cash-desk-gui div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CashDeskGUIDialogPage {
    modalTitle = element(by.css('h4#myCashDeskGUILabel'));
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

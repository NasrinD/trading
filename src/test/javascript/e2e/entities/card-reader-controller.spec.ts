import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('CardReaderController e2e test', () => {

    let navBarPage: NavBarPage;
    let cardReaderControllerDialogPage: CardReaderControllerDialogPage;
    let cardReaderControllerComponentsPage: CardReaderControllerComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load CardReaderControllers', () => {
        navBarPage.goToEntity('card-reader-controller');
        cardReaderControllerComponentsPage = new CardReaderControllerComponentsPage();
        expect(cardReaderControllerComponentsPage.getTitle())
            .toMatch(/tradingsystemEmApp.cardReaderController.home.title/);

    });

    it('should load create CardReaderController dialog', () => {
        cardReaderControllerComponentsPage.clickOnCreateButton();
        cardReaderControllerDialogPage = new CardReaderControllerDialogPage();
        expect(cardReaderControllerDialogPage.getModalTitle())
            .toMatch(/tradingsystemEmApp.cardReaderController.home.createOrEditLabel/);
        cardReaderControllerDialogPage.close();
    });

    it('should create and save CardReaderControllers', () => {
        cardReaderControllerComponentsPage.clickOnCreateButton();
        cardReaderControllerDialogPage.save();
        expect(cardReaderControllerDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CardReaderControllerComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-card-reader-controller div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CardReaderControllerDialogPage {
    modalTitle = element(by.css('h4#myCardReaderControllerLabel'));
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

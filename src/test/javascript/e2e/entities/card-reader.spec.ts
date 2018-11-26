import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('CardReader e2e test', () => {

    let navBarPage: NavBarPage;
    let cardReaderDialogPage: CardReaderDialogPage;
    let cardReaderComponentsPage: CardReaderComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load CardReaders', () => {
        navBarPage.goToEntity('card-reader');
        cardReaderComponentsPage = new CardReaderComponentsPage();
        expect(cardReaderComponentsPage.getTitle())
            .toMatch(/tradingsystemMoApp.cardReader.home.title/);

    });

    it('should load create CardReader dialog', () => {
        cardReaderComponentsPage.clickOnCreateButton();
        cardReaderDialogPage = new CardReaderDialogPage();
        expect(cardReaderDialogPage.getModalTitle())
            .toMatch(/tradingsystemMoApp.cardReader.home.createOrEditLabel/);
        cardReaderDialogPage.close();
    });

    it('should create and save CardReaders', () => {
        cardReaderComponentsPage.clickOnCreateButton();
        cardReaderDialogPage.setModelInput('model');
        expect(cardReaderDialogPage.getModelInput()).toMatch('model');
        cardReaderDialogPage.controllerSelectLastOption();
        cardReaderDialogPage.acquiringBankSelectLastOption();
        cardReaderDialogPage.save();
        expect(cardReaderDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CardReaderComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-card-reader div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CardReaderDialogPage {
    modalTitle = element(by.css('h4#myCardReaderLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    modelInput = element(by.css('input#field_model'));
    controllerSelect = element(by.css('select#field_controller'));
    acquiringBankSelect = element(by.css('select#field_acquiringBank'));

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

    acquiringBankSelectLastOption = function() {
        this.acquiringBankSelect.all(by.tagName('option')).last().click();
    };

    acquiringBankSelectOption = function(option) {
        this.acquiringBankSelect.sendKeys(option);
    };

    getAcquiringBankSelect = function() {
        return this.acquiringBankSelect;
    };

    getAcquiringBankSelectedOption = function() {
        return this.acquiringBankSelect.element(by.css('option:checked')).getText();
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

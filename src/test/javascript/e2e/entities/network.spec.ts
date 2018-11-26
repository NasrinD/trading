import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Network e2e test', () => {

    let navBarPage: NavBarPage;
    let networkDialogPage: NetworkDialogPage;
    let networkComponentsPage: NetworkComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Networks', () => {
        navBarPage.goToEntity('network');
        networkComponentsPage = new NetworkComponentsPage();
        expect(networkComponentsPage.getTitle())
            .toMatch(/tradingsystemMoApp.network.home.title/);

    });

    it('should load create Network dialog', () => {
        networkComponentsPage.clickOnCreateButton();
        networkDialogPage = new NetworkDialogPage();
        expect(networkDialogPage.getModalTitle())
            .toMatch(/tradingsystemMoApp.network.home.createOrEditLabel/);
        networkDialogPage.close();
    });

    it('should create and save Networks', () => {
        networkComponentsPage.clickOnCreateButton();
        networkDialogPage.setNameInput('name');
        expect(networkDialogPage.getNameInput()).toMatch('name');
        networkDialogPage.save();
        expect(networkDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class NetworkComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-network div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class NetworkDialogPage {
    modalTitle = element(by.css('h4#myNetworkLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
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

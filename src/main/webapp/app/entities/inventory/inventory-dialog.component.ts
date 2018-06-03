import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Inventory } from './inventory.model';
import { InventoryPopupService } from './inventory-popup.service';
import { InventoryService } from './inventory.service';
import { Store, StoreService } from '../store';
import { CashDeskApplication, CashDeskApplicationService } from '../cash-desk-application';

@Component({
    selector: 'jhi-inventory-dialog',
    templateUrl: './inventory-dialog.component.html'
})
export class InventoryDialogComponent implements OnInit {

    inventory: Inventory;
    isSaving: boolean;

    stores: Store[];

    cashdeskapplications: CashDeskApplication[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private inventoryService: InventoryService,
        private storeService: StoreService,
        private cashDeskApplicationService: CashDeskApplicationService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.storeService.query()
            .subscribe((res: HttpResponse<Store[]>) => { this.stores = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.cashDeskApplicationService.query()
            .subscribe((res: HttpResponse<CashDeskApplication[]>) => { this.cashdeskapplications = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.inventory.id !== undefined) {
            this.subscribeToSaveResponse(
                this.inventoryService.update(this.inventory));
        } else {
            this.subscribeToSaveResponse(
                this.inventoryService.create(this.inventory));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Inventory>>) {
        result.subscribe((res: HttpResponse<Inventory>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Inventory) {
        this.eventManager.broadcast({ name: 'inventoryListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackStoreById(index: number, item: Store) {
        return item.id;
    }

    trackCashDeskApplicationById(index: number, item: CashDeskApplication) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-inventory-popup',
    template: ''
})
export class InventoryPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private inventoryPopupService: InventoryPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.inventoryPopupService
                    .open(InventoryDialogComponent as Component, params['id']);
            } else {
                this.inventoryPopupService
                    .open(InventoryDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

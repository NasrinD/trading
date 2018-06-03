import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Store } from './store.model';
import { StorePopupService } from './store-popup.service';
import { StoreService } from './store.service';
import { CashDesk, CashDeskService } from '../cash-desk';
import { Inventory, InventoryService } from '../inventory';

@Component({
    selector: 'jhi-store-dialog',
    templateUrl: './store-dialog.component.html'
})
export class StoreDialogComponent implements OnInit {

    store: Store;
    isSaving: boolean;

    cashdesks: CashDesk[];

    inventories: Inventory[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private storeService: StoreService,
        private cashDeskService: CashDeskService,
        private inventoryService: InventoryService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.cashDeskService
            .query({filter: 'store(name)-is-null'})
            .subscribe((res: HttpResponse<CashDesk[]>) => {
                if (!this.store.cashDesk || !this.store.cashDesk.id) {
                    this.cashdesks = res.body;
                } else {
                    this.cashDeskService
                        .find(this.store.cashDesk.id)
                        .subscribe((subRes: HttpResponse<CashDesk>) => {
                            this.cashdesks = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.inventoryService
            .query({filter: 'store(name)-is-null'})
            .subscribe((res: HttpResponse<Inventory[]>) => {
                if (!this.store.inventory || !this.store.inventory.id) {
                    this.inventories = res.body;
                } else {
                    this.inventoryService
                        .find(this.store.inventory.id)
                        .subscribe((subRes: HttpResponse<Inventory>) => {
                            this.inventories = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.store.id !== undefined) {
            this.subscribeToSaveResponse(
                this.storeService.update(this.store));
        } else {
            this.subscribeToSaveResponse(
                this.storeService.create(this.store));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Store>>) {
        result.subscribe((res: HttpResponse<Store>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Store) {
        this.eventManager.broadcast({ name: 'storeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCashDeskById(index: number, item: CashDesk) {
        return item.id;
    }

    trackInventoryById(index: number, item: Inventory) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-store-popup',
    template: ''
})
export class StorePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private storePopupService: StorePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.storePopupService
                    .open(StoreDialogComponent as Component, params['id']);
            } else {
                this.storePopupService
                    .open(StoreDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

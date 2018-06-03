import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CashDeskApplication } from './cash-desk-application.model';
import { CashDeskApplicationPopupService } from './cash-desk-application-popup.service';
import { CashDeskApplicationService } from './cash-desk-application.service';
import { Inventory, InventoryService } from '../inventory';
import { Bank, BankService } from '../bank';

@Component({
    selector: 'jhi-cash-desk-application-dialog',
    templateUrl: './cash-desk-application-dialog.component.html'
})
export class CashDeskApplicationDialogComponent implements OnInit {

    cashDeskApplication: CashDeskApplication;
    isSaving: boolean;

    inventories: Inventory[];

    banks: Bank[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private cashDeskApplicationService: CashDeskApplicationService,
        private inventoryService: InventoryService,
        private bankService: BankService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.inventoryService
            .query({filter: 'cashdeskapplication-is-null'})
            .subscribe((res: HttpResponse<Inventory[]>) => {
                if (!this.cashDeskApplication.inventory || !this.cashDeskApplication.inventory.id) {
                    this.inventories = res.body;
                } else {
                    this.inventoryService
                        .find(this.cashDeskApplication.inventory.id)
                        .subscribe((subRes: HttpResponse<Inventory>) => {
                            this.inventories = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.bankService.query()
            .subscribe((res: HttpResponse<Bank[]>) => { this.banks = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.cashDeskApplication.id !== undefined) {
            this.subscribeToSaveResponse(
                this.cashDeskApplicationService.update(this.cashDeskApplication));
        } else {
            this.subscribeToSaveResponse(
                this.cashDeskApplicationService.create(this.cashDeskApplication));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CashDeskApplication>>) {
        result.subscribe((res: HttpResponse<CashDeskApplication>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CashDeskApplication) {
        this.eventManager.broadcast({ name: 'cashDeskApplicationListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackInventoryById(index: number, item: Inventory) {
        return item.id;
    }

    trackBankById(index: number, item: Bank) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-cash-desk-application-popup',
    template: ''
})
export class CashDeskApplicationPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cashDeskApplicationPopupService: CashDeskApplicationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.cashDeskApplicationPopupService
                    .open(CashDeskApplicationDialogComponent as Component, params['id']);
            } else {
                this.cashDeskApplicationPopupService
                    .open(CashDeskApplicationDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

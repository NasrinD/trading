import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ReceiptItem } from './receipt-item.model';
import { ReceiptItemPopupService } from './receipt-item-popup.service';
import { ReceiptItemService } from './receipt-item.service';
import { Receipt, ReceiptService } from '../receipt';

@Component({
    selector: 'jhi-receipt-item-dialog',
    templateUrl: './receipt-item-dialog.component.html'
})
export class ReceiptItemDialogComponent implements OnInit {

    receiptItem: ReceiptItem;
    isSaving: boolean;

    receipts: Receipt[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private receiptItemService: ReceiptItemService,
        private receiptService: ReceiptService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.receiptService.query()
            .subscribe((res: HttpResponse<Receipt[]>) => { this.receipts = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.receiptItem.id !== undefined) {
            this.subscribeToSaveResponse(
                this.receiptItemService.update(this.receiptItem));
        } else {
            this.subscribeToSaveResponse(
                this.receiptItemService.create(this.receiptItem));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ReceiptItem>>) {
        result.subscribe((res: HttpResponse<ReceiptItem>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ReceiptItem) {
        this.eventManager.broadcast({ name: 'receiptItemListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackReceiptById(index: number, item: Receipt) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-receipt-item-popup',
    template: ''
})
export class ReceiptItemPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private receiptItemPopupService: ReceiptItemPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.receiptItemPopupService
                    .open(ReceiptItemDialogComponent as Component, params['id']);
            } else {
                this.receiptItemPopupService
                    .open(ReceiptItemDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

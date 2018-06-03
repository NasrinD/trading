import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ReceiptItem } from './receipt-item.model';
import { ReceiptItemService } from './receipt-item.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-receipt-item',
    templateUrl: './receipt-item.component.html'
})
export class ReceiptItemComponent implements OnInit, OnDestroy {
receiptItems: ReceiptItem[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private receiptItemService: ReceiptItemService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.receiptItemService.query().subscribe(
            (res: HttpResponse<ReceiptItem[]>) => {
                this.receiptItems = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInReceiptItems();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ReceiptItem) {
        return item.id;
    }
    registerChangeInReceiptItems() {
        this.eventSubscriber = this.eventManager.subscribe('receiptItemListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

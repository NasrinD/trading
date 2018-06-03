import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Receipt } from './receipt.model';
import { ReceiptService } from './receipt.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-receipt',
    templateUrl: './receipt.component.html'
})
export class ReceiptComponent implements OnInit, OnDestroy {
receipts: Receipt[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private receiptService: ReceiptService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.receiptService.query().subscribe(
            (res: HttpResponse<Receipt[]>) => {
                this.receipts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInReceipts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Receipt) {
        return item.id;
    }
    registerChangeInReceipts() {
        this.eventSubscriber = this.eventManager.subscribe('receiptListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

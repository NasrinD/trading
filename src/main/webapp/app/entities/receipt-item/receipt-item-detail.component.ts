import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ReceiptItem } from './receipt-item.model';
import { ReceiptItemService } from './receipt-item.service';

@Component({
    selector: 'jhi-receipt-item-detail',
    templateUrl: './receipt-item-detail.component.html'
})
export class ReceiptItemDetailComponent implements OnInit, OnDestroy {

    receiptItem: ReceiptItem;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private receiptItemService: ReceiptItemService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInReceiptItems();
    }

    load(id) {
        this.receiptItemService.find(id)
            .subscribe((receiptItemResponse: HttpResponse<ReceiptItem>) => {
                this.receiptItem = receiptItemResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInReceiptItems() {
        this.eventSubscriber = this.eventManager.subscribe(
            'receiptItemListModification',
            (response) => this.load(this.receiptItem.id)
        );
    }
}

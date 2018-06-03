import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { StockItem } from './stock-item.model';
import { StockItemService } from './stock-item.service';

@Component({
    selector: 'jhi-stock-item-detail',
    templateUrl: './stock-item-detail.component.html'
})
export class StockItemDetailComponent implements OnInit, OnDestroy {

    stockItem: StockItem;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private stockItemService: StockItemService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInStockItems();
    }

    load(id) {
        this.stockItemService.find(id)
            .subscribe((stockItemResponse: HttpResponse<StockItem>) => {
                this.stockItem = stockItemResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInStockItems() {
        this.eventSubscriber = this.eventManager.subscribe(
            'stockItemListModification',
            (response) => this.load(this.stockItem.id)
        );
    }
}

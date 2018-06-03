import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Inventory } from './inventory.model';
import { InventoryService } from './inventory.service';

@Component({
    selector: 'jhi-inventory-detail',
    templateUrl: './inventory-detail.component.html'
})
export class InventoryDetailComponent implements OnInit, OnDestroy {

    inventory: Inventory;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private inventoryService: InventoryService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInInventories();
    }

    load(id) {
        this.inventoryService.find(id)
            .subscribe((inventoryResponse: HttpResponse<Inventory>) => {
                this.inventory = inventoryResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInInventories() {
        this.eventSubscriber = this.eventManager.subscribe(
            'inventoryListModification',
            (response) => this.load(this.inventory.id)
        );
    }
}

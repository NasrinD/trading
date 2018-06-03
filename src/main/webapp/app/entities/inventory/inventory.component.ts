import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Inventory } from './inventory.model';
import { InventoryService } from './inventory.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-inventory',
    templateUrl: './inventory.component.html'
})
export class InventoryComponent implements OnInit, OnDestroy {
inventories: Inventory[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private inventoryService: InventoryService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.inventoryService.query().subscribe(
            (res: HttpResponse<Inventory[]>) => {
                this.inventories = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInInventories();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Inventory) {
        return item.id;
    }
    registerChangeInInventories() {
        this.eventSubscriber = this.eventManager.subscribe('inventoryListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

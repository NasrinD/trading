import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Store } from './store.model';
import { StoreService } from './store.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-store',
    templateUrl: './store.component.html'
})
export class StoreComponent implements OnInit, OnDestroy {
stores: Store[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private storeService: StoreService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.storeService.query().subscribe(
            (res: HttpResponse<Store[]>) => {
                this.stores = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInStores();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Store) {
        return item.id;
    }
    registerChangeInStores() {
        this.eventSubscriber = this.eventManager.subscribe('storeListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

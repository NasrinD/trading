import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Store } from './store.model';
import { StoreService } from './store.service';

@Component({
    selector: 'jhi-store-detail',
    templateUrl: './store-detail.component.html'
})
export class StoreDetailComponent implements OnInit, OnDestroy {

    store: Store;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private storeService: StoreService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInStores();
    }

    load(id) {
        this.storeService.find(id)
            .subscribe((storeResponse: HttpResponse<Store>) => {
                this.store = storeResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInStores() {
        this.eventSubscriber = this.eventManager.subscribe(
            'storeListModification',
            (response) => this.load(this.store.id)
        );
    }
}

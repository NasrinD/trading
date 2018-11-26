import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Network } from './network.model';
import { NetworkService } from './network.service';

@Component({
    selector: 'jhi-network-detail',
    templateUrl: './network-detail.component.html'
})
export class NetworkDetailComponent implements OnInit, OnDestroy {

    network: Network;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private networkService: NetworkService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInNetworks();
    }

    load(id) {
        this.networkService.find(id)
            .subscribe((networkResponse: HttpResponse<Network>) => {
                this.network = networkResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInNetworks() {
        this.eventSubscriber = this.eventManager.subscribe(
            'networkListModification',
            (response) => this.load(this.network.id)
        );
    }
}

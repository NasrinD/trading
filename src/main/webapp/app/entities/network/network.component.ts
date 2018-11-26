import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Network } from './network.model';
import { NetworkService } from './network.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-network',
    templateUrl: './network.component.html'
})
export class NetworkComponent implements OnInit, OnDestroy {
networks: Network[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private networkService: NetworkService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.networkService.query().subscribe(
            (res: HttpResponse<Network[]>) => {
                this.networks = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInNetworks();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Network) {
        return item.id;
    }
    registerChangeInNetworks() {
        this.eventSubscriber = this.eventManager.subscribe('networkListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

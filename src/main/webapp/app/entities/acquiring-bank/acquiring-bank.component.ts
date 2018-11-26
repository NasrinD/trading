import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AcquiringBank } from './acquiring-bank.model';
import { AcquiringBankService } from './acquiring-bank.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-acquiring-bank',
    templateUrl: './acquiring-bank.component.html'
})
export class AcquiringBankComponent implements OnInit, OnDestroy {
acquiringBanks: AcquiringBank[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private acquiringBankService: AcquiringBankService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.acquiringBankService.query().subscribe(
            (res: HttpResponse<AcquiringBank[]>) => {
                this.acquiringBanks = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInAcquiringBanks();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: AcquiringBank) {
        return item.id;
    }
    registerChangeInAcquiringBanks() {
        this.eventSubscriber = this.eventManager.subscribe('acquiringBankListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

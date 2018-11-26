import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IssuingBank } from './issuing-bank.model';
import { IssuingBankService } from './issuing-bank.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-issuing-bank',
    templateUrl: './issuing-bank.component.html'
})
export class IssuingBankComponent implements OnInit, OnDestroy {
issuingBanks: IssuingBank[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private issuingBankService: IssuingBankService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.issuingBankService.query().subscribe(
            (res: HttpResponse<IssuingBank[]>) => {
                this.issuingBanks = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInIssuingBanks();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IssuingBank) {
        return item.id;
    }
    registerChangeInIssuingBanks() {
        this.eventSubscriber = this.eventManager.subscribe('issuingBankListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

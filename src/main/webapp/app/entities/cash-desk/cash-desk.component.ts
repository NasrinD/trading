import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CashDesk } from './cash-desk.model';
import { CashDeskService } from './cash-desk.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-cash-desk',
    templateUrl: './cash-desk.component.html'
})
export class CashDeskComponent implements OnInit, OnDestroy {
cashDesks: CashDesk[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private cashDeskService: CashDeskService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.cashDeskService.query().subscribe(
            (res: HttpResponse<CashDesk[]>) => {
                this.cashDesks = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCashDesks();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CashDesk) {
        return item.id;
    }
    registerChangeInCashDesks() {
        this.eventSubscriber = this.eventManager.subscribe('cashDeskListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

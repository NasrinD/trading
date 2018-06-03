import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CashBox } from './cash-box.model';
import { CashBoxService } from './cash-box.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-cash-box',
    templateUrl: './cash-box.component.html'
})
export class CashBoxComponent implements OnInit, OnDestroy {
cashBoxes: CashBox[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private cashBoxService: CashBoxService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.cashBoxService.query().subscribe(
            (res: HttpResponse<CashBox[]>) => {
                this.cashBoxes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCashBoxes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CashBox) {
        return item.id;
    }
    registerChangeInCashBoxes() {
        this.eventSubscriber = this.eventManager.subscribe('cashBoxListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

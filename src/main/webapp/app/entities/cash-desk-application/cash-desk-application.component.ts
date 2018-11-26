import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CashDeskApplication } from './cash-desk-application.model';
import { CashDeskApplicationService } from './cash-desk-application.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-cash-desk-application',
    templateUrl: './cash-desk-application.component.html'
})
export class CashDeskApplicationComponent implements OnInit, OnDestroy {
cashDeskApplications: CashDeskApplication[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private cashDeskApplicationService: CashDeskApplicationService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.cashDeskApplicationService.query().subscribe(
            (res: HttpResponse<CashDeskApplication[]>) => {
                this.cashDeskApplications = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCashDeskApplications();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CashDeskApplication) {
        return item.id;
    }
    registerChangeInCashDeskApplications() {
        this.eventSubscriber = this.eventManager.subscribe('cashDeskApplicationListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

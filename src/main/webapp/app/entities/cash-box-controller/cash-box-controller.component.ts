import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CashBoxController } from './cash-box-controller.model';
import { CashBoxControllerService } from './cash-box-controller.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-cash-box-controller',
    templateUrl: './cash-box-controller.component.html'
})
export class CashBoxControllerComponent implements OnInit, OnDestroy {
cashBoxControllers: CashBoxController[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private cashBoxControllerService: CashBoxControllerService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.cashBoxControllerService.query().subscribe(
            (res: HttpResponse<CashBoxController[]>) => {
                this.cashBoxControllers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCashBoxControllers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CashBoxController) {
        return item.id;
    }
    registerChangeInCashBoxControllers() {
        this.eventSubscriber = this.eventManager.subscribe('cashBoxControllerListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CashDesk } from './cash-desk.model';
import { CashDeskService } from './cash-desk.service';

@Component({
    selector: 'jhi-cash-desk-detail',
    templateUrl: './cash-desk-detail.component.html'
})
export class CashDeskDetailComponent implements OnInit, OnDestroy {

    cashDesk: CashDesk;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private cashDeskService: CashDeskService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCashDesks();
    }

    load(id) {
        this.cashDeskService.find(id)
            .subscribe((cashDeskResponse: HttpResponse<CashDesk>) => {
                this.cashDesk = cashDeskResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCashDesks() {
        this.eventSubscriber = this.eventManager.subscribe(
            'cashDeskListModification',
            (response) => this.load(this.cashDesk.id)
        );
    }
}

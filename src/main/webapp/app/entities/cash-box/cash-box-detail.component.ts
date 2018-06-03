import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CashBox } from './cash-box.model';
import { CashBoxService } from './cash-box.service';

@Component({
    selector: 'jhi-cash-box-detail',
    templateUrl: './cash-box-detail.component.html'
})
export class CashBoxDetailComponent implements OnInit, OnDestroy {

    cashBox: CashBox;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private cashBoxService: CashBoxService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCashBoxes();
    }

    load(id) {
        this.cashBoxService.find(id)
            .subscribe((cashBoxResponse: HttpResponse<CashBox>) => {
                this.cashBox = cashBoxResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCashBoxes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'cashBoxListModification',
            (response) => this.load(this.cashBox.id)
        );
    }
}

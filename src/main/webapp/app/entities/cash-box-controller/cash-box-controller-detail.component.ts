import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CashBoxController } from './cash-box-controller.model';
import { CashBoxControllerService } from './cash-box-controller.service';

@Component({
    selector: 'jhi-cash-box-controller-detail',
    templateUrl: './cash-box-controller-detail.component.html'
})
export class CashBoxControllerDetailComponent implements OnInit, OnDestroy {

    cashBoxController: CashBoxController;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private cashBoxControllerService: CashBoxControllerService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCashBoxControllers();
    }

    load(id) {
        this.cashBoxControllerService.find(id)
            .subscribe((cashBoxControllerResponse: HttpResponse<CashBoxController>) => {
                this.cashBoxController = cashBoxControllerResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCashBoxControllers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'cashBoxControllerListModification',
            (response) => this.load(this.cashBoxController.id)
        );
    }
}

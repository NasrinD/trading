import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CashDeskApplication } from './cash-desk-application.model';
import { CashDeskApplicationService } from './cash-desk-application.service';

@Component({
    selector: 'jhi-cash-desk-application-detail',
    templateUrl: './cash-desk-application-detail.component.html'
})
export class CashDeskApplicationDetailComponent implements OnInit, OnDestroy {

    cashDeskApplication: CashDeskApplication;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private cashDeskApplicationService: CashDeskApplicationService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCashDeskApplications();
    }

    load(id) {
        this.cashDeskApplicationService.find(id)
            .subscribe((cashDeskApplicationResponse: HttpResponse<CashDeskApplication>) => {
                this.cashDeskApplication = cashDeskApplicationResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCashDeskApplications() {
        this.eventSubscriber = this.eventManager.subscribe(
            'cashDeskApplicationListModification',
            (response) => this.load(this.cashDeskApplication.id)
        );
    }
}

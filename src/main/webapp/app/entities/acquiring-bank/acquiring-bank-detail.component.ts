import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { AcquiringBank } from './acquiring-bank.model';
import { AcquiringBankService } from './acquiring-bank.service';

@Component({
    selector: 'jhi-acquiring-bank-detail',
    templateUrl: './acquiring-bank-detail.component.html'
})
export class AcquiringBankDetailComponent implements OnInit, OnDestroy {

    acquiringBank: AcquiringBank;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private acquiringBankService: AcquiringBankService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAcquiringBanks();
    }

    load(id) {
        this.acquiringBankService.find(id)
            .subscribe((acquiringBankResponse: HttpResponse<AcquiringBank>) => {
                this.acquiringBank = acquiringBankResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAcquiringBanks() {
        this.eventSubscriber = this.eventManager.subscribe(
            'acquiringBankListModification',
            (response) => this.load(this.acquiringBank.id)
        );
    }
}

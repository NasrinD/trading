import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { IssuingBank } from './issuing-bank.model';
import { IssuingBankService } from './issuing-bank.service';

@Component({
    selector: 'jhi-issuing-bank-detail',
    templateUrl: './issuing-bank-detail.component.html'
})
export class IssuingBankDetailComponent implements OnInit, OnDestroy {

    issuingBank: IssuingBank;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private issuingBankService: IssuingBankService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInIssuingBanks();
    }

    load(id) {
        this.issuingBankService.find(id)
            .subscribe((issuingBankResponse: HttpResponse<IssuingBank>) => {
                this.issuingBank = issuingBankResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInIssuingBanks() {
        this.eventSubscriber = this.eventManager.subscribe(
            'issuingBankListModification',
            (response) => this.load(this.issuingBank.id)
        );
    }
}

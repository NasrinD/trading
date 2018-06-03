import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Debit } from './debit.model';
import { DebitService } from './debit.service';

@Component({
    selector: 'jhi-debit-detail',
    templateUrl: './debit-detail.component.html'
})
export class DebitDetailComponent implements OnInit, OnDestroy {

    debit: Debit;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private debitService: DebitService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDebits();
    }

    load(id) {
        this.debitService.find(id)
            .subscribe((debitResponse: HttpResponse<Debit>) => {
                this.debit = debitResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDebits() {
        this.eventSubscriber = this.eventManager.subscribe(
            'debitListModification',
            (response) => this.load(this.debit.id)
        );
    }
}

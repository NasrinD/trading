import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Debit } from './debit.model';
import { DebitService } from './debit.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-debit',
    templateUrl: './debit.component.html'
})
export class DebitComponent implements OnInit, OnDestroy {
debits: Debit[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private debitService: DebitService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.debitService.query().subscribe(
            (res: HttpResponse<Debit[]>) => {
                this.debits = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInDebits();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Debit) {
        return item.id;
    }
    registerChangeInDebits() {
        this.eventSubscriber = this.eventManager.subscribe('debitListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

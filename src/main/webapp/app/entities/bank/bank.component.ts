import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Bank } from './bank.model';
import { BankService } from './bank.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-bank',
    templateUrl: './bank.component.html'
})
export class BankComponent implements OnInit, OnDestroy {
banks: Bank[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private bankService: BankService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.bankService.query().subscribe(
            (res: HttpResponse<Bank[]>) => {
                this.banks = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInBanks();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Bank) {
        return item.id;
    }
    registerChangeInBanks() {
        this.eventSubscriber = this.eventManager.subscribe('bankListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

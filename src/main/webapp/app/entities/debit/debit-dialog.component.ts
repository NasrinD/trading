import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Debit } from './debit.model';
import { DebitPopupService } from './debit-popup.service';
import { DebitService } from './debit.service';
import { Customer, CustomerService } from '../customer';
import { Bank, BankService } from '../bank';

@Component({
    selector: 'jhi-debit-dialog',
    templateUrl: './debit-dialog.component.html'
})
export class DebitDialogComponent implements OnInit {

    debit: Debit;
    isSaving: boolean;

    customers: Customer[];

    banks: Bank[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private debitService: DebitService,
        private customerService: CustomerService,
        private bankService: BankService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.customerService.query()
            .subscribe((res: HttpResponse<Customer[]>) => { this.customers = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.bankService.query()
            .subscribe((res: HttpResponse<Bank[]>) => { this.banks = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.debit.id !== undefined) {
            this.subscribeToSaveResponse(
                this.debitService.update(this.debit));
        } else {
            this.subscribeToSaveResponse(
                this.debitService.create(this.debit));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Debit>>) {
        result.subscribe((res: HttpResponse<Debit>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Debit) {
        this.eventManager.broadcast({ name: 'debitListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCustomerById(index: number, item: Customer) {
        return item.id;
    }

    trackBankById(index: number, item: Bank) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-debit-popup',
    template: ''
})
export class DebitPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private debitPopupService: DebitPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.debitPopupService
                    .open(DebitDialogComponent as Component, params['id']);
            } else {
                this.debitPopupService
                    .open(DebitDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

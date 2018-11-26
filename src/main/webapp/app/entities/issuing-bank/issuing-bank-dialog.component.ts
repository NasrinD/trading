import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IssuingBank } from './issuing-bank.model';
import { IssuingBankPopupService } from './issuing-bank-popup.service';
import { IssuingBankService } from './issuing-bank.service';
import { Network, NetworkService } from '../network';

@Component({
    selector: 'jhi-issuing-bank-dialog',
    templateUrl: './issuing-bank-dialog.component.html'
})
export class IssuingBankDialogComponent implements OnInit {

    issuingBank: IssuingBank;
    isSaving: boolean;

    networks: Network[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private issuingBankService: IssuingBankService,
        private networkService: NetworkService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.networkService.query()
            .subscribe((res: HttpResponse<Network[]>) => { this.networks = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.issuingBank.id !== undefined) {
            this.subscribeToSaveResponse(
                this.issuingBankService.update(this.issuingBank));
        } else {
            this.subscribeToSaveResponse(
                this.issuingBankService.create(this.issuingBank));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IssuingBank>>) {
        result.subscribe((res: HttpResponse<IssuingBank>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: IssuingBank) {
        this.eventManager.broadcast({ name: 'issuingBankListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackNetworkById(index: number, item: Network) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-issuing-bank-popup',
    template: ''
})
export class IssuingBankPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private issuingBankPopupService: IssuingBankPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.issuingBankPopupService
                    .open(IssuingBankDialogComponent as Component, params['id']);
            } else {
                this.issuingBankPopupService
                    .open(IssuingBankDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

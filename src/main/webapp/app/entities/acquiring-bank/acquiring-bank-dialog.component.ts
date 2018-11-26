import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AcquiringBank } from './acquiring-bank.model';
import { AcquiringBankPopupService } from './acquiring-bank-popup.service';
import { AcquiringBankService } from './acquiring-bank.service';
import { Network, NetworkService } from '../network';

@Component({
    selector: 'jhi-acquiring-bank-dialog',
    templateUrl: './acquiring-bank-dialog.component.html'
})
export class AcquiringBankDialogComponent implements OnInit {

    acquiringBank: AcquiringBank;
    isSaving: boolean;

    networks: Network[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private acquiringBankService: AcquiringBankService,
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
        if (this.acquiringBank.id !== undefined) {
            this.subscribeToSaveResponse(
                this.acquiringBankService.update(this.acquiringBank));
        } else {
            this.subscribeToSaveResponse(
                this.acquiringBankService.create(this.acquiringBank));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<AcquiringBank>>) {
        result.subscribe((res: HttpResponse<AcquiringBank>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: AcquiringBank) {
        this.eventManager.broadcast({ name: 'acquiringBankListModification', content: 'OK'});
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
    selector: 'jhi-acquiring-bank-popup',
    template: ''
})
export class AcquiringBankPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private acquiringBankPopupService: AcquiringBankPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.acquiringBankPopupService
                    .open(AcquiringBankDialogComponent as Component, params['id']);
            } else {
                this.acquiringBankPopupService
                    .open(AcquiringBankDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

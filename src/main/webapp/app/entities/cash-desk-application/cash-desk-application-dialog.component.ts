import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CashDeskApplication } from './cash-desk-application.model';
import { CashDeskApplicationPopupService } from './cash-desk-application-popup.service';
import { CashDeskApplicationService } from './cash-desk-application.service';
import { CashDesk, CashDeskService } from '../cash-desk';

@Component({
    selector: 'jhi-cash-desk-application-dialog',
    templateUrl: './cash-desk-application-dialog.component.html'
})
export class CashDeskApplicationDialogComponent implements OnInit {

    cashDeskApplication: CashDeskApplication;
    isSaving: boolean;

    cashdesks: CashDesk[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private cashDeskApplicationService: CashDeskApplicationService,
        private cashDeskService: CashDeskService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.cashDeskService.query()
            .subscribe((res: HttpResponse<CashDesk[]>) => { this.cashdesks = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.cashDeskApplication.id !== undefined) {
            this.subscribeToSaveResponse(
                this.cashDeskApplicationService.update(this.cashDeskApplication));
        } else {
            this.subscribeToSaveResponse(
                this.cashDeskApplicationService.create(this.cashDeskApplication));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CashDeskApplication>>) {
        result.subscribe((res: HttpResponse<CashDeskApplication>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CashDeskApplication) {
        this.eventManager.broadcast({ name: 'cashDeskApplicationListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCashDeskById(index: number, item: CashDesk) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-cash-desk-application-popup',
    template: ''
})
export class CashDeskApplicationPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cashDeskApplicationPopupService: CashDeskApplicationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.cashDeskApplicationPopupService
                    .open(CashDeskApplicationDialogComponent as Component, params['id']);
            } else {
                this.cashDeskApplicationPopupService
                    .open(CashDeskApplicationDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

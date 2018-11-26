import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CashBox } from './cash-box.model';
import { CashBoxPopupService } from './cash-box-popup.service';
import { CashBoxService } from './cash-box.service';
import { CashBoxController, CashBoxControllerService } from '../cash-box-controller';
import { CashDesk, CashDeskService } from '../cash-desk';

@Component({
    selector: 'jhi-cash-box-dialog',
    templateUrl: './cash-box-dialog.component.html'
})
export class CashBoxDialogComponent implements OnInit {

    cashBox: CashBox;
    isSaving: boolean;

    controllers: CashBoxController[];

    cashdesks: CashDesk[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private cashBoxService: CashBoxService,
        private cashBoxControllerService: CashBoxControllerService,
        private cashDeskService: CashDeskService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.cashBoxControllerService
            .query({filter: 'cashbox-is-null'})
            .subscribe((res: HttpResponse<CashBoxController[]>) => {
                if (!this.cashBox.controller || !this.cashBox.controller.id) {
                    this.controllers = res.body;
                } else {
                    this.cashBoxControllerService
                        .find(this.cashBox.controller.id)
                        .subscribe((subRes: HttpResponse<CashBoxController>) => {
                            this.controllers = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.cashDeskService.query()
            .subscribe((res: HttpResponse<CashDesk[]>) => { this.cashdesks = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.cashBox.id !== undefined) {
            this.subscribeToSaveResponse(
                this.cashBoxService.update(this.cashBox));
        } else {
            this.subscribeToSaveResponse(
                this.cashBoxService.create(this.cashBox));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CashBox>>) {
        result.subscribe((res: HttpResponse<CashBox>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CashBox) {
        this.eventManager.broadcast({ name: 'cashBoxListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCashBoxControllerById(index: number, item: CashBoxController) {
        return item.id;
    }

    trackCashDeskById(index: number, item: CashDesk) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-cash-box-popup',
    template: ''
})
export class CashBoxPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cashBoxPopupService: CashBoxPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.cashBoxPopupService
                    .open(CashBoxDialogComponent as Component, params['id']);
            } else {
                this.cashBoxPopupService
                    .open(CashBoxDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

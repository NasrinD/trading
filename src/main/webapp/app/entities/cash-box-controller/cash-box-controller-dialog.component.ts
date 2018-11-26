import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CashBoxController } from './cash-box-controller.model';
import { CashBoxControllerPopupService } from './cash-box-controller-popup.service';
import { CashBoxControllerService } from './cash-box-controller.service';
import { CashBox, CashBoxService } from '../cash-box';

@Component({
    selector: 'jhi-cash-box-controller-dialog',
    templateUrl: './cash-box-controller-dialog.component.html'
})
export class CashBoxControllerDialogComponent implements OnInit {

    cashBoxController: CashBoxController;
    isSaving: boolean;

    cashboxes: CashBox[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private cashBoxControllerService: CashBoxControllerService,
        private cashBoxService: CashBoxService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.cashBoxService.query()
            .subscribe((res: HttpResponse<CashBox[]>) => { this.cashboxes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.cashBoxController.id !== undefined) {
            this.subscribeToSaveResponse(
                this.cashBoxControllerService.update(this.cashBoxController));
        } else {
            this.subscribeToSaveResponse(
                this.cashBoxControllerService.create(this.cashBoxController));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CashBoxController>>) {
        result.subscribe((res: HttpResponse<CashBoxController>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CashBoxController) {
        this.eventManager.broadcast({ name: 'cashBoxControllerListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCashBoxById(index: number, item: CashBox) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-cash-box-controller-popup',
    template: ''
})
export class CashBoxControllerPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cashBoxControllerPopupService: CashBoxControllerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.cashBoxControllerPopupService
                    .open(CashBoxControllerDialogComponent as Component, params['id']);
            } else {
                this.cashBoxControllerPopupService
                    .open(CashBoxControllerDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

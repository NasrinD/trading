import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { BarCodeScanner } from './bar-code-scanner.model';
import { BarCodeScannerPopupService } from './bar-code-scanner-popup.service';
import { BarCodeScannerService } from './bar-code-scanner.service';
import { BarCodeScannerController, BarCodeScannerControllerService } from '../bar-code-scanner-controller';
import { CashDesk, CashDeskService } from '../cash-desk';

@Component({
    selector: 'jhi-bar-code-scanner-dialog',
    templateUrl: './bar-code-scanner-dialog.component.html'
})
export class BarCodeScannerDialogComponent implements OnInit {

    barCodeScanner: BarCodeScanner;
    isSaving: boolean;

    controllers: BarCodeScannerController[];

    cashdesks: CashDesk[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private barCodeScannerService: BarCodeScannerService,
        private barCodeScannerControllerService: BarCodeScannerControllerService,
        private cashDeskService: CashDeskService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.barCodeScannerControllerService
            .query({filter: 'barcodescanner-is-null'})
            .subscribe((res: HttpResponse<BarCodeScannerController[]>) => {
                if (!this.barCodeScanner.controller || !this.barCodeScanner.controller.id) {
                    this.controllers = res.body;
                } else {
                    this.barCodeScannerControllerService
                        .find(this.barCodeScanner.controller.id)
                        .subscribe((subRes: HttpResponse<BarCodeScannerController>) => {
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
        if (this.barCodeScanner.id !== undefined) {
            this.subscribeToSaveResponse(
                this.barCodeScannerService.update(this.barCodeScanner));
        } else {
            this.subscribeToSaveResponse(
                this.barCodeScannerService.create(this.barCodeScanner));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<BarCodeScanner>>) {
        result.subscribe((res: HttpResponse<BarCodeScanner>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: BarCodeScanner) {
        this.eventManager.broadcast({ name: 'barCodeScannerListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackBarCodeScannerControllerById(index: number, item: BarCodeScannerController) {
        return item.id;
    }

    trackCashDeskById(index: number, item: CashDesk) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-bar-code-scanner-popup',
    template: ''
})
export class BarCodeScannerPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private barCodeScannerPopupService: BarCodeScannerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.barCodeScannerPopupService
                    .open(BarCodeScannerDialogComponent as Component, params['id']);
            } else {
                this.barCodeScannerPopupService
                    .open(BarCodeScannerDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

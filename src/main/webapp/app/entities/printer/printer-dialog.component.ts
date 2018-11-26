import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Printer } from './printer.model';
import { PrinterPopupService } from './printer-popup.service';
import { PrinterService } from './printer.service';
import { PrinterController, PrinterControllerService } from '../printer-controller';
import { CashDesk, CashDeskService } from '../cash-desk';

@Component({
    selector: 'jhi-printer-dialog',
    templateUrl: './printer-dialog.component.html'
})
export class PrinterDialogComponent implements OnInit {

    printer: Printer;
    isSaving: boolean;

    controllers: PrinterController[];

    cashdesks: CashDesk[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private printerService: PrinterService,
        private printerControllerService: PrinterControllerService,
        private cashDeskService: CashDeskService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.printerControllerService
            .query({filter: 'printer-is-null'})
            .subscribe((res: HttpResponse<PrinterController[]>) => {
                if (!this.printer.controller || !this.printer.controller.id) {
                    this.controllers = res.body;
                } else {
                    this.printerControllerService
                        .find(this.printer.controller.id)
                        .subscribe((subRes: HttpResponse<PrinterController>) => {
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
        if (this.printer.id !== undefined) {
            this.subscribeToSaveResponse(
                this.printerService.update(this.printer));
        } else {
            this.subscribeToSaveResponse(
                this.printerService.create(this.printer));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Printer>>) {
        result.subscribe((res: HttpResponse<Printer>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Printer) {
        this.eventManager.broadcast({ name: 'printerListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackPrinterControllerById(index: number, item: PrinterController) {
        return item.id;
    }

    trackCashDeskById(index: number, item: CashDesk) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-printer-popup',
    template: ''
})
export class PrinterPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private printerPopupService: PrinterPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.printerPopupService
                    .open(PrinterDialogComponent as Component, params['id']);
            } else {
                this.printerPopupService
                    .open(PrinterDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

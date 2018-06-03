import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PrinterController } from './printer-controller.model';
import { PrinterControllerPopupService } from './printer-controller-popup.service';
import { PrinterControllerService } from './printer-controller.service';
import { Printer, PrinterService } from '../printer';

@Component({
    selector: 'jhi-printer-controller-dialog',
    templateUrl: './printer-controller-dialog.component.html'
})
export class PrinterControllerDialogComponent implements OnInit {

    printerController: PrinterController;
    isSaving: boolean;

    printers: Printer[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private printerControllerService: PrinterControllerService,
        private printerService: PrinterService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.printerService.query()
            .subscribe((res: HttpResponse<Printer[]>) => { this.printers = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.printerController.id !== undefined) {
            this.subscribeToSaveResponse(
                this.printerControllerService.update(this.printerController));
        } else {
            this.subscribeToSaveResponse(
                this.printerControllerService.create(this.printerController));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<PrinterController>>) {
        result.subscribe((res: HttpResponse<PrinterController>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: PrinterController) {
        this.eventManager.broadcast({ name: 'printerControllerListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackPrinterById(index: number, item: Printer) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-printer-controller-popup',
    template: ''
})
export class PrinterControllerPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private printerControllerPopupService: PrinterControllerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.printerControllerPopupService
                    .open(PrinterControllerDialogComponent as Component, params['id']);
            } else {
                this.printerControllerPopupService
                    .open(PrinterControllerDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

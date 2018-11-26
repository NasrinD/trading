import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CashDesk } from './cash-desk.model';
import { CashDeskPopupService } from './cash-desk-popup.service';
import { CashDeskService } from './cash-desk.service';
import { Printer, PrinterService } from '../printer';
import { CashBox, CashBoxService } from '../cash-box';
import { CashDeskGUI, CashDeskGUIService } from '../cash-desk-gui';
import { BarCodeScanner, BarCodeScannerService } from '../bar-code-scanner';
import { CardReader, CardReaderService } from '../card-reader';
import { CashDeskApplication, CashDeskApplicationService } from '../cash-desk-application';
import { Store, StoreService } from '../store';

@Component({
    selector: 'jhi-cash-desk-dialog',
    templateUrl: './cash-desk-dialog.component.html'
})
export class CashDeskDialogComponent implements OnInit {

    cashDesk: CashDesk;
    isSaving: boolean;

    printers: Printer[];

    cashboxes: CashBox[];

    cashdeskguis: CashDeskGUI[];

    barcodescanners: BarCodeScanner[];

    cardreaders: CardReader[];

    cashdeskapplications: CashDeskApplication[];

    stores: Store[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private cashDeskService: CashDeskService,
        private printerService: PrinterService,
        private cashBoxService: CashBoxService,
        private cashDeskGUIService: CashDeskGUIService,
        private barCodeScannerService: BarCodeScannerService,
        private cardReaderService: CardReaderService,
        private cashDeskApplicationService: CashDeskApplicationService,
        private storeService: StoreService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.printerService
            .query({filter: 'cashdesk-is-null'})
            .subscribe((res: HttpResponse<Printer[]>) => {
                if (!this.cashDesk.printer || !this.cashDesk.printer.id) {
                    this.printers = res.body;
                } else {
                    this.printerService
                        .find(this.cashDesk.printer.id)
                        .subscribe((subRes: HttpResponse<Printer>) => {
                            this.printers = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.cashBoxService
            .query({filter: 'cashdesk-is-null'})
            .subscribe((res: HttpResponse<CashBox[]>) => {
                if (!this.cashDesk.cashBox || !this.cashDesk.cashBox.id) {
                    this.cashboxes = res.body;
                } else {
                    this.cashBoxService
                        .find(this.cashDesk.cashBox.id)
                        .subscribe((subRes: HttpResponse<CashBox>) => {
                            this.cashboxes = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.cashDeskGUIService
            .query({filter: 'cashdesk-is-null'})
            .subscribe((res: HttpResponse<CashDeskGUI[]>) => {
                if (!this.cashDesk.cashDeskGui || !this.cashDesk.cashDeskGui.id) {
                    this.cashdeskguis = res.body;
                } else {
                    this.cashDeskGUIService
                        .find(this.cashDesk.cashDeskGui.id)
                        .subscribe((subRes: HttpResponse<CashDeskGUI>) => {
                            this.cashdeskguis = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.barCodeScannerService
            .query({filter: 'cashdesk-is-null'})
            .subscribe((res: HttpResponse<BarCodeScanner[]>) => {
                if (!this.cashDesk.barCodeScanner || !this.cashDesk.barCodeScanner.id) {
                    this.barcodescanners = res.body;
                } else {
                    this.barCodeScannerService
                        .find(this.cashDesk.barCodeScanner.id)
                        .subscribe((subRes: HttpResponse<BarCodeScanner>) => {
                            this.barcodescanners = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.cardReaderService
            .query({filter: 'cashdesk-is-null'})
            .subscribe((res: HttpResponse<CardReader[]>) => {
                if (!this.cashDesk.cardReader || !this.cashDesk.cardReader.id) {
                    this.cardreaders = res.body;
                } else {
                    this.cardReaderService
                        .find(this.cashDesk.cardReader.id)
                        .subscribe((subRes: HttpResponse<CardReader>) => {
                            this.cardreaders = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.cashDeskApplicationService
            .query({filter: 'cashdesk-is-null'})
            .subscribe((res: HttpResponse<CashDeskApplication[]>) => {
                if (!this.cashDesk.cashDeskApplication || !this.cashDesk.cashDeskApplication.id) {
                    this.cashdeskapplications = res.body;
                } else {
                    this.cashDeskApplicationService
                        .find(this.cashDesk.cashDeskApplication.id)
                        .subscribe((subRes: HttpResponse<CashDeskApplication>) => {
                            this.cashdeskapplications = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.storeService.query()
            .subscribe((res: HttpResponse<Store[]>) => { this.stores = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.cashDesk.id !== undefined) {
            this.subscribeToSaveResponse(
                this.cashDeskService.update(this.cashDesk));
        } else {
            this.subscribeToSaveResponse(
                this.cashDeskService.create(this.cashDesk));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CashDesk>>) {
        result.subscribe((res: HttpResponse<CashDesk>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CashDesk) {
        this.eventManager.broadcast({ name: 'cashDeskListModification', content: 'OK'});
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

    trackCashBoxById(index: number, item: CashBox) {
        return item.id;
    }

    trackCashDeskGUIById(index: number, item: CashDeskGUI) {
        return item.id;
    }

    trackBarCodeScannerById(index: number, item: BarCodeScanner) {
        return item.id;
    }

    trackCardReaderById(index: number, item: CardReader) {
        return item.id;
    }

    trackCashDeskApplicationById(index: number, item: CashDeskApplication) {
        return item.id;
    }

    trackStoreById(index: number, item: Store) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-cash-desk-popup',
    template: ''
})
export class CashDeskPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cashDeskPopupService: CashDeskPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.cashDeskPopupService
                    .open(CashDeskDialogComponent as Component, params['id']);
            } else {
                this.cashDeskPopupService
                    .open(CashDeskDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

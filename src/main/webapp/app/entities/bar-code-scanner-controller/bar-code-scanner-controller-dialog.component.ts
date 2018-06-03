import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { BarCodeScannerController } from './bar-code-scanner-controller.model';
import { BarCodeScannerControllerPopupService } from './bar-code-scanner-controller-popup.service';
import { BarCodeScannerControllerService } from './bar-code-scanner-controller.service';
import { BarCodeScanner, BarCodeScannerService } from '../bar-code-scanner';

@Component({
    selector: 'jhi-bar-code-scanner-controller-dialog',
    templateUrl: './bar-code-scanner-controller-dialog.component.html'
})
export class BarCodeScannerControllerDialogComponent implements OnInit {

    barCodeScannerController: BarCodeScannerController;
    isSaving: boolean;

    barcodescanners: BarCodeScanner[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private barCodeScannerControllerService: BarCodeScannerControllerService,
        private barCodeScannerService: BarCodeScannerService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.barCodeScannerService.query()
            .subscribe((res: HttpResponse<BarCodeScanner[]>) => { this.barcodescanners = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.barCodeScannerController.id !== undefined) {
            this.subscribeToSaveResponse(
                this.barCodeScannerControllerService.update(this.barCodeScannerController));
        } else {
            this.subscribeToSaveResponse(
                this.barCodeScannerControllerService.create(this.barCodeScannerController));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<BarCodeScannerController>>) {
        result.subscribe((res: HttpResponse<BarCodeScannerController>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: BarCodeScannerController) {
        this.eventManager.broadcast({ name: 'barCodeScannerControllerListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackBarCodeScannerById(index: number, item: BarCodeScanner) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-bar-code-scanner-controller-popup',
    template: ''
})
export class BarCodeScannerControllerPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private barCodeScannerControllerPopupService: BarCodeScannerControllerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.barCodeScannerControllerPopupService
                    .open(BarCodeScannerControllerDialogComponent as Component, params['id']);
            } else {
                this.barCodeScannerControllerPopupService
                    .open(BarCodeScannerControllerDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

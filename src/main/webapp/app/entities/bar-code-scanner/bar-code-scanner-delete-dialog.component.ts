import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BarCodeScanner } from './bar-code-scanner.model';
import { BarCodeScannerPopupService } from './bar-code-scanner-popup.service';
import { BarCodeScannerService } from './bar-code-scanner.service';

@Component({
    selector: 'jhi-bar-code-scanner-delete-dialog',
    templateUrl: './bar-code-scanner-delete-dialog.component.html'
})
export class BarCodeScannerDeleteDialogComponent {

    barCodeScanner: BarCodeScanner;

    constructor(
        private barCodeScannerService: BarCodeScannerService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.barCodeScannerService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'barCodeScannerListModification',
                content: 'Deleted an barCodeScanner'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-bar-code-scanner-delete-popup',
    template: ''
})
export class BarCodeScannerDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private barCodeScannerPopupService: BarCodeScannerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.barCodeScannerPopupService
                .open(BarCodeScannerDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

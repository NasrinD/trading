import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BarCodeScannerController } from './bar-code-scanner-controller.model';
import { BarCodeScannerControllerPopupService } from './bar-code-scanner-controller-popup.service';
import { BarCodeScannerControllerService } from './bar-code-scanner-controller.service';

@Component({
    selector: 'jhi-bar-code-scanner-controller-delete-dialog',
    templateUrl: './bar-code-scanner-controller-delete-dialog.component.html'
})
export class BarCodeScannerControllerDeleteDialogComponent {

    barCodeScannerController: BarCodeScannerController;

    constructor(
        private barCodeScannerControllerService: BarCodeScannerControllerService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.barCodeScannerControllerService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'barCodeScannerControllerListModification',
                content: 'Deleted an barCodeScannerController'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-bar-code-scanner-controller-delete-popup',
    template: ''
})
export class BarCodeScannerControllerDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private barCodeScannerControllerPopupService: BarCodeScannerControllerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.barCodeScannerControllerPopupService
                .open(BarCodeScannerControllerDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

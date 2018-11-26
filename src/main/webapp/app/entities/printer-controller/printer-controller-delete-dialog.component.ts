import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PrinterController } from './printer-controller.model';
import { PrinterControllerPopupService } from './printer-controller-popup.service';
import { PrinterControllerService } from './printer-controller.service';

@Component({
    selector: 'jhi-printer-controller-delete-dialog',
    templateUrl: './printer-controller-delete-dialog.component.html'
})
export class PrinterControllerDeleteDialogComponent {

    printerController: PrinterController;

    constructor(
        private printerControllerService: PrinterControllerService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.printerControllerService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'printerControllerListModification',
                content: 'Deleted an printerController'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-printer-controller-delete-popup',
    template: ''
})
export class PrinterControllerDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private printerControllerPopupService: PrinterControllerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.printerControllerPopupService
                .open(PrinterControllerDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

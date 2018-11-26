import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Printer } from './printer.model';
import { PrinterPopupService } from './printer-popup.service';
import { PrinterService } from './printer.service';

@Component({
    selector: 'jhi-printer-delete-dialog',
    templateUrl: './printer-delete-dialog.component.html'
})
export class PrinterDeleteDialogComponent {

    printer: Printer;

    constructor(
        private printerService: PrinterService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.printerService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'printerListModification',
                content: 'Deleted an printer'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-printer-delete-popup',
    template: ''
})
export class PrinterDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private printerPopupService: PrinterPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.printerPopupService
                .open(PrinterDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

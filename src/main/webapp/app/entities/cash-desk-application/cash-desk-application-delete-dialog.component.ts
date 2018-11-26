import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CashDeskApplication } from './cash-desk-application.model';
import { CashDeskApplicationPopupService } from './cash-desk-application-popup.service';
import { CashDeskApplicationService } from './cash-desk-application.service';

@Component({
    selector: 'jhi-cash-desk-application-delete-dialog',
    templateUrl: './cash-desk-application-delete-dialog.component.html'
})
export class CashDeskApplicationDeleteDialogComponent {

    cashDeskApplication: CashDeskApplication;

    constructor(
        private cashDeskApplicationService: CashDeskApplicationService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.cashDeskApplicationService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'cashDeskApplicationListModification',
                content: 'Deleted an cashDeskApplication'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-cash-desk-application-delete-popup',
    template: ''
})
export class CashDeskApplicationDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cashDeskApplicationPopupService: CashDeskApplicationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.cashDeskApplicationPopupService
                .open(CashDeskApplicationDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

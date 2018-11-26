import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CashDesk } from './cash-desk.model';
import { CashDeskPopupService } from './cash-desk-popup.service';
import { CashDeskService } from './cash-desk.service';

@Component({
    selector: 'jhi-cash-desk-delete-dialog',
    templateUrl: './cash-desk-delete-dialog.component.html'
})
export class CashDeskDeleteDialogComponent {

    cashDesk: CashDesk;

    constructor(
        private cashDeskService: CashDeskService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.cashDeskService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'cashDeskListModification',
                content: 'Deleted an cashDesk'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-cash-desk-delete-popup',
    template: ''
})
export class CashDeskDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cashDeskPopupService: CashDeskPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.cashDeskPopupService
                .open(CashDeskDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

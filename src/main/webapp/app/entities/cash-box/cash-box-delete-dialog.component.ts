import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CashBox } from './cash-box.model';
import { CashBoxPopupService } from './cash-box-popup.service';
import { CashBoxService } from './cash-box.service';

@Component({
    selector: 'jhi-cash-box-delete-dialog',
    templateUrl: './cash-box-delete-dialog.component.html'
})
export class CashBoxDeleteDialogComponent {

    cashBox: CashBox;

    constructor(
        private cashBoxService: CashBoxService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.cashBoxService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'cashBoxListModification',
                content: 'Deleted an cashBox'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-cash-box-delete-popup',
    template: ''
})
export class CashBoxDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cashBoxPopupService: CashBoxPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.cashBoxPopupService
                .open(CashBoxDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

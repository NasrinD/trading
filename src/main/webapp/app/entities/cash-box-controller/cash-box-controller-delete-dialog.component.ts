import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CashBoxController } from './cash-box-controller.model';
import { CashBoxControllerPopupService } from './cash-box-controller-popup.service';
import { CashBoxControllerService } from './cash-box-controller.service';

@Component({
    selector: 'jhi-cash-box-controller-delete-dialog',
    templateUrl: './cash-box-controller-delete-dialog.component.html'
})
export class CashBoxControllerDeleteDialogComponent {

    cashBoxController: CashBoxController;

    constructor(
        private cashBoxControllerService: CashBoxControllerService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.cashBoxControllerService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'cashBoxControllerListModification',
                content: 'Deleted an cashBoxController'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-cash-box-controller-delete-popup',
    template: ''
})
export class CashBoxControllerDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cashBoxControllerPopupService: CashBoxControllerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.cashBoxControllerPopupService
                .open(CashBoxControllerDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

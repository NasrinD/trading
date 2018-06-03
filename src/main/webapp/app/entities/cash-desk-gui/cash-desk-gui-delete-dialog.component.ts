import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CashDeskGUI } from './cash-desk-gui.model';
import { CashDeskGUIPopupService } from './cash-desk-gui-popup.service';
import { CashDeskGUIService } from './cash-desk-gui.service';

@Component({
    selector: 'jhi-cash-desk-gui-delete-dialog',
    templateUrl: './cash-desk-gui-delete-dialog.component.html'
})
export class CashDeskGUIDeleteDialogComponent {

    cashDeskGUI: CashDeskGUI;

    constructor(
        private cashDeskGUIService: CashDeskGUIService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.cashDeskGUIService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'cashDeskGUIListModification',
                content: 'Deleted an cashDeskGUI'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-cash-desk-gui-delete-popup',
    template: ''
})
export class CashDeskGUIDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cashDeskGUIPopupService: CashDeskGUIPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.cashDeskGUIPopupService
                .open(CashDeskGUIDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

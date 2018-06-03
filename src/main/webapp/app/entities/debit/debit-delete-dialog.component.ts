import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Debit } from './debit.model';
import { DebitPopupService } from './debit-popup.service';
import { DebitService } from './debit.service';

@Component({
    selector: 'jhi-debit-delete-dialog',
    templateUrl: './debit-delete-dialog.component.html'
})
export class DebitDeleteDialogComponent {

    debit: Debit;

    constructor(
        private debitService: DebitService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.debitService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'debitListModification',
                content: 'Deleted an debit'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-debit-delete-popup',
    template: ''
})
export class DebitDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private debitPopupService: DebitPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.debitPopupService
                .open(DebitDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

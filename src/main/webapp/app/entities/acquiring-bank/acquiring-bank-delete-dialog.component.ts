import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AcquiringBank } from './acquiring-bank.model';
import { AcquiringBankPopupService } from './acquiring-bank-popup.service';
import { AcquiringBankService } from './acquiring-bank.service';

@Component({
    selector: 'jhi-acquiring-bank-delete-dialog',
    templateUrl: './acquiring-bank-delete-dialog.component.html'
})
export class AcquiringBankDeleteDialogComponent {

    acquiringBank: AcquiringBank;

    constructor(
        private acquiringBankService: AcquiringBankService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.acquiringBankService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'acquiringBankListModification',
                content: 'Deleted an acquiringBank'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-acquiring-bank-delete-popup',
    template: ''
})
export class AcquiringBankDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private acquiringBankPopupService: AcquiringBankPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.acquiringBankPopupService
                .open(AcquiringBankDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

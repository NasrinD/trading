import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IssuingBank } from './issuing-bank.model';
import { IssuingBankPopupService } from './issuing-bank-popup.service';
import { IssuingBankService } from './issuing-bank.service';

@Component({
    selector: 'jhi-issuing-bank-delete-dialog',
    templateUrl: './issuing-bank-delete-dialog.component.html'
})
export class IssuingBankDeleteDialogComponent {

    issuingBank: IssuingBank;

    constructor(
        private issuingBankService: IssuingBankService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.issuingBankService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'issuingBankListModification',
                content: 'Deleted an issuingBank'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-issuing-bank-delete-popup',
    template: ''
})
export class IssuingBankDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private issuingBankPopupService: IssuingBankPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.issuingBankPopupService
                .open(IssuingBankDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

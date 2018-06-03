import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ReceiptItem } from './receipt-item.model';
import { ReceiptItemPopupService } from './receipt-item-popup.service';
import { ReceiptItemService } from './receipt-item.service';

@Component({
    selector: 'jhi-receipt-item-delete-dialog',
    templateUrl: './receipt-item-delete-dialog.component.html'
})
export class ReceiptItemDeleteDialogComponent {

    receiptItem: ReceiptItem;

    constructor(
        private receiptItemService: ReceiptItemService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.receiptItemService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'receiptItemListModification',
                content: 'Deleted an receiptItem'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-receipt-item-delete-popup',
    template: ''
})
export class ReceiptItemDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private receiptItemPopupService: ReceiptItemPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.receiptItemPopupService
                .open(ReceiptItemDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

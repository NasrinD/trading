import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { StockItem } from './stock-item.model';
import { StockItemPopupService } from './stock-item-popup.service';
import { StockItemService } from './stock-item.service';

@Component({
    selector: 'jhi-stock-item-delete-dialog',
    templateUrl: './stock-item-delete-dialog.component.html'
})
export class StockItemDeleteDialogComponent {

    stockItem: StockItem;

    constructor(
        private stockItemService: StockItemService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.stockItemService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'stockItemListModification',
                content: 'Deleted an stockItem'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-stock-item-delete-popup',
    template: ''
})
export class StockItemDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private stockItemPopupService: StockItemPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.stockItemPopupService
                .open(StockItemDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Store } from './store.model';
import { StorePopupService } from './store-popup.service';
import { StoreService } from './store.service';

@Component({
    selector: 'jhi-store-delete-dialog',
    templateUrl: './store-delete-dialog.component.html'
})
export class StoreDeleteDialogComponent {

    store: Store;

    constructor(
        private storeService: StoreService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.storeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'storeListModification',
                content: 'Deleted an store'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-store-delete-popup',
    template: ''
})
export class StoreDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private storePopupService: StorePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.storePopupService
                .open(StoreDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

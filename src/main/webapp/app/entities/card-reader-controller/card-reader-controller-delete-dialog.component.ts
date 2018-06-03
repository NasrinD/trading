import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CardReaderController } from './card-reader-controller.model';
import { CardReaderControllerPopupService } from './card-reader-controller-popup.service';
import { CardReaderControllerService } from './card-reader-controller.service';

@Component({
    selector: 'jhi-card-reader-controller-delete-dialog',
    templateUrl: './card-reader-controller-delete-dialog.component.html'
})
export class CardReaderControllerDeleteDialogComponent {

    cardReaderController: CardReaderController;

    constructor(
        private cardReaderControllerService: CardReaderControllerService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.cardReaderControllerService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'cardReaderControllerListModification',
                content: 'Deleted an cardReaderController'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-card-reader-controller-delete-popup',
    template: ''
})
export class CardReaderControllerDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cardReaderControllerPopupService: CardReaderControllerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.cardReaderControllerPopupService
                .open(CardReaderControllerDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

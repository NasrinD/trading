import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CardReader } from './card-reader.model';
import { CardReaderPopupService } from './card-reader-popup.service';
import { CardReaderService } from './card-reader.service';

@Component({
    selector: 'jhi-card-reader-delete-dialog',
    templateUrl: './card-reader-delete-dialog.component.html'
})
export class CardReaderDeleteDialogComponent {

    cardReader: CardReader;

    constructor(
        private cardReaderService: CardReaderService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.cardReaderService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'cardReaderListModification',
                content: 'Deleted an cardReader'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-card-reader-delete-popup',
    template: ''
})
export class CardReaderDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cardReaderPopupService: CardReaderPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.cardReaderPopupService
                .open(CardReaderDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

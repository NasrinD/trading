import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { CardReaderController } from './card-reader-controller.model';
import { CardReaderControllerService } from './card-reader-controller.service';

@Injectable()
export class CardReaderControllerPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private cardReaderControllerService: CardReaderControllerService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.cardReaderControllerService.find(id)
                    .subscribe((cardReaderControllerResponse: HttpResponse<CardReaderController>) => {
                        const cardReaderController: CardReaderController = cardReaderControllerResponse.body;
                        this.ngbModalRef = this.cardReaderControllerModalRef(component, cardReaderController);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.cardReaderControllerModalRef(component, new CardReaderController());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    cardReaderControllerModalRef(component: Component, cardReaderController: CardReaderController): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.cardReaderController = cardReaderController;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}

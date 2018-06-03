import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { CashBoxController } from './cash-box-controller.model';
import { CashBoxControllerService } from './cash-box-controller.service';

@Injectable()
export class CashBoxControllerPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private cashBoxControllerService: CashBoxControllerService

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
                this.cashBoxControllerService.find(id)
                    .subscribe((cashBoxControllerResponse: HttpResponse<CashBoxController>) => {
                        const cashBoxController: CashBoxController = cashBoxControllerResponse.body;
                        this.ngbModalRef = this.cashBoxControllerModalRef(component, cashBoxController);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.cashBoxControllerModalRef(component, new CashBoxController());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    cashBoxControllerModalRef(component: Component, cashBoxController: CashBoxController): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.cashBoxController = cashBoxController;
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

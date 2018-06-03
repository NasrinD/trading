import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { CashDeskApplication } from './cash-desk-application.model';
import { CashDeskApplicationService } from './cash-desk-application.service';

@Injectable()
export class CashDeskApplicationPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private cashDeskApplicationService: CashDeskApplicationService

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
                this.cashDeskApplicationService.find(id)
                    .subscribe((cashDeskApplicationResponse: HttpResponse<CashDeskApplication>) => {
                        const cashDeskApplication: CashDeskApplication = cashDeskApplicationResponse.body;
                        this.ngbModalRef = this.cashDeskApplicationModalRef(component, cashDeskApplication);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.cashDeskApplicationModalRef(component, new CashDeskApplication());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    cashDeskApplicationModalRef(component: Component, cashDeskApplication: CashDeskApplication): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.cashDeskApplication = cashDeskApplication;
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

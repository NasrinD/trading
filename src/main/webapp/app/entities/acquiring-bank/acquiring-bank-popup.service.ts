import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { AcquiringBank } from './acquiring-bank.model';
import { AcquiringBankService } from './acquiring-bank.service';

@Injectable()
export class AcquiringBankPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private acquiringBankService: AcquiringBankService

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
                this.acquiringBankService.find(id)
                    .subscribe((acquiringBankResponse: HttpResponse<AcquiringBank>) => {
                        const acquiringBank: AcquiringBank = acquiringBankResponse.body;
                        this.ngbModalRef = this.acquiringBankModalRef(component, acquiringBank);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.acquiringBankModalRef(component, new AcquiringBank());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    acquiringBankModalRef(component: Component, acquiringBank: AcquiringBank): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.acquiringBank = acquiringBank;
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

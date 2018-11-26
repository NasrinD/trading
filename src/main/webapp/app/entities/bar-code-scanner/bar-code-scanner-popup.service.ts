import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { BarCodeScanner } from './bar-code-scanner.model';
import { BarCodeScannerService } from './bar-code-scanner.service';

@Injectable()
export class BarCodeScannerPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private barCodeScannerService: BarCodeScannerService

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
                this.barCodeScannerService.find(id)
                    .subscribe((barCodeScannerResponse: HttpResponse<BarCodeScanner>) => {
                        const barCodeScanner: BarCodeScanner = barCodeScannerResponse.body;
                        this.ngbModalRef = this.barCodeScannerModalRef(component, barCodeScanner);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.barCodeScannerModalRef(component, new BarCodeScanner());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    barCodeScannerModalRef(component: Component, barCodeScanner: BarCodeScanner): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.barCodeScanner = barCodeScanner;
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

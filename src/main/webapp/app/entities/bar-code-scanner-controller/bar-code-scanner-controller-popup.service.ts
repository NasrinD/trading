import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { BarCodeScannerController } from './bar-code-scanner-controller.model';
import { BarCodeScannerControllerService } from './bar-code-scanner-controller.service';

@Injectable()
export class BarCodeScannerControllerPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private barCodeScannerControllerService: BarCodeScannerControllerService

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
                this.barCodeScannerControllerService.find(id)
                    .subscribe((barCodeScannerControllerResponse: HttpResponse<BarCodeScannerController>) => {
                        const barCodeScannerController: BarCodeScannerController = barCodeScannerControllerResponse.body;
                        this.ngbModalRef = this.barCodeScannerControllerModalRef(component, barCodeScannerController);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.barCodeScannerControllerModalRef(component, new BarCodeScannerController());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    barCodeScannerControllerModalRef(component: Component, barCodeScannerController: BarCodeScannerController): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.barCodeScannerController = barCodeScannerController;
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

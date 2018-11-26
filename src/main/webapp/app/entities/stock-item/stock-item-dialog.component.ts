import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { StockItem } from './stock-item.model';
import { StockItemPopupService } from './stock-item-popup.service';
import { StockItemService } from './stock-item.service';
import { Product, ProductService } from '../product';
import { Inventory, InventoryService } from '../inventory';

@Component({
    selector: 'jhi-stock-item-dialog',
    templateUrl: './stock-item-dialog.component.html'
})
export class StockItemDialogComponent implements OnInit {

    stockItem: StockItem;
    isSaving: boolean;

    products: Product[];

    inventories: Inventory[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private stockItemService: StockItemService,
        private productService: ProductService,
        private inventoryService: InventoryService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.productService
            .query({filter: 'stockitem-is-null'})
            .subscribe((res: HttpResponse<Product[]>) => {
                if (!this.stockItem.product || !this.stockItem.product.id) {
                    this.products = res.body;
                } else {
                    this.productService
                        .find(this.stockItem.product.id)
                        .subscribe((subRes: HttpResponse<Product>) => {
                            this.products = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.inventoryService.query()
            .subscribe((res: HttpResponse<Inventory[]>) => { this.inventories = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.stockItem.id !== undefined) {
            this.subscribeToSaveResponse(
                this.stockItemService.update(this.stockItem));
        } else {
            this.subscribeToSaveResponse(
                this.stockItemService.create(this.stockItem));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<StockItem>>) {
        result.subscribe((res: HttpResponse<StockItem>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: StockItem) {
        this.eventManager.broadcast({ name: 'stockItemListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackProductById(index: number, item: Product) {
        return item.id;
    }

    trackInventoryById(index: number, item: Inventory) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-stock-item-popup',
    template: ''
})
export class StockItemPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private stockItemPopupService: StockItemPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.stockItemPopupService
                    .open(StockItemDialogComponent as Component, params['id']);
            } else {
                this.stockItemPopupService
                    .open(StockItemDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

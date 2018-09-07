import { JhiEventManager } from 'ng-jhipster';
import { Observable } from 'rxjs/Observable';
import { StockItem } from '../../entities/stock-item/stock-item.model';
import { storeRoute } from '../../entities/store/store.route';
import { HttpResponse, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { StockItemService } from '../../entities/stock-item/stock-item.service';
import { ProductService } from '../../entities/product/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../entities/product/product.model';

@Component({
  selector: 'jhi-my-cash-box',
  templateUrl: './my-cash-box.component.html',
  styles: []
})
export class MyCashBoxComponent implements OnInit {

  barCode;
  cashBoxStatus = 'Ready To Use!';
  totalPrice = 0;
  product: Product;
  purchasedProducts: Product[] = [];
  stockItem: StockItem;
  purchasedItems: StockItem[] = [];
  stockItemToUpdate: StockItem;
  constructor(
    private productService: ProductService,
    private stockItemService: StockItemService,
    private eventManager: JhiEventManager
  ) { }

  scanBarCode(barCodeValue) {
    this.productService.findByBarCode(barCodeValue)
      .subscribe((productResponse: HttpResponse<Product>) => {
        this.product = productResponse.body;
        this.stockItem = this.product.stockItem;
        this.purchasedProducts.push(this.product);
        this.purchasedItems.push(this.product.stockItem);
        this.totalPrice += this.stockItem.salesPrice;
        console.log('BarCode: ' + barCodeValue + ', ProductName: ' + this.product.name);
        console.log('Items: ' + this.purchasedProducts[0].name);
    });
    this.barCode = '';
  }

  receiveMoney(receivedMoney) {
    this.cashBoxStatus = 'Money received: ' + receivedMoney.toString() + ' Rest: ' + (receivedMoney - this.totalPrice).toString();
  }

  startNewSale() {
    this.product = new Product();
    this.stockItem = new StockItem();
    this.purchasedProducts = [];
    this.purchasedItems = [];
    this.totalPrice = 0;
    this.cashBoxStatus = 'New Sale Started!';
  }

  finishSale() {
    this.cashBoxStatus = 'New Sale Finished!';
    // for (const item of this.purchasedItems) {
    //   if (item.id !== undefined) {
    //     console.log('stockItemId: ' + item.id + ' stockItemAmount: ' + item.amount);
    //     this.stockItemService.find(item.id)
    //       .subscribe((stockItemResponse: HttpResponse<StockItem>) => {
    //         this.stockItemToUpdate = stockItemResponse.body;
    //         console.log('STOCKITEMTOUPDATE: ' + this.stockItemToUpdate.id);
    //         if (this.stockItemToUpdate.amount !== 0) {
    //           this.stockItemToUpdate.amount -= 1;
    //           console.log('NEW AMOUNT: ' + this.stockItemToUpdate.amount);
    //           this.stockItemService.update(this.stockItemToUpdate)
    //             .subscribe((res: HttpResponse<StockItem>) =>
    //               this.onSaveSuccess(res.body));
    //         } else {
    //           // this.stockItemService.delete(this.stockItemToUpdate.id).subscribe((response) => {
    //           //   this.eventManager.broadcast({
    //           //       name: 'stockItemListModification',
    //           //       content: 'Deleted an stockItem'
    //           //   });
    //           // });
    //         }
    //     });
    //   }
    // }
  }

  closeCashBox() {
    this.cashBoxStatus = 'CashBox Closed!';
    for (const item of this.purchasedItems) {
      if (item.id !== undefined) {
        console.log('stockItemId: ' + item.id + ' stockItemAmount: ' + item.amount);
        this.stockItemService.find(item.id)
          .subscribe((stockItemResponse: HttpResponse<StockItem>) => {
            this.stockItemToUpdate = stockItemResponse.body;
            console.log('STOCKITEMTOUPDATE: ' + this.stockItemToUpdate.id);
            if (this.stockItemToUpdate.amount !== 0) {
              this.stockItemToUpdate.amount -= 1;
              console.log('NEW AMOUNT: ' + this.stockItemToUpdate.amount);
              this.stockItemService.update(this.stockItemToUpdate)
                .subscribe((res: HttpResponse<StockItem>) =>
                  this.onSaveSuccess(res.body));
            } else {
              // this.stockItemService.delete(this.stockItemToUpdate.id).subscribe((response) => {
              //   this.eventManager.broadcast({
              //       name: 'stockItemListModification',
              //       content: 'Deleted an stockItem'
              //   });
              // });
            }
        });
      }
    }
  }

  chooseBar() {
    this.cashBoxStatus = 'Bar Payment Chosen!';
  }

  chooseCard() {
    this.cashBoxStatus = 'Card Payment Chosen!';
  }

  ngOnInit() {
  }

  private onSaveSuccess(result: StockItem) {
    this.eventManager.broadcast({ name: 'stockItemListModification', content: 'OK'});
  }
}

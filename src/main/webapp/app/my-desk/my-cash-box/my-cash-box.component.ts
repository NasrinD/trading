import { Customer } from './../../entities/customer/customer.model';
import { Receipt, PaymentMode } from './../../entities/receipt/receipt.model';
import { ReceiptItemService } from './../../entities/receipt-item/receipt-item.service';
import { ReceiptService } from './../../entities/receipt/receipt.service';
import { JhiEventManager } from 'ng-jhipster';
import { Observable } from 'rxjs/Observable';
import { StockItem } from '../../entities/stock-item/stock-item.model';
import { storeRoute } from '../../entities/store/store.route';
import { HttpResponse, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { StockItemService } from '../../entities/stock-item/stock-item.service';
import { ProductService } from '../../entities/product/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../entities/product/product.model';
import { ReceiptItem } from '../../entities/receipt-item';

@Component({
  selector: 'jhi-my-cash-box',
  templateUrl: './my-cash-box.component.html',
  styles: []
})
export class MyCashBoxComponent implements OnInit {

  barCode;
  cashBoxStatus = 'Ready To Use!';
  paymentMode: PaymentMode;
  totalPrice = 0;
  product: Product;
  purchasedProducts: Product[] = [];
  stockItem: StockItem;
  purchasedItems: StockItem[] = [];
  stockItemToUpdate: StockItem;
  receiptItem: ReceiptItem;
  receiptItems: ReceiptItem[] = [];
  receipt: Receipt;
  constructor(
    private productService: ProductService,
    private stockItemService: StockItemService,
    private receiptService: ReceiptService,
    private receiptItemService: ReceiptItemService,
    private eventManager: JhiEventManager
  ) { }

  scanBarCode(barCodeValue) {
    this.productService.findByBarCode(barCodeValue)
      .subscribe((productResponse: HttpResponse<Product>) => {
        this.product = productResponse.body;
        this.stockItem = this.product.stockItem;
        this.purchasedProducts.push(this.product);
        this.purchasedItems.push(this.product.stockItem);
        this.totalPrice += this.product.price;
        console.log('BarCode: ' + barCodeValue + ', ProductName: ' + this.product.name);
        console.log('Items: ' + this.purchasedProducts[0].name);
        this.receiptItem = new ReceiptItem();
        this.receiptItem.productBarCode = barCodeValue;
        this.receiptItem.productName = this.product.name;
        this.receiptItem.productPrice = this.product.price;
        this.receiptItems.push(this.receiptItem);
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
    this.receipt = new Receipt();
    this.receiptItems = [];
  }

  finishSale() {
    this.cashBoxStatus = 'New Sale Finished!';
  }

  closeCashBox() {
    this.cashBoxStatus = 'CashBox Closed!';
    this.receipt = new Receipt();
    this.receipt.paymentMode = this.paymentMode;
    const tzoffset = (new Date()).getTimezoneOffset() * 60000; // offset in milliseconds
    const localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
    this.receipt.date = localISOTime;
    // this.receipt.date = new Date().toISOString().slice(0, 16);
    this.receipt.runningTotal = this.totalPrice;
    this.receiptService.create(this.receipt)
      .subscribe((resReceipt: HttpResponse<Receipt>) => {
        this.onSaveSuccess(resReceipt.body);
        this.receipt = resReceipt.body;
        console.log('RECEIPT ID: ' + this.receipt.id);
        for (const item of this.receiptItems) {
          item.receipt = this.receipt;
          this.receiptItemService.create(item)
            .subscribe((resItem: HttpResponse<ReceiptItem>) =>
              this.onSaveSuccess(resItem.body));
        }
      });
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
    this.paymentMode = PaymentMode.CASH;
    this.cashBoxStatus = 'CASH Payment Chosen!';
  }

  chooseCard() {
    this.paymentMode = PaymentMode.CARD;
    this.cashBoxStatus = 'CARD Payment Chosen!';
  }

  ngOnInit() {
  }

  private onSaveSuccess(result: StockItem) {
    this.eventManager.broadcast({ name: 'stockItemListModification', content: 'OK'});
  }
}

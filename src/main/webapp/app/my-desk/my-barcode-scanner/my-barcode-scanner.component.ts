import { HttpResponse, HttpRequest } from '@angular/common/http';
import { StockItemService } from './../../entities/stock-item/stock-item.service';
import { ProductService } from './../../entities/product/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from './../../entities/product/product.model';
import { StockItem } from '../../entities/stock-item';

@Component({
  selector: 'jhi-my-barcode-scanner',
  templateUrl: './my-barcode-scanner.component.html',
  styles: []
})
export class MyBarcodeScannerComponent implements OnInit {

  product: Product;
  items: Product[] = [];
  constructor(
    private productService: ProductService,
    private stockItemService: StockItemService
  ) { }

  search(barCode) {
    this.productService.findByBarCode(barCode)
      .subscribe((productResponse: HttpResponse<Product>) => {
        this.product = productResponse.body;
        this.items.push(this.product);
        console.log('BarCode: ' + barCode + ', ProductName: ' + this.product.name);
        console.log('Items: ' + this.items[0].name);
    });
  }

  ngOnInit() {
  }
}

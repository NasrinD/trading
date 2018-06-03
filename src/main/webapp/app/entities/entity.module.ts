import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TradingsystemEmStoreModule } from './store/store.module';
import { TradingsystemEmCashDeskModule } from './cash-desk/cash-desk.module';
import { TradingsystemEmCashDeskApplicationModule } from './cash-desk-application/cash-desk-application.module';
import { TradingsystemEmCashDeskGUIModule } from './cash-desk-gui/cash-desk-gui.module';
import { TradingsystemEmCashBoxModule } from './cash-box/cash-box.module';
import { TradingsystemEmCashBoxControllerModule } from './cash-box-controller/cash-box-controller.module';
import { TradingsystemEmPrinterModule } from './printer/printer.module';
import { TradingsystemEmPrinterControllerModule } from './printer-controller/printer-controller.module';
import { TradingsystemEmBarCodeScannerModule } from './bar-code-scanner/bar-code-scanner.module';
import { TradingsystemEmBarCodeScannerControllerModule } from './bar-code-scanner-controller/bar-code-scanner-controller.module';
import { TradingsystemEmCardReaderModule } from './card-reader/card-reader.module';
import { TradingsystemEmCardReaderControllerModule } from './card-reader-controller/card-reader-controller.module';
import { TradingsystemEmBankModule } from './bank/bank.module';
import { TradingsystemEmCustomerModule } from './customer/customer.module';
import { TradingsystemEmDebitModule } from './debit/debit.module';
import { TradingsystemEmReceiptModule } from './receipt/receipt.module';
import { TradingsystemEmReceiptItemModule } from './receipt-item/receipt-item.module';
import { TradingsystemEmInventoryModule } from './inventory/inventory.module';
import { TradingsystemEmStockItemModule } from './stock-item/stock-item.module';
import { TradingsystemEmProductModule } from './product/product.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        TradingsystemEmStoreModule,
        TradingsystemEmCashDeskModule,
        TradingsystemEmCashDeskApplicationModule,
        TradingsystemEmCashDeskGUIModule,
        TradingsystemEmCashBoxModule,
        TradingsystemEmCashBoxControllerModule,
        TradingsystemEmPrinterModule,
        TradingsystemEmPrinterControllerModule,
        TradingsystemEmBarCodeScannerModule,
        TradingsystemEmBarCodeScannerControllerModule,
        TradingsystemEmCardReaderModule,
        TradingsystemEmCardReaderControllerModule,
        TradingsystemEmBankModule,
        TradingsystemEmCustomerModule,
        TradingsystemEmDebitModule,
        TradingsystemEmReceiptModule,
        TradingsystemEmReceiptItemModule,
        TradingsystemEmInventoryModule,
        TradingsystemEmStockItemModule,
        TradingsystemEmProductModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TradingsystemEmEntityModule {}

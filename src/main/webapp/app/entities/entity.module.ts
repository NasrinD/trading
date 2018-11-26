import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TradingsystemMoStoreModule } from './store/store.module';
import { TradingsystemMoCashDeskModule } from './cash-desk/cash-desk.module';
import { TradingsystemMoCashDeskApplicationModule } from './cash-desk-application/cash-desk-application.module';
import { TradingsystemMoCashDeskGUIModule } from './cash-desk-gui/cash-desk-gui.module';
import { TradingsystemMoCashBoxModule } from './cash-box/cash-box.module';
import { TradingsystemMoCashBoxControllerModule } from './cash-box-controller/cash-box-controller.module';
import { TradingsystemMoPrinterModule } from './printer/printer.module';
import { TradingsystemMoPrinterControllerModule } from './printer-controller/printer-controller.module';
import { TradingsystemMoBarCodeScannerModule } from './bar-code-scanner/bar-code-scanner.module';
import { TradingsystemMoBarCodeScannerControllerModule } from './bar-code-scanner-controller/bar-code-scanner-controller.module';
import { TradingsystemMoCardReaderModule } from './card-reader/card-reader.module';
import { TradingsystemMoCardReaderControllerModule } from './card-reader-controller/card-reader-controller.module';
import { TradingsystemMoIssuingBankModule } from './issuing-bank/issuing-bank.module';
import { TradingsystemMoDebitModule } from './debit/debit.module';
import { TradingsystemMoAcquiringBankModule } from './acquiring-bank/acquiring-bank.module';
import { TradingsystemMoNetworkModule } from './network/network.module';
import { TradingsystemMoCustomerModule } from './customer/customer.module';
import { TradingsystemMoReceiptModule } from './receipt/receipt.module';
import { TradingsystemMoReceiptItemModule } from './receipt-item/receipt-item.module';
import { TradingsystemMoInventoryModule } from './inventory/inventory.module';
import { TradingsystemMoStockItemModule } from './stock-item/stock-item.module';
import { TradingsystemMoProductModule } from './product/product.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        TradingsystemMoStoreModule,
        TradingsystemMoCashDeskModule,
        TradingsystemMoCashDeskApplicationModule,
        TradingsystemMoCashDeskGUIModule,
        TradingsystemMoCashBoxModule,
        TradingsystemMoCashBoxControllerModule,
        TradingsystemMoPrinterModule,
        TradingsystemMoPrinterControllerModule,
        TradingsystemMoBarCodeScannerModule,
        TradingsystemMoBarCodeScannerControllerModule,
        TradingsystemMoCardReaderModule,
        TradingsystemMoCardReaderControllerModule,
        TradingsystemMoIssuingBankModule,
        TradingsystemMoDebitModule,
        TradingsystemMoAcquiringBankModule,
        TradingsystemMoNetworkModule,
        TradingsystemMoCustomerModule,
        TradingsystemMoReceiptModule,
        TradingsystemMoReceiptItemModule,
        TradingsystemMoInventoryModule,
        TradingsystemMoStockItemModule,
        TradingsystemMoProductModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TradingsystemMoEntityModule {}

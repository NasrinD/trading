import { BaseEntity } from './../../shared';

export class ReceiptItem implements BaseEntity {
    constructor(
        public id?: number,
        public productBarCode?: number,
        public productSalesPrice?: number,
        public productName?: string,
        public receipt?: BaseEntity,
    ) {
    }
}

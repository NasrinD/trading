import { BaseEntity } from './../../shared';

export class ReceiptItem implements BaseEntity {
    constructor(
        public id?: number,
        public productBarCode?: number,
        public productPrice?: number,
        public productName?: string,
        public receipt?: BaseEntity,
    ) {
    }
}

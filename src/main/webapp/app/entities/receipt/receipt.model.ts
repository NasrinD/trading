import { BaseEntity } from './../../shared';

export const enum PaymentMode {
    'CASH',
    'CARD'
}

export class Receipt implements BaseEntity {
    constructor(
        public id?: number,
        public date?: any,
        public paymentMode?: PaymentMode,
        public runningTotal?: number,
        public receiptItems?: BaseEntity[],
        public cashBox?: BaseEntity,
        public customer?: BaseEntity,
    ) {
    }
}

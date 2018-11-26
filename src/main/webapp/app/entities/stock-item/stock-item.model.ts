import { BaseEntity } from './../../shared';

export class StockItem implements BaseEntity {
    constructor(
        public id?: number,
        public amount?: number,
        public minStock?: number,
        public maxStock?: number,
        public product?: BaseEntity,
        public inventory?: BaseEntity,
    ) {
    }
}

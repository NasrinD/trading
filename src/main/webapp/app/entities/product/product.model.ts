import { BaseEntity } from './../../shared';

export class Product implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public barCode?: number,
        public purchasePrice?: number,
        public stockItem?: BaseEntity,
    ) {
    }
}

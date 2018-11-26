import { BaseEntity } from './../../shared';

export class CashBox implements BaseEntity {
    constructor(
        public id?: number,
        public model?: string,
        public controller?: BaseEntity,
        public receipts?: BaseEntity[],
        public cashDesk?: BaseEntity,
    ) {
    }
}

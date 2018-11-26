import { BaseEntity } from './../../shared';

export class CashDesk implements BaseEntity {
    constructor(
        public id?: number,
        public printer?: BaseEntity,
        public cashBox?: BaseEntity,
        public cashDeskGui?: BaseEntity,
        public barCodeScanner?: BaseEntity,
        public cardReader?: BaseEntity,
        public cashDeskApplication?: BaseEntity,
        public store?: BaseEntity,
    ) {
    }
}

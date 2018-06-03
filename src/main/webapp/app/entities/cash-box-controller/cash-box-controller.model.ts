import { BaseEntity } from './../../shared';

export class CashBoxController implements BaseEntity {
    constructor(
        public id?: number,
        public printer?: BaseEntity,
    ) {
    }
}

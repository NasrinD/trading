import { BaseEntity } from './../../shared';

export class CashDeskApplication implements BaseEntity {
    constructor(
        public id?: number,
        public cashDesk?: BaseEntity,
    ) {
    }
}

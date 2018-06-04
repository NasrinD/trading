import { BaseEntity } from './../../shared';

export class CashDeskApplication implements BaseEntity {
    constructor(
        public id?: number,
        public inventory?: BaseEntity,
        public banks?: BaseEntity[],
        public cashDesk?: BaseEntity,
    ) {
    }
}

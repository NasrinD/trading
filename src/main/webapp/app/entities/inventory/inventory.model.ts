import { BaseEntity } from './../../shared';

export class Inventory implements BaseEntity {
    constructor(
        public id?: number,
        public stockItems?: BaseEntity[],
        public store?: BaseEntity,
    ) {
    }
}

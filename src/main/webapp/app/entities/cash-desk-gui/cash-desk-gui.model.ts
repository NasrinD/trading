import { BaseEntity } from './../../shared';

export class CashDeskGUI implements BaseEntity {
    constructor(
        public id?: number,
        public cashDesk?: BaseEntity,
    ) {
    }
}

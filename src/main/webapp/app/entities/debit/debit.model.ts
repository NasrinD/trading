import { BaseEntity } from './../../shared';

export class Debit implements BaseEntity {
    constructor(
        public id?: number,
        public pin?: number,
        public cardNumber?: number,
        public validityDate?: any,
        public owner?: BaseEntity,
        public bank?: BaseEntity,
    ) {
    }
}

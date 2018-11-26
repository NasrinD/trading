import { BaseEntity } from './../../shared';

export class IssuingBank implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public address?: string,
        public debits?: BaseEntity[],
        public network?: BaseEntity,
    ) {
    }
}

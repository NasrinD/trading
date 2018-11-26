import { BaseEntity } from './../../shared';

export class AcquiringBank implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public address?: string,
        public cardReaders?: BaseEntity[],
        public network?: BaseEntity,
    ) {
    }
}

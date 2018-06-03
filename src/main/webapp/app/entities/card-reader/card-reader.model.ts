import { BaseEntity } from './../../shared';

export class CardReader implements BaseEntity {
    constructor(
        public id?: number,
        public model?: string,
        public controller?: BaseEntity,
        public cashDesk?: BaseEntity,
    ) {
    }
}

import { BaseEntity } from './../../shared';

export class CardReaderController implements BaseEntity {
    constructor(
        public id?: number,
        public cardReader?: BaseEntity,
    ) {
    }
}

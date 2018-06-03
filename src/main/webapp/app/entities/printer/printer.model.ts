import { BaseEntity } from './../../shared';

export class Printer implements BaseEntity {
    constructor(
        public id?: number,
        public model?: string,
        public controller?: BaseEntity,
        public cashDesk?: BaseEntity,
    ) {
    }
}

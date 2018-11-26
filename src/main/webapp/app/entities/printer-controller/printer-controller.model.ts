import { BaseEntity } from './../../shared';

export class PrinterController implements BaseEntity {
    constructor(
        public id?: number,
        public printer?: BaseEntity,
    ) {
    }
}

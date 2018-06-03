import { BaseEntity } from './../../shared';

export class BarCodeScanner implements BaseEntity {
    constructor(
        public id?: number,
        public model?: string,
        public controller?: BaseEntity,
        public cashDesk?: BaseEntity,
    ) {
    }
}

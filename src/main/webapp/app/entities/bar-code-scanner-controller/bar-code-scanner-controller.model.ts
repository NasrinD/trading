import { BaseEntity } from './../../shared';

export class BarCodeScannerController implements BaseEntity {
    constructor(
        public id?: number,
        public barCodeScanner?: BaseEntity,
    ) {
    }
}

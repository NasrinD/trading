import { BaseEntity } from './../../shared';

export class Bank implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public address?: string,
        public customers?: BaseEntity[],
        public debits?: BaseEntity[],
        public cashDeskApplications?: BaseEntity[],
    ) {
    }
}

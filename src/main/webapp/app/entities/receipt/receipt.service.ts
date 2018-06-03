import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Receipt } from './receipt.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Receipt>;

@Injectable()
export class ReceiptService {

    private resourceUrl =  SERVER_API_URL + 'api/receipts';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(receipt: Receipt): Observable<EntityResponseType> {
        const copy = this.convert(receipt);
        return this.http.post<Receipt>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(receipt: Receipt): Observable<EntityResponseType> {
        const copy = this.convert(receipt);
        return this.http.put<Receipt>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Receipt>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Receipt[]>> {
        const options = createRequestOption(req);
        return this.http.get<Receipt[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Receipt[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Receipt = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Receipt[]>): HttpResponse<Receipt[]> {
        const jsonResponse: Receipt[] = res.body;
        const body: Receipt[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Receipt.
     */
    private convertItemFromServer(receipt: Receipt): Receipt {
        const copy: Receipt = Object.assign({}, receipt);
        copy.date = this.dateUtils
            .convertDateTimeFromServer(receipt.date);
        return copy;
    }

    /**
     * Convert a Receipt to a JSON which can be sent to the server.
     */
    private convert(receipt: Receipt): Receipt {
        const copy: Receipt = Object.assign({}, receipt);

        copy.date = this.dateUtils.toDate(receipt.date);
        return copy;
    }
}

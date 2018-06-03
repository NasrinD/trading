import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ReceiptItem } from './receipt-item.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ReceiptItem>;

@Injectable()
export class ReceiptItemService {

    private resourceUrl =  SERVER_API_URL + 'api/receipt-items';

    constructor(private http: HttpClient) { }

    create(receiptItem: ReceiptItem): Observable<EntityResponseType> {
        const copy = this.convert(receiptItem);
        return this.http.post<ReceiptItem>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(receiptItem: ReceiptItem): Observable<EntityResponseType> {
        const copy = this.convert(receiptItem);
        return this.http.put<ReceiptItem>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ReceiptItem>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ReceiptItem[]>> {
        const options = createRequestOption(req);
        return this.http.get<ReceiptItem[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ReceiptItem[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ReceiptItem = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ReceiptItem[]>): HttpResponse<ReceiptItem[]> {
        const jsonResponse: ReceiptItem[] = res.body;
        const body: ReceiptItem[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ReceiptItem.
     */
    private convertItemFromServer(receiptItem: ReceiptItem): ReceiptItem {
        const copy: ReceiptItem = Object.assign({}, receiptItem);
        return copy;
    }

    /**
     * Convert a ReceiptItem to a JSON which can be sent to the server.
     */
    private convert(receiptItem: ReceiptItem): ReceiptItem {
        const copy: ReceiptItem = Object.assign({}, receiptItem);
        return copy;
    }
}

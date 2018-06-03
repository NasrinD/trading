import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { StockItem } from './stock-item.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<StockItem>;

@Injectable()
export class StockItemService {

    private resourceUrl =  SERVER_API_URL + 'api/stock-items';

    constructor(private http: HttpClient) { }

    create(stockItem: StockItem): Observable<EntityResponseType> {
        const copy = this.convert(stockItem);
        return this.http.post<StockItem>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(stockItem: StockItem): Observable<EntityResponseType> {
        const copy = this.convert(stockItem);
        return this.http.put<StockItem>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<StockItem>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<StockItem[]>> {
        const options = createRequestOption(req);
        return this.http.get<StockItem[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<StockItem[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: StockItem = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<StockItem[]>): HttpResponse<StockItem[]> {
        const jsonResponse: StockItem[] = res.body;
        const body: StockItem[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to StockItem.
     */
    private convertItemFromServer(stockItem: StockItem): StockItem {
        const copy: StockItem = Object.assign({}, stockItem);
        return copy;
    }

    /**
     * Convert a StockItem to a JSON which can be sent to the server.
     */
    private convert(stockItem: StockItem): StockItem {
        const copy: StockItem = Object.assign({}, stockItem);
        return copy;
    }
}

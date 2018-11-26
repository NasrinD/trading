import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CashBox } from './cash-box.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CashBox>;

@Injectable()
export class CashBoxService {

    private resourceUrl =  SERVER_API_URL + 'api/cash-boxes';

    constructor(private http: HttpClient) { }

    create(cashBox: CashBox): Observable<EntityResponseType> {
        const copy = this.convert(cashBox);
        return this.http.post<CashBox>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(cashBox: CashBox): Observable<EntityResponseType> {
        const copy = this.convert(cashBox);
        return this.http.put<CashBox>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CashBox>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CashBox[]>> {
        const options = createRequestOption(req);
        return this.http.get<CashBox[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CashBox[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CashBox = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CashBox[]>): HttpResponse<CashBox[]> {
        const jsonResponse: CashBox[] = res.body;
        const body: CashBox[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CashBox.
     */
    private convertItemFromServer(cashBox: CashBox): CashBox {
        const copy: CashBox = Object.assign({}, cashBox);
        return copy;
    }

    /**
     * Convert a CashBox to a JSON which can be sent to the server.
     */
    private convert(cashBox: CashBox): CashBox {
        const copy: CashBox = Object.assign({}, cashBox);
        return copy;
    }
}

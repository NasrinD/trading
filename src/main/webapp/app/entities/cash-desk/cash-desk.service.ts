import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CashDesk } from './cash-desk.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CashDesk>;

@Injectable()
export class CashDeskService {

    private resourceUrl =  SERVER_API_URL + 'api/cash-desks';

    constructor(private http: HttpClient) { }

    create(cashDesk: CashDesk): Observable<EntityResponseType> {
        const copy = this.convert(cashDesk);
        return this.http.post<CashDesk>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(cashDesk: CashDesk): Observable<EntityResponseType> {
        const copy = this.convert(cashDesk);
        return this.http.put<CashDesk>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CashDesk>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CashDesk[]>> {
        const options = createRequestOption(req);
        return this.http.get<CashDesk[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CashDesk[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CashDesk = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CashDesk[]>): HttpResponse<CashDesk[]> {
        const jsonResponse: CashDesk[] = res.body;
        const body: CashDesk[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CashDesk.
     */
    private convertItemFromServer(cashDesk: CashDesk): CashDesk {
        const copy: CashDesk = Object.assign({}, cashDesk);
        return copy;
    }

    /**
     * Convert a CashDesk to a JSON which can be sent to the server.
     */
    private convert(cashDesk: CashDesk): CashDesk {
        const copy: CashDesk = Object.assign({}, cashDesk);
        return copy;
    }
}

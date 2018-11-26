import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { IssuingBank } from './issuing-bank.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<IssuingBank>;

@Injectable()
export class IssuingBankService {

    private resourceUrl =  SERVER_API_URL + 'api/issuing-banks';

    constructor(private http: HttpClient) { }

    create(issuingBank: IssuingBank): Observable<EntityResponseType> {
        const copy = this.convert(issuingBank);
        return this.http.post<IssuingBank>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(issuingBank: IssuingBank): Observable<EntityResponseType> {
        const copy = this.convert(issuingBank);
        return this.http.put<IssuingBank>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IssuingBank>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<IssuingBank[]>> {
        const options = createRequestOption(req);
        return this.http.get<IssuingBank[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<IssuingBank[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: IssuingBank = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<IssuingBank[]>): HttpResponse<IssuingBank[]> {
        const jsonResponse: IssuingBank[] = res.body;
        const body: IssuingBank[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to IssuingBank.
     */
    private convertItemFromServer(issuingBank: IssuingBank): IssuingBank {
        const copy: IssuingBank = Object.assign({}, issuingBank);
        return copy;
    }

    /**
     * Convert a IssuingBank to a JSON which can be sent to the server.
     */
    private convert(issuingBank: IssuingBank): IssuingBank {
        const copy: IssuingBank = Object.assign({}, issuingBank);
        return copy;
    }
}

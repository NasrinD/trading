import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { AcquiringBank } from './acquiring-bank.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<AcquiringBank>;

@Injectable()
export class AcquiringBankService {

    private resourceUrl =  SERVER_API_URL + 'api/acquiring-banks';

    constructor(private http: HttpClient) { }

    create(acquiringBank: AcquiringBank): Observable<EntityResponseType> {
        const copy = this.convert(acquiringBank);
        return this.http.post<AcquiringBank>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(acquiringBank: AcquiringBank): Observable<EntityResponseType> {
        const copy = this.convert(acquiringBank);
        return this.http.put<AcquiringBank>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<AcquiringBank>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<AcquiringBank[]>> {
        const options = createRequestOption(req);
        return this.http.get<AcquiringBank[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<AcquiringBank[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: AcquiringBank = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<AcquiringBank[]>): HttpResponse<AcquiringBank[]> {
        const jsonResponse: AcquiringBank[] = res.body;
        const body: AcquiringBank[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to AcquiringBank.
     */
    private convertItemFromServer(acquiringBank: AcquiringBank): AcquiringBank {
        const copy: AcquiringBank = Object.assign({}, acquiringBank);
        return copy;
    }

    /**
     * Convert a AcquiringBank to a JSON which can be sent to the server.
     */
    private convert(acquiringBank: AcquiringBank): AcquiringBank {
        const copy: AcquiringBank = Object.assign({}, acquiringBank);
        return copy;
    }
}

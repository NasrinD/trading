import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Debit } from './debit.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Debit>;

@Injectable()
export class DebitService {

    private resourceUrl =  SERVER_API_URL + 'api/debits';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(debit: Debit): Observable<EntityResponseType> {
        const copy = this.convert(debit);
        return this.http.post<Debit>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(debit: Debit): Observable<EntityResponseType> {
        const copy = this.convert(debit);
        return this.http.put<Debit>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Debit>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Debit[]>> {
        const options = createRequestOption(req);
        return this.http.get<Debit[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Debit[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Debit = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Debit[]>): HttpResponse<Debit[]> {
        const jsonResponse: Debit[] = res.body;
        const body: Debit[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Debit.
     */
    private convertItemFromServer(debit: Debit): Debit {
        const copy: Debit = Object.assign({}, debit);
        copy.validityDate = this.dateUtils
            .convertDateTimeFromServer(debit.validityDate);
        return copy;
    }

    /**
     * Convert a Debit to a JSON which can be sent to the server.
     */
    private convert(debit: Debit): Debit {
        const copy: Debit = Object.assign({}, debit);

        copy.validityDate = this.dateUtils.toDate(debit.validityDate);
        return copy;
    }
}

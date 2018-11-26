import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CashDeskApplication } from './cash-desk-application.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CashDeskApplication>;

@Injectable()
export class CashDeskApplicationService {

    private resourceUrl =  SERVER_API_URL + 'api/cash-desk-applications';

    constructor(private http: HttpClient) { }

    create(cashDeskApplication: CashDeskApplication): Observable<EntityResponseType> {
        const copy = this.convert(cashDeskApplication);
        return this.http.post<CashDeskApplication>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(cashDeskApplication: CashDeskApplication): Observable<EntityResponseType> {
        const copy = this.convert(cashDeskApplication);
        return this.http.put<CashDeskApplication>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CashDeskApplication>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CashDeskApplication[]>> {
        const options = createRequestOption(req);
        return this.http.get<CashDeskApplication[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CashDeskApplication[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CashDeskApplication = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CashDeskApplication[]>): HttpResponse<CashDeskApplication[]> {
        const jsonResponse: CashDeskApplication[] = res.body;
        const body: CashDeskApplication[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CashDeskApplication.
     */
    private convertItemFromServer(cashDeskApplication: CashDeskApplication): CashDeskApplication {
        const copy: CashDeskApplication = Object.assign({}, cashDeskApplication);
        return copy;
    }

    /**
     * Convert a CashDeskApplication to a JSON which can be sent to the server.
     */
    private convert(cashDeskApplication: CashDeskApplication): CashDeskApplication {
        const copy: CashDeskApplication = Object.assign({}, cashDeskApplication);
        return copy;
    }
}

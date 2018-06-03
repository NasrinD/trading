import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CashDeskGUI } from './cash-desk-gui.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CashDeskGUI>;

@Injectable()
export class CashDeskGUIService {

    private resourceUrl =  SERVER_API_URL + 'api/cash-desk-guis';

    constructor(private http: HttpClient) { }

    create(cashDeskGUI: CashDeskGUI): Observable<EntityResponseType> {
        const copy = this.convert(cashDeskGUI);
        return this.http.post<CashDeskGUI>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(cashDeskGUI: CashDeskGUI): Observable<EntityResponseType> {
        const copy = this.convert(cashDeskGUI);
        return this.http.put<CashDeskGUI>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CashDeskGUI>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CashDeskGUI[]>> {
        const options = createRequestOption(req);
        return this.http.get<CashDeskGUI[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CashDeskGUI[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CashDeskGUI = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CashDeskGUI[]>): HttpResponse<CashDeskGUI[]> {
        const jsonResponse: CashDeskGUI[] = res.body;
        const body: CashDeskGUI[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CashDeskGUI.
     */
    private convertItemFromServer(cashDeskGUI: CashDeskGUI): CashDeskGUI {
        const copy: CashDeskGUI = Object.assign({}, cashDeskGUI);
        return copy;
    }

    /**
     * Convert a CashDeskGUI to a JSON which can be sent to the server.
     */
    private convert(cashDeskGUI: CashDeskGUI): CashDeskGUI {
        const copy: CashDeskGUI = Object.assign({}, cashDeskGUI);
        return copy;
    }
}

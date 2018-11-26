import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CashBoxController } from './cash-box-controller.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CashBoxController>;

@Injectable()
export class CashBoxControllerService {

    private resourceUrl =  SERVER_API_URL + 'api/cash-box-controllers';

    constructor(private http: HttpClient) { }

    create(cashBoxController: CashBoxController): Observable<EntityResponseType> {
        const copy = this.convert(cashBoxController);
        return this.http.post<CashBoxController>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(cashBoxController: CashBoxController): Observable<EntityResponseType> {
        const copy = this.convert(cashBoxController);
        return this.http.put<CashBoxController>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CashBoxController>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CashBoxController[]>> {
        const options = createRequestOption(req);
        return this.http.get<CashBoxController[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CashBoxController[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CashBoxController = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CashBoxController[]>): HttpResponse<CashBoxController[]> {
        const jsonResponse: CashBoxController[] = res.body;
        const body: CashBoxController[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CashBoxController.
     */
    private convertItemFromServer(cashBoxController: CashBoxController): CashBoxController {
        const copy: CashBoxController = Object.assign({}, cashBoxController);
        return copy;
    }

    /**
     * Convert a CashBoxController to a JSON which can be sent to the server.
     */
    private convert(cashBoxController: CashBoxController): CashBoxController {
        const copy: CashBoxController = Object.assign({}, cashBoxController);
        return copy;
    }
}

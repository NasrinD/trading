import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CardReaderController } from './card-reader-controller.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CardReaderController>;

@Injectable()
export class CardReaderControllerService {

    private resourceUrl =  SERVER_API_URL + 'api/card-reader-controllers';

    constructor(private http: HttpClient) { }

    create(cardReaderController: CardReaderController): Observable<EntityResponseType> {
        const copy = this.convert(cardReaderController);
        return this.http.post<CardReaderController>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(cardReaderController: CardReaderController): Observable<EntityResponseType> {
        const copy = this.convert(cardReaderController);
        return this.http.put<CardReaderController>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CardReaderController>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CardReaderController[]>> {
        const options = createRequestOption(req);
        return this.http.get<CardReaderController[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CardReaderController[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CardReaderController = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CardReaderController[]>): HttpResponse<CardReaderController[]> {
        const jsonResponse: CardReaderController[] = res.body;
        const body: CardReaderController[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CardReaderController.
     */
    private convertItemFromServer(cardReaderController: CardReaderController): CardReaderController {
        const copy: CardReaderController = Object.assign({}, cardReaderController);
        return copy;
    }

    /**
     * Convert a CardReaderController to a JSON which can be sent to the server.
     */
    private convert(cardReaderController: CardReaderController): CardReaderController {
        const copy: CardReaderController = Object.assign({}, cardReaderController);
        return copy;
    }
}

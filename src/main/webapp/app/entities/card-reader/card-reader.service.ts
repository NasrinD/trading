import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CardReader } from './card-reader.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CardReader>;

@Injectable()
export class CardReaderService {

    private resourceUrl =  SERVER_API_URL + 'api/card-readers';

    constructor(private http: HttpClient) { }

    create(cardReader: CardReader): Observable<EntityResponseType> {
        const copy = this.convert(cardReader);
        return this.http.post<CardReader>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(cardReader: CardReader): Observable<EntityResponseType> {
        const copy = this.convert(cardReader);
        return this.http.put<CardReader>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CardReader>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CardReader[]>> {
        const options = createRequestOption(req);
        return this.http.get<CardReader[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CardReader[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CardReader = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CardReader[]>): HttpResponse<CardReader[]> {
        const jsonResponse: CardReader[] = res.body;
        const body: CardReader[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CardReader.
     */
    private convertItemFromServer(cardReader: CardReader): CardReader {
        const copy: CardReader = Object.assign({}, cardReader);
        return copy;
    }

    /**
     * Convert a CardReader to a JSON which can be sent to the server.
     */
    private convert(cardReader: CardReader): CardReader {
        const copy: CardReader = Object.assign({}, cardReader);
        return copy;
    }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Store } from './store.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Store>;

@Injectable()
export class StoreService {

    private resourceUrl =  SERVER_API_URL + 'api/stores';

    constructor(private http: HttpClient) { }

    create(store: Store): Observable<EntityResponseType> {
        const copy = this.convert(store);
        return this.http.post<Store>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(store: Store): Observable<EntityResponseType> {
        const copy = this.convert(store);
        return this.http.put<Store>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Store>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Store[]>> {
        const options = createRequestOption(req);
        return this.http.get<Store[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Store[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Store = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Store[]>): HttpResponse<Store[]> {
        const jsonResponse: Store[] = res.body;
        const body: Store[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Store.
     */
    private convertItemFromServer(store: Store): Store {
        const copy: Store = Object.assign({}, store);
        return copy;
    }

    /**
     * Convert a Store to a JSON which can be sent to the server.
     */
    private convert(store: Store): Store {
        const copy: Store = Object.assign({}, store);
        return copy;
    }
}

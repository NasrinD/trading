import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Inventory } from './inventory.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Inventory>;

@Injectable()
export class InventoryService {

    private resourceUrl =  SERVER_API_URL + 'api/inventories';

    constructor(private http: HttpClient) { }

    create(inventory: Inventory): Observable<EntityResponseType> {
        const copy = this.convert(inventory);
        return this.http.post<Inventory>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(inventory: Inventory): Observable<EntityResponseType> {
        const copy = this.convert(inventory);
        return this.http.put<Inventory>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Inventory>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Inventory[]>> {
        const options = createRequestOption(req);
        return this.http.get<Inventory[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Inventory[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Inventory = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Inventory[]>): HttpResponse<Inventory[]> {
        const jsonResponse: Inventory[] = res.body;
        const body: Inventory[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Inventory.
     */
    private convertItemFromServer(inventory: Inventory): Inventory {
        const copy: Inventory = Object.assign({}, inventory);
        return copy;
    }

    /**
     * Convert a Inventory to a JSON which can be sent to the server.
     */
    private convert(inventory: Inventory): Inventory {
        const copy: Inventory = Object.assign({}, inventory);
        return copy;
    }
}

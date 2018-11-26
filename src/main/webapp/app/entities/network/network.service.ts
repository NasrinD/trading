import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Network } from './network.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Network>;

@Injectable()
export class NetworkService {

    private resourceUrl =  SERVER_API_URL + 'api/networks';

    constructor(private http: HttpClient) { }

    create(network: Network): Observable<EntityResponseType> {
        const copy = this.convert(network);
        return this.http.post<Network>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(network: Network): Observable<EntityResponseType> {
        const copy = this.convert(network);
        return this.http.put<Network>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Network>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Network[]>> {
        const options = createRequestOption(req);
        return this.http.get<Network[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Network[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Network = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Network[]>): HttpResponse<Network[]> {
        const jsonResponse: Network[] = res.body;
        const body: Network[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Network.
     */
    private convertItemFromServer(network: Network): Network {
        const copy: Network = Object.assign({}, network);
        return copy;
    }

    /**
     * Convert a Network to a JSON which can be sent to the server.
     */
    private convert(network: Network): Network {
        const copy: Network = Object.assign({}, network);
        return copy;
    }
}

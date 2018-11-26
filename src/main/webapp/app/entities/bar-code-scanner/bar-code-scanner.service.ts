import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { BarCodeScanner } from './bar-code-scanner.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<BarCodeScanner>;

@Injectable()
export class BarCodeScannerService {

    private resourceUrl =  SERVER_API_URL + 'api/bar-code-scanners';

    constructor(private http: HttpClient) { }

    create(barCodeScanner: BarCodeScanner): Observable<EntityResponseType> {
        const copy = this.convert(barCodeScanner);
        return this.http.post<BarCodeScanner>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(barCodeScanner: BarCodeScanner): Observable<EntityResponseType> {
        const copy = this.convert(barCodeScanner);
        return this.http.put<BarCodeScanner>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<BarCodeScanner>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<BarCodeScanner[]>> {
        const options = createRequestOption(req);
        return this.http.get<BarCodeScanner[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<BarCodeScanner[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: BarCodeScanner = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<BarCodeScanner[]>): HttpResponse<BarCodeScanner[]> {
        const jsonResponse: BarCodeScanner[] = res.body;
        const body: BarCodeScanner[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to BarCodeScanner.
     */
    private convertItemFromServer(barCodeScanner: BarCodeScanner): BarCodeScanner {
        const copy: BarCodeScanner = Object.assign({}, barCodeScanner);
        return copy;
    }

    /**
     * Convert a BarCodeScanner to a JSON which can be sent to the server.
     */
    private convert(barCodeScanner: BarCodeScanner): BarCodeScanner {
        const copy: BarCodeScanner = Object.assign({}, barCodeScanner);
        return copy;
    }
}

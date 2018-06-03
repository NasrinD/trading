import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { BarCodeScannerController } from './bar-code-scanner-controller.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<BarCodeScannerController>;

@Injectable()
export class BarCodeScannerControllerService {

    private resourceUrl =  SERVER_API_URL + 'api/bar-code-scanner-controllers';

    constructor(private http: HttpClient) { }

    create(barCodeScannerController: BarCodeScannerController): Observable<EntityResponseType> {
        const copy = this.convert(barCodeScannerController);
        return this.http.post<BarCodeScannerController>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(barCodeScannerController: BarCodeScannerController): Observable<EntityResponseType> {
        const copy = this.convert(barCodeScannerController);
        return this.http.put<BarCodeScannerController>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<BarCodeScannerController>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<BarCodeScannerController[]>> {
        const options = createRequestOption(req);
        return this.http.get<BarCodeScannerController[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<BarCodeScannerController[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: BarCodeScannerController = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<BarCodeScannerController[]>): HttpResponse<BarCodeScannerController[]> {
        const jsonResponse: BarCodeScannerController[] = res.body;
        const body: BarCodeScannerController[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to BarCodeScannerController.
     */
    private convertItemFromServer(barCodeScannerController: BarCodeScannerController): BarCodeScannerController {
        const copy: BarCodeScannerController = Object.assign({}, barCodeScannerController);
        return copy;
    }

    /**
     * Convert a BarCodeScannerController to a JSON which can be sent to the server.
     */
    private convert(barCodeScannerController: BarCodeScannerController): BarCodeScannerController {
        const copy: BarCodeScannerController = Object.assign({}, barCodeScannerController);
        return copy;
    }
}

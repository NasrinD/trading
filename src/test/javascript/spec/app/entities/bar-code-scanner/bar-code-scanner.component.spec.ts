/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TradingsystemEmTestModule } from '../../../test.module';
import { BarCodeScannerComponent } from '../../../../../../main/webapp/app/entities/bar-code-scanner/bar-code-scanner.component';
import { BarCodeScannerService } from '../../../../../../main/webapp/app/entities/bar-code-scanner/bar-code-scanner.service';
import { BarCodeScanner } from '../../../../../../main/webapp/app/entities/bar-code-scanner/bar-code-scanner.model';

describe('Component Tests', () => {

    describe('BarCodeScanner Management Component', () => {
        let comp: BarCodeScannerComponent;
        let fixture: ComponentFixture<BarCodeScannerComponent>;
        let service: BarCodeScannerService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TradingsystemEmTestModule],
                declarations: [BarCodeScannerComponent],
                providers: [
                    BarCodeScannerService
                ]
            })
            .overrideTemplate(BarCodeScannerComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BarCodeScannerComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BarCodeScannerService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new BarCodeScanner(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.barCodeScanners[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

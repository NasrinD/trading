/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { TradingsystemMoTestModule } from '../../../test.module';
import { BarCodeScannerDetailComponent } from '../../../../../../main/webapp/app/entities/bar-code-scanner/bar-code-scanner-detail.component';
import { BarCodeScannerService } from '../../../../../../main/webapp/app/entities/bar-code-scanner/bar-code-scanner.service';
import { BarCodeScanner } from '../../../../../../main/webapp/app/entities/bar-code-scanner/bar-code-scanner.model';

describe('Component Tests', () => {

    describe('BarCodeScanner Management Detail Component', () => {
        let comp: BarCodeScannerDetailComponent;
        let fixture: ComponentFixture<BarCodeScannerDetailComponent>;
        let service: BarCodeScannerService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TradingsystemMoTestModule],
                declarations: [BarCodeScannerDetailComponent],
                providers: [
                    BarCodeScannerService
                ]
            })
            .overrideTemplate(BarCodeScannerDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BarCodeScannerDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BarCodeScannerService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new BarCodeScanner(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.barCodeScanner).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

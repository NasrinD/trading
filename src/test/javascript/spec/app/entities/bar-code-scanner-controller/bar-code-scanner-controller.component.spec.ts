/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TradingsystemEmTestModule } from '../../../test.module';
import { BarCodeScannerControllerComponent } from '../../../../../../main/webapp/app/entities/bar-code-scanner-controller/bar-code-scanner-controller.component';
import { BarCodeScannerControllerService } from '../../../../../../main/webapp/app/entities/bar-code-scanner-controller/bar-code-scanner-controller.service';
import { BarCodeScannerController } from '../../../../../../main/webapp/app/entities/bar-code-scanner-controller/bar-code-scanner-controller.model';

describe('Component Tests', () => {

    describe('BarCodeScannerController Management Component', () => {
        let comp: BarCodeScannerControllerComponent;
        let fixture: ComponentFixture<BarCodeScannerControllerComponent>;
        let service: BarCodeScannerControllerService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TradingsystemEmTestModule],
                declarations: [BarCodeScannerControllerComponent],
                providers: [
                    BarCodeScannerControllerService
                ]
            })
            .overrideTemplate(BarCodeScannerControllerComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BarCodeScannerControllerComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BarCodeScannerControllerService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new BarCodeScannerController(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.barCodeScannerControllers[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

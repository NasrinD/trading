/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { TradingsystemMoTestModule } from '../../../test.module';
import { BarCodeScannerControllerDetailComponent } from '../../../../../../main/webapp/app/entities/bar-code-scanner-controller/bar-code-scanner-controller-detail.component';
import { BarCodeScannerControllerService } from '../../../../../../main/webapp/app/entities/bar-code-scanner-controller/bar-code-scanner-controller.service';
import { BarCodeScannerController } from '../../../../../../main/webapp/app/entities/bar-code-scanner-controller/bar-code-scanner-controller.model';

describe('Component Tests', () => {

    describe('BarCodeScannerController Management Detail Component', () => {
        let comp: BarCodeScannerControllerDetailComponent;
        let fixture: ComponentFixture<BarCodeScannerControllerDetailComponent>;
        let service: BarCodeScannerControllerService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TradingsystemMoTestModule],
                declarations: [BarCodeScannerControllerDetailComponent],
                providers: [
                    BarCodeScannerControllerService
                ]
            })
            .overrideTemplate(BarCodeScannerControllerDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BarCodeScannerControllerDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BarCodeScannerControllerService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new BarCodeScannerController(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.barCodeScannerController).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

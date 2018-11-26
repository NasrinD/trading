/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { TradingsystemMoTestModule } from '../../../test.module';
import { PrinterDetailComponent } from '../../../../../../main/webapp/app/entities/printer/printer-detail.component';
import { PrinterService } from '../../../../../../main/webapp/app/entities/printer/printer.service';
import { Printer } from '../../../../../../main/webapp/app/entities/printer/printer.model';

describe('Component Tests', () => {

    describe('Printer Management Detail Component', () => {
        let comp: PrinterDetailComponent;
        let fixture: ComponentFixture<PrinterDetailComponent>;
        let service: PrinterService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TradingsystemMoTestModule],
                declarations: [PrinterDetailComponent],
                providers: [
                    PrinterService
                ]
            })
            .overrideTemplate(PrinterDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PrinterDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PrinterService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Printer(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.printer).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

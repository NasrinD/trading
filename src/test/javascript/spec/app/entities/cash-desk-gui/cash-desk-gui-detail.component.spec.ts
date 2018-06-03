/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { TradingsystemEmTestModule } from '../../../test.module';
import { CashDeskGUIDetailComponent } from '../../../../../../main/webapp/app/entities/cash-desk-gui/cash-desk-gui-detail.component';
import { CashDeskGUIService } from '../../../../../../main/webapp/app/entities/cash-desk-gui/cash-desk-gui.service';
import { CashDeskGUI } from '../../../../../../main/webapp/app/entities/cash-desk-gui/cash-desk-gui.model';

describe('Component Tests', () => {

    describe('CashDeskGUI Management Detail Component', () => {
        let comp: CashDeskGUIDetailComponent;
        let fixture: ComponentFixture<CashDeskGUIDetailComponent>;
        let service: CashDeskGUIService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TradingsystemEmTestModule],
                declarations: [CashDeskGUIDetailComponent],
                providers: [
                    CashDeskGUIService
                ]
            })
            .overrideTemplate(CashDeskGUIDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CashDeskGUIDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CashDeskGUIService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CashDeskGUI(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.cashDeskGUI).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

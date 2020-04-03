import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuiviDemandeComponent } from './suivi-demande.component';

describe('SuiviDemandeComponent', () => {
  let component: SuiviDemandeComponent;
  let fixture: ComponentFixture<SuiviDemandeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuiviDemandeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuiviDemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

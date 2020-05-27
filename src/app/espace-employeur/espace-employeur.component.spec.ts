import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaceEmployeurComponent } from './espace-employeur.component';

describe('EspaceEmployeurComponent', () => {
  let component: EspaceEmployeurComponent;
  let fixture: ComponentFixture<EspaceEmployeurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspaceEmployeurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspaceEmployeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

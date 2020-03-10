import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImmatriculationExistComponent } from './immatriculation-exist.component';

describe('ImmatriculationExistComponent', () => {
  let component: ImmatriculationExistComponent;
  let fixture: ComponentFixture<ImmatriculationExistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImmatriculationExistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImmatriculationExistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

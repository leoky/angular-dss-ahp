import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlternativeCalculateComponent } from './alternative-calculate.component';

describe('AlternativeCalculateComponent', () => {
  let component: AlternativeCalculateComponent;
  let fixture: ComponentFixture<AlternativeCalculateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlternativeCalculateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlternativeCalculateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

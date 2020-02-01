import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriteriaResultComponent } from './criteria-result.component';

describe('CriteriaResultComponent', () => {
  let component: CriteriaResultComponent;
  let fixture: ComponentFixture<CriteriaResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriteriaResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriteriaResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

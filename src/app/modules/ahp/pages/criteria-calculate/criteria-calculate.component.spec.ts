import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CriteriaCalculateComponent } from './criteria-calculate.component';

describe('CriteriaCalculateComponent', () => {
  let component: CriteriaCalculateComponent;
  let fixture: ComponentFixture<CriteriaCalculateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CriteriaCalculateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriteriaCalculateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

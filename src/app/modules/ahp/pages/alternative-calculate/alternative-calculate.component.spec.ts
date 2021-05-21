import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AlternativeCalculateComponent } from './alternative-calculate.component';

describe('AlternativeCalculateComponent', () => {
  let component: AlternativeCalculateComponent;
  let fixture: ComponentFixture<AlternativeCalculateComponent>;

  beforeEach(waitForAsync(() => {
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

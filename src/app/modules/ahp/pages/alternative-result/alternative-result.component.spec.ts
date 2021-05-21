import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AlternativeResultComponent } from './alternative-result.component';

describe('AlternativeResultComponent', () => {
  let component: AlternativeResultComponent;
  let fixture: ComponentFixture<AlternativeResultComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AlternativeResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlternativeResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

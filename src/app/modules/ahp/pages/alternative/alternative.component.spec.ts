import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AlternativeComponent } from './alternative.component';

describe('AlternativeComponent', () => {
  let component: AlternativeComponent;
  let fixture: ComponentFixture<AlternativeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AlternativeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlternativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

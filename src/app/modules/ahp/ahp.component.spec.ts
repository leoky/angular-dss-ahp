import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AhpComponent } from './ahp.component';

describe('AhpComponent', () => {
  let component: AhpComponent;
  let fixture: ComponentFixture<AhpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AhpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AhpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

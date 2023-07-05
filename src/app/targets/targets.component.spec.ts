import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetsComponent } from './targets.component';

describe('TargetsComponent', () => {
  let component: TargetsComponent;
  let fixture: ComponentFixture<TargetsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TargetsComponent]
    });
    fixture = TestBed.createComponent(TargetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

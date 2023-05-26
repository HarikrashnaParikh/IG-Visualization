import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueSetComponent } from './value-set.component';

describe('ValueSetComponent', () => {
  let component: ValueSetComponent;
  let fixture: ComponentFixture<ValueSetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValueSetComponent]
    });
    fixture = TestBed.createComponent(ValueSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

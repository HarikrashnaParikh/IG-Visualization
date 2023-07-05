import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionDefinitionComponent } from './action-definition.component';

describe('ActionDefinitionComponent', () => {
  let component: ActionDefinitionComponent;
  let fixture: ComponentFixture<ActionDefinitionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActionDefinitionComponent]
    });
    fixture = TestBed.createComponent(ActionDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

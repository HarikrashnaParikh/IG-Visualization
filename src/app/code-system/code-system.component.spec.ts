import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeSystemComponent } from './code-system.component';

describe('CodeSystemComponent', () => {
  let component: CodeSystemComponent;
  let fixture: ComponentFixture<CodeSystemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CodeSystemComponent]
    });
    fixture = TestBed.createComponent(CodeSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

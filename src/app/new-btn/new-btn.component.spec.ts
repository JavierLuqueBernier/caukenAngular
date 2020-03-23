import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBtnComponent } from './new-btn.component';

describe('NewBtnComponent', () => {
  let component: NewBtnComponent;
  let fixture: ComponentFixture<NewBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

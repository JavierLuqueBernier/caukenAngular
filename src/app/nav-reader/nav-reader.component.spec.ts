import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavReaderComponent } from './nav-reader.component';

describe('NavReaderComponent', () => {
  let component: NavReaderComponent;
  let fixture: ComponentFixture<NavReaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavReaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

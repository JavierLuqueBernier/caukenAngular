import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoversListComponent } from './covers-list.component';

describe('CoversListComponent', () => {
  let component: CoversListComponent;
  let fixture: ComponentFixture<CoversListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoversListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoversListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

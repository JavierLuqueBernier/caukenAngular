import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCoversComponent } from './lista-covers.component';

describe('ListaCoversComponent', () => {
  let component: ListaCoversComponent;
  let fixture: ComponentFixture<ListaCoversComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaCoversComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaCoversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

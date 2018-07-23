import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChappComponent } from './chapp.component';

describe('ChappComponent', () => {
  let component: ChappComponent;
  let fixture: ComponentFixture<ChappComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChappComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TheBizComponent } from './the-biz.component';

describe('TheBizComponent', () => {
  let component: TheBizComponent;
  let fixture: ComponentFixture<TheBizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TheBizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TheBizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

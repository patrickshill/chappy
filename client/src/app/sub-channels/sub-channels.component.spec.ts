import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubChannelsComponent } from './sub-channels.component';

describe('SubChannelsComponent', () => {
  let component: SubChannelsComponent;
  let fixture: ComponentFixture<SubChannelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubChannelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubChannelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

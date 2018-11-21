import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoprepsComponent } from './mopreps.component';

describe('MoprepsComponent', () => {
  let component: MoprepsComponent;
  let fixture: ComponentFixture<MoprepsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoprepsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoprepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

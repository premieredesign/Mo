import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MofitComponent } from './mofit.component';

describe('MofitComponent', () => {
  let component: MofitComponent;
  let fixture: ComponentFixture<MofitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MofitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MofitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

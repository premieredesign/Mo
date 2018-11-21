import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MospiritComponent } from './mospirit.component';

describe('MospiritComponent', () => {
  let component: MospiritComponent;
  let fixture: ComponentFixture<MospiritComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MospiritComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MospiritComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
